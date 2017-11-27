import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import Backendless from 'backendless';

const APP_ID:string = 'CE2DCC90-CCDC-1297-FFCC-777FF98A2000';
const APP_KEY:string = '53DC722A-331B-BFE3-FFC2-3B1E6242E800';
Backendless.serverURL = 'https://api.backendless.com';
 
Backendless.initApp(APP_ID, APP_KEY);

@Injectable()
export class GetCurrentUserService {
    private userDataSource = new Subject<any>();
    private flightsSource = new Subject<any>();

    userData = this.userDataSource.asObservable();
    flights = this.flightsSource.asObservable();

    updateNavBar(): void {
        Backendless.UserService.getCurrentUser()
            .then(currentUser => {
                if(currentUser === null)
                    this.userDataSource.next(null);

                this.userDataSource.next(currentUser);
            })
            .catch(error => {
                
            });
    }

    getFlights(): any {
        Backendless.UserService.getCurrentUser()
            .then(currentUser => {
                Backendless.Data.of('Users').findById 
                    ({
                        objectId: currentUser.objectId,
                        loadRelations: 'flights' 
                    })
                .then(result => {
                    const data = 
                    {
                        flights: result.flights,
                        lastName: currentUser.lastname
                    }
                    this.flightsSource.next(data);
                })
                .catch(error => {
                     console.log(error)
                });
            })
            .catch(error => {
                console.log(error);
            });
    } 
}

