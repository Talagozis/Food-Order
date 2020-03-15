import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import { OfferApi, OfferLevel } from '../../models/Api/Offer';

type SubscriptionDelegate = (value: OfferApi[]) => void;

@Injectable()
export class OfferProvider {

	constructor(public api: Api<OfferApi>) { }

	private find(parameters?: object): Promise<OfferApi[]> {
		return this.api.get('offer', { ...parameters, isActive: true }).toPromise();
	}

	private findByStoreBid(storeBid: number, parameters?: object): Promise<OfferApi[]> {
		return this.api.get('offer', { ...parameters, storeBid, isActive: true }).toPromise();
	}

	public findDeals(storeBid: number, subscription: SubscriptionDelegate): Promise<void> {

		// subscription = OfferSubscriptionFilters.filterActive(subscription);
		// subscription = OfferSubscriptionFilters.filterByLevel(subscription, OfferLevel.Deal);

		return this.findByStoreBid(storeBid, { level: OfferLevel.Deal, isAvailable: true }).then(subscription);
	}

	public findSuperDeals(storeBid: number, subscription: SubscriptionDelegate): Promise<void> {

		// subscription = OfferSubscriptionFilters.filterActive(subscription);
		// subscription = OfferSubscriptionFilters.filterByLevel(subscription, OfferLevel.SuperDeal);

		return this.findByStoreBid(storeBid, { level: OfferLevel.SuperDeal, isAvailable: true }).then(subscription);
	}

	public findLiveDeals(storeBid: number, subscription: SubscriptionDelegate): Promise<void> {

		if (storeBid) {
			return this.findByStoreBid(storeBid, { level: OfferLevel.LiveDeal, offerSchedulerDateTime: (new Date).toJSON() }).then(subscription);
		} else {
			return this.find({ level: OfferLevel.LiveDeal, offerSchedulerDateTime: (new Date).toJSON() }).then(subscription);
		}
		// subscription = OfferSubscriptionFilters.filterActive(subscription);
		// subscription = OfferSubscriptionFilters.filterByLevel(subscription, OfferLevel.LiveDeal);
		// subscription = OfferSubscriptionFilters.filterLive(subscription);

	}





}

// class OfferSubscriptionFilters {

// 	public static filterActive(subscription: SubscriptionDelegate): SubscriptionDelegate {
// 		return a => subscription(a.filter(b => b.isActive));
// 	}

// 	public static filterByLevel(subscription: SubscriptionDelegate, level: OfferLevel): SubscriptionDelegate {
// 		return a => subscription(a.filter(b => b.level == level));
// 	}

// 	public static filterLive(subscription: SubscriptionDelegate): SubscriptionDelegate {
// 		return a => subscription(a.filter(b => b.OfferSchedulers && b.OfferSchedulers.filter(c => c.isActive && new Date(c.startDateTime) <= new Date() && new Date(c.endDateTime) >= new Date()).length > 0));
// 	}

// }
