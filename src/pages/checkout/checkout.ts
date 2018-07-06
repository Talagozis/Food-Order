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

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.storage.get('cart').then((c: CartItem[]) => {
			this.cartItems = c;
		});
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CheckoutPage');
  }

}
