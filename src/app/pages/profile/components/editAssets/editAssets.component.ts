import { Component } from '@angular/core';
import { AppState } from '../../../../app.state';

import { BaCard } from '../../../../theme/components';

import { EditHours } from '../editHours';

import { AssetService } from '../../../../shared/services/asset.service';
import { Asset } from '../../../../shared/asset';
import { DomSanitizationService } from '@angular/platform-browser';

@Component({
  selector: 'edit-assets',
  template: require('./editAssets.component.html'),
  styles: [require('../../../ui/components/incons/icons.scss'),
           require('./editAssets.component.css')],
  directives: [BaCard, EditHours],
  providers: [AssetService]
})

export class EditAssets {

  selectedAsset: any;
  daysOfWeek: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  myAssets: Asset[] = [];
  potentialAssets: Asset[] = [];

  constructor(private _state:AppState, 
              private _assetService:AssetService,
              private _sanitizer:DomSanitizationService){
    this._state.notifyDataChanged('notOnMenuTitle', 'Edit Assets'); 
  }

  ngOnDestroy() {
    this._state.notifyDataChanged('notOnMenuTitle', '');
  }

  testPicture : string;

  // Get all the assets
  ngOnInit() {
    this._assetService.getAssets()
        .subscribe(
          data => {
            var allAssets = data.json();
            this.myAssets = allAssets['user'];
            this.potentialAssets = allAssets['potential'];
        }, err => console.log(err));

  }

  assetClicked(clickedAsset: any, event: any) {
    event.stopPropagation();
    this.selectedAsset = clickedAsset;
  } 

  deselectAsset() {
    this.selectedAsset = null;
  }

  isMyAsset(icon: any) {
    if (this.selectedAsset){
      return this.myAssets.filter(icon => 
        icon.name == this.selectedAsset.name)[0];
    }
  }

  removeAsset() {
    var indexRemove = this.myAssets.indexOf(this.selectedAsset);
    this.myAssets.splice(indexRemove, 1);
    this.potentialAssets.unshift(this.selectedAsset);

    // Signal the change to the backend
    this._assetService.updateAsset(this.selectedAsset.id, 'remove')
         .subscribe(data => void(0), err => console.log(err));       
  }

  addAsset() {
    var indexRemove = this.potentialAssets.indexOf(this.selectedAsset);  
    this.potentialAssets.splice(indexRemove, 1);
    this.myAssets.push(this.selectedAsset);

    // Signal the change to the backend
    this._assetService.updateAsset(this.selectedAsset.id, 'add')   
        .subscribe(data => void(0), err => console.log(err));
  }
  
}



















