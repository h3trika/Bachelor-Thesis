import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetCurrentUserService } from './../../../services/getcurrentuser.service';

import { RefundsModule } from './refunds/refunds.module';
import { BillingModule } from './billing/billing.module';
import { FaresModule } from './fares/fares.module';

import { PricesDiscountsComponent } from './prices-discounts.component';
import { RefundsComponent } from './refunds/refunds.component';
import { BillingComponent } from './billing/billing.component';
import { FaresComponent } from './fares/fares.component';

export const ROUTES: Routes = [
  { 
    path: 'prices-discounts', 
    component: PricesDiscountsComponent,
    children: [
      { path: 'refunds-and-compensations', component: RefundsComponent },
      { path: 'billing-guide', component: BillingComponent },
      { path: 'fares-bundles', component: FaresComponent },
    ]
  }
];

@NgModule({
  declarations: [ PricesDiscountsComponent ],
  imports: [  RouterModule.forChild(ROUTES), RefundsModule, BillingModule, FaresModule ],
  providers: [ GetCurrentUserService ],
  exports: [ PricesDiscountsComponent ]
})

export class PricesDiscountsModule { }
