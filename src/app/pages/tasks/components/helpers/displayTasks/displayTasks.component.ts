import { Component, Input } from '@angular/core';
import { TaskConversionService } from '../../../../../shared/services';

@Component({
  selector: 'display-tasks',
  template: require('./displayTasks.component.html'),
  providers: [TaskConversionService]
})

export class DisplayTasks {
  @Input()
  taskname: string;

  @Input()
  dataArr: any;

  constructor(private _taskConversion:TaskConversionService){}

  // Convert duration from number of minutes to a string
  convertDuration(data: any){
    return this._taskConversion.durationToStr(data); 
  }

  // Get the needed asset as a string
  convertAssets(data: any){
    return this._taskConversion.assetsToStr(data);
  }

  // Get the location address as a string
  convertLocations(data: any){
    return this._taskConversion.locationsToStr(data);
  }
}











