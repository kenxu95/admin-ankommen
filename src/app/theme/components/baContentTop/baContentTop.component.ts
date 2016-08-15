import {Component} from '@angular/core';

import {AppState} from "../../../app.state";

@Component({
  selector: 'ba-content-top',
  styles: [require('./baContentTop.scss')],
  template: require('./baContentTop.html'),
})
export class BaContentTop {

  public activePageTitle:string = '';

  constructor(private _state:AppState) {}

  ngOnInit(){

    this._state.subscribe('notOnMenuTitle', (titleString) => {
      if (titleString !== ''){
        this.activePageTitle = titleString;
      }else{
        this._state.callSubscription('menu.activeLink');
      }
    });

    this._state.subscribe('menu.activeLink', (activeLink) => {
      if (activeLink) {
        this.activePageTitle = activeLink.title;
      }
    }); 
  }

}
