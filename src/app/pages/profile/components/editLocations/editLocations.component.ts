import { Component, Output, EventEmitter } from '@angular/core';

import { GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';
import { GoogleMapsService } from './googleMaps.service';
import { Location } from '../../../../shared/location';

@Component({
  selector: 'edit-locations',
  template: require('./editLocations.component.html'),
  directives: [GOOGLE_MAPS_DIRECTIVES],
  providers: [GoogleMapsService],
  styles: [
    `
      .sebm-google-map-container {
        height: 300px;
      }

      ul {
        list-style-type: none;
        margin: 0 0 3px 0;
      }

      .selected {
        background-color: black;
      }

      .found-addresses {
        cursor: pointer;
      }

      #radius-popup {
        color: black;
      }      
   ` 
  ]
})

export class EditLocations {
  @Output()
  newLoc = new EventEmitter();

  private foundAddressesLimit: number = 5;

  address: string = "";
  foundAddresses: any[];

  chosenAddress: string;
  lat: number;
  lng: number;
  radius: number = 50;

  
  constructor (private _googleMapsService: GoogleMapsService){}

  /* Search for the address to fill foundAddresses */
  searchClicked(){
    /* Clear the previous search */
    this.foundAddresses = [];

    /* Fill found addresses with results */
    this._googleMapsService.geocode(this.address)
    .subscribe(res => {
      let limit = Math.min(this.foundAddressesLimit, res.results.length); 
      for (var n = 0; n < limit; n++){
        this.foundAddresses.push(res.results[n]);
      }
    },
    error => console.log("Error: " + error),
    () => {});
  }   

  /* Display on the map */
  addressClicked(result: any){
    this.chosenAddress = result.formatted_address;
    this.lat = result.geometry.location.lat;
    this.lng = result.geometry.location.lng;
  }

  radiusChanged(newRadius: number){
    this.radius = Math.round((newRadius / 1000) * 10) / 10; // round to 1 decimal place
  }

  /* Submit the location */
  submitLocation() {
    var newLocation = new Location;
    newLocation.name = this.chosenAddress;
    newLocation.latitude = this.lat;
    newLocation.longitude = this.lng;
    newLocation.radius = this.radius;
    this.newLoc.emit(newLocation);
  }
}


