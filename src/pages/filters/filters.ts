import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Product_TagApi } from 'models/Api/Product_Tag';
import { BindingFlags } from '@angular/compiler/src/core';

@IonicPage()
@Component({
  selector: 'page-filters',
  templateUrl: 'filters.html',
})
export class FiltersPage {
  cuisines: Product_TagApi[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
  }

  ngOnInit() {
    this.cuisines = this.navParams.get('cuisines');
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad FiltersPage');
  }

  // closeFilters() {
  //   this.view.dismiss();
  // }

  filterCuisine(bid: number) {
    this.view.dismiss(bid);
  }

}
