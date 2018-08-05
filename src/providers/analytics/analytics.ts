import { Injectable } from '@angular/core';

declare var ga: Function;

@Injectable()
export class AnalyticsProvider {
	constructor() { }

	async startTrackerWithId(id: string): Promise<void> {

		this.functionD(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

		ga('create', {
			storage: 'none',
			trackingId: id,
			clientId: localStorage.getItem('ga:clientId')
		});
		ga('set', 'checkProtocolTask', null);
		ga('set', 'transportUrl', 'https://www.google-analytics.com/collect');
		ga(function (tracker) {
			if (!localStorage.getItem('ga:clientId')) {
				localStorage.setItem('ga:clientId', tracker.get('clientId'));
			}
		});

	}

	trackView(screenName: string): void {
		console.debug(screenName);
		console.debug(ga);
		ga('set', 'page', screenName);
		ga('send', 'pageview');
	}

	trackEvent(category, action, label?, value?): void {
		ga('send', 'event', {
			eventCategory: category,
			eventLabel: label,
			eventAction: action,
			eventValue: value
		});
	}


	functionD(i, s, o, g, r, a?, m?) {
		i['GoogleAnalyticsObject'] = r;
		i[r] = i[r] || function () {
			(i[r].q = i[r].q || []).push(arguments)
		};
		i[r].l = new Date();
		a = s.createElement(o);
		m = s.getElementsByTagName(o)[0];
		a.async = 1;
		a.src = g;
		m.parentNode.insertBefore(a, m);
	}

}
