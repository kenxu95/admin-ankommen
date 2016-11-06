import { Component, Output, EventEmitter } from '@angular/core';

import { GoogleMapsService } from '../../../../shared/services/googleMaps.service';
import { Area } from '../../../../shared/area';

@Component({
  selector: 'edit-locations',
  template: require('./editLocations.component.html'),
  styles: [require('./editLocations.component.css')],
  providers: [GoogleMapsService]
})

export class EditLocations {
  @Output()
  newLoc = new EventEmitter(); // Emit the new selected location back to the parent

  private foundAddressesLimit: number = 5;

  address: string = ""; // Current search bar value
  foundAddresses: any[]; // List of addresses found by google

  chosenAddress: string;
  lat: number;
  lng: number;
  radius: number = 50; // Default radius

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
    var newLocation = new Area;
    newLocation.name = this.chosenAddress;
    newLocation.latitude = this.lat;
    newLocation.longitude = this.lng;
    newLocation.radius = this.radius;
    this.newLoc.emit(newLocation);
  }
}


