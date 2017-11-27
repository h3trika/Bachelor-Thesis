import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from './../../angular_material.module';

import { RegisterDialogModule } from './../register-dialog/register-dialog.module';
import { ForgottenPasswordDialogModule } from './../forgotten-password-dialog/forgotten-password-dialog.module';
import { LoginDoneDialogModule } from './../login-done-dialog/login-done-dialog.module';

import { AuthenticationService } from './../../services/authentication.service';
import { GetCurrentUserService } from './../../services/getcurrentuser.service';

import { LoginDialogComponent } from './../login-dialog/login-dialog.component'
import { RegisterDialogComponent } from './../register-dialog/register-dialog.component'
import { ForgottenPasswordDialogComponent } from './../forgotten-password-dialog/forgotten-password-dialog.component';
import { LoginDoneDialogComponent } from './../login-done-dialog/login-done-dialog.component';

@NgModule({
  declarations: [ LoginDialogComponent ],
  imports: [ ReactiveFormsModule, AngularMaterialModule, RegisterDialogModule, ForgottenPasswordDialogModule, LoginDoneDialogModule ],
  providers: [ AuthenticationService, GetCurrentUserService ],
  exports: [ LoginDialogComponent ],
  entryComponents: [ RegisterDialogComponent, ForgottenPasswordDialogComponent, LoginDoneDialogComponent ]
})

export class LoginDialogModule { }
