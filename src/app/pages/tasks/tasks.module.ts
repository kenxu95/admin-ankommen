import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { routing } from './tasks.routing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Tasks } from './tasks.component';

// Display Folder Components
import { ActiveTasks } from './components/display/activeTasks';
import { NewTask } from './components/display/newTask';
import { PotentialTasks } from './components/display/potentialTasks';
import { PreviousTasks } from './components/display/previousTasks';

// Helpers Folder Components
import { TaskDescription } from './components/helpers/taskDescription';
import { DisplayTasks } from './components/helpers/displayTasks';
import { EditLocations } from './components/helpers/editLocations';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    routing,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    Tasks,
    ActiveTasks,
    NewTask,
    PotentialTasks,
    PreviousTasks,
    TaskDescription,
    DisplayTasks,
    EditLocations
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export default class TasksModule {
}