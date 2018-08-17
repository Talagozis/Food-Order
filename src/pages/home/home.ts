import { Component } from '@angular/core';
import { NavController, Refresher, LoadingController } from 'ionic-angular';

import { CartProvider } from '../../providers/Cart/cart';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { OfferSchedulerProvider } from '../../providers/OfferScheduler/offerScheduler';
import { OfferSchedulerApi } from 'models/Api/OfferSchedulerApi';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	background: string;
	liveDeals: OfferSchedulerApi[];

	constructor(public navCtrl: NavController, public cartProvider: CartProvider, public offerSchedulerProvider: OfferSchedulerProvider, private analyticsProvider: AnalyticsProvider, public loadingCtrl: LoadingController) {
	}

	ionViewDidEnter() {
		this.analyticsProvider.trackView("/");
	}

	ionViewDidLoad() {
		this.background = this.chooseBackground();
		this.cartProvider.clearCarts();
		this.offerSchedulerProvider.getLive().subscribe((os) => {
			this.liveDeals = os.slice(0, 3); // <= add order and ranking
		});
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

	chooseBackground(): string  {
		var date = new Date();
		if (date.getHours() >= 5 && date.getHours() <= 12) {
			return 'background-coffee';
		}
		return 'background-meal';
	}

	navigateToStoresPage() {
		this.navCtrl.setRoot('StoresPage');
	}

}
