import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'app-register-done-dialog',
    templateUrl: './register-done-dialog.component.html',
    styleUrls: ['./register-done-dialog.component.css']
})

export class RegisterDoneDialogComponent {
    constructor(private dialogRef: MdDialogRef<RegisterDoneDialogComponent>) { }

    firstname: string;
    lastname: string;
}
