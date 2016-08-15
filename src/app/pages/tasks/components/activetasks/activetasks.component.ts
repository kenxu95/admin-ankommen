import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Task } from '../../task';
import { TaskService } from '../../task.service';

import {BaCard} from '../../../../theme/components';


@Component({
  selector: 'active-tasks',
  template: require('./activetasks.component.html'),
  directives: [BaCard],
  providers: [UserService, TaskService]
})

export class ActiveTasks implements OnInit {
  mockUser: any; // TODO: remove later

  myTasks: Task[];
  participatingTasks: Task[];


  constructor(private _userService: UserService,
              private _taskService: TaskService){}


   // FILTER BY ACTIVE TASKS. TODO: ADD MY TASKS TOO
  private getSelectedTasks() {
    this._taskService
        .getSelectedTasksFuture(this.mockUser.myTasks)
        .then(tasks => this.myTasks = tasks)
        .catch(error => console.log(error)); 

    this._taskService
        .getSelectedTasksFuture(this.mockUser.participatingTasks)
        .then(tasks => this.participatingTasks = tasks)
        .catch(error => console.log(error));
  } 

  getMockUser() {
    this._userService.getMockUser().then(mockUser => {
      this.mockUser = mockUser;
      this.getSelectedTasks(); // callback within a callback
    });
  }

  ngOnInit() {
    this.getMockUser();
  }
}
