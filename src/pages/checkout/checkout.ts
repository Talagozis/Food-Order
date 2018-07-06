import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  // cartItems: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    // this.cartItems = this.storage.get('cart');
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CheckoutPage');
  }

}
