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
import { OfferApi } from '../../models/Api/Offer';
import { OfferProvider } from '../../providers/Offer/offer';
import { OfferViewModel } from '../../models/ViewModels/OfferViewModel';
import { OfferGroupViewModel } from '../../models/ViewModels/OfferGroupViewModel';
import { ProductViewModel } from '../../models/ViewModels/ProductViewModel';
import { Product_AttributeGroupViewModel } from '../../models/ViewModels/Product_AttributeGroupViewModel';
import { Product_AttributeViewModel } from '../../models/ViewModels/Product_AttributeViewModel';
import { Product_IngredientViewModel } from '../../models/ViewModels/Product_IngredientViewModel';
import { Product_AttributeApi } from '../../models/Api/Product_Attribute';
import { Product_IngredientApi } from '../../models/Api/Product_Ingredient';
import { CategoryViewModel } from '../../models/ViewModels/CategoryViewModel';
import { List } from 'linqts';

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
	deals: OfferViewModel[];
	liveDeals: OfferViewModel[];
	categories: CategoryViewModel[];
	categoryDeal: { open: boolean };
	cart: CartViewModel;

	constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public storeProvider: StoreProvider, public productProvider: ProductProvider, public offerProvider: OfferProvider, public loadingCtrl: LoadingController, public cartProvider: CartProvider, private analyticsProvider: AnalyticsProvider) {
		this.store = new StoreViewModel({ cover: "", minOrderCost: 0 });
	}

	ionViewDidEnter() {
		const storeSlug = this.navParams.get('storeSlug');
		this.analyticsProvider.trackView("/store/" + storeSlug);
	}

	async ionViewDidLoad(): Promise<void> {
		const loader = this.loadingCtrl.create({
			content: "Φόρτωση καταστήματος"
		});
		loader.present();

		const storeSlug = this.navParams.get('storeSlug');
		const store: StoreApi = await this.initializeStore(storeSlug);

		await Promise.all([
			this.initializeOffers(store.bid),
			this.initializeProducts(store.bid),
			this.initializeCart(store.bid),
		]);

		loader.dismiss();
	}

	async ionViewWillEnter(): Promise<void> {
		await this.initializeCart(this.store.bid);
	}

	private async initializeOffers(storeBid: number): Promise<void> {
		this.categoryDeal = { open: false };
		await this.offerProvider.findDeals(storeBid, (offers: OfferApi[]) => {
			this.deals = offers.map(a => new OfferViewModel({
				...a,
				OfferGroups: a.OfferGroups.map(b => new OfferGroupViewModel({
					...b,
					Offer: undefined,
					Products: b.Products.map(c => new ProductViewModel({
						...c,
						Product_AttributeGroups: c.Product_AttributeGroups.map(d => new Product_AttributeGroupViewModel({
							...d,
							Product: null,
							Product_Attributes: d.Product_Attributes.sort(this.sortAttributes).map(e => new Product_AttributeViewModel({
								...e,
								Product_AttributeGroup: null
							})),
						})),
						Product_Ingredients: c.Product_Ingredients.sort(this.sortIngredients).map(d => new Product_IngredientViewModel({
							...d,
							Product: null,
						})),
					}))
				})),
			}));
		});

		await this.offerProvider.findLiveDeals(storeBid, (offers: OfferApi[]) => {
			this.liveDeals = offers.map(a => new OfferViewModel({
				...a,
				OfferGroups: a.OfferGroups.map(b => new OfferGroupViewModel({
					...b,
					Offer: undefined,
					Products: b.Products.map(c => new ProductViewModel({
						...c,
						Product_AttributeGroups: c.Product_AttributeGroups.map(d => new Product_AttributeGroupViewModel({
							...d,
							Product: null,
							Product_Attributes: d.Product_Attributes.sort(this.sortAttributes).map(e => new Product_AttributeViewModel({
								...e,
								Product_AttributeGroup: null
							})),
						})),
						Product_Ingredients: c.Product_Ingredients.sort(this.sortIngredients).map(d => new Product_IngredientViewModel({
							...d,
							Product: null,
						})),
					}))
				})),
			}));
		});
	}

	private async initializeProducts(storeBid: number): Promise<void> {
		let products: List<ProductApi> = (await this.productProvider.findByStoreBid(storeBid).toPromise()).ToList();
		products = products.Where(a => a.isActive);
		products = products.Where(a => a.Product_Tags.filter(b => b.level === 2 || b.level === 3).length > 0);
		products = products.OrderBy(a => a.orderNumber);
		const categories = products.GroupBy(a =>
			a.Product_Tags
				.filter(b => b.level === 2 || b.level === 3)
				.sort(b => b.level === 3 ? 1 : b.level === 2 ? -1 : 0)[0].Tag.name, b => b
		);

		this.categories = Object.keys(categories).map((tagName: string) => {
			const category = categories[tagName].sort(this.sortProducts).map((a: ProductApi) => new ProductViewModel({
				...a,
				OfferGroups: null,
				Product_AttributeGroups: a.Product_AttributeGroups.map(d => new Product_AttributeGroupViewModel({
					...d,
					Product: null,
					Product_Attributes: d.Product_Attributes.sort(this.sortAttributes).map(e => new Product_AttributeViewModel({
						...e,
						Product_AttributeGroup: null
					})),
				})),
				Product_Ingredients: a.Product_Ingredients.sort(this.sortIngredients).map(d => new Product_IngredientViewModel({
					...d,
					Product: null,
				})),
			}));
			category.key = tagName;
			return category;
		});
	}

	private async initializeStore(storeSlug: string): Promise<StoreApi> {
		const store = await this.storeProvider.findBySlug(storeSlug);
		this.store = new StoreViewModel({ ...store });
		return store;
	}

	private async initializeCart(storeBid: number): Promise<void> {
		this.cart = await this.cartProvider.getByStoreBid(storeBid);
	}

	toggleSection(i: number) {
		this.categories[i].open = !this.categories[i].open;
	}

	toggleSectionDeal() {
		this.categoryDeal.open = !this.categoryDeal.open;
	}

	getBackgroundStyle(imagepath: string) {
		return {
			'background-image': 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.7) 80%), url(' + imagepath + ')',
			'background-position': 'center center',
			'background-size': 'cover',
		};
	}

	async openModal(product: ProductApi) {
		const productModal = this.modalCtrl.create('ProductModalPage', { storeBid: this.store.bid, product });
		productModal.onDidDismiss(this.onProductModalDidDismiss.bind(this));
		await productModal.present();
	}

	async onProductModalDidDismiss(data: any): Promise<void> {
		if (!data.isAdded) {
			return;
		}

		const loader = this.loadingCtrl.create({
			content: "Φόρτωση καταστήματος"
		});
		loader.present();

		const storeBid = this.store.bid;

		await Promise.all([
			this.initializeOffers(storeBid),
			this.initializeProducts(storeBid),
			this.initializeCart(storeBid),
		]);

		loader.dismiss();
	}

	async openOfferModal(offer: OfferApi) {
		const offerModal = this.modalCtrl.create('OfferModalPage', { storeBid: this.store.bid, offer });
		offerModal.onDidDismiss(this.onOfferModalDidDismiss.bind(this));
		await offerModal.present();
	}

	async onOfferModalDidDismiss(data: any): Promise<void> {
		if (!data.isAdded) {
			return;
		}

		const loader = this.loadingCtrl.create({
			content: "Φόρτωση καταστήματος"
		});
		loader.present();

		const storeBid = this.store.bid;

		await Promise.all([
			this.initializeOffers(storeBid),
			this.initializeProducts(storeBid),
			this.initializeCart(storeBid),
		]);

		loader.dismiss();
	}

	async navigateToCheckoutPage() {
		await this.navCtrl.push('CheckoutPage', { storeSlug: this.store.slug });
	}

	getAmountOfCartProducts(cart: CartViewModel): number {
		const items: number = cart.cartItems.reduce((a, b) => a + b.quantity, 0);
		const itemOffers: number = cart.cartItemOffers.reduce((a, b) => a + b.offerGroups.reduce((c, d) => c + d.product.quantity, 0), 0);

		return items + itemOffers;
	}


	sortProducts(a: ProductApi, b: ProductApi): number {
		return a.orderNumber === null || (b.orderNumber !== null && a.orderNumber > b.orderNumber) ? 1 : -1;
	}

	sortIngredients(a: Product_IngredientApi, b: Product_IngredientApi): number {
		const sumA = (!a.isDefault ? 4 : 0) + (!a.orderNumber ? 2 : 0) + (Number(a.orderNumber) > Number(b.orderNumber) ? 1 : 0);
		const sumB = (!b.isDefault ? 4 : 0) + (!b.orderNumber ? 2 : 0) + (Number(b.orderNumber) > Number(a.orderNumber) ? 1 : 0);

		return sumA > sumB ? 1 : (sumA < sumB ? -1 : 0);
	}

	sortAttributes(a: Product_AttributeApi, b: Product_AttributeApi): number {
		const sumA = (!a.isDefault ? 4 : 0) + (!a.orderNumber ? 2 : 0) + (Number(a.orderNumber) > Number(b.orderNumber) ? 1 : 0);
		const sumB = (!b.isDefault ? 4 : 0) + (!b.orderNumber ? 2 : 0) + (Number(b.orderNumber) > Number(a.orderNumber) ? 1 : 0);

		return sumA > sumB ? 1 : (sumA < sumB ? -1 : 0);
	}
}
