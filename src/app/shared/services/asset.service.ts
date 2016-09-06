import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { API_ASSET_PATH } from '../auth-constants';
import { User } from '../User';

@Injectable()
export class AssetService {

  constructor(private authHttp: AuthHttp) {}

  getAssets() {
    return this.authHttp.get(API_ASSET_PATH);
  }
}
