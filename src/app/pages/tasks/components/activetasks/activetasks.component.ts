import { Component, OnInit } from '@angular/core';
import { BaCard } from '../../../../theme/components';

import { TaskService } from '../../../../shared/services/task.service';

@Component({
  selector: 'active-tasks',
  template: require('./activetasks.component.html'),
  directives: [BaCard],
  providers: [TaskService]
})

export class ActiveTasks{
  constructor(private _taskService: TaskService){}

  ngOnInit(){
    this._taskService.getCreatedTasks()
        .subscribe(
          data => console.log(data.json()),
          err => console.log(err)); 
  }

}
