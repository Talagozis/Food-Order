import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, LoadingController } from 'ionic-angular';

import { OrderProvider } from '../../providers/Order/order';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { CheckoutRpcResponse } from '../../models/Request/CheckoutRpcResponse';
import { ResponseStatus } from '../../models/Request/Response';
import { CheckoutRpc } from '../../models/Rpc/Checkout';
import { StoreApi } from '../../models/api/Store';
import { StoreProvider } from '../../providers/store/store';
import { OrderDetails, ApplicationType, OrderDeliveryType } from '../../models/Entities/Checkout';
import { CartProvider } from '../../providers/Cart/cart';
import { CartViewModel, CartItemViewModel, CartItemOfferViewModel } from '../../models/ViewModels/CartViewModel';
import { AspNetUserDetails } from '../../models/Entities/Cart';
import { CartItemOffer } from '../../models/Api/CartItemOffer';

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

	constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private cartProvider: CartProvider, public storeProvider: StoreProvider, public orderProvider: OrderProvider, private analyticsProvider: AnalyticsProvider, public loadingCtrl: LoadingController) {
	}

	ionViewDidEnter() {
		var storeSlug = this.navParams.get('storeSlug');
		this.analyticsProvider.trackView("/checkout/" + storeSlug);
	}

	async ionViewDidLoad() {
		var storeSlug: string = this.navParams.get('storeSlug');

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

		let store = await this.storeProvider.findBySlug(storeSlug);

		this.store = store;

		this.cartProvider.getByStoreBid(store.bid).then((cart: CartViewModel) => {
			this.cart = cart;
			console.log(cart);
			this.totalCartPrice = cart.cartItems.map(a => a.totalPrice * a.quantity).reduce((a, b) => a + b, 0) + cart.cartItemOffers.reduce((a, b) => a + b.finalPrice * b.quantity, 0);
			this.showCartDetails = cart.cartItems.length <= 5;
			this.canSendOrder = true;
		});
	}

	toggleSectionCartDetails(i) {
		this.showCartDetails = !this.showCartDetails;
	}

	removeCartItem(cartItem: CartItemViewModel) {
		this.cartProvider.removeCartItem(this.store.bid, cartItem)
			.then(c => {
				this.cart = c;
				this.totalCartPrice = c.cartItems.map(a => a.totalPrice * a.quantity).reduce((a, b) => a + b, 0) + c.cartItemOffers.reduce((a, b) => a + b.finalPrice * b.quantity, 0);
			});
	}

	removeCartItemOffer(cartItemOffer: CartItemOfferViewModel) {
		this.cartProvider.removeCartItemOffer(this.store.bid, cartItemOffer)
			.then(c => {
				this.cart = c;
				this.totalCartPrice = c.cartItems.map(a => a.totalPrice * a.quantity).reduce((a, b) => a + b, 0) + c.cartItemOffers.reduce((a, b) => a + b.finalPrice * b.quantity, 0);
			});
	}

	sendOrder(): void {
		this.showConfirmationLoading();
		// this.canSendOrder = false;
		// let checkoutRpc: CheckoutRpc = new CheckoutRpc(this.cart);
		// checkoutRpc.orderDetails = {
		// 	...this.orderDetails,
		// 	// info: "\$test",
		// };
		// checkoutRpc.deliveryType = this.deliveryType;
		// checkoutRpc.AspNetUser = { // undefined user
		// 	bid: undefined
		// } as AspNetUserDetails;
		// checkoutRpc.Store = {
		// 	bid: this.store.bid
		// } as AspNetUserDetails;
		// checkoutRpc.sessionDetals = {
		// 	applicationType: ApplicationType.Pwa,
		// 	userAgent: this.platform.userAgent(),
		// }

		// this.orderProvider.checkout(checkoutRpc).subscribe((checkoutRpcResponse: CheckoutRpcResponse) => {

		// 	if (!checkoutRpcResponse || checkoutRpcResponse.status !== ResponseStatus.Success) {
		// 		this.handleOrderFailureMessage(checkoutRpcResponse);
		// 		return;
		// 	}

		// 	this.cartProvider.clearCartItem(this.store.bid);
		// 	this.cartProvider.clearCartItemOffer(this.store.bid);
		// 	// this.canSendOrder = true;
		// 	this.navCtrl.setRoot('ThankYouPage', { storeSlug: this.store.slug });
		// });

	}

	handleOrderFailureMessage(c: CheckoutRpcResponse) { // <= More detailed messages
		let message = '';
		switch (true) {
			case c.checkoutStatus >= 10 && c.checkoutStatus < 20:
				message = 'Υπήρξε πρόβλημα με το κατάστημα.';
				break;
			case c.checkoutStatus == 22:
				message = 'Παρακαλώ συμπλήρωσε το επώνυμο.';
				break;
			case c.checkoutStatus == 23:
				message = 'Παρακαλώ συμπλήρωσε το όνομα.';
				break;
			case c.checkoutStatus == 24:
				message = 'Παρακαλώ συμπλήρωσε τη διεύθυνση.';
				break;
			case c.checkoutStatus == 25:
				message = 'Παρακαλώ συμπλήρωσε το τηλέφωνο.';
				break;
			case c.checkoutStatus == 26:
				message = 'Η επιβεβαίωση τηλεφώνου απετυχε.';
				break;
			case c.checkoutStatus == 27:
				message = 'Παρακαλώ επίλεξε όροφο.';
				break;
			case c.checkoutStatus >= 20 && c.checkoutStatus < 30:
				message = 'Υπήρξε πρόβλημα με το στοιχεία.';
				break;
			case c.checkoutStatus == 32:
				message = 'Το καλάθι είναι άδειο. Επίλεξε προϊόντα.';
				break;
			case c.checkoutStatus == 35:
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

	presentAlert(message: string) {
		let alert = this.alertCtrl.create({
			title: 'Η παραγγελία απέτυχε.',
			subTitle: message,
			buttons: ['OK'],
		});
		alert.present();
	}

	getCartItemOffersProducts(cartItemOffers: CartItemOffer[]): any[] {
		return cartItemOffers.reduce((a, b) => a.concat(b.products), []) as any[];
	}

	getAmountOfCartProducts(cart: CartViewModel): number {
		var items: number = cart.cartItems.reduce((a, b) => a + b.quantity, 0);
		var itemOffers: number = cart.cartItemOffers.reduce((a, b) => a + b.products.reduce((a, b) => a + b.quantity, 0), 0);

		return items + itemOffers;
	}

	showConfirmationLoading() {
		let loading = this.loadingCtrl.create({
		  spinner: 'hide',
		  content: `<img src="../../assets/imgs/spinner.gif">
					<br />
					<p>Επιβεβαίωση από κατάστημα<p>`,
		  duration: 5000
		});
	  
		loading.onDidDismiss(() => {
		  console.log('Dismissed loading');
		});
	  
		loading.present();
	  }
}
