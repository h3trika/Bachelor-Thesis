import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-ticket-buy-dialog',
    templateUrl: './ticket-buy-dialog.component.html',
    styleUrls: ['./ticket-buy-dialog.component.css']
})

export class TicketBuyDialogComponent {
    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MdDialogRef<TicketBuyDialogComponent>)
    {
        this.createForm();
    }

    ticketBuyDialogForm: FormGroup;
    isTicketBought: boolean = false;

    firstName: string;
    lastName: string;
    price: number;
    baggagePrice: number;
    cardMounts: Array<string> = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    cardYears: Array<string> = ['17','18','19','20','21','22','23','24','25','26'];

    createForm(): void {
        this.ticketBuyDialogForm = this.formBuilder.group({
            cardNumber: ['',[Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
            cardName: ['',[Validators.required]],
            mountSelect: ['',[Validators.required]],
            yearSelect: ['',[Validators.required]],
            ccv: ['',[Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
        });
    }

    checkIfOnlyDigits(regex: RegExp): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
            const controlValue = control.value;
            const result = regex.test(controlValue);
            return result ? null : {specialOrDigit: true }
        };
    }

    finishBuyingTicket(): void {
        this.dialogRef.close();
        this.isTicketBought = true;
    }
}
