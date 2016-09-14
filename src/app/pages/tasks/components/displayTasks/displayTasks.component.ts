import { Component, Input } from '@angular/core';
import { BaCard } from '../../../../theme/components';


@Component({
  selector: 'display-tasks',
  template: require('./displayTasks.component.html'),
  directives: [BaCard]
})

export class DisplayTasks {
  @Input()
  taskname: string;

  @Input()
  dataArr: any;

  // Convert duration from number of minutes to a string
  convertDuration(data: any){
    var numMinutes = Number(data['task']['duration']);
    var str = "";

    // Days
    if (numMinutes >= 24 * 60){
      let numDays = Math.floor(numMinutes / (24 * 60));
      str += numDays.toString() + ' day';
      str += (numDays > 1) ? 's ': ' '; // Plurals!
      numMinutes %= (24 * 60); 
    }

    // Hours
    if (numMinutes > 60){
      let numHours = Math.floor(numMinutes / 60);
      str += numHours.toString() + ' hour';
      str += (numHours > 1) ? 's ': ' ';
      numMinutes %= 60;
    }

    // Minutes
    if (numMinutes > 0){
      str += numMinutes.toString() + ' minute';
      str += (numMinutes > 1) ? 's ': ' ';
    }
    return str;       
  }

  // Get the needed asset as a string
  getNeededAssets(data: any){
    var str = '';
    for (let taskasset of data['taskassets']){
      str += taskasset['name'] + " (" + taskasset['needed'] + ")\n ";
    }
    return str; 
  }

  // Get the location address as a string
  getLocations(data: any){
    var str = '';
    for (let location of data['locations']){
      str += location['name'].slice(0, 20) + "..."; // Limit the length
      str += '\n';
    }
    return str;
  }
}











