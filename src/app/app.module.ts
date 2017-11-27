import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeModule } from './home/home.module';
import { HeaderModule } from './inner-components/header/header.module';
import { FooterModule } from './inner-components/footer/footer.module';
import { ProfileModule } from './inner-components/profile/profile.module';
import { TicketBuyModule } from './inner-components/ticket-buy/ticket-buy.module';
import { BookingInfoModule } from './inner-components/info-components/booking-info/booking-info.module';
import { PricesDiscountsModule } from './inner-components/info-components/prices-discounts/prices-discounts.module';
import { TravelInfoModule } from './inner-components/info-components/travel-info/travel-info.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './inner-components/profile/profile.component';
import { TicketBuyComponent } from './inner-components/ticket-buy/ticket-buy.component';
import { BookingInfoComponent } from './inner-components/info-components/booking-info/booking-info.component';
import { PricesDiscountsComponent } from './inner-components/info-components/prices-discounts/prices-discounts.component';
import { TravelInfoComponent } from './inner-components/info-components/travel-info/travel-info.component';

export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'ticket-buy', component: TicketBuyComponent },
    { path: 'booking-info', component: BookingInfoComponent },
    { path: 'prices-discounts', component: PricesDiscountsComponent },
    { path: 'travel-info', component: TravelInfoComponent }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule, RouterModule.forRoot(ROUTES), HomeModule, HeaderModule, FooterModule, ProfileModule, 
        TicketBuyModule, BookingInfoModule, PricesDiscountsModule, TravelInfoModule
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})

export class AppModule { }
