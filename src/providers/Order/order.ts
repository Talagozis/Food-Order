import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Rpc } from '../rpc/rpc';
import { CheckoutRpcResponse } from '../../models/Request/CheckoutRpcResponse';
import { CheckoutRpc } from '../../models/Rpc/Checkout';


@Injectable()
export class OrderProvider {

	constructor(public rpc: Rpc<CheckoutRpcResponse>) { }

	public checkout(checkoutRpc: CheckoutRpc): Observable<CheckoutRpcResponse> {
		return this.rpc.post('order/checkout', checkoutRpc)
	}

}
