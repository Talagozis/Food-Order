import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { OrderProvider } from '../../providers/Order/order';
import { CheckoutRpcResponse } from '../../models/Request/CheckoutRpcResponse';
import { ResponseStatus } from '../../models/Request/Response';
import { CheckoutRpc } from '../../models/Rpc/Checkout';
import { Cart } from '../../models/Entities/Cart';
import { StoreApi } from '../../models/api/Store';
import { StoreProvider } from '../../providers/store/store';
import { OrderDetails } from '../../models/Entities/Checkout';

@IonicPage()
@Component({
	selector: 'page-checkout',
	templateUrl: 'checkout.html',
})
export class CheckoutPage {
	store: StoreApi;
	cart: Cart;

	totalCartPrice: number;
	showCartDetails: boolean;
	canSendOrder: boolean;

	orderDetails: OrderDetails;

	constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public storeProvider: StoreProvider, public orderProvider: OrderProvider) {
		this.showCartDetails = false;
		this.totalCartPrice = 0.00;
		this.canSendOrder = false;

		var storeBid = this.navParams.get('storeId');
		this.storeProvider.findOne(storeBid).subscribe((s: StoreApi) => {
			this.store = s;

			this.storage.get('carts').then((carts: Cart[]) => {

				if (!carts) {
					console.log("carts from storage is undefined or null");
					return;
				}

				let cart = carts.find(a => a.Store.bid === this.store.bid);
				if (!cart) {
					console.log("no cart for this store");
					return;
				}

				this.cart = cart;

				// if(!cart.Store || (cart.productsDetails.length === 0 && cart.offersDetails.length === 0)) { // add all checks here
				// 	console.log("criteria for order are not meet");
				// 	return;
				// }

				this.canSendOrder = true;
			});


		});



	}

	ionViewDidLoad() {
		// console.log('ionViewDidLoad CheckoutPage');
	}

	toggleSectionCartDetails(i) {
		this.showCartDetails = !this.showCartDetails;
	}

	sendOrder(): void {

		let checkoutRpc: CheckoutRpc = {
			...this.cart,
			date: new Date(),
			orderDetails: {
				...this.orderDetails,
				isTakeAway: false,
				info: "\$test",
			},

		};

		this.orderProvider.checkout(checkoutRpc).subscribe((c: CheckoutRpcResponse) => {

			if (!c || c.status !== ResponseStatus.Success) {
				console.log(c);
				console.log("ResponseStatus: " + c.status);
				return;
			}

			this.storage.clear();

			this.navCtrl.setRoot('ThankYouPage');
		});

	}

}
