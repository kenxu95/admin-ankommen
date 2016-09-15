import { Component } from '@angular/core';

import { TaskService } from '../../../../shared/services/task.service';
import { DisplayTasks } from '../components/displayTasks/displayTasks.component';

@Component({
  selector: 'active-tasks',
  template: require('./activetasks.component.html'),
  directives: [DisplayTasks],
  providers: [TaskService]
})

export class ActiveTasks{
  constructor(private _taskService: TaskService){}

  myTasks: any;
  upcomingTasks: any;

  // TODO: Upcoming tasks uses fake data
  ngOnInit(){
    // Get "My Tasks"
    this._taskService.getCreatedTasks()
        .subscribe(
          data => {
            this.myTasks = data.json();
          }, 
          err => console.log(err)); 

    this.upcomingTasks = [
      this.paramsToData('I need help walking my dog', '02/34/17', '14:30', '280',
                    [['Walking', 1], ['Has a leash', 1]],
                    ['13942 Imaginary Walk, Texas']),
      this.paramsToData('I need someone to buy me medicine', '03/23/17', '05:30', '15',
                    [['Self-Transportation', 1], ['Helping the sick', 1]],
                    ['39494 Ineedhelp Lane, Germany']),
      this.paramsToData('I need someone to read to me', '01/01/17', '22:30', '30',
                    [['Can Read', 1]],
                    ['3766 Read Lane, Lousiana'])
    ];
  }

  paramsToData(description: string, date: string, time: string, duration: string,
               taskassets: any, locations: any){
    var taskassetsArr = []
    for (let elem of taskassets){
      taskassetsArr.push({'name': elem[0], 'needed': elem[1]});
    } 

    var locationsArr = []
    for (let elem of locations){
      locationsArr.push({'name': elem});
    }

    return {
      'task': {
        'title': 'Title of task',
        'description': description,
        'date': date,
        'time': time,
        'duration': duration,
        'taskassets': taskassetsArr
      },
      'locations': locationsArr
    } 
  }

}
