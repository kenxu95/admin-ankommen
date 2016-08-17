import { Injectable } from '@angular/core';
import { URLSearchParams, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MapsService {

  // TODO: Store this secretely to prevent quota theft 
  private apiKey = "AIzaSyB1pb7Ppr6s5xroLDrvrj24jK1pHiib4Pk";
  private geocodingUrl = "https://maps.googleapis.com/maps/api/geocode/json";
  constructor(private http: Http){}

  /* Obtain latitude and longitude from human-readable address */
  geocode(address: string){
    let searchParams: URLSearchParams = new URLSearchParams();
    searchParams.set("address", address);
    searchParams.set("key", this.apiKey);

    return this.http.get(this.geocodingUrl, {
      search: searchParams,
    })
    .map((res: Response) => res.json());
 }


}