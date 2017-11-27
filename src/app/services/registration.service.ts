import { Injectable } from '@angular/core';
import Backendless from 'backendless';

const APP_ID:string = 'CE2DCC90-CCDC-1297-FFCC-777FF98A2000';
const APP_KEY:string = '53DC722A-331B-BFE3-FFC2-3B1E6242E800';
Backendless.serverURL = 'https://api.backendless.com';
 
Backendless.initApp(APP_ID, APP_KEY);

@Injectable()
export class RegistrationService {

    register(firstname: string, lastname:string, email: string, password: string): boolean {
        const user = new Backendless.User();
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        user.password = password;
        
        let isUserRegistered = false;

        try
        {
            Backendless.UserService.registerSync(user);
            isUserRegistered = true;
        }
        catch(err)
        {
            isUserRegistered = false;
        }
 
        return isUserRegistered;
    }

}

