import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientExt } from '../http-client/http-client';
import { ENV } from '@app/env'
import { RpcResponse } from '../../models/Request/ResponseRpc';


/**
 * Rpc is a generic REST Rpc handler. Set your API url first.
 */
@Injectable()
export class Rpc<T extends RpcResponse> {
	private url: string = ENV.RPC_URL;

	constructor(public http: HttpClientExt) {
	}

	post(endpoint: string, parameters: object): Observable<T> {
		return this.http.post<T>(this.url + '/' + endpoint, parameters);
	}

}
