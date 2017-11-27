import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetCurrentUserService } from './../../../services/getcurrentuser.service';

import { HowToBookModule } from './how-to-book/how-to-book.module';
import { ChildrenModule } from './children/children.module';
import { PaymentsModule } from './payments/payments.module';

import { BookingInfoComponent } from './booking-info.component';
import { HowToBookComponent } from './how-to-book/how-to-book.component';
import { ChildrenComponent } from './children/children.component';
import { PaymentsComponent } from './payments/payments.component';

export const ROUTES: Routes = [
  { 
    path: 'booking-info', 
    component: BookingInfoComponent,
    children: [
      { path: 'how-to-book', component: HowToBookComponent },
      { path: 'children-and-infants', component: ChildrenComponent },
      { path: 'payments', component: PaymentsComponent },
    ]
  }
];

@NgModule({
  declarations: [ BookingInfoComponent ],
  imports: [  RouterModule.forChild(ROUTES), HowToBookModule, ChildrenModule, PaymentsModule ],
  providers: [ GetCurrentUserService ],
  exports: [ BookingInfoComponent ]
})

export class BookingInfoModule { }
