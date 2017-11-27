import { Injectable } from '@angular/core';
import Backendless from 'backendless';

const APP_ID:string = 'CE2DCC90-CCDC-1297-FFCC-777FF98A2000';
const APP_KEY:string = '53DC722A-331B-BFE3-FFC2-3B1E6242E800';
Backendless.serverURL = 'https://api.backendless.com';
 
Backendless.initApp(APP_ID, APP_KEY);

@Injectable()
export class ForgottenPasswordService {
    reset(email: string): any {
        let isEmailSent = false;

        try
        {
            Backendless.UserService.restorePasswordSync(email);
            isEmailSent = true;
        }
        catch(err)
        {
            isEmailSent = false;
        }
 
        return isEmailSent;
    }
}

