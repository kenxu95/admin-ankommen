/*
 * These are globally available services in any component or any other service
 */

// Angular 2
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
// Angular 2 Http
import { HTTP_PROVIDERS } from '@angular/http';
// Angular 2 Router
import { provideRouter } from '@angular/router';
// Angular 2 forms
import { disableDeprecatedForms, provideForms } from '@angular/forms';


import { routes } from '../app/app.routes';

// TODO: temporary backend that should be removed later
import { XHRBackend } from '@angular/http';
import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';
import { MockTasksDatabase } from '../app/pages/tasks/mocktasksdatabase';

/*
 * Application Providers/Directives/Pipes
 * providers/directives/pipes that only live in our browser environment
 */
export const APPLICATION_PROVIDERS = [
  // new Angular 2 forms
  disableDeprecatedForms(),
  provideForms(),

  provideRouter(routes),

  ...HTTP_PROVIDERS,

  { provide: LocationStrategy, useClass: HashLocationStrategy },
  { provide: XHRBackend, useClass: InMemoryBackendService }, //TODO REMOVE: in-mem server
  { provide: SEED_DATA, useClass: MockTasksDatabase } // TODO REMOVE: in-mem server data
];

export const PROVIDERS = [
  ...APPLICATION_PROVIDERS
];
