import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ENV } from '@app/env';

import { Rpc } from '../rpc/rpc';
import { CheckoutRpcResponse } from '../../models/Request/CheckoutRpcResponse';
import { CheckoutRpc } from '../../models/Rpc/Checkout';
import { CheckOrderIsAcceptedRpc } from '../../models/Rpc/CheckOrderIsAcceptedRpc';
import { RpcResponse } from '../../models/Request/ResponseRpc';
import { CheckOrderIsPrintedRpc } from '../../models/Rpc/CheckOrderIsPrintedRpc';
import { CheckOrderIsPaidRpc } from '../../models/Rpc/CheckOrderIsPaidRpc';
import { ApplicationType, BuildPlatform } from '../../models/Entities/Checkout';


@Injectable()
export class OrderProvider {

	constructor(public rpc: Rpc<CheckoutRpcResponse>) { }

	public checkout(checkoutRpc: CheckoutRpc): Observable<CheckoutRpcResponse> {

		switch (ENV.BUILD_PLATFORM) {
			case BuildPlatform.Pwa: {
				checkoutRpc.sessionDetails.applicationType = ApplicationType.Pwa;
				checkoutRpc.sessionDetails.applicationDomain = ENV.APPLICATION_DOMAIN;
				break;
			}
			case BuildPlatform.Android: {
				checkoutRpc.sessionDetails.applicationType = ApplicationType.Android;
				checkoutRpc.sessionDetails.applicationDomain = ENV.APPLICATION_DOMAIN;
				break;
			}
			case BuildPlatform.IOs: {
				checkoutRpc.sessionDetails.applicationType = ApplicationType.Ios;
				checkoutRpc.sessionDetails.applicationDomain = ENV.APPLICATION_DOMAIN;
				break;
			}
		}

		return this.rpc.post('order/checkout', checkoutRpc);
	}

	public checkOrderIsAccepted(checkOrderIsAcceptedRpc: CheckOrderIsAcceptedRpc): Observable<RpcResponse> {
		return this.rpc.post('order/checkOrderIsAccepted', checkOrderIsAcceptedRpc);
	}

	public checkOrderIsPrinted(checkOrderIsPrintedRpc: CheckOrderIsPrintedRpc): Observable<RpcResponse> {
		return this.rpc.post('order/checkOrderIsPrinted', checkOrderIsPrintedRpc);
	}

	public checkOrderIsPaid(checkOrderIsPaidRpc: CheckOrderIsPaidRpc): Observable<RpcResponse> {
		return this.rpc.post('order/checkOrderIsPaid', checkOrderIsPaidRpc);
	}

}
