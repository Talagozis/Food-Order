import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import { OfferApi, OfferLevel } from '../../models/Api/Offer';

type SubscriptionDelegate = (value: OfferApi[]) => void;

@Injectable()
export class OfferProvider {

	constructor(public api: Api<OfferApi>) { }

	public findByStoreBid(storeBid: number): Promise<OfferApi[]> {
		return this.api.get('offer', { "storeBid": storeBid }).toPromise();
	}

	public findDeals(storeBid: number, subscription: SubscriptionDelegate): Promise<void> {

		subscription = OfferSubscriptionFilters.filterActive(subscription);
		subscription = OfferSubscriptionFilters.filterByLevel(subscription, OfferLevel.Deal);

		return this.findByStoreBid(storeBid).then(subscription);
	}

	public findSuperDeals(storeBid: number, subscription: SubscriptionDelegate): Promise<void> {

		subscription = OfferSubscriptionFilters.filterActive(subscription);
		subscription = OfferSubscriptionFilters.filterByLevel(subscription, OfferLevel.SuperDeal);

		return this.findByStoreBid(storeBid).then(subscription);
	}

	public findLiveDeals(storeBid: number, subscription: SubscriptionDelegate): Promise<void> {

		subscription = OfferSubscriptionFilters.filterActive(subscription);
		subscription = OfferSubscriptionFilters.filterByLevel(subscription, OfferLevel.LiveDeal);
		subscription = OfferSubscriptionFilters.filterLive(subscription);

		return this.findByStoreBid(storeBid).then(subscription);
	}





}

class OfferSubscriptionFilters {

	public static filterActive(subscription: SubscriptionDelegate): SubscriptionDelegate {
		return a => subscription(a.filter(b => b.isActive));
	}

	public static filterByLevel(subscription: SubscriptionDelegate, level: OfferLevel): SubscriptionDelegate {
		return a => subscription(a.filter(b => b.level == level));
	}

	public static filterLive(subscription: SubscriptionDelegate): SubscriptionDelegate {
		return a => subscription(a.filter(b => b.OfferSchedulers && b.OfferSchedulers.filter(c => c.isActive && new Date(c.startDateTime) <= new Date() && new Date(c.endDateTime) >= new Date()).length > 0));
	}

}