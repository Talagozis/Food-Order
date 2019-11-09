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

	public primaryPages: { title: string, component: any, icon: string }[];
	public secondaryPages: { title: string, component: any, icon: string }[];


	constructor(private platform: Platform, private statusBar: StatusBar, public splashScreen: SplashScreen, private analyticsProvider: AnalyticsProvider) {
		this.initializeApp();

		console.debug("Environment variables set to: " + ENV.mode);

		// used for an example of ngFor and navigation
		this.primaryPages = [
			{ title: 'Καταστήματα', component: 'StoresPage', icon: 'restaurant' },
			{ title: 'Πολιτική Απορρήτου', component: 'PrivacyPolicyPage', icon: 'document' }
		];

		this.secondaryPages = [
			{ title: "version: 191109.1648", component: undefined, icon: '' },
		];
	}

	async ngAfterViewInit() {
		await this.analyticsProvider.startTrackerWithId(ENV.GOOGLE_ANALYTICS_TRACKING_ID);
		// this.nav.viewDidEnter.subscribe(view => {
		// 	this.analyticsProvider.trackView(view.instance.constructor.name);
		// });
	}

	private async initializeApp() {
		await this.platform.ready();
		// Okay, so the platform is ready and our plugins are available.
		// Here you can do any higher level native things you might need.
		this.statusBar.styleDefault();
		this.splashScreen.hide();
	}

	public async openPage(page) {
		// Reset the content nav to have just this page
		// we wouldn't want the back button to show in this scenario
		if (page.component) {
			await this.nav.setRoot(page.component);
		}
	}
}
