import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';

import '../../utils/linqtsExtension';

import { StoreProvider } from '../../providers/store/store';
import { ProductProvider } from '../../providers/Product/product';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { StoreApi } from '../../models/Api/Store';
import { ProductApi } from '../../models/api/Product';
import { CartProvider } from '../../providers/Cart/cart';
import { CartViewModel } from '../../models/ViewModels/CartViewModel';
import { StoreViewModel } from '../../models/ViewModels/StoreViewModel';

@IonicPage({
	name: 'StorePage',
	segment: 'store/:storeSlug',
	defaultHistory: ['StoresPage']
})
@Component({
	selector: 'page-store',
	templateUrl: 'store.html',
})
export class StorePage {
	storeSegment: string = "catalog";
	store: StoreViewModel;
	categories: any[];
	cart: CartViewModel;

	constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public storeProvider: StoreProvider, public productProvider: ProductProvider, public loadingCtrl: LoadingController, public cartProvider: CartProvider, private analyticsProvider: AnalyticsProvider) {
		this.store = new StoreViewModel({ cover: "", minOrderCost: 0 });
	}

	ionViewDidEnter() {
		var storeSlug = this.navParams.get('storeSlug');
		this.analyticsProvider.trackView("/store/" + storeSlug);
	}

	async ionViewDidLoad(): Promise<void> {
		let loader = this.loadingCtrl.create({
			content: "Φόρτωση καταστήματος"
		});
		loader.present();

		var storeSlug = this.navParams.get('storeSlug');
		let store: StoreApi = await this.initializeStore(storeSlug);

		await Promise.all([
			this.initializeProducts(store.bid),
			this.initializeCart(store.bid),
		]);

		loader.dismiss();
	}

	async ionViewWillEnter(): Promise<void> {
		await this.initializeCart(this.store.bid);
	}

	initializeProducts(storeBid: number): Promise<void> {
		return this.productProvider.findByStoreBid(storeBid).toPromise().then((p: ProductApi[]) => {
			var products = p.ToList();
			products = products.Where(a => a.isActive);
			products = products.Where(a => a.Product_Tags.filter(b => b.level === 2 || b.level === 3).length > 0);
			products = products.OrderBy(a => a.orderNumber);
			var categories = products.GroupBy(a =>
				a.Product_Tags
					.filter(b => b.level === 2 || b.level === 3)
					.sort(b => b.level === 3 ? 1 : b.level === 2 ? -1 : 0)[0].Tag.name, b => b
			);
			this.categories = Object.keys(categories).map((tagName: string) => {
				let category = categories[tagName]
					.sort((a, b) => a.orderNumber === null || (b.orderNumber !== null && a.orderNumber > b.orderNumber) ? 1 : -1);
				category.key = tagName;
				return category;
			});
		});
	}

	async initializeStore(storeSlug: string): Promise<StoreApi> {
		let store = await this.storeProvider.findBySlug(storeSlug);
		this.store = new StoreViewModel({ ...store });
		return store;
	}

	initializeCart(storeBid: number): Promise<void> {
		return this.cartProvider.getByStoreBid(storeBid).then((cart: CartViewModel) => {
			this.cart = cart;
		});
	}

	toggleSection(i) {
		this.categories[i].open = !this.categories[i].open;
	}

	getBackgroundStyle(imagepath){
		return {
			'background-image': 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.7) 80%), url(' + imagepath + ')',
			'background-position': 'center center',
			'background-size': 'cover',
		};
	}

	openModal(product) {
		let productModal = this.modalCtrl.create('ProductModalPage', { storeBid: this.store.bid, product: product });
		productModal.onDidDismiss(this.onProductModalDidDismiss.bind(this));
		productModal.present();
	}

	async onProductModalDidDismiss(data: any): Promise<void> {

		if (!data.isAdded)
			return;
		
		let loader = this.loadingCtrl.create({
			content: "Φόρτωση καταστήματος"
		});
		loader.present();

		var storeBid = this.store.bid;

		await Promise.all([
			this.initializeProducts(storeBid),
			this.initializeCart(storeBid),
		]);

		loader.dismiss();
	}

	navigateToCheckoutPage() {
		this.navCtrl.push('CheckoutPage', { storeSlug: this.store.slug });
	}
}