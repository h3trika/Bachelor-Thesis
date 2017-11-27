import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from './../../angular_material.module';

import { RegisterDoneDialogModule } from './../register-done-dialog/register-done-dialog.module';

import { RegistrationService  } from './../../services/registration.service';

import { RegisterDialogComponent } from './../register-dialog/register-dialog.component'
import { RegisterDoneDialogComponent } from './../register-done-dialog/register-done-dialog.component'

@NgModule({
  declarations: [ RegisterDialogComponent ],
  imports: [ ReactiveFormsModule, AngularMaterialModule, RegisterDoneDialogModule ],
  providers: [ RegistrationService ],
  exports: [ RegisterDialogComponent ],
  entryComponents: [ RegisterDoneDialogComponent ]
})

export class RegisterDialogModule { }
