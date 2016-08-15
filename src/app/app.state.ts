import {Injectable} from '@angular/core'
import {Subject}    from 'rxjs/Subject';

@Injectable()
export class AppState {

  private _data = new Subject<Object>();
  private _dataStream$ = this._data.asObservable();

  private _subscriptions:Map<string, Array<Function>> = new Map<string, Array<Function>>();

  constructor() {
    this._dataStream$.subscribe((data) => this._onEvent(data));
  }

  /* When the value of a field changes */
  notifyDataChanged(event, value) {
    // console.log("notifyDataChanged: " + value);

    let current = this._data[event]; //current --> {title: "Dashboard"} 
    if (current != value) {
      this._data[event] = value;

      /* Allows for multicasting of a value to many different observers */
      this._data.next({
        event: event,
        data: this._data[event]
      });
    }
  }

  /* Subscribers stores all the callbacks - adds a callback to the subscription list  */
  subscribe(event:string, callback:Function) {
    // console.log("subscribe: " + event);

    var subscribers = this._subscriptions.get(event) || [];
    subscribers.push(callback);

    this._subscriptions.set(event, subscribers);
  }

  /* Forcefully call the subscription (needed for Profile page to work) */
  callSubscription(event:string){
    // console.log(this._data["menu.activeLink"]);
    this._onEvent({ 'event': event, 'data': this._data[event] });
  }

  /* Every time the data is updated, this event is called to execute all the callbacks */
  _onEvent(data:any) {
    // console.log("onEvent: " + data['event']);

    /* (example) --> data: {'event': 'menu.activeLink',  'data': {title: "Dashboard"} } */

    var subscribers = this._subscriptions.get(data['event']) || [];

    /* All the callbacks are executed */
    subscribers.forEach((callback) => {
      callback.call(null, data['data']);
    });
  }
}
