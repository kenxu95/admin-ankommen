import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { API_LOCATIONS_PATH } from './auth-constants';
import { Location } from './Location';

@Injectable()
export class LocationService {

  constructor(private authHttp: AuthHttp) {}

  getLocations() {
    return this.authHttp.get(API_LOCATIONS_PATH);
  }

  storeLocation(location: Location) {
    return this.authHttp.post(API_LOCATIONS_PATH, {"location": location});
  }

  destroyLocation(location_id: number) {
    return this.authHttp.delete(API_LOCATIONS_PATH + '/' + location_id);
  }
}
