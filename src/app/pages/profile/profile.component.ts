import { Component, ViewEncapsulation } from '@angular/core';
import { AppState } from '../../app.state';

import { BaCard } from '../../theme/components';
import { BaProfilePicturePipe } from '../../theme/pipes';

import { MODAL_DIRECTIVES, BS_VIEW_PROVIDERS } from 'ng2-bootstrap/ng2-bootstrap';

import { Router } from '@angular/router';

import { BaPictureUploader } from '../../theme/components';
import { BaKameleonPicturePipe } from '../../theme/pipes';
import { IconsService } from '../ui/components/incons/icons.service';

import { EditLocations } from './components/editLocations';

// import { store } from '../../shared/store';
import { UserService } from '../../shared/user.service';

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

    // JS-DATA CODE (REMOVED)
    // store.findAll('user').then((allUsers) => {
    //   console.log(allUsers);
    // });

//    localStorage.setItem('id_token',"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNDcyMTMyMzYxLCJleHAiOjE0NzIxMzU5NjEsIm5iZiI6MTQ3MjEzMjM2MSwianRpIjoiZDY1Y2RlYzZlNjQ1MzUxNjY0ZTIwMzY4Mjg0YTkwM2UifQ.RgWGvbFl5t6ENs3MudnaC8EC2ukebjWAf4zLC0uq10o"); 

    this._userService.findAll().subscribe(
      data => console.log(data),
      err => console.log(err));


    // CODE BEFORE
    // this._userService.getMockUser().then(mockUser => {
    //   this.mockUser = mockUser;

    //   this.allIcons = this._iconsService.getAll().kameleonIcons.filter(icon =>
    //     this.mockUser.assets.indexOf(icon.name) >= 0);
    // });
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








