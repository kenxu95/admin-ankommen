import { Component, Input } from '@angular/core';
import { BaKameleonPicturePipe } from '../../../../theme/pipes';

@Component({
  selector: 'display-asset',
  template: require('./displayAsset.component.html'),
  pipes: [BaKameleonPicturePipe] 
})

export class DisplayAsset {
  @Input()
  assetIcon: any;
}