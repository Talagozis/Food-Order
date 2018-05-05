import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StoreApi } from 'models/Api/Store';
import { StoreProvider } from '../../providers/store/store';

@IonicPage()
@Component({
  selector: 'page-stores',
  templateUrl: 'stores.html',
})
export class StoresPage {
  stores: StoreApi[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storeProvider: StoreProvider) {
    console.log("1");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoresPage');
  }

  ngOnInit() {
    console.log("2");
    this.getStores();
  }

  getStores(): void {
    console.log("3");
    this.storeProvider.find().subscribe(s => this.stores = s);
  }

  navigateToStorePage() {
    this.navCtrl.push('StorePage');

  }

}
