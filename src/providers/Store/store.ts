import { Injectable } from '@angular/core';
import { StoreApi } from '../../models/api/Store';
import { Api } from '../api/api';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

type SubscriptionDelegate = (value: StoreApi[]) => void;

@Injectable()
export class StoreProvider {

	constructor(public api: Api<StoreApi>) { }

	public findAllAvailable(subscription: SubscriptionDelegate): Subscription {

		subscription = StoreSubscriptionFilters.filterOpen(subscription);
		subscription = StoreSubscriptionFilters.filterActive(subscription);
		subscription = StoreSubscriptionFilters.filterCanOrderOnline(subscription);
		subscription = StoreSubscriptionFilters.filterHasDeliveryOrTakeaway(subscription);
		subscription = StoreSubscriptionFilters.filterSendOrderByPushOrEmail(subscription);

		return this.find().subscribe(subscription);
	}


	private find(): Observable<StoreApi[]> {
		return this.api.get('store')
	}

	public findOne(bid: number): Observable<StoreApi> {
		return this.api.getOne('store', bid)
	}

}

class StoreSubscriptionFilters {

	public static filterOpen(subscription: SubscriptionDelegate): SubscriptionDelegate {
		return a => subscription(a.filter(b => b.isOpen));
	}

	public static filterActive(subscription: SubscriptionDelegate): SubscriptionDelegate {
		return a => subscription(a.filter(b => b.isActive));
	}

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