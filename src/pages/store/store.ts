import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StoreApi } from 'models/Api/Store';
import { StoreProvider } from '../../providers/store/store';

@IonicPage()
@Component({
  selector: 'page-store',
  templateUrl: 'store.html',
})
export class StorePage {
  storeSegment: string = "catalog";
  store: StoreApi;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storeProvider: StoreProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StorePage');
  }

  ngOnInit() {
    this.getStore();
  }

  getStore(): void {
    var storeId = this.navParams.get('storeId');
    this.storeProvider.findOne(storeId).subscribe(s => this.store = s);
  }
}
