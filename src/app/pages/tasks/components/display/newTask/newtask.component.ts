import { Component, ViewEncapsulation} from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { Task, Asset, Location } from '../../../../../shared';
import { AssetService, TaskService } from '../../../../../shared/services';

@Component({
  selector: 'new-task',
  template: require('./newtask.component.html'),
  styles: [require('../../../../../shared/styles/icons.scss'),
           require('./newtask.component.css')],
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
              private _assetService:AssetService,
              private _sanitizer:DomSanitizer,
              private _taskService:TaskService){

    this.form = fb.group({
      'name': ['', Validators.required],
      'startdate': ['', Validators.compose([Validators.required,
                        Validators.pattern('^[0-9]{2}\/[0-9]{2}\/[0-9]{2}$')])], // dd/mm/yy
      'starttime': ['', Validators.compose([Validators.required,
                        Validators.pattern('^[0-9]{2}:[0-9]{2}$')])], // hh:mm
      'duration': ['', Validators.compose([Validators.required,
                       Validators.pattern('^[0-9]* (days?|hours?|days?)$')])], //number minute(s)/hour(s)/day(s)
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
      this._taskService.storeMyTask(newTask, this.selectedAssets, 
                                  _.range(this.selectedAssets.length), 
                                  this.selectedLocations)
          .subscribe(data => void(0), err => console.log(err));
    }
  } 

  toggleAssetSelection(asset: Asset, event: any){
    event.stopPropagation();

    let selectedIndex = this.selectedAssets.indexOf(asset);
    if (selectedIndex >= 0){
      this.selectedAssets.splice(selectedIndex, 1); // De-highlight
    }else{
      this.selectedAssets.push(asset); // Highlight
    }
  }


}











