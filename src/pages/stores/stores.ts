import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { StoreApi } from 'models/Api/Store';
import { StoreProvider } from '../../providers/store/store';
import { TagLevel, Product_TagApi } from '../../models/api/Product_tag';

@IonicPage()
@Component({
  selector: 'page-stores',
  templateUrl: 'stores.html',
})
export class StoresPage {
  stores: StoreApi[];
  initialStores: StoreApi[];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public storeProvider: StoreProvider) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad StoresPage');
  }

  ngOnInit() {
    this.getStores();
  }

  getStores(): void {
    this.storeProvider.find().subscribe(s => {
      this.initialStores = s;
      this.stores = s;
    });
  }
  
  navigateToStorePage(store: StoreApi) {
    this.navCtrl.push('StorePage', {storeId: store.bid});
  }

  openFilters() {

    let cuisines = this.initialStores.map(
      a => a.Product_Tags
    ).reduce(
      (a, b) => a.concat(b)
    );
    cuisines = cuisines.filter(
      (pt) => pt.level == TagLevel.Cuisine
    );
    cuisines = cuisines.filter(
      (obj, pos, arr) => arr.map(mapObj => mapObj.Tag.name).indexOf(obj.Tag.name) === pos
    );


    let filtersModal = this.modalCtrl.create('FiltersPage', {cuisines: cuisines});
    filtersModal.onDidDismiss(this.onFilterModalDidDismiss.bind(this));
    filtersModal.present();
  }

  searchStores(event: any) {
    let val = event.target.value;
    if (val && val.trim() != '') {
      this.stores = this.initialStores.filter((s) => {
        return (s.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.stores = this.initialStores;
    }
  }

  onFilterModalDidDismiss(bid: number) {
    if (bid === 0) {
      return false;
    } 
    this.stores = this.initialStores.filter(s => {
      return s.Product_Tags.filter( t => t.Tag.bid === bid).length > 0;
    });
  }

}
