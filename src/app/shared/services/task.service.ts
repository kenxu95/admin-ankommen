import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { API_TASK_PATH } from '../auth-constants';
import { Location } from '../location';
import { Asset } from '../asset';
import { Task } from '../task';


@Injectable()
export class TaskService {

  constructor(private authHttp: AuthHttp) {}

  getCreatedTasks(){
    return this.authHttp.get(API_TASK_PATH + '/created');
  }

  storeTask(task: Task, assets: Asset[], needed: number[], locations: Location[]){
    return this.authHttp.post(API_TASK_PATH, {
      'task': task,
      'assets': assets,
      'needed': needed,
      'locations': locations
    });
  }
   
}
