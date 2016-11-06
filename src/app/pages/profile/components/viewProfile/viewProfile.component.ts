import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

// SHARED FOLDER
import { UserService, LocationService, AssetService } from '../../../../shared/services';
import { User, Asset, Area } from '../../../../shared';

// For making sure we trust dataurls recieved
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'view-profile',
  template: require('./viewProfile.component.html'),
  styles: [require('./viewProfile.component.css'), 
           require('../../../../shared/styles/icons.scss')],
  providers: [UserService, LocationService, AssetService],
  encapsulation: ViewEncapsulation.None,
})

export class ViewProfile {
  user: User;
  userAssets: Asset[] = [];
  userLocations: Area[] = [];

  // Flags deciding whether editing should be displayed
  showEditInfo: boolean = false;
  showEditLocations: boolean = false;

  pictureUploaderOptions = {'url': 'http://localhost:8000/api/user/image',
                            'authToken': localStorage.getItem('id_token')}; // authentication
  // Default picture stored on front end 
  defaultPicture = 'assets/img/theme/no-photo.png';
  picture: any = null;

  constructor  (
    private _sanitizer:DomSanitizer,
    private _userService:UserService,
    private _locationService:LocationService,
    private _router:Router,
    private _assetService: AssetService){
  }

  initGetLocations() {
    this._locationService.getLocations()
      .subscribe(
        data => {
          this.userLocations = data.json();
        },
        err => console.log(err)        
      );
  }

  initGetUserAssets() {
   this._assetService.getUserAssets()
     .subscribe(
       data => {
         this.userAssets = data.json()['user'];
       },
       err => console.log(err)
     ); 
  }

  initGetUser() {
    this._userService.getUser()
      .subscribe(
        data => {
          this.user = data.json().user;
          this.initGetLocations(); // Get all locations
          this.initGetUserAssets(); // Get all user assets
        },
        err => console.log(err));


    this._userService.getUserImage()
      .subscribe(
        data => {
          this.picture = data.json()['img'];
        },
        err => console.log(err)
      );
  }


  ngOnInit() {
    this.initGetUser();
  }

  navigateToEditAssets() {
    this._router.navigate(['/pages/profile/editassets']) 
  }

  saveInfo(){
    this._userService.updateUser(this.user).subscribe(data => void(0), err => console.log(err));
    this.showEditInfo = false;
  }

  editLocations(){
    this.showEditLocations = true;
  }

  closeLocations(){
    this.showEditLocations = false;
  }

  saveLocation(location: Area){
    this._locationService.storeLocation(location)
      .subscribe(
        data => this.initGetLocations(), // if save is confirmed, refresh locations list
        err => console.log(err));
    this.closeLocations();
  }

  removeLocation(location: Area){
    this._locationService.destroyLocation(location.id)
      .subscribe(
        data => this.initGetLocations(), // if remove is confirmed, refresh locations list
        err => console.log(err));
  }

}


   







