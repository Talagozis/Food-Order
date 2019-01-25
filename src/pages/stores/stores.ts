import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Refresher, LoadingController } from 'ionic-angular';

import '../../utils/linqtsExtension';

import { StoreApi } from '../../models/Api/Store';
import { HubUserApi } from '../../models/api/HubUser';
import { Product_TagApi, TagLevel } from "../../models/Api/Product_Tag2";
import { StoreProvider } from '../../providers/store/store';
import { HubUserProvider } from '../../providers/HubUser/hubUser';
import { AnalyticsProvider } from '../../providers/analytics/analytics';

import { FilterViewModel } from '../filters/filters';
import { StoreViewModel } from '../../models/ViewModels/StoreViewModel';

@IonicPage()
@Component({
	selector: 'page-stores',
	templateUrl: 'stores.html',
})
export class StoresPage {
	stores: StoreViewModel[];
	initialStores: StoreViewModel[];
	selectedCuisineBids: number[] = [];

	constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public storeProvider: StoreProvider, public hubUserProvider: HubUserProvider, public loadingCtrl: LoadingController, private analyticsProvider: AnalyticsProvider) {
	}

	ionViewDidEnter() {
		this.analyticsProvider.trackView("/stores");
	}

	ionViewDidLoad() {
		this.getStores();
	}

	doRefresh(refresher: Refresher) {
		this.getStores();
		setTimeout(() => {
			refresher.complete();
		}, 0);
	}

	getStores(): void {
		let loader = this.loadingCtrl.create({
			content: "Αναζήτηση καταστημάτων"
		});
		loader.present();
		this.storeProvider.findAllAvailable(async (s: StoreApi[]) => {

			let hubUsers: HubUserApi[] = await this.hubUserProvider.find().toPromise();

			let storeViewModels: StoreViewModel[] = s.map(a => new StoreViewModel({
				...a,
				isHubConnected: hubUsers.filter(b => a.AspNetUsers.filter(c => b.bid === c.bid).length > 0).length > 0,
			}));

			storeViewModels = storeViewModels.ToList().OrderBy(a => !a.isHubConnected).ThenBy(a => Math.random()).ToArray();

			// storeViewModels = storeViewModels.sort((a, b) => {

			// 	if (a.isHubConnected < b.isHubConnected)
			// 		return 1;
			// 	if (a.isHubConnected > b.isHubConnected)
			// 		return -1;

			// 	return 0.5 - Math.random()
			// });

			this.initialStores = storeViewModels;
			this.stores = storeViewModels;
			loader.dismiss();
		});
	}

	navigateToStorePage(store: StoreApi) {
		this.navCtrl.push('StorePage', { storeSlug: store.slug, });
	}

	openFilters() {
		let cuisines: Product_TagApi[] = this.initialStores.map(a => a.Product_Tags)
		.reduce((a: Product_TagApi[], b: Product_TagApi[]) => a.concat(b), [])
		.filter(pt => pt.level === TagLevel.Cuisine)
		.filter((obj, pos, arr) => arr.map(mapObj => mapObj.Tag.name).indexOf(obj.Tag.name) === pos);

		let filterViewModels = cuisines.map<FilterViewModel>(a => ({
			Tag: a.Tag,
			isChecked: this.selectedCuisineBids.indexOf(a.Tag.bid) > -1
		}))

		let filtersModal = this.modalCtrl.create('FiltersPage', { filterViewModels: filterViewModels });
		filtersModal.onDidDismiss(this.onFilterModalDidDismiss.bind(this));
		filtersModal.present();
	}

	searchStores(event: any) {
		let val = event.target.value;
		if (val && val.trim() != '') {
			this.stores = this.initialStores.filter((s) => s.name.toLowerCase().indexOf(val.toLowerCase()) > -1)
		} else {
			this.stores = this.initialStores;
		}
	}

	onFilterModalDidDismiss(bids: number[]): void {
		if (!bids)
			return;

		this.selectedCuisineBids = bids;
		if (bids.length == 0) {
			this.stores = this.initialStores;
			return;
		}
		this.stores = this.initialStores.filter(s => {
			return s.Product_Tags.filter(t => bids.indexOf(t.Tag.bid) > -1).length > 0;
		});
	}

}
