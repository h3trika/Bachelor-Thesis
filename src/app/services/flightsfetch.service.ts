import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import Backendless from 'backendless';

const APP_ID:string = 'CE2DCC90-CCDC-1297-FFCC-777FF98A2000';
const APP_KEY:string = '53DC722A-331B-BFE3-FFC2-3B1E6242E800';
Backendless.serverURL = 'https://api.backendless.com';
 
Backendless.initApp(APP_ID, APP_KEY);

@Injectable()
export class FlightsFetchService {
    private flightsSource = new Subject<any>();

    flights = this.flightsSource.asObservable();

    getFlights(): any {
        Backendless.Data.of('Flights').find()
        .then(data =>{
            this.flightsSource.next(data);
        })
        .catch(error => {

        });
    }
}

