import { NgModule } from '@angular/core';

import { AngularMaterialModule } from './../../angular_material.module';

import { LoginDoneDialogComponent } from './login-done-dialog.component'

@NgModule({
  declarations: [ LoginDoneDialogComponent ],
  imports: [  AngularMaterialModule ],
  exports: [ LoginDoneDialogComponent ]
})

export class LoginDoneDialogModule { }
