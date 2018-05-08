import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { StoreApi } from 'models/Api/Store';
import { StoreProvider } from '../../providers/store/store';

@IonicPage()
@Component({
  selector: 'page-stores',
  templateUrl: 'stores.html',
})
export class StoresPage {
  stores: StoreApi[];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public storeProvider: StoreProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoresPage');
  }

  ngOnInit() {
    this.getStores();
  }

  getStores(): void {
    this.storeProvider.find().subscribe(s => this.stores = s);
  }

  navigateToStorePage(store: StoreApi) {
    this.navCtrl.push('StorePage', {storeId: store.bid});

  }

  openFilters() {
    const filtersModal = this.modalCtrl.create('FiltersPage');
    filtersModal.present();
  }

}
