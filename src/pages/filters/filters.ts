import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
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

  clearFilters() {
    this.view.dismiss([]);
  }

  closeFilters() {
    this.view.dismiss(undefined);
  }

  filterCuisine() {
    let bids = [];
    for (let filterViewModel of this.filterViewModels) {
      if (filterViewModel.isChecked) {
        bids.push(filterViewModel.Tag.bid);
      }
    }
    this.view.dismiss(bids);
  }

}

export interface FilterViewModel {
  Tag: TagApi;
  // level: TagLevel;
  isChecked: boolean;
}