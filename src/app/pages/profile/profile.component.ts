import { Component, ViewEncapsulation } from '@angular/core';
import { AppState } from '../../app.state';

import { BaCard } from '../../theme/components';

import { Router } from '@angular/router';

import { BaPictureUploader } from '../../theme/components';

import { EditLocations } from './components/editLocations';

import { UserService } from '../../shared/services/user.service';
import { LocationService } from '../../shared/services/location.service';
import { AssetService } from '../../shared/services/asset.service';
import { User } from '../../shared/user';
import { Asset } from '../../shared/asset';
import { Location } from '../../shared/location';
import { DomSanitizationService } from '@angular/platform-browser';

@Component({
  selector: 'profile',
  template: require('./profile.component.html'),
  styles: [require('./profile.component.css'), 
           require('../ui/components/incons/icons.scss')],
  directives: [BaCard, EditLocations, BaPictureUploader],
  providers: [UserService, LocationService, AssetService],
  encapsulation: ViewEncapsulation.None,
})

export class Profile {
  user: User;
  userAssets: Asset[] = [];
  userLocations: Location[] = [];

  showEditInfo: boolean = false;
  showEditLocations: boolean = false;

  // Picture upload URL
  pictureUploaderOptions = {'url': 'http://localhost:8000/api/user/image',
                            'authToken': localStorage.getItem('id_token')}; // authentication
  defaultPicture = 'assets/img/theme/no-photo.png';
  picture: any = null;

  constructor(private _state:AppState,
    private _sanitizer:DomSanitizationService,
    private _userService:UserService,
    private _locationService:LocationService,
    private _router:Router,
    private _assetService: AssetService){
    this._state.notifyDataChanged('notOnMenuTitle', 'Profile'); 
  }

  ngOnDestroy() {
    this._state.notifyDataChanged('notOnMenuTitle', '');
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
    this._router.navigate(['/pages/editassets']) 
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

  saveLocation(location: Location){
    this._locationService.storeLocation(location)
      .subscribe(
        data => this.initGetLocations(), // if save is confirmed, refresh locations list
        err => console.log(err));
    this.closeLocations();
  }

  removeLocation(location: Location){
    this._locationService.destroyLocation(location.id)
      .subscribe(
        data => this.initGetLocations(), // if remove is confirmed, refresh locations list
        err => console.log(err));
  }

}


    // JS-DATA CODE (REMOVED)
    // store.findAll('user').then((allUsers) => {
    //   console.log(allUsers);
    // });








