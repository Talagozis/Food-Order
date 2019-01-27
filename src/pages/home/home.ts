import { Component } from '@angular/core';
import { NavController, Refresher, LoadingController } from 'ionic-angular';

import { CartProvider } from '../../providers/Cart/cart';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { OfferSchedulerProvider } from '../../providers/OfferScheduler/offerScheduler';
import { OfferProvider } from '../../providers/Offer/offer';
import { StoreApi } from '../../models/api/Store';
import { OfferApi } from '../../models/Api/Offer';
import { OfferViewModel } from '../../models/ViewModels/OfferViewModel';
import { OfferGroupViewModel } from '../../models/ViewModels/OfferGroupViewModel';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	background: string;
	// liveDeals: OfferSchedulerApi[];
	liveDeals: OfferViewModel[];

	constructor(public navCtrl: NavController, public cartProvider: CartProvider, public offerProvider: OfferProvider, public offerSchedulerProvider: OfferSchedulerProvider, private analyticsProvider: AnalyticsProvider, public loadingCtrl: LoadingController) {
	}

	ionViewDidEnter() {
		this.analyticsProvider.trackView("/");
	}

	ionViewDidLoad() {
		this.background = this.chooseBackground();
		this.cartProvider.clearCarts();

		this.offerProvider.findLiveDeals(undefined, (offers: OfferApi[]) => {
			this.liveDeals = offers.map(a => new OfferViewModel({
				...a,
				OfferGroups: a.OfferGroups.map(b => new OfferGroupViewModel({
					...b,
					Offer: undefined,
					Products: undefined
				})),
			})).slice(0, 3);
		});

		// this.offerSchedulerProvider.getLive().subscribe((os) => {
		// 	this.liveDeals = os.slice(0, 3); // <= add order and ranking

		// 	//TODO DELETE THIS
		// 	// this.liveDeals = [
		// 	// 	{
		// 	// 		description: 'test',
		// 	// 		info: 'test',
		// 	// 		isActive: true,
		// 	// 		endDateTime: new Date(2018, 1, 1),
		// 	// 		isArchived: false,
		// 	// 		maxAmount: 10,
		// 	// 		startDateTime: new Date(2018, 1, 1),
		// 	// 		bid: 100,
		// 	// 		usedAmount: 2,
		// 	// 		usedAmountVirtual: 4,
		// 	// 		Offer: {
		// 	// 			bid: 200,
		// 	// 			discount: 3,
		// 	// 			finalPrice: 3,
		// 	// 			isActive: true,
		// 	// 			level: OfferLevel.LiveDeal,
		// 	// 			name: 'test offer',
		// 	// 			totalPrice: 6,
		// 	// 			shortDescription: 'test short description',
		// 	// 			Store: {
		// 	// 				slug: 'prototype',
		// 	// 				bid: 295462762,
		// 	// 				name: 'store name',
		// 	// 				logo: ''
		// 	// 			} as StoreApi
		// 	// 		} as OfferApi
		// 	// 	} as OfferSchedulerApi
		// 	// ];
		// });
	}

	doRefresh(refresher: Refresher) {
		let loader = this.loadingCtrl.create({
			content: "Αναζήτηση προσφορών"
		});
		loader.present();
		this.background = this.chooseBackground();
		this.cartProvider.clearCarts();
		loader.dismiss();
		setTimeout(() => {
			refresher.complete();
		}, 0);
	}

	chooseBackground(): string {
		var date = new Date();
		if (date.getHours() >= 5 && date.getHours() <= 12) {
			return 'background-coffee';
		}
		return 'background-meal';
	}

	navigateToStoresPage() {
		this.navCtrl.setRoot('StoresPage');
	}

	navigateToStorePage(store: StoreApi) {
		this.navCtrl.push('StorePage', { storeSlug: store.slug, });
	}

}
