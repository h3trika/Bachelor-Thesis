import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GetCurrentUserService } from './../../services/getcurrentuser.service';

import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [ ProfileComponent ],
  providers: [ GetCurrentUserService ],
  imports: [ CommonModule ],
  exports: [ ProfileComponent ]
})

export class ProfileModule { }
