import { Component } from '@angular/core';
import { AppState } from '../../../../app.state';

@Component({
  selector: 'edit-assets',
  template: require('./editAssets.component.html')
})

export class EditAssets {

  constructor(private _state:AppState){
    this._state.notifyDataChanged('notOnMenuTitle', 'Edit Assets'); 
  }

  ngOnDestroy() {
    this._state.notifyDataChanged('notOnMenuTitle', '');
  }

    // this.myAssetIcons = allIcons.kameleonRoundedIcons.filter(icon => 
    //   this.mockUser.assets.indexOf(icon.name) >= 0);
    // this.potentialAssetIcons = allIcons.kameleonRoundedIcons.filter(icon => 
    //   this.mockUser.assets.indexOf(icon.name) < 0);

}