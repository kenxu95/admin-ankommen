import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { API_BASE_PATH } from './auth-constants';

@Injectable()
export class UserService {

  constructor(private authHttp: AuthHttp) {}

  findAll(){
    return this.authHttp.get(API_BASE_PATH + '/users');
  }

}
