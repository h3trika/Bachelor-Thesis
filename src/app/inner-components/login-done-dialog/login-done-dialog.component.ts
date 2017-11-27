import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'app-login-done-dialog',
    templateUrl: './login-done-dialog.component.html',
    styleUrls: ['./login-done-dialog.component.css']
})

export class LoginDoneDialogComponent {
    constructor(private dialogRef: MdDialogRef<LoginDoneDialogComponent>) { }

    firstname: string;
    lastname: string;
}
