import { Component } from '@angular/core';

import { DisplayTasks } from '../displayTasks/displayTasks.component';

@Component({
  selector: 'potential-tasks',
  template: require('./potentialTasks.component.html'),
  directives: [DisplayTasks]
})

export class PotentialTasks{
  requestedTasks: any;

  // TODO: CURRENTLY FAKE DATA
  ngOnInit(){
    this.requestedTasks = [
    this.paramsToData('I need help reading again', '08/25/17', '20:30', '30',
      [['Can Read', 1]],
      ['1293 Readme Street, New York']),
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
        'description': description,
        'date': date,
        'time': time,
        'duration': duration
      },
      'taskassets': taskassetsArr,
      'locations': locationsArr
    } 
  }

}
