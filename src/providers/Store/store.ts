import { Injectable } from '@angular/core';

import { StoreApi } from '../../models/api/Store';
import { Api } from '../api/api';
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the StoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StoreProvider {

  constructor(public api: Api<StoreApi>) { }

   find(): Observable<StoreApi[]> {
     return this.api.get('/store')
   }

  findOne(bid: number): Observable<StoreApi> {
    return this.api.getOne('/store', bid)
  }

}
