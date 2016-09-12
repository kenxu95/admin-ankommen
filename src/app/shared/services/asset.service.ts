import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { API_ASSET_PATH } from '../auth-constants';

@Injectable()
export class AssetService {

  constructor(private authHttp: AuthHttp) {}

  getAssets() {
    return this.authHttp.get(API_ASSET_PATH);
  }

  getUserAssets() {
    return this.authHttp.get(API_ASSET_PATH + '/edit'); // User assets and Potential assets
  }

  // Params: action - 'add' or 'remove'
  updateAsset(asset_id: number, action: string) {
    return this.authHttp.put(API_ASSET_PATH + '/' + asset_id, {'action': action});
  }

  getTimeRanges(asset_id: number) {
    return this.authHttp.get(API_ASSET_PATH + '/' + asset_id + '/timeranges');
  }

  storeTimeRanges(asset_id: number, data: any) {
    return this.authHttp.post(API_ASSET_PATH + '/' + asset_id + '/timeranges', data);
  }
}
