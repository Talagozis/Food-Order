import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HubUserApi } from '../../models/api/HubUser';
import { Api } from '../api/api';


@Injectable()
export class HubUserProvider {

	constructor(public api: Api<HubUserApi>) { }

	public find(): Observable<HubUserApi[]> {
		return this.api.get('hubUser');
	}

}
