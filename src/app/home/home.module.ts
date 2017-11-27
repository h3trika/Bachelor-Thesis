import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { jQWidgetsModule } from './../jqwidgets.module';
import { AngularMaterialModule } from './../angular_material.module';

import { GetCurrentUserService } from './../services/getcurrentuser.service';
import { FlightsFetchService } from './../services/flightsfetch.service';
import { DataService } from './../services/data.service';

import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
      HomeComponent
  ],
  imports: [
      CommonModule, FormsModule, ReactiveFormsModule, jQWidgetsModule, AngularMaterialModule
  ],
  providers: [ GetCurrentUserService, FlightsFetchService, DataService ],
  bootstrap: [ HomeComponent ]
})
export class HomeModule { }
