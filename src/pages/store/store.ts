import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';

import '../../utils/linqtsExtension';

import { StoreApi } from '../../models/Api/Store';
import { StoreProvider } from '../../providers/store/store';
import { ProductProvider } from '../../providers/Product/product';
import { ProductApi } from '../../models/api/Product';

@IonicPage()
@Component({
	selector: 'page-store',
	templateUrl: 'store.html',
})
export class StorePage {
	storeSegment: string = "catalog";
	store: StoreApi;
	categories: any[];

	constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public storeProvider: StoreProvider, public productProvider: ProductProvider, public loadingCtrl: LoadingController) {
	}

	ionViewDidLoad() {
		let loader = this.loadingCtrl.create({
			content: "Προϊόντα καταστήματος"
		});  
		loader.present();
		  
		var storeBid = this.navParams.get('storeId');

		this.storeProvider.findOne(storeBid).subscribe((s: StoreApi) => {
			this.store = s;
		});

		this.productProvider.findByStoreBid(storeBid).subscribe((p: ProductApi[]) => {
			var products = p.ToList();
			products = products.Where(a => a.isActive);
			products = products.Where(a => a.Product_Tags.filter(b => b.level === 2 || b.level === 3).length > 0);
			products = products.OrderBy(a => a.orderNumber);
			var categories = products.GroupBy(a =>
				a.Product_Tags
					.filter(b => b.level === 2 || b.level === 3)
					.sort(b => b.level === 3 ? 1 : b.level === 2 ? -1 : 0)[0].Tag.name, b => b
			);
			this.categories = Object.keys(categories).map(function (tagName) {
				let category = categories[tagName]
					.sort((a, b) => a.orderNumber === null || (b.orderNumber !== null && a.orderNumber > b.orderNumber) ? 1 : -1);
				category.key = tagName;
				return category;
			});
			loader.dismiss();
		});
	}

	ngOnInit() {}

	
	toggleSection(i) {
		this.categories[i].open = !this.categories[i].open;
	}

	openModal(product) {
		let productModal = this.modalCtrl.create('ProductModalPage', {storeBid: this.store.bid, product: product });
		productModal.onDidDismiss(this.onProductModalDidDismiss.bind(this));
		productModal.present();
	}

	onProductModalDidDismiss(): void {
		// if (!bids) {
		// 	return;
		// }
		// this.selectedCuisineBids = bids;
		// if (bids.length == 0) {
		// 	this.stores = this.initialStores;
		// 	return;
		// }
		// this.stores = this.initialStores.filter(s => {
		// 	return s.Product_Tags.filter(t => bids.indexOf(t.Tag.bid) > -1).length > 0;
		// });
	}

	navigateToCheckoutPage() {
		this.navCtrl.push('CheckoutPage', { storeId: this.store.bid });
	}
}