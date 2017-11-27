import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Backendless from 'backendless';

import { GetCurrentUserService } from './../../services/getcurrentuser.service';

const APP_ID:string = 'CE2DCC90-CCDC-1297-FFCC-777FF98A2000';
const APP_KEY:string = '53DC722A-331B-BFE3-FFC2-3B1E6242E800';
Backendless.serverURL = 'https://api.backendless.com';
 
Backendless.initApp(APP_ID, APP_KEY);

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent {
    constructor(private currentUser: GetCurrentUserService, private router: Router) {
        this.currentUser.updateNavBar();
        this.currentUser.getFlights();

        this.currentUser.flights.subscribe(data => {
            this.flightsToShow = true;
            this.lastName = data.lastName;

            for(let flight of data.flights){
                if(new Date(flight.takingOff).getTime() > new Date().getTime()) {
                    this.upcomingTrips.push(flight);
                } else {
                    this.previousTrips.push(flight);
                }
            }
        });
    }

    flightsToShow: boolean = false;
    upcomingTrips: Array<any> = [];
    previousTrips: Array<any> = [];
    lastName: string;

    signOut(): void {
        Backendless.UserService.logout()
        .then(_ => {
            this.currentUser.updateNavBar();
            this.router.navigateByUrl(`/`);
        })
        .catch(error => {
            console.log(error)
        });
    }
}
