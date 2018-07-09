import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ENV } from '@app/env'

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	environment: string;
	background: string;

	constructor(public navCtrl: NavController) {
		this.environment = ENV.mode;
		this.background = this.chooseBackground();
	}

	chooseBackground() {
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
