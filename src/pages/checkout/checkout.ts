import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CartItem } from 'models/Api/CartItem';

@IonicPage()
@Component({
	selector: 'page-checkout',
	templateUrl: 'checkout.html',
})
export class CheckoutPage {
	cartItems: CartItem[];
	totalCartPrice: number;
	cartDetails: boolean;
	canSendOrder: boolean;

	constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
		this.cartDetails = false;
		this.totalCartPrice = 0.00;
		this.storage.get('cart').then((c: CartItem[]) => {
			this.canSendOrder = true;
			if (c || c.length === 0)
				this.canSendOrder = false;
			this.cartItems = c;
		});
	}

	ionViewDidLoad() {
		// console.log('ionViewDidLoad CheckoutPage');
	}

	toggleSectionCartDetails(i) {
		this.cartDetails = !this.cartDetails;
	}

	sendOrder() {
		//send order


		this.storage.clear();

		this.navCtrl.setRoot('ThankYouPage');
	}

}
