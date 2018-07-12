import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CartProvider } from '../../providers/Cart/cart';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	background: string;

	constructor(public navCtrl: NavController, public cartProvider: CartProvider) {
	}

	ionViewDidLoad() {
		this.background = this.chooseBackground();
		this.cartProvider.clearCarts();
	}

	chooseBackground() {
		var date = new Date();
		if (date.getHours() >= 5 && date.getHours() <= 12) {
			return 'background-coffee';
		}
		return 'background-meal';
	}

	navigateToStoresPage() {
		this.navCtrl.setRoot('StoresPage');
	}

}
