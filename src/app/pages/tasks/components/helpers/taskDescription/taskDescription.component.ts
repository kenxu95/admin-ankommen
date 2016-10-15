import { Component, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';

import { TaskService } from '../../../../../shared/services/';
import { TaskConversionService } from '../../../../../shared/services';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'task-description',
  template: require('./taskDescription.component.html'),
  styles: [require('../../../../../shared/styles/icons.scss')],
  providers: [TaskService, TaskConversionService],
  encapsulation: ViewEncapsulation.None
})

export class TaskDescription {

  data: any;

  constructor(private _activatedRoute:ActivatedRoute,
              private _taskService:TaskService,
              private _taskConversion:TaskConversionService){}

  ngOnInit(){
    this._activatedRoute.params.forEach((params: Params) => {
      console.log(+params['id']);
    });

    // TODO: Actually search for the task whose id is provided
    // NEXT TODO:
    // this._taskService.getCreatedTasks()
    //     .subscribe(
    //       data => {
    //         console.log(data.json());
    //         this.data = data.json()[0];
    //       }, 
    //       err => console.log(err)); 
  }

  convertDuration(){
    this._taskConversion.durationToStr(this.data);
  }
}










