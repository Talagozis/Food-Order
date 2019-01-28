import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ENV } from '@app/env'
import { AnalyticsProvider } from '../providers/analytics/analytics';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage: any = HomePage;

	primaryPages: Array<{ title: string, component: any, icon: string }>;
	secondaryPages: Array<{ title: string, component: any, icon: string }>;


	constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public analyticsProvider: AnalyticsProvider) {
		this.initializeApp();

		console.log("Environment variables set to: " + ENV.mode);

		// used for an example of ngFor and navigation
		this.primaryPages = [
			{ title: 'Καταστήματα', component: 'StoresPage', icon: 'restaurant' }
		];

		this.secondaryPages = [
			{ title: 'Πολιτική Απορρήτου', component: 'PrivacyPolicyPage', icon: 'document' },
			{ title: ENV.mode + " v:190128", component: '', icon: '' },
			
		];
	}

	ngAfterViewInit() {
		this.analyticsProvider.startTrackerWithId(ENV.GOOGLE_ANALYTICS_TRACKING_ID).then(() => {
			// this.nav.viewDidEnter.subscribe(view => {
			// 	this.analyticsProvider.trackView(view.instance.constructor.name);
			// });
		});
	}

	initializeApp() {
		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}

	openPage(page) {
		// Reset the content nav to have just this page
		// we wouldn't want the back button to show in this scenario
		this.nav.setRoot(page.component);
	}
}
