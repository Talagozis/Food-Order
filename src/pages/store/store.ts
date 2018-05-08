import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StoreApi } from 'models/Api/Store';

@IonicPage()
@Component({
  selector: 'page-store',
  templateUrl: 'store.html',
})
export class StorePage {
  storeSegment: string = "catalog";
  store: StoreApi;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.store = this.navParams.get('store');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StorePage');
  }

}
