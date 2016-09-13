import { Component, Input } from '@angular/core';

import { GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';
import { GoogleMapsService } from '../../../../../../shared/services/googleMaps.service';
import { Location } from '../../../../../../shared/location';
import { BaCard } from '../../../../../../theme/components';


@Component({
  selector: 'edit-locations',
  template: require('./editLocations.component.html'),
  directives: [BaCard, GOOGLE_MAPS_DIRECTIVES],
  providers: [GoogleMapsService],
  styles: [require('./editLocations.component.css')]
})

export class EditLocations {
  @Input()
  selectedLocations: Location[];

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
    this.selectedLocations.push(newLocation);

    this.reset(); // Reset all fields
  }

  reset() {
    this.address = "";
    this.foundAddresses = [];
    this.chosenAddress = null;
    this.radius = 50;
  }

  removeLocation(location: Location){
    this.selectedLocations.splice(this.selectedLocations.indexOf(location), 1);
  }
}














