import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ENV } from '@app/env'

@Injectable()
export class HttpClientExt {

  constructor(private http: HttpClient) {}

  private createAuthorizationHeader(headers: HttpHeaders) {
    console.log(ENV.API_HEADER_VALUE);
    headers.append(ENV.API_HEADER_NAME, ENV.API_HEADER_VALUE); 
    headers.append('Origin', ENV.API_CROSS_ORIGIN_URL); 
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

  put<T>(url, data) {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.post<T>(url, data, {
      headers: headers
    });
  }

  delete<T>(url) {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.get<T>(url, {
      headers: headers
    });
  }

  patch<T>(url, data) {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.post<T>(url, data, {
      headers: headers
    });
  }

}