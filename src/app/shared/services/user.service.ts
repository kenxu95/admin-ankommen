import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { API_USER_PATH } from '../auth-constants';
import { User } from '../User';

@Injectable()
export class UserService {

  constructor(private authHttp: AuthHttp) {}
 
  getUser() {
    return this.authHttp.get(API_USER_PATH);
  }

  updateUser(user: User) {
    return this.authHttp.put(API_USER_PATH, {"user": user});
  }

  getUserImage() {
    return this.authHttp.get(API_USER_PATH + "/image");
  }
  

}
