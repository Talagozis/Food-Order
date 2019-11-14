import { Injectable } from '@angular/core';
import { CartViewModel, CartItemViewModel } from 'models/ViewModels/CartViewModel';
import { StoreApi } from 'models/Api/Store';

// declare 

@Injectable()
export class Analytics2Provider {
	constructor() { }

	public async startTrackerWithId(id: string): Promise<void> {
		var ga: Function;
		this.functionD(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

		ga('create', {
			storage: 'none',
			trackingId: id,
			clientId: localStorage.getItem('ga:clientId')
		});
		ga('set', 'checkProtocolTask', null);
		ga('set', 'transportUrl', 'https://www.google-analytics.com/collect');
		ga('require', 'ecommerce');
		ga((tracker) => {
			if (!localStorage.getItem('ga:clientId')) {
				localStorage.setItem('ga:clientId', tracker.get('clientId'));
			}
		});

	}

	public trackView(screenName: string): void {
		ga('set', 'page', screenName);
		ga('send', 'pageview');
	}

	public trackEvent(category, action, label?, value?): void {
		ga('send', 'event', {
			eventCategory: category,
			eventLabel: label,
			eventAction: action,
			eventValue: value
		});
	}

	public trackPurchase(transactionΙd: string, totalPrice: number, store: StoreApi, cart: CartViewModel): void {
		ga('event', 'purchase', {
			transaction_id: transactionΙd,
			affiliation: "mobile.serresdelivery.gr",
			value: totalPrice,
			currency: "EUR",
			items: cart.cartItems.concat(cart.cartItemOffers.reduce<CartItemViewModel[]>((a, b) => b.products.concat(a), [])).map(a => ({
				id: a.bid,
				name: a.name,
				brand: store.name,
				category: "Food",
				quantity: a.quantity,
				price: a.totalPrice
			}))
		});
	}

	private functionD(window: Window, document: Document, stript: string, url: string, ga: string, a?, m?) {
		window['GoogleAnalyticsObject'] = ga;
		window[ga] = window[ga] || function () {
			(window[ga].q = window[ga].q || []).push(arguments);
		};
		window[ga].l = new Date();
		a = document.createElement(stript);
		m = document.getElementsByTagName(stript)[0];
		a.async = 1;
		a.src = url;
		m.parentNode.insertBefore(a, m);
	}

}
