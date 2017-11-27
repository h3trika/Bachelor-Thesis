import { NgModule } from '@angular/core';

import { AngularMaterialModule } from './../../angular_material.module';
import { LoginDialogModule } from './../../inner-components/login-dialog/login-dialog.module';

import { GetCurrentUserService } from './../../services/getcurrentuser.service';

import { LoginDialogComponent } from './../../inner-components/login-dialog/login-dialog.component';

import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [ HeaderComponent ],
  imports: [ AngularMaterialModule, LoginDialogModule ],
  providers: [ GetCurrentUserService ],
  exports: [ HeaderComponent ],
  entryComponents: [ LoginDialogComponent ]
})

export class HeaderModule { }
