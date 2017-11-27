import { NgModule } from '@angular/core';

import { AngularMaterialModule } from './../../angular_material.module';

import { RegisterDoneDialogComponent } from './register-done-dialog.component'

@NgModule({
  declarations: [ RegisterDoneDialogComponent ],
  imports: [  AngularMaterialModule ],
  exports: [ RegisterDoneDialogComponent ]
})

export class RegisterDoneDialogModule { }
