import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { StoreApi } from 'models/Api/Store';
import { StoreProvider } from '../../providers/store/store';
import { TagLevel } from '../../models/api/Product_tag';
import { FilterViewModel } from '../filters/filters';

@IonicPage()
@Component({
	selector: 'page-stores',
	templateUrl: 'stores.html',
})
export class StoresPage {
	stores: StoreApi[];
	initialStores: StoreApi[];
	selectedCuisineBids: number[] = [];

	constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public storeProvider: StoreProvider) {
	}

	ionViewDidLoad() {
		// console.log('ionViewDidLoad StoresPage');
	}

	ngOnInit() {
		this.getStores();
	}

	getStores(): void {
		this.storeProvider.findAllAvailable(s => {
			this.initialStores = s;
			this.stores = s;
		});
	}

	navigateToStorePage(store: StoreApi) {
		this.navCtrl.push('StorePage', { storeId: store.bid });
	}

	openFilters() {
		let cuisines = this.initialStores.map(
			a => a.Product_Tags
		).reduce(
			(a, b) => a.concat(b)
			).filter(
			(pt) => pt.level == TagLevel.Cuisine
			).filter(
			(obj, pos, arr) => arr.map(mapObj => mapObj.Tag.name).indexOf(obj.Tag.name) === pos
			);

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
			this.stores = this.initialStores.filter((s) => {
				return (s.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
			})
		} else {
			this.stores = this.initialStores;
		}
	}

	onFilterModalDidDismiss(bids: number[]): void {
		if (!bids) {
			return;
		}
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
