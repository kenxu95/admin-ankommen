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


import { GOOGLE_MAPS_PROVIDERS, LazyMapsAPILoaderConfig } from 'angular2-google-maps/core';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { CanActivateViaAuthGuard } from '../app/shared/auth-guard';

// 
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
  ...GOOGLE_MAPS_PROVIDERS,
  ...AUTH_PROVIDERS,

  CanActivateViaAuthGuard,

  { provide: LocationStrategy, useClass: HashLocationStrategy },

  { provide: LazyMapsAPILoaderConfig, useFactory: () => {
    let config = new LazyMapsAPILoaderConfig();
    config.apiKey = 'AIzaSyB1pb7Ppr6s5xroLDrvrj24jK1pHiib4Pk'; //TODO: store secretly
    return config;
  }}
];

export const PROVIDERS = [
  ...APPLICATION_PROVIDERS
];
