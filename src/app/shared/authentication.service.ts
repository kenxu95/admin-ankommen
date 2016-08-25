import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LOGIN_POST_PATH } from './auth-constants';

@Injectable()
export class AuthenticationService {

  constructor(private http: Http) {}

  login(email: string, password: string) {

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    this.http.post(LOGIN_POST_PATH, JSON.stringify({email: email, password: password}), options)
        .subscribe(data => console.log(data));
  }
}