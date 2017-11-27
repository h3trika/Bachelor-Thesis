import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from './../../angular_material.module';

import { TicketBuyDialogComponent } from './ticket-buy-dialog.component'

@NgModule({
  declarations: [ TicketBuyDialogComponent ],
  imports: [ ReactiveFormsModule, AngularMaterialModule ],
  exports: [ TicketBuyDialogComponent ]
})

export class TicketBuyDialogModule { }
