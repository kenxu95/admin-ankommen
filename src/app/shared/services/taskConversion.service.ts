import { Injectable } from '@angular/core';

@Injectable()
export class TaskConversionService {

  durationToStr(data: any){
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

  assetsToStr(data: any){
    var str = '';

    for (let taskasset of data['task']['taskassets']){
      str += taskasset['name'] + " (" + taskasset['needed'] + ")\n ";
    }
    return str; 
  }

  locationsToStr(data: any){
    var str = '';
    for (let location of data['locations']){
      str += location['name'].slice(0, 20) + "..."; // Limit the length
      str += '\n';
    }
    return str;
  }

}