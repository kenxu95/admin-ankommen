import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { routing } from './profile.routing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Profile } from './profile.component';
import { ViewProfile } from './components/viewProfile';
import { EditAssets } from './components/editAssets';
import { EditHours } from './components/editHours';
import { EditLocations } from './components/editLocations';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    routing,
    FormsModule
  ],
  declarations: [
    Profile,
    ViewProfile,
    EditAssets,
    EditHours,
    EditLocations
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export default class ProfileModule {

}