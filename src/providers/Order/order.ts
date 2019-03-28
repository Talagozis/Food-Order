import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Rpc } from '../rpc/rpc';
import { CheckoutRpcResponse } from '../../models/Request/CheckoutRpcResponse';
import { CheckoutRpc } from '../../models/Rpc/Checkout';
import { CheckOrderIsAcceptedRpc } from '../../models/Rpc/CheckOrderIsAcceptedRpc';
import { RpcResponse } from '../../models/Request/ResponseRpc';
import { CheckOrderIsPrintedRpc } from '../../models/Rpc/CheckOrderIsPrintedRpc';


@Injectable()
export class OrderProvider {

	constructor(public rpc: Rpc<CheckoutRpcResponse>) { }

	public checkout(checkoutRpc: CheckoutRpc): Observable<CheckoutRpcResponse> {
		return this.rpc.post('order/checkout', checkoutRpc)
	}

	public checkOrderIsAccepted(checkOrderIsAcceptedRpc: CheckOrderIsAcceptedRpc): Observable<RpcResponse> {
		return this.rpc.post('order/checkOrderIsAccepted', checkOrderIsAcceptedRpc)
	}

	public checkOrderIsPrinted(checkOrderIsPrintedRpc: CheckOrderIsPrintedRpc): Observable<RpcResponse> {
		return this.rpc.post('order/checkOrderIsPrinted', checkOrderIsPrintedRpc)
	}

}
