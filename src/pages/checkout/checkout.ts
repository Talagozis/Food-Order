import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { OrderProvider } from '../../providers/Order/order';
import { CheckoutRpcResponse } from '../../models/Request/CheckoutRpcResponse';
import { ResponseStatus } from '../../models/Request/Response';
import { CheckoutRpc } from '../../models/Rpc/Checkout';
import { StoreApi } from '../../models/api/Store';
import { StoreProvider } from '../../providers/store/store';
import { OrderDetails } from '../../models/Entities/Checkout';
import { CartProvider } from '../../providers/Cart/cart';
import { CartViewModel, CartItemViewModel } from '../../models/ViewModels/CartViewModel';
import { AspNetUserDetails } from '../../models/Entities/Cart';

@IonicPage()
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

	constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private cartProvider: CartProvider, public storeProvider: StoreProvider, public orderProvider: OrderProvider) {
	}

	// ionViewCanLeave() {
	// 	let getStores = this.navParams.get('onDismiss');
	// 	getStores();
	// }

	ionViewDidLoad() {
		var storeBid = this.navParams.get('storeId');

		this.showCartDetails = false;
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
			isTakeAway: false,
			info: "",
		};

		this.storeProvider.findOne(storeBid).subscribe((s: StoreApi) => {
			this.store = s;

			this.cartProvider.getByStoreBid(s.bid).then((cart: CartViewModel) => {

				this.cart = cart;

				// if(!cart.Store || (cart.productsDetails.length === 0 && cart.offersDetails.length === 0)) { // <==  add all checks here
				// 	console.log("criteria for order are not meet");
				// 	return;
				// }
				
				this.canSendOrder = true;
			});
		});
	}

	toggleSectionCartDetails(i) {
		this.showCartDetails = !this.showCartDetails;
	}

	removeCartItem(cartItem: CartItemViewModel) {
		this.cartProvider.removeCartItem(this.store.bid, cartItem)
			.then(c => { this.cart = c });
	}

	sendOrder(): void {
		let checkoutRpc: CheckoutRpc = new CheckoutRpc(this.cart);
		checkoutRpc.orderDetails = {
			...this.orderDetails,
			isTakeAway: false,
			info: "\$test",
		};
		checkoutRpc.AspNetUser = { // test user
			bid: 0
		} as AspNetUserDetails;
		checkoutRpc.Store = { // test store
			bid: 4134222481
		} as AspNetUserDetails;
		checkoutRpc.sessionDetals = {}

		this.orderProvider.checkout(checkoutRpc).subscribe((c: CheckoutRpcResponse) => {

			if (!c || c.status !== ResponseStatus.Success) {
				this.handleOrderFailureMessage(c);
				return;
			}

			this.cartProvider.clearCartItem(this.store.bid);
			this.cartProvider.clearCartItemOffer(this.store.bid);

			this.navCtrl.setRoot('ThankYouPage');
		});

	}

	handleOrderFailureMessage(c: CheckoutRpcResponse) { // <= More detailed messages
		let message = '';
		if (c.checkoutStatus >= 10 && c.checkoutStatus <= 16) {
			message = 'Υπήρξε πρόβλημα με το κατάστημα.';
		} else if (c.checkoutStatus >= 20 && c.checkoutStatus <= 27) {
			message = 'Υπήρξε πρόβλημα με τα στοιχεία σας.';
		} else if (c.checkoutStatus >= 30 && c.checkoutStatus <= 35) {
			message = 'Υπήρξε πρόβλημα με τα προϊόντα του καλαθιού.';
		} else {
			message = 'Υπήρξε κάποιο πρόβλημα.';
		}
		this.presentAlert(message);
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

}
