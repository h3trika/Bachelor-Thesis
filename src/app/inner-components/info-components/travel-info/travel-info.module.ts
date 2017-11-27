import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetCurrentUserService } from './../../../services/getcurrentuser.service';

import { BaggageModule } from './baggage/baggage.module';
import { ElectronicDevicesModule } from './electronic-devices/electronic-devices.module';
import { SpecialAssistanceModule } from './special-assistance/special-assistance.module';

import { TravelInfoComponent } from './travel-info.component';
import { BaggageComponent } from './baggage/baggage.component';
import { ElectronicDevicesComponent } from './electronic-devices/electronic-devices.component';
import { SpecialAssistanceComponent } from './special-assistance/special-assistance.component';

export const ROUTES: Routes = [
  { 
    path: 'travel-info', 
    component: TravelInfoComponent,
    children: [
      { path: 'baggage', component: BaggageComponent },
      { path: 'electronic-devices', component: ElectronicDevicesComponent },
      { path: 'special-assistance', component: SpecialAssistanceComponent },
    ]
  }
];

@NgModule({
  declarations: [ TravelInfoComponent ],
  imports: [  RouterModule.forChild(ROUTES), BaggageModule, ElectronicDevicesModule, SpecialAssistanceModule ],
  providers: [ GetCurrentUserService ],
  exports: [ TravelInfoComponent ]
})

export class TravelInfoModule { }
