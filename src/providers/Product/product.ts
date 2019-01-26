import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ProductApi } from '../../models/api/Product';
import { Api } from '../api/api';


@Injectable()
export class ProductProvider {

	constructor(public api: Api<ProductApi>) { }

	public findByStoreBid(storeBid: number): Observable<ProductApi[]> {
		return this.api.get('product', { "storeBid": storeBid, "isActive": true, "onlyInOffer": false })
	}

}
