import { Injectable } from '@angular/core';
import { CartViewModel, CartItemViewModel } from 'models/ViewModels/CartViewModel';
import { StoreApi } from 'models/Api/Store';

declare var ga: Function;

@Injectable()
export class AnalyticsProvider {
	constructor() { }

	public async startTrackerWithId(id: string): Promise<void> {

		this.functionD(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

		ga('create', {
			storage: 'none',
			trackingId: id,
			clientId: localStorage.getItem('ga:clientId')
		});
		ga('set', 'checkProtocolTask', null);
		ga('set', 'transportUrl', 'https://www.google-analytics.com/collect');
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

	private functionD(i, s, o, g, r, a?, m?) {
		i['GoogleAnalyticsObject'] = r;
		i[r] = i[r] || function () {
			(i[r].q = i[r].q || []).push(arguments);
		};
		i[r].l = new Date();
		a = s.createElement(o);
		m = s.getElementsByTagName(o)[0];
		a.async = 1;
		a.src = g;
		m.parentNode.insertBefore(a, m);
	}

}
