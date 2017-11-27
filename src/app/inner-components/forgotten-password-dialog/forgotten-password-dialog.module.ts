import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from './../../angular_material.module';

import { ForgottenPasswordDialogComponent } from './forgotten-password-dialog.component';

import { ForgottenPasswordService } from './../../services/forgottenpassword.service';

@NgModule({
  declarations: [ ForgottenPasswordDialogComponent ],
  imports: [ ReactiveFormsModule, AngularMaterialModule ],
  providers: [ ForgottenPasswordService ],
  exports: [ ForgottenPasswordDialogComponent ]
})

export class ForgottenPasswordDialogModule { }
