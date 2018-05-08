import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api<T> {
  private url: string = '/assets/mock/stores.json';

  constructor(public http: HttpClient) {
  }

  get(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(this.url );
  }

  getOne(endpoint: string, bid: number): Observable<T> {
    return this.http.get<T>('/assets/mock/store.json');
    //return this.http.get<T>(this.url + '/' + endpoint + '/' + bid.toString());
  }


  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }
}
