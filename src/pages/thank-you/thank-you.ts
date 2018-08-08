import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AnalyticsProvider } from '../../providers/analytics/analytics';


@IonicPage()
@Component({
  selector: 'page-thank-you',
  templateUrl: 'thank-you.html',
})
export class ThankYouPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private analyticsProvider: AnalyticsProvider) {
  }

  ionViewDidEnter() {
		this.analyticsProvider.trackView("/thank-you");
	}

}
