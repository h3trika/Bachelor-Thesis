import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ForgottenPasswordService } from './../../services/forgottenpassword.service';

@Component({
    selector: 'app-forgotten-password-dialog',
    templateUrl: './forgotten-password-dialog.component.html',
    styleUrls: ['./forgotten-password-dialog.component.css']
})

export class ForgottenPasswordDialogComponent {
    constructor( 
        private formBuilder: FormBuilder, 
        private dialogRef: MdDialogRef<ForgottenPasswordDialogComponent>,
        private ForgottenPasswordService: ForgottenPasswordService) 
    {
        this.createForm();
    }

    showForgottenPasswordForm: boolean = true;
    wrongEmail: boolean = false;
    forgottenPasswordForm: FormGroup;

    createForm(): void {
        this.forgottenPasswordForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    };

    resetPassword(): void {
        const isEmailSent = this.ForgottenPasswordService.reset(this.forgottenPasswordForm.controls.email.value);
        
        if(isEmailSent){
            this.showForgottenPasswordForm = false;
            this.wrongEmail = true;

            setTimeout(_=> {
                this.dialogRef.close();
            },4000);
        } else {
            this.wrongEmail = true;
        }
    }

    closeforgottenPasswordDialog(): void {
        this.dialogRef.close();
    }
}
