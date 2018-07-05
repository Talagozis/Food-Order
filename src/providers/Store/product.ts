import { Injectable } from '@angular/core';
import { ProductApi } from '../../models/api/Product';
import { Api } from '../api/api';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

type SubscriptionDelegate = (value: ProductApi[]) => void;

@Injectable()
export class ProductProvider {

	constructor(public api: Api<ProductApi>) { }

	public findAllAvailable(subscription: SubscriptionDelegate): Subscription {

		subscription = ProductSubscriptionFilters.filterActive(subscription);

		return this.find().subscribe(subscription);
	}


	private find(): Observable<ProductApi[]> {
		return this.api.get('product')
	}

	public findOne(bid: number): Observable<ProductApi> {
		return this.api.getOne('product', bid)
	}

	public findByStoreBid(storeBid: number): Observable<ProductApi[]> {
		return this.api.get('product', { "storeBid": storeBid })
	}

}

class ProductSubscriptionFilters {

	public static filterActive(subscription: SubscriptionDelegate): SubscriptionDelegate {
		return a => subscription(a.filter(b => b.isActive));
	}

}