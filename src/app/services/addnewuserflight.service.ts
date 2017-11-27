import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import Backendless from 'backendless';

const APP_ID:string = 'CE2DCC90-CCDC-1297-FFCC-777FF98A2000';
const APP_KEY:string = '53DC722A-331B-BFE3-FFC2-3B1E6242E800';
Backendless.serverURL = 'https://api.backendless.com';
 
Backendless.initApp(APP_ID, APP_KEY);

@Injectable()
export class AddNewUserFlightService {
    constructor(private Router: Router) { }

    addNewUserFlight(
        userId: string, 
        fromDestination: string, 
        toDestination: string, 
        departureDate: string,
        returnDate?: string) 
        {

            if(returnDate) {
                Backendless.Data.of('User_Flights').save(
                {
                    confirmNumber: this.generateRandomConfirmNumber(),
                    fromDestination: toDestination,
                    toDestination: fromDestination,
                    takingOff: returnDate
                })
                .then(savedObject => {
                    Backendless.Data.of('Users').addRelation( 
                        userId,
                        'flights:User_Flights:n',
                        [savedObject.objectId] 
                    )
                    .then(count => {})
                    .catch(error => console.log(error));
                })
                .catch(error => console.log(error));
            }

            Backendless.Data.of('User_Flights').save(
            {
                confirmNumber: this.generateRandomConfirmNumber(),
                fromDestination: fromDestination,
                toDestination: toDestination,
                takingOff: departureDate
            })
            .then(savedObject => {            
                Backendless.Data.of('Users').addRelation( 
                    userId,
                    'flights:User_Flights:n',
                    [savedObject.objectId]
                )
                .then(count => this.Router.navigateByUrl('/profile'))
                .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    }
                    
    generateRandomConfirmNumber() {
        let text = '';
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        for (let i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
}

