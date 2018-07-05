import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientExt } from '../http-client/http-client';
import { ENV } from '@app/env'


/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api<T> {
	private url: string = ENV.API_URL;

	constructor(public http: HttpClientExt) {
	}

	get(endpoint: string, parameters?: object): Observable<T[]> {
		var x: string = "";
		if(parameters)
			x = "?" + Object.entries(parameters).map(([key, val]) => key + "=" + encodeURIComponent(val)).join('&');
			
		return this.http.get<T[]>(this.url + endpoint + x);
	}

	getOne(endpoint: string, bid: number): Observable<T> {
		return this.http.get<T>(this.url + endpoint + '/' + bid);
		//return this.http.get<T>(this.url + '/' + endpoint + '/' + bid.toString());
	}


	// post(endpoint: string, body: any) {
	// 	return this.http.post<T>(this.url + '/' + endpoint, body);
	// }

	// put(endpoint: string, body: any, reqOpts?: any) {
	// 	return this.http.put(this.url + '/' + endpoint, body);
	// }

	// delete(endpoint: string, reqOpts?: any) {
	// 	return this.http.delete(this.url + '/' + endpoint);
	// }

	// patch(endpoint: string, body: any, reqOpts?: any) {
	// 	return this.http.patch(this.url + '/' + endpoint, body);
	// }

}
