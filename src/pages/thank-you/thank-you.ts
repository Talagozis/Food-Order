import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { StoreViewModel } from '../../models/ViewModels/StoreViewModel';
import { StoreProvider } from '../../providers/store/store';


@IonicPage({
	name: 'ThankYouPage',
	segment: 'thank-you/:storeSlug',
})
@Component({
	selector: 'page-thank-you',
	templateUrl: 'thank-you.html',
})
export class ThankYouPage {

	store: StoreViewModel;

	constructor(public navCtrl: NavController, public navParams: NavParams, public storeProvider: StoreProvider, private analyticsProvider: AnalyticsProvider) {
	}

	ionViewDidEnter() {
		const storeSlug = this.navParams.get('storeSlug');
		this.analyticsProvider.trackView("/thank-you/" + storeSlug);
	}

	ionViewDidLoad(): void {
		const storeSlug = this.navParams.get('storeSlug');
		this.storeProvider.findBySlug(storeSlug).then(s => {
			this.store = new StoreViewModel({ ...s });
		});
	}

	handleNavigateToStoresPage(): void {
		this.navCtrl.setRoot('StoresPage');
	}

}
