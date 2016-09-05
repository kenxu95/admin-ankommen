import { Component, ViewEncapsulation } from '@angular/core';
import { AppState } from '../../app.state';

import { BaCard } from '../../theme/components';
import { BaProfilePicturePipe } from '../../theme/pipes';

import { Router } from '@angular/router';

import { BaPictureUploader } from '../../theme/components';
import { BaKameleonPicturePipe } from '../../theme/pipes';
import { IconsService } from '../ui/components/incons/icons.service';

import { EditLocations } from './components/editLocations';

// import { store } from '../../shared/store';
import { UserService } from '../../shared/services/user.service';
import { LocationService } from '../../shared/services/location.service';
import { User } from '../../shared/user';
import { Location } from '../../shared/location';
import 'rxjs/Rx';


@Component({
  selector: 'profile',
  template: require('./profile.component.html'),
  styles: [require('./profile.component.css'), 
           require('../ui/components/incons/icons.scss')],
  directives: [BaCard, EditLocations, BaPictureUploader],
  providers: [UserService, LocationService, IconsService],
  encapsulation: ViewEncapsulation.None,
  pipes: [BaProfilePicturePipe, BaKameleonPicturePipe]
})

export class Profile {

  user: User;
  allIcons: any; 
  userLocations: Location[] = [];

  showEditInfo: boolean = false;
  showEditLocations: boolean = false;

  // Picture upload URL
  pictureUploaderOptions = {'url': 'http://localhost:8000/api/user/image',
                            'authToken': localStorage.getItem('id_token')}; // authentication
  defaultPicture = 'assets/img/theme/no-photo.png';
  picture: any = null;

  constructor(private _state:AppState,
    private _userService:UserService,
    private _locationService:LocationService,
    private _router:Router,
    private _iconsService:IconsService){
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

  initGetUser() {
    this._userService.getUser()
      .subscribe(
        data => {
          this.user = data.json().user;
          this.initGetLocations(); // Get all locations
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

    // CODE BEFORE
    // this._userService.getMockUser().then(mockUser => {
    //   this.mockUser = mockUser;

    //   this.allIcons = this._iconsService.getAll().kameleonIcons.filter(icon =>
    //     this.mockUser.assets.indexOf(icon.name) >= 0);
    // });







