import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from './../../angular_material.module';
import { LoginDialogModule } from './../login-dialog/login-dialog.module';
import { TicketBuyDialogModule } from './../ticket-buy-dialog/ticket-buy-dialog.module';

import { GetCurrentUserService } from './../../services/getcurrentuser.service';
import { DataService } from './../../services/data.service';
import { AddNewUserFlightService } from './../../services/addnewuserflight.service';

import { LoginDialogComponent } from './../login-dialog/login-dialog.component';
import { TicketBuyDialogComponent } from './../ticket-buy-dialog/ticket-buy-dialog.component';

import { TicketBuyComponent } from './ticket-buy.component';

@NgModule({
  declarations: [ TicketBuyComponent ],
  imports: [ ReactiveFormsModule, AngularMaterialModule, LoginDialogModule, TicketBuyDialogModule ],
  exports: [ TicketBuyComponent ],
  providers: [ GetCurrentUserService, DataService, AddNewUserFlightService ],
  entryComponents: [ LoginDialogComponent, TicketBuyDialogComponent ]
})

export class TicketBuyModule { }
