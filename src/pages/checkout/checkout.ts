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
import { CartViewModel } from '../../models/ViewModels/CartViewModel';
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
		this.showCartDetails = false;
		this.totalCartPrice = 0.00;
		this.canSendOrder = false;
		this.orderDetails = { 
			customerSurname: "test", // den doulebei
			customerForename: "",
			customerAddressLine: "",
			customerPhoneNumber: "",
			customerPhoneNumberConfirm: "",
			customerDoorName: "",
			customerFloorNumber: "",
			isTakeAway: false,
			info: "",
		};

		var storeBid = this.navParams.get('storeId');
		this.storeProvider.findOne(storeBid).subscribe((s: StoreApi) => {
			this.store = s;

			this.cartProvider.getByStoreBid(s.bid).then((cart: CartViewModel) => {

				this.cart = cart;

				// if(!cart.Store || (cart.productsDetails.length === 0 && cart.offersDetails.length === 0)) { // add all checks here
				// 	console.log("criteria for order are not meet");
				// 	return;
				// }

				this.canSendOrder = true;
			});
		});
	}

	ionViewDidLoad() { }

	toggleSectionCartDetails(i) {
		this.showCartDetails = !this.showCartDetails;
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
				console.log(c);
				console.log("ResponseStatus: " + c.status);
				this.presentAlert(c);
				return;
			}

			this.cartProvider.clearCartItem(this.store.bid);
			this.cartProvider.clearOffersDetails(this.store.bid);

			this.navCtrl.setRoot('ThankYouPage');
		});

	}

	presentAlert(c: CheckoutRpcResponse) {
		let alert = this.alertCtrl.create({
			title: 'Order',
			subTitle: c.checkoutStatus.toString(),
			buttons: ['OK']
		});
		alert.present();
	}

}
