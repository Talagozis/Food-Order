import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, LoadingController, Loading } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { ENV } from '@app/env';

import { OrderProvider } from '../../providers/Order/order';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { CheckoutRpcResponse } from '../../models/Request/CheckoutRpcResponse';
import { ResponseStatus } from '../../models/Request/Response';
import { CheckoutRpc } from '../../models/Rpc/Checkout';
import { StoreApi } from '../../models/api/Store';
import { StoreProvider } from '../../providers/store/store';
import { OrderDetails, OrderDeliveryType, OrderPaymentType } from '../../models/Entities/Checkout';
import { CartProvider } from '../../providers/Cart/cart';
import { CartViewModel, CartItemViewModel, CartItemOfferViewModel } from '../../models/ViewModels/CartViewModel';
import { AspNetUserDetails } from '../../models/Entities/Cart';

@IonicPage({
	name: 'CheckoutPage',
	segment: 'checkout/:storeSlug',
	defaultHistory: ['StorePage']
})
@Component({
	selector: 'page-checkout',
	templateUrl: 'checkout.html',
})
export class CheckoutPage {
	store: StoreApi;
	cart: CartViewModel;

	totalCartPrice: number;
	showCartDetails: boolean;
	canSendOrder: boolean;

	orderDetails: OrderDetails;
	deliveryType: OrderDeliveryType;

	constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private cartProvider: CartProvider, public storeProvider: StoreProvider, public orderProvider: OrderProvider, private analyticsProvider: AnalyticsProvider, public loadingCtrl: LoadingController, private sanitizer: DomSanitizer) {
	}

	ionViewDidEnter() {
		const storeSlug = this.navParams.get('storeSlug');
		this.analyticsProvider.trackView("/checkout/" + storeSlug);
	}

	async ionViewDidLoad(): Promise<void> {
		const storeSlug: string = this.navParams.get('storeSlug');

		this.showCartDetails = true;
		this.totalCartPrice = 0.00;
		this.canSendOrder = false;
		this.orderDetails = {
			customerSurname: "",
			customerForename: "",
			customerAddressLine: "",
			customerPhoneNumber: "",
			customerPhoneNumberConfirm: "",
			customerDoorName: "",
			customerFloorNumber: "",
			info: "",
		};

		const store = await this.storeProvider.findBySlug(storeSlug);

		this.store = store;

		this.cartProvider.getByStoreBid(store.bid).then((cart: CartViewModel) => {
			this.cart = cart;
			this.totalCartPrice = cart.cartItems.map(a => a.totalPrice * a.quantity).reduce((a, b) => a + b, 0) + cart.cartItemOffers.reduce((a, b) => a + b.finalPrice * b.quantity, 0);
			this.showCartDetails = cart.cartItems.length <= 5;
			this.canSendOrder = true;
		});
	}

	public toggleSectionCartDetails(i) {
		this.showCartDetails = !this.showCartDetails;
	}

	public removeCartItem(cartItem: CartItemViewModel) {
		this.cartProvider.removeCartItem(this.store.bid, cartItem)
			.then(c => {
				this.cart = c;
				this.totalCartPrice = c.cartItems.map(a => a.totalPrice * a.quantity).reduce((a, b) => a + b, 0) + c.cartItemOffers.reduce((a, b) => a + b.finalPrice * b.quantity, 0);
			});
	}

	public removeCartItemOffer(cartItemOffer: CartItemOfferViewModel) {
		this.cartProvider.removeCartItemOffer(this.store.bid, cartItemOffer)
			.then(c => {
				this.cart = c;
				this.totalCartPrice = c.cartItems.map(a => a.totalPrice * a.quantity).reduce((a, b) => a + b, 0) + c.cartItemOffers.reduce((a, b) => a + b.finalPrice * b.quantity, 0);
			});
	}

	public async sendOrder(): Promise<void> {
		this.canSendOrder = false;

		const checkoutRpc: CheckoutRpc = new CheckoutRpc(this.cart);
		checkoutRpc.orderDetails = {
			...this.orderDetails,
			// info: "\$test",
		};
		checkoutRpc.deliveryType = this.deliveryType;
		checkoutRpc.AspNetUser = { // undefined user
			bid: undefined
		} as AspNetUserDetails;
		checkoutRpc.Store = {
			bid: this.store.bid,
		} as AspNetUserDetails;
		checkoutRpc.sessionDetails = {
			userAgent: this.platform.userAgent(),
			applicationType: undefined,
			applicationDomain: undefined
		};
		checkoutRpc.paymentDetails = {
			paymentType: OrderPaymentType.Cash,
			vivaWalletPaymentToken: null,
		};

		const checkoutRpcResponse: CheckoutRpcResponse = await this.orderProvider.checkout(checkoutRpc).toPromise();

		if (!checkoutRpcResponse || checkoutRpcResponse.status !== ResponseStatus.Success) {
			this.handleOrderFailureMessage(checkoutRpcResponse);
			return;
		}

		const showConfirmationLoading: Loading = this.showConfirmationLoading();

		let isAccepted: boolean = false;
		let isPrinted: boolean = false;
		let isPaid: boolean = false;
		await Promise.all([
			new Promise(resolve => setTimeout(resolve, 2 * 1000)),
			this.orderProvider.checkOrderIsAccepted({ orderBid: checkoutRpcResponse.orderBid }).toPromise().then(a => isAccepted = true).catch(e => isAccepted = false),
			this.orderProvider.checkOrderIsPrinted({ orderBid: checkoutRpcResponse.orderBid }).toPromise().then(a => isPrinted = true).catch(e => isPrinted = false),
			this.orderProvider.checkOrderIsPaid({ orderBid: checkoutRpcResponse.orderBid }).toPromise().then(a => isPaid = true).catch(e => isPaid = false),
		]);
		await showConfirmationLoading.dismiss();

		if (!isAccepted || !isPrinted || !isPaid) {
			this.showFailedConfirmationLoading();
			this.canSendOrder = true;
			return;
		}

		this.analyticsProvider.trackPurchase(checkoutRpcResponse.orderBid.toString(), this.totalCartPrice, this.store, this.cart);

		await this.cartProvider.clearCartItem(this.store.bid);
		await this.cartProvider.clearCartItemOffer(this.store.bid);
		await this.navCtrl.setRoot('ThankYouPage', { storeSlug: this.store.slug });
	}

	private handleOrderFailureMessage(c: CheckoutRpcResponse) { // <= More detailed messages
		let message = '';
		switch (true) {
			case c.checkoutStatus >= 10 && c.checkoutStatus < 20:
				message = 'Υπήρξε πρόβλημα με το κατάστημα.';
				break;
			case c.checkoutStatus === 22:
				message = 'Παρακαλώ συμπλήρωσε το επώνυμο.';
				break;
			case c.checkoutStatus === 23:
				message = 'Παρακαλώ συμπλήρωσε το όνομα.';
				break;
			case c.checkoutStatus === 24:
				message = 'Παρακαλώ συμπλήρωσε τη διεύθυνση.';
				break;
			case c.checkoutStatus === 25:
				message = 'Παρακαλώ συμπλήρωσε το τηλέφωνο.';
				break;
			case c.checkoutStatus === 26:
				message = 'Η επιβεβαίωση τηλεφώνου απετυχε.';
				break;
			case c.checkoutStatus === 27:
				message = 'Παρακαλώ επίλεξε όροφο.';
				break;
			case c.checkoutStatus >= 20 && c.checkoutStatus < 30:
				message = 'Υπήρξε πρόβλημα με το στοιχεία.';
				break;
			case c.checkoutStatus === 32:
				message = 'Το καλάθι είναι άδειο. Επίλεξε προϊόντα.';
				break;
			case c.checkoutStatus === 35:
				message = 'Η ελάχιστη παραγγελία είναι ' + this.store.minOrderCost + ' ευρώ.';
				break;
			case c.checkoutStatus >= 30 && c.checkoutStatus < 50:
				message = 'Υπήρξε πρόβλημα με το καλάθι σας.';
				break;
			default:
				message = 'Υπήρξε κάποιο πρόβλημα.';
		}
		this.presentAlert(message);
		this.canSendOrder = true;
		return;
	}

	private presentAlert(message: string) {
		const alert = this.alertCtrl.create({
			title: 'Η παραγγελία απέτυχε.',
			subTitle: message,
			buttons: ['OK'],
		});
		alert.present();
	}

	public getAmountOfCartProducts(cart: CartViewModel): number {
		const items: number = cart.cartItems.reduce((a, b) => a + b.quantity, 0);
		const itemOffers: number = cart.cartItemOffers.reduce((a, b) => a + b.offerGroups.reduce((c, d) => c + d.product.quantity, 0), 0);

		return items + itemOffers;
	}

	private showConfirmationLoading(): Loading {
		const safeHtml: any = this.sanitizer.bypassSecurityTrustHtml(
			`<div class="checkoutAccepting">
				<h3>Αναμονή αποδοχής παραγγελίας...</h3>
				<div class="spinning-image" style="background-image: url(${ENV.IMAGE_URL + "image/store/" + this.store.logo});">
					<div></div>
				</div>
				<p>Η παραγγελίας απεστάλη επιτυχώς. Παρακαλώ περιμένετε για την αποδοχή της από το κατάστημα.</p>
			</div>`
		);

		const loading: Loading = this.loadingCtrl.create({
			spinner: 'hide',
			content: safeHtml
		});

		loading.present();

		return loading;
	}

	private showFailedConfirmationLoading(): Loading {
		const safeHtml: any = this.sanitizer.bypassSecurityTrustHtml(
			`<div class="checkoutAcceptingFailed">
				<h3>Ουπς..!</h3>
				<p>Υπήρξε κάποιο πρόβλημα επικοινωνίας με το κατάστημα. Παρακαλώ χρησιμοποίησε το τηλέφωνο.</p>
				<p>
					<span style="font-size: 0.85em;">Τηλ. καταστήματος:</span>
					<span style="font-size: 0.9em; font-weight: 600;">${this.store.Contacts.find(a => a.ContactType.name === "Σταθερό τηλέφωνο").value}</span>
				</p>
			</div>
			`
		);

		const loading: Loading = this.loadingCtrl.create({
			spinner: 'hide',
			content: safeHtml,
			enableBackdropDismiss: true
		});

		loading.present();

		return loading;
	}

}
