import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AnalyticsProvider } from '../../providers/analytics/analytics';

@IonicPage()
@Component({
  selector: 'page-privacy-policy',
  templateUrl: 'privacy-policy.html',
})
export class PrivacyPolicyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private analyticsProvider: AnalyticsProvider) {
  }

  ionViewDidEnter() {
		this.analyticsProvider.trackView("/privacy-policy");
	}

}
