import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Task } from './task';

@Injectable()
export class TaskService {
  private dashboardUrl = 'app/tasks';

  constructor(private http: Http){}

  // TODO: RANK BY RELEVANCEJ
  getPotentialTasks(assets: Array<string>, accountedTasks: Array<number>): Promise<Task[]>{
    return this.http.get(this.dashboardUrl) 
           .toPromise()
           .then(response => (response.json().data as Task[])
                             .filter(t => {
                               if (accountedTasks.indexOf(t.id) < 0){
                               // if (accountedTasks.indexOf(t.id) < 0 &&
                               //     new Date(t.endTime) > new Date()){
                                 for (var asset of assets){
                                   if (t.assets.indexOf(asset) >= 0)
                                     return true;
                                 }          
                               }
                               return false; 
                             }))
          .catch(this.handleError); 
  }

  getSelectedTasks(selectedTasks: Array<number>): Promise<Task[]>{
    return this.http.get(this.dashboardUrl) 
           .toPromise()
           .then(response => (response.json().data as Task[])
                             .filter(t => {
                             return (selectedTasks.indexOf(t.id) >= 0);})) 
           .catch(this.handleError); 
  }

  getSelectedTasksPrevious(selectedTasks: Array<number>): Promise<Task[]>{
    return this.http.get(this.dashboardUrl) 
           .toPromise()
           .then(response => (response.json().data as Task[])
                             .filter(t => {
                               return selectedTasks.indexOf(t.id) >= 0;
                               // return (selectedTasks.indexOf(t.id) >= 0) 
                               // && (new Date(t.endTime) < new Date());
                             }))
           .catch(this.handleError); 
  }

  getSelectedTasksFuture(selectedTasks: Array<number>): Promise<Task[]>{
    return this.http.get(this.dashboardUrl) 
       .toPromise()
       .then(response => (response.json().data as Task[])
                         .filter(t => {
                           return selectedTasks.indexOf(t.id) >= 0;
                           // return (selectedTasks.indexOf(t.id) >= 0) 
                           // && (new Date(t.endTime) > new Date());
                         }))
       .catch(this.handleError); 
  }

  private handleError(error: any){
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
