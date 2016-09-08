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

  dataOfWeek: any = [
    {'day': "Monday", 'timeRanges': []},
    {'day': "Tuesday", 'timeRanges': []},
    {'day': "Wednesday", 'timeRanges': []},
    {'day': "Thursday", 'timeRanges': []},
    {'day': "Friday", 'timeRanges': []},
    {'day': "Saturday", 'timeRanges': []},
    {'day': "Sunday", 'timeRanges': []},
  ];

  selectedAsset: any;
  myAssets: Asset[] = [];
  potentialAssets: Asset[] = [];
  displaySavedMessage: boolean = false;

  constructor(private _state:AppState, 
              private _assetService:AssetService,
              private _sanitizer:DomSanitizationService){
    this._state.notifyDataChanged('notOnMenuTitle', 'Edit Assets'); 
  }

  ngOnDestroy() {
    this._state.notifyDataChanged('notOnMenuTitle', '');
  }

  ngOnInit() {
    // Get all the assets
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
    this.displaySavedMessage = false;

    // Only load time ranges when the asset belongs to the user
    if (this.myAssets.indexOf(this.selectedAsset) >= 0){
      // Clear all previous displayed time ranges
      for (var dayData of this.dataOfWeek){
        dayData['timeRanges'].splice(0, dayData['timeRanges'].length);
      }

      // Load time ranges
      this._assetService.getTimeRanges(this.selectedAsset.id)
          .subscribe(
            data => {
              // Insert the data into dataOfWeek
              for (let dayTimeRange of data.json()['dayTimeRanges']){
                for (let i of _.range(this.dataOfWeek.length)){
                  if (dayTimeRange['day'] === this.dataOfWeek[i]['day']){
                    this.dataOfWeek[i]['timeRanges'].push(dayTimeRange['timeRange']);
                  }
                }
              }
            },
            err => console.log(err));      
    }
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

  saveAvailability() {
    this.displaySavedMessage = true;

    let savedTimeRanges = [];
    for (let data of this.dataOfWeek){
      if (data['timeRanges'].length > 0){
        for (let timeRange of data['timeRanges']){
          savedTimeRanges.push({
           'day': data['day'],
           'timeRange': timeRange
          });         
        }
      }
    }
  
    this._assetService.storeTimeRanges(this.selectedAsset.id, savedTimeRanges)
        .subscribe(data => void(0), err => console.log(err));      

  }

}



















