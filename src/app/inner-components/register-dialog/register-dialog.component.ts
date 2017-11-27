import { Component } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { RegisterDoneDialogComponent } from './../register-done-dialog/register-done-dialog.component';
import { RegistrationService } from './../../services/registration.service';

@Component({
    selector: 'app-register-dialog',
    templateUrl: './register-dialog.component.html',
    styleUrls: ['./register-dialog.component.css']
})

export class RegisterDialogComponent {
    constructor(
        private dialogRef: MdDialogRef<RegisterDialogComponent>, 
        private dialog: MdDialog,
        private formBuilder: FormBuilder,
        private RegistrationService: RegistrationService) 
    {
        this.createForm();

        this.registerForm.valueChanges
            .subscribe( data => this.checkFormValidity( data ) );
    }

    userExist: boolean = false;
    registerForm: FormGroup;

    createForm(): void {
      this.registerForm = this.formBuilder.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['',[
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
          this.checkForCapitalLetter(/[A-Z]/),
          this.checkForLowerCaseLetter(/[a-z]/)
        ]],
        terms: ['', Validators.requiredTrue]
      });
    };

    checkForCapitalLetter(regex: RegExp): ValidatorFn {
      return (control: AbstractControl): {[key: string]: any} => {
        const name = control.value;
        const no = regex.test(name);
        return no ? null : {capital: true }
      };
    };

    checkForLowerCaseLetter(regex: RegExp): ValidatorFn {
      return (control: AbstractControl): {[key: string]: any} => {
        const name = control.value;
        const no = regex.test(name);
        return no ? null : {lowercase: true }
      };
    };

    errMsgs: any = {
      firstname: [],
      lastname: [],
      email: [],
      password: []
    };

    translations: any = {
      firstname: {
        required: 'The firstname is required.'
      },
      lastname: {
        required: 'The firstname is required.'
      },
      email: {
        required: 'The email is required.',
        email: 'This is not a valid email.'
      },
      password: {
        required: 'The password is required.',
        minlength: 'The length must be atleast 6 symbols',
        maxlength: 'The length must not exceed 12 symbols',
        capital: 'Password should have one capital letter',
        lowercase: 'Password should have one lower case letter',
      }
    };

    checkFormValidity(data?: any): void {
      for( let k in this.errMsgs ) {
        this.errMsgs[k] = [];
        if( this.registerForm.controls[k].errors && this.registerForm.controls[k].dirty ) {
          for( let e in this.registerForm.controls[k].errors ) {
            if( this.translations[k][e] ) {
              this.errMsgs[k].push( this.translations[k][e] );
            }
          }
        }
      }
    };

    closeRegisterDialog(): void {
        this.dialogRef.close();
    }

    register(): void {
        const isRegistered = this.RegistrationService.register(
            this.registerForm.controls.firstname.value,
            this.registerForm.controls.lastname.value,
            this.registerForm.controls.email.value,
            this.registerForm.controls.password.value
        );

        if(isRegistered){
            this.dialogRef.close();
            const registerDoneDialogRef = this.dialog.open(RegisterDoneDialogComponent);
            registerDoneDialogRef.componentInstance.firstname = this.registerForm.controls.firstname.value;
            registerDoneDialogRef.componentInstance.lastname = this.registerForm.controls.lastname.value;

            setTimeout(_=> {
                registerDoneDialogRef.close();
            },1500);
        } else {
            this.userExist = true;
        }
    }
}
