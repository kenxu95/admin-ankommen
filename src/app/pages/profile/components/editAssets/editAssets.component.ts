import { Component } from '@angular/core';
import { AppState } from '../../../../app.state';

import { BaCard } from '../../../../theme/components';
import { BaKameleonPicturePipe } from '../../../../theme/pipes';
import { IconsService } from '../../../ui/components/incons/icons.service';

import { DisplayAsset } from '../displayAsset';

@Component({
  selector: 'edit-assets',
  template: require('./editAssets.component.html'),
  styles: [require('../../../ui/components/incons/icons.scss'),
  `
  .floating-asset-editor {
    position: fixed;
    top: 120px;
    right: 5px;
  }
  `,
  `
  .selected {
    background: yellow !important;
  }

  img:hover {
    background: #fffe00 !important;
  }


  ` ],
  pipes: [BaKameleonPicturePipe],
  directives: [BaCard, DisplayAsset],
  providers: [IconsService]
})

export class EditAssets {

  mockUserAssets: string[] = ["Santa", "Medal", "Batman", "Surfer"];
  myAssetIcons: any;
  potentialAssetIcons: any;

  selectedAssetIcon: any;

  constructor(private _state:AppState,
    private _iconsService:IconsService){
    this._state.notifyDataChanged('notOnMenuTitle', 'Edit Assets'); 
  }

  ngOnDestroy() {
    this._state.notifyDataChanged('notOnMenuTitle', '');
  }

  ngOnInit() {
    var allIcons = this._iconsService.getAll();
    this.myAssetIcons = allIcons.kameleonIcons.filter(icon => 
      this.mockUserAssets.indexOf(icon.name) >= 0);
    this.potentialAssetIcons = allIcons.kameleonIcons.filter(icon => 
      this.mockUserAssets.indexOf(icon.name) < 0);
  } 

  assetIconClicked(selectedIcon: any, event: any) {
    event.stopPropagation();
    this.selectedAssetIcon = selectedIcon;
  } 

  deselectIcon() {
    this.selectedAssetIcon = null;
  }

  isMyIcon(icon: any) {
    if (this.selectedAssetIcon){
      return this.myAssetIcons.filter(icon => 
        icon.name == this.selectedAssetIcon.name
        )[0];
    }
  }

  removeIcon() {
    var indexRemove = this.myAssetIcons.indexOf(this.selectedAssetIcon);
    this.myAssetIcons.splice(indexRemove, 1);
    this.potentialAssetIcons.unshift(this.selectedAssetIcon);
  }

  addIcon() {
    var indexRemove = this.potentialAssetIcons.indexOf(this.selectedAssetIcon);  
    this.potentialAssetIcons.splice(indexRemove, 1);
    this.myAssetIcons.push(this.selectedAssetIcon);
  }
}













