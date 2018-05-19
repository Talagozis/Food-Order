import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Product_TagApi, TagLevel } from 'models/Api/Product_Tag';
import { BindingFlags } from '@angular/compiler/src/core';
import { TagApi } from '../../models/api/Tag';

@IonicPage()
@Component({
  selector: 'page-filters',
  templateUrl: 'filters.html',
})
export class FiltersPage {
  filterViewModels: FilterViewModel[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
  }

  ngOnInit() {
    this.filterViewModels = this.navParams.get('filterViewModels');
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad FiltersPage');
  }

  closeFilters() {
    this.view.dismiss(undefined);
  }

  filterCuisine(bid: number) {
    this.view.dismiss(bid);
  }

}

export interface FilterViewModel {
  Tag: TagApi;
  // level: TagLevel;
  isChecked: boolean;
}