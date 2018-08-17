import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Api } from '../api/api';

import { OfferSchedulerApi } from '../../models/Api/OfferSchedulerApi';


@Injectable()
export class OfferSchedulerProvider {

	constructor(public api: Api<OfferSchedulerApi>) { }

	public getLive(): Observable<OfferSchedulerApi[]> {
		return this.api.get('offerScheduler', { dateTime: (new Date).toJSON() });
	}

}