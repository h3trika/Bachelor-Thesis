import { Component } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from './../../services/authentication.service';
import { GetCurrentUserService } from './../../services/getcurrentuser.service';

import { RegisterDialogComponent } from './../register-dialog/register-dialog.component';
import { ForgottenPasswordDialogComponent } from './../forgotten-password-dialog/forgotten-password-dialog.component';
import { LoginDoneDialogComponent } from './../login-done-dialog/login-done-dialog.component';

@Component({
    selector: 'app-login-dialog',
    templateUrl: './login-dialog.component.html',
    styleUrls: ['./login-dialog.component.css']
})

export class LoginDialogComponent {
    constructor(
        private dialogRef: MdDialogRef<LoginDialogComponent>, 
        private formBuilder: FormBuilder, 
        private dialog: MdDialog,
        private AuthenticationService: AuthenticationService,
        private GetCurrentUserService: GetCurrentUserService) 
    {
        this.createForm();
    }

    wrongPassword: boolean = false;
    loginForm: FormGroup;

    createForm(): void {
        this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['',[Validators.required]]
        });
    };

    closeLoginDialog(): void {
        this.dialogRef.close();
    }

    login(): void {
        const isUserRegistered = this.AuthenticationService.login(this.loginForm.controls.email.value,this.loginForm.controls.password.value);

        if(isUserRegistered) {
            this.dialogRef.close();
            this.GetCurrentUserService.updateNavBar();
            const loginDoneDialogRef = this.dialog.open(LoginDoneDialogComponent);

            this.GetCurrentUserService.userData.subscribe(data => {
                if(data !== null || loginDoneDialogRef !== null || loginDoneDialogRef.componentInstance !== null) {
                    const user = `${data.firstname} ${data.lastname}`.split(' ');
                    loginDoneDialogRef.componentInstance.firstname = user[0];
                    loginDoneDialogRef.componentInstance.lastname = user[1];
                }
            });

            setTimeout(_=> {
                loginDoneDialogRef.close();
            },700);
        } else {
            this.wrongPassword = true;
        }
    }

    forgottenPassword(): void {
        this.dialogRef.close();
        const forgottenPasswordDialogRef = this.dialog.open(ForgottenPasswordDialogComponent);
    }

    register(): void {
        this.dialogRef.close();
        const registerDialogRef = this.dialog.open(RegisterDialogComponent);
    }
}
