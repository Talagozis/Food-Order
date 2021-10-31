import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { StoreApi } from '../../models/api/Store';
import { Api } from '../api/api';

type SubscriptionDelegate = (value: StoreApi[]) => void;

@Injectable()
export class StoreProvider {

	constructor(public api: Api<StoreApi>) { }

	public findAllAvailable(subscription: SubscriptionDelegate): Subscription {

		// subscription = StoreSubscriptionFilters.filterOpen(subscription);
		// subscription = StoreSubscriptionFilters.filterActive(subscription);
		subscription = StoreSubscriptionFilters.filterCanOrderOnline(subscription);
		subscription = StoreSubscriptionFilters.filterHasDeliveryOrTakeaway(subscription);
		subscription = StoreSubscriptionFilters.filterSendOrderByPushOrEmail(subscription);

		return this.find({ isActive: true, isOpen: true }).subscribe(subscription);
	}


	private find(parameters?: object): Observable<StoreApi[]> {
		return this.api.get('store', parameters);
	}

	public findOne(bid: number): Observable<StoreApi> {
		return this.api.getOne('store', bid);
	}

	public findBySlug(storeSlug: string): Promise<StoreApi> {
		return this.api.getOne('store', { slug: storeSlug }).toPromise();
	}


}

class StoreSubscriptionFilters {

	// public static filterOpen(subscription: SubscriptionDelegate): SubscriptionDelegate {
	// 	return a => subscription(a.filter(b => b.isOpen));
	// }

	// public static filterActive(subscription: SubscriptionDelegate): SubscriptionDelegate {
	// 	return a => subscription(a.filter(b => b.isActive));
	// }

	public static filterCanOrderOnline(subscription: SubscriptionDelegate): SubscriptionDelegate {
		return a => subscription(a.filter(b => b.canOrderOnline));
	}

	public static filterHasDeliveryOrTakeaway(subscription: SubscriptionDelegate): SubscriptionDelegate {
		return a => subscription(a.filter(b => b.hasDelivery || b.hasTakeaway));
	}

	public static filterSendOrderByPushOrEmail(subscription: SubscriptionDelegate): SubscriptionDelegate {
		return a => subscription(a.filter(b => b.sendOrderByPush || b.sendOrderByEmail));
	}

}
