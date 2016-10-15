import { Component } from '@angular/core';

@Component({
  selector: 'previous-tasks',
  template: require('./previousTasks.component.html')
})

export class PreviousTasks{
  myPreviousTasks: any;
  previousTasks: any;

  // TODO: CURRENTLY FAKE DATA
  ngOnInit(){
    this.myPreviousTasks = [
    this.paramsToData('I need help eating spoiled food', '02/02/16', '12:30', '125',
      [['Good stomach', 5], ['Hungry', 5]],
      ['938 Hungry Hippo Street, New Jersey']),
    this.paramsToData('I need someone to tell me the time', '03/23/16', '05:30', '1',
      [['Can Read', 1]],
      ['1111 Time Strait, Australia'])
    ];

    this.previousTasks = [
    this.paramsToData('I need to move my furniture from one place to the other', '05/12/16', '9:30', '120',
      [['Lifting', 2], ['Transportation', 1]],
      ['1203 Moveme Road, Florida']),
    this.paramsToData('I need help learning math', '02/02/16', '9:00', '900',
      [['Math', 2]], 
      ['123 CanYouCount Lane, New Hampshire']),
    this.paramsToData('I need help scratching my back', '08/01/16', '19:00', '15',
      [['Backscratcher', 1], ['Listener', 1]], 
      ['3932 Scratchy Pavement, Oklahoma']),
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
