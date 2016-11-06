import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { API_LOCATIONS_PATH } from '../auth-constants';
import { Area } from '../area';

// Communicates with the backend's LocationController
@Injectable()
export class LocationService {

  constructor(private authHttp: AuthHttp) {}
 
  getLocations() {
    return this.authHttp.get(API_LOCATIONS_PATH);
  }

  storeLocation(location: Area) {
    return this.authHttp.post(API_LOCATIONS_PATH, {"location": Area});
  }

  destroyLocation(location_id: number) {
    return this.authHttp.delete(API_LOCATIONS_PATH + '/' + location_id);
  }
}
