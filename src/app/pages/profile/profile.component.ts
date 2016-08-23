import { Component, ViewEncapsulation } from '@angular/core';
import { AppState } from '../../app.state';

import { BaCard } from '../../theme/components';
import { BaProfilePicturePipe } from '../../theme/pipes';

import { MODAL_DIRECTIVES, BS_VIEW_PROVIDERS } from 'ng2-bootstrap/ng2-bootstrap';

import { UserService } from '../tasks/user.service';
import { Router } from '@angular/router';

import { BaPictureUploader } from '../../theme/components';
import { BaKameleonPicturePipe } from '../../theme/pipes';
import { IconsService } from '../ui/components/incons/icons.service';

import { EditLocations } from './components/editLocations';
import { store } from '../../shared/store';


@Component({
  selector: 'profile',
  template: require('./profile.component.html'),
  styles: [require('./profile.component.css'), 
           require('../ui/components/incons/icons.scss')],
  directives: [BaCard, MODAL_DIRECTIVES, EditLocations, BaPictureUploader],
  providers: [UserService, IconsService],
  encapsulation: ViewEncapsulation.None,
  pipes: [BaProfilePicturePipe, BaKameleonPicturePipe],
  viewProviders: [BS_VIEW_PROVIDERS]
})

export class Profile {

  // THIS ALL NEEDS TO BE REPLACED
  mockUser: any;
  allIcons: any; 

  showEditLocations: boolean = false;
  userLocations: Location[] = [];

  defaultPicture = 'assets/img/theme/no-photo.png';


  constructor(private _state:AppState,
    private _userService:UserService,
    private _router:Router,
    private _iconsService:IconsService){
    this._state.notifyDataChanged('notOnMenuTitle', 'Profile'); 
  }

  ngOnDestroy() {
    this._state.notifyDataChanged('notOnMenuTitle', '');
  }


  ngOnInit() {

    // TODO: Test code to remove
    store.findAll('user').then((allUsers) => {
      console.log(allUsers);
    });

    this._userService.getMockUser().then(mockUser => {
      this.mockUser = mockUser;

      this.allIcons = this._iconsService.getAll().kameleonIcons.filter(icon =>
        this.mockUser.assets.indexOf(icon.name) >= 0);
    });
  }

  navigateToEditAssets() {
    this._router.navigate(['/pages/editassets']) 
  }

  editLocations(){
    this.showEditLocations = true;
  }

  closeLocations(){
    this.showEditLocations = false;
  }

  addLocation(location: any){
    this.userLocations.push(location);
  }

}








