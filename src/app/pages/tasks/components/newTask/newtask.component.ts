import { Component, ViewEncapsulation} from '@angular/core';
import { AppState } from '../../../../app.state';
import { BaCard } from '../../../../theme/components';
import { Router } from '@angular/router';
import { EditLocations } from './components/editLocations/editLocations.component';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizationService } from '@angular/platform-browser';

import { Asset } from '../../../../shared/asset';
import { Task } from '../../../../shared/task';
import { Location } from '../../../../shared/location';
import { TaskService } from '../../../../shared/services/task.service';
import { AssetService } from '../../../../shared/services/asset.service';


@Component({
  selector: 'new-task',
  template: require('./newtask.component.html'),
  styles: [require('../../../ui/components/incons/icons.scss'),
           require('./newtask.component.css')],
  directives: [BaCard, EditLocations],
  providers: [AssetService, TaskService],
  encapsulation: ViewEncapsulation.None
})

export class NewTask {

  public form:FormGroup;
  public name:AbstractControl;
  public startdate:AbstractControl;
  public starttime:AbstractControl;
  public duration:AbstractControl;
  public description:AbstractControl;

  // Form Info
  myTask: Task = new Task();
  dateTime: string;
  time: string;


  // TODO: include NUMBER of assets needed
  allAssets: Asset[];
  selectedAssets: Asset[] = [];

  selectedLocations: Location[] = [];

  constructor(fb:FormBuilder, 
              private _state:AppState, 
              private _assetService:AssetService,
              private _sanitizer:DomSanitizationService,
              private _taskService:TaskService){
    this._state.notifyDataChanged('notOnMenuTitle', 'New Task'); 

    this.form = fb.group({
      'name': ['', Validators.required],
      'startdate': ['', Validators.compose([Validators.required,
                        Validators.pattern('^[0-9]{2}\/[0-9]{2}\/[0-9]{2}$')])],
      'starttime': ['', Validators.compose([Validators.required,
                        Validators.pattern('^[0-9]{2}:[0-9]{2}$')])],
      'duration': ['', Validators.compose([Validators.required,
                       Validators.pattern('^[0-9]* (days?|hours?|days?)$')])],
      'description': ['', Validators.required]
    });

    this.name = this.form.controls['name'];
    this.startdate = this.form.controls['startdate'];
    this.starttime = this.form.controls['starttime'];
    this.duration = this.form.controls['duration'];
    this.description = this.form.controls['description'];
  }

  ngOnInit(){
    this._assetService.getAssets()
        .subscribe(
          data => {
            this.allAssets = data.json()['allAssets'];
          },
          err => console.log(err));
  }

  ngOnDestroy(){
    this._state.notifyDataChanged('notOnMenuTitle', '');
  }

  // Return the length of time in minutes
  convertFormDuration(strDuration: string){
    let splitStrDuration =  strDuration.split(' ');
    let timeMeasure = splitStrDuration[splitStrDuration.length - 1];
    var duration = Number(splitStrDuration[0]);

    if (timeMeasure === "hour" || timeMeasure === "hours")
      duration *= 60;

    if (timeMeasure === "day" || timeMeasure === "days")
      duration *= 24 * 60;

    return duration;
  }

  onSubmit(values: any) {
    if (this.form.valid) {
      var newTask = new Task();
      newTask.name = values.name;
      newTask.description = values.description;
      newTask.date = values.startdate;
      newTask.time = values.starttime;
      newTask.duration = this.convertFormDuration(values.duration);

      // TODO: Remove _.range() once form functionality is implemented!
      this._taskService.storeTask(newTask, this.selectedAssets, 
                                  _.range(this.selectedAssets.length), 
                                  this.selectedLocations)
          .subscribe(data => void(0), err => console.log(err));
    }
  } 

  toggleAssetSelection(asset: Asset, event: any){
    event.stopPropagation();

    let selectedIndex = this.selectedAssets.indexOf(asset);
    if (selectedIndex >= 0){
      // Unhighlight
      this.selectedAssets.splice(selectedIndex, 1);
    }else{
      // Highlight
      this.selectedAssets.push(asset);
    }
  }


}











