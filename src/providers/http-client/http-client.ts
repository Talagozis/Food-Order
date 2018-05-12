import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpClientExt {

  constructor(private http: HttpClient) {}

  private createAuthorizationHeader(headers: HttpHeaders) {
    headers.append('X-Amvrosia-Auth', '*'); 
  }

  get<T>(url) {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.get<T>(url, {
      headers: headers
    });
  }

  post<T>(url, data) {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.post<T>(url, data, {
      headers: headers
    });
  }
}