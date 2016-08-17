import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'edit-locations',
  template: require('./editLocations.component.html')
})

export class EditLocations {
  @Output()
  addLocation = new EventEmitter();

  
}