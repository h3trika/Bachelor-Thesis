import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GetCurrentUserService } from './../../services/getcurrentuser.service';
import { DataService } from './../../services/data.service';
import { AddNewUserFlightService } from './../../services/addnewuserflight.service';

import { LoginDialogComponent } from './../login-dialog/login-dialog.component';
import { TicketBuyDialogComponent } from './../ticket-buy-dialog/ticket-buy-dialog.component';

@Component({
    selector: 'app-ticket-buy',
    templateUrl: './ticket-buy.component.html',
    styleUrls: ['./ticket-buy.component.css']
})

export class TicketBuyComponent implements OnInit {
      constructor(
        private mdDialog: MdDialog,   
        private GetCurrentUserService: GetCurrentUserService,
        private DataService: DataService,
        private AddNewUserFlightService: AddNewUserFlightService,
        private formBuilder: FormBuilder) 
    {
        this.GetCurrentUserService.updateNavBar();
        this.GetCurrentUserService.userData.subscribe(data => {
            if(data !== null) {
                this.userName = `${data.firstname} ${data.lastname}`.split(' ');
                this.userId = data.objectId;
            }
        });
        this.originCity = this.DataService.originCity;
        this.destinationCity = this.DataService.destinationCity;
        this.isOneWayTrip = this.DataService.isOneWay;
        this.price = this.DataService.price;
        this.departureDate = this.DataService.departureDate;
        this.returnDate = this.DataService.returnDate;
        if(!this.isOneWayTrip) 
            this.price = this.price * 2;    
        this.createForm();     
    }

    ngOnInit(): void {
        this.femaleContainer = <HTMLElement>document.querySelector('.gender-container-female');
        this.maleContainer = <HTMLElement>document.querySelector('.gender-container-male');

        this.noneContainer = <HTMLElement>document.querySelector('.baggage-container-none');
        this.normalContainer = <HTMLElement>document.querySelector('.baggage-container-normal');
        this.bigContainer = <HTMLElement>document.querySelector('.baggage-container-big');
        this.normalSelectedBaggage = <HTMLElement>document.querySelector('.normal-baggage-selected');
        this.bigSelectedBaggage = <HTMLElement>document.querySelector('.big-baggage-selected');
        this.normalUnSelectedBaggage = <HTMLElement>document.querySelector('.normal-baggage-unselected');
        this.bigUnSelectedBaggage = <HTMLElement>document.querySelector('.big-baggage-unselected');
        this.smallText = <HTMLElement>document.querySelector('.baggage-bottom-text-small');
        this.bigText = <HTMLElement>document.querySelector('.baggage-bottom-text-big');
        this.smallBaggage = <HTMLElement>document.querySelector('.baggage-container-small');
        this.largeBaggage = <HTMLElement>document.querySelector('.baggage-container-large');
        this.smallSelectedBaggage = <HTMLElement>document.querySelector('.small-baggage-selected');
        this.largeSelectedBaggage = <HTMLElement>document.querySelector('.large-baggage-selected');
        this.smallUnSelectedBaggage = <HTMLElement>document.querySelector('.small-baggage-unselected');
        this.largeUnSelectedBaggage = <HTMLElement>document.querySelector('.large-baggage-unselected');
        this.smallerText = <HTMLElement>document.querySelector('.baggage-bottom-text-smaller');
        this.largeText = <HTMLElement>document.querySelector('.baggage-bottom-text-large');

        setTimeout(_ => {
            this.noneContainerTwo = <HTMLElement>document.querySelector('.baggage-container-none-two');
            this.normalContainerTwo = <HTMLElement>document.querySelector('.baggage-container-normal-two');
            this.bigContainerTwo = <HTMLElement>document.querySelector('.baggage-container-big-two');
            this.normalSelectedBaggageTwo = <HTMLElement>document.querySelector('.normal-baggage-selected-two');
            this.bigSelectedBaggageTwo = <HTMLElement>document.querySelector('.big-baggage-selected-two');
            this.normalUnSelectedBaggageTwo = <HTMLElement>document.querySelector('.normal-baggage-unselected-two');
            this.bigUnSelectedBaggageTwo = <HTMLElement>document.querySelector('.big-baggage-unselected-two');
            this.smallTextTwo = <HTMLElement>document.querySelector('.baggage-bottom-text-small-two');
            this.bigTextTwo = <HTMLElement>document.querySelector('.baggage-bottom-text-big-two');
            this.smallBaggageTwo = <HTMLElement>document.querySelector('.baggage-container-small-two');
            this.largeBaggageTwo = <HTMLElement>document.querySelector('.baggage-container-large-two');
            this.smallSelectedBaggageTwo = <HTMLElement>document.querySelector('.small-baggage-selected-two');
            this.largeSelectedBaggageTwo = <HTMLElement>document.querySelector('.large-baggage-selected-two');
            this.smallUnSelectedBaggageTwo = <HTMLElement>document.querySelector('.small-baggage-unselected-two');
            this.largeUnSelectedBaggageTwo = <HTMLElement>document.querySelector('.large-baggage-unselected-two');
            this.smallerTextTwo = <HTMLElement>document.querySelector('.baggage-bottom-text-smaller-two');
            this.largeTextTwo = <HTMLElement>document.querySelector('.baggage-bottom-text-large-two');
            
        },100);  

        this.errorText = <HTMLElement>document.querySelector('.error-text');   
    }

    userId: string;
    userName: Array<string> | null;
    originCity: string;
    destinationCity: string;
    isOneWayTrip: boolean;
    price: number;
    departureDate: string;
    returnDate: string;
    ticketBuyForm: FormGroup;

    femaleContainer: HTMLElement;
    maleContainer: HTMLElement;

    noneContainer: HTMLElement;
    normalContainer: HTMLElement;
    bigContainer: HTMLElement;
    normalSelectedBaggage: HTMLElement;
    bigSelectedBaggage: HTMLElement;
    normalUnSelectedBaggage: HTMLElement;
    bigUnSelectedBaggage: HTMLElement;
    smallText: HTMLElement;
    bigText: HTMLElement;
    smallBaggage: HTMLElement;
    largeBaggage: HTMLElement;
    smallSelectedBaggage: HTMLElement;
    largeSelectedBaggage: HTMLElement;
    smallUnSelectedBaggage: HTMLElement;
    largeUnSelectedBaggage: HTMLElement;
    smallerText: HTMLElement;
    largeText: HTMLElement;

    noneContainerTwo: HTMLElement;
    normalContainerTwo: HTMLElement;
    bigContainerTwo: HTMLElement;
    normalSelectedBaggageTwo: HTMLElement;
    bigSelectedBaggageTwo: HTMLElement;
    normalUnSelectedBaggageTwo: HTMLElement;
    bigUnSelectedBaggageTwo: HTMLElement;
    smallTextTwo: HTMLElement;
    bigTextTwo: HTMLElement;
    smallBaggageTwo: HTMLElement;
    largeBaggageTwo: HTMLElement;
    smallSelectedBaggageTwo: HTMLElement;
    largeSelectedBaggageTwo: HTMLElement;
    smallUnSelectedBaggageTwo: HTMLElement;
    largeUnSelectedBaggageTwo: HTMLElement;
    smallerTextTwo: HTMLElement;
    largeTextTwo: HTMLElement;

    errorText: HTMLElement;
    
    createForm(): void {
        this.ticketBuyForm = this.formBuilder.group({
            firstName: ['', [Validators.required]],
            lastName: ['',[Validators.required]]
        });
    };

    buyTicket(): void {
        const firstName = this.ticketBuyForm.controls.firstName.value;
        const lastName = this.ticketBuyForm.controls.lastName.value;
        const genderContainer = document.querySelectorAll('.gender-container');
        const checkedInBaggageContainer = document.querySelectorAll('.checked-in-baggage-container');
        const cabinBaggageContainer = document.querySelectorAll('.cabin-baggage-container');
        const checkedInBaggageTwoContainer = document.querySelectorAll('.checked-in-baggage-container-two');
        const cabinBaggageTwoContainer = document.querySelectorAll('.cabin-baggage-container-two');
     
        let gender;
        let totalBaggagePrice = 0;

        for(let i = 0; i < genderContainer.length; i++){
            if(genderContainer[i].classList.contains('active'))
                gender = genderContainer[i].children[0].innerHTML;
        }

        for(let i = 0; i < checkedInBaggageContainer.length; i++){
            if(checkedInBaggageContainer[i].classList.contains('active'))
                totalBaggagePrice += parseInt(checkedInBaggageContainer[i].children[0].children[2].innerHTML);
        }
        
        for(let i = 0; i < cabinBaggageContainer.length; i++){
            if(cabinBaggageContainer[i].classList.contains('active'))
                totalBaggagePrice += parseInt(cabinBaggageContainer[i].children[0].children[2].innerHTML);
        }

        if(!this.isOneWayTrip) {
            for(let i = 0; i < checkedInBaggageTwoContainer.length; i++){
                if(checkedInBaggageTwoContainer[i].classList.contains('active'))
                    totalBaggagePrice += parseInt(checkedInBaggageTwoContainer[i].children[0].children[2].innerHTML);
            }
        
            for(let i = 0; i < cabinBaggageTwoContainer.length; i++){
                if(cabinBaggageTwoContainer[i].classList.contains('active'))
                    totalBaggagePrice += parseInt(cabinBaggageTwoContainer[i].children[0].children[2].innerHTML);
            }
        }
   
        if(this.userName === null || this.userName === undefined) {
            const loginDialogRef = this.mdDialog.open(LoginDialogComponent);
        } else {
            const ticketBuyDialogRef = this.mdDialog.open(TicketBuyDialogComponent);
            ticketBuyDialogRef.componentInstance.firstName = firstName;
            ticketBuyDialogRef.componentInstance.lastName = lastName;
            ticketBuyDialogRef.componentInstance.price = this.price;
            ticketBuyDialogRef.componentInstance.baggagePrice = totalBaggagePrice;
            
            ticketBuyDialogRef.beforeClose().subscribe(_=> {
                if(ticketBuyDialogRef.componentInstance.isTicketBought) {   
                    if(this.isOneWayTrip) {
                        this.AddNewUserFlightService.addNewUserFlight(this.userId, this.originCity, this.destinationCity, this.departureDate);
                    } else {
                        this.AddNewUserFlightService.addNewUserFlight(this.userId, this.originCity, this.destinationCity, this.departureDate, this.returnDate);
                    } 
                }
            });
        }
    }

    femaleSelected(): void {   
        this.femaleContainer.classList.add('active');
        this.maleContainer.classList.remove('active');      
    }
    maleSelected(): void {
        this.maleContainer.classList.add('active');
        this.femaleContainer.classList.remove('active');        
    }
    noneBaggageSelected(): void {
        this.noneContainer.classList.add('active');
        this.normalContainer.classList.remove('active');
        this.bigContainer.classList.remove('active');

        this.normalContainer.style.borderRightColor = '#919191';

        this.normalUnSelectedBaggage.style.display = 'inline-block';
        this.bigUnSelectedBaggage.style.display = 'inline-block';
        this.normalSelectedBaggage.style.display = 'none';
        this.bigSelectedBaggage.style.display = 'none';

        this.smallText.innerHTML = ' It`s more expensive to add baggage online or at the airport after. ';
        this.bigText.innerHTML = 'Are you sure?';
    }
    normalBaggageSelected(): void {
        this.normalContainer.classList.add('active');
        this.noneContainer.classList.remove('active');
        this.bigContainer.classList.remove('active');

        this.noneContainer.style.borderRightColor = '#c6007e';

        this.normalSelectedBaggage.style.display = 'inline-block';
        this.bigUnSelectedBaggage.style.display = 'inline-block';
        this.bigSelectedBaggage.style.display = 'none';
        this.normalUnSelectedBaggage.style.display = 'none';

        this.smallText.innerHTML = ' You`ve selected our most popular checked baggage choice.';
        this.bigText.innerHTML = 'Great choice!';
    }
    bigBaggageSelected(): void {
        this.bigContainer.classList.add('active');
        this.noneContainer.classList.remove('active');
        this.normalContainer.classList.remove('active');
  
        this.normalContainer.style.borderRightColor = '#c6007e';
        this.noneContainer.style.borderRightColor = '#919191';

        this.bigSelectedBaggage.style.display = 'inline-block';
        this.normalUnSelectedBaggage.style.display = 'inline-block';
        this.normalSelectedBaggage.style.display = 'none';
        this.bigUnSelectedBaggage.style.display = 'none';

        this.smallText.innerHTML = ' You`ve selected the best price per kg carried.';
        this.bigText.innerHTML = 'Start packing!';
    }
    smallBaggageSelected(): void {
        this.smallBaggage.classList.add('active');
        this.largeBaggage.classList.remove('active');

        this.smallSelectedBaggage.style.display = 'inline-block';
        this.largeUnSelectedBaggage.style.display = 'inline-block';
        this.largeSelectedBaggage.style.display = 'none';
        this.smallUnSelectedBaggage.style.display = 'none';

        this.smallerText.innerHTML = ' Have an awesome trip!';
        this.largeText.innerHTML = 'Traveling light?';
    }
    largeBaggageSelected(): void {
        this.largeBaggage.classList.add('active');
        this.smallBaggage.classList.remove('active');

        this.smallBaggage.style.borderRightColor = '#c6007e'; 

        this.largeSelectedBaggage.style.display = 'inline-block';
        this.smallUnSelectedBaggage.style.display = 'inline-block';
        this.smallSelectedBaggage.style.display = 'none';
        this.largeUnSelectedBaggage.style.display = 'none';

        this.smallerText.innerHTML = ' Ready to go with our maximum size cabin baggage.';
        this.largeText.innerHTML = 'Congrats!';
    }
    noneBaggageSelectedTwo(): void {
        this.noneContainerTwo.classList.add('active');
        this.normalContainerTwo.classList.remove('active');
        this.bigContainerTwo.classList.remove('active');

        this.normalContainerTwo.style.borderRightColor = '#919191';

        this.normalUnSelectedBaggageTwo.style.display = 'inline-block';
        this.bigUnSelectedBaggageTwo.style.display = 'inline-block';
        this.normalSelectedBaggageTwo.style.display = 'none';
        this.bigSelectedBaggageTwo.style.display = 'none';

        this.smallTextTwo.innerHTML = ' It`s more expensive to add baggage online or at the airport after. ';
        this.bigTextTwo.innerHTML = 'Are you sure?';
    }
    normalBaggageSelectedTwo(): void {
        this.normalContainerTwo.classList.add('active');
        this.noneContainerTwo.classList.remove('active');
        this.bigContainerTwo.classList.remove('active');

        this.noneContainerTwo.style.borderRightColor = '#c6007e';

        this.normalSelectedBaggageTwo.style.display = 'inline-block';
        this.bigUnSelectedBaggageTwo.style.display = 'inline-block';
        this.bigSelectedBaggageTwo.style.display = 'none';
        this.normalUnSelectedBaggageTwo.style.display = 'none';

        this.smallTextTwo.innerHTML = ' You`ve selected our most popular checked baggage choice.';
        this.bigTextTwo.innerHTML = 'Great choice!';
    }
    bigBaggageSelectedTwo(): void {
        this.bigContainerTwo.classList.add('active');
        this.noneContainerTwo.classList.remove('active');
        this.normalContainerTwo.classList.remove('active');
  
        this.normalContainerTwo.style.borderRightColor = '#c6007e';
        this.noneContainerTwo.style.borderRightColor = '#919191';

        this.bigSelectedBaggageTwo.style.display = 'inline-block';
        this.normalUnSelectedBaggageTwo.style.display = 'inline-block';
        this.normalSelectedBaggageTwo.style.display = 'none';
        this.bigUnSelectedBaggageTwo.style.display = 'none';

        this.smallTextTwo.innerHTML = ' You`ve selected the best price per kg carried.';
        this.bigTextTwo.innerHTML = 'Start packing!';
    }
    smallBaggageSelectedTwo(): void {
        this.smallBaggageTwo.classList.add('active');
        this.largeBaggageTwo.classList.remove('active');

        this.smallSelectedBaggageTwo.style.display = 'inline-block';
        this.largeUnSelectedBaggageTwo.style.display = 'inline-block';
        this.largeSelectedBaggageTwo.style.display = 'none';
        this.smallUnSelectedBaggageTwo.style.display = 'none';

        this.smallerTextTwo.innerHTML = ' Have an awesome trip!';
        this.largeTextTwo.innerHTML = 'Traveling light?';
    }
    largeBaggageSelectedTwo(): void {
        this.largeBaggageTwo.classList.add('active');
        this.smallBaggageTwo.classList.remove('active');

        this.smallBaggageTwo.style.borderRightColor = '#c6007e'; 

        this.largeSelectedBaggageTwo.style.display = 'inline-block';
        this.smallUnSelectedBaggageTwo.style.display = 'inline-block';
        this.smallSelectedBaggageTwo.style.display = 'none';
        this.largeUnSelectedBaggageTwo.style.display = 'none';

        this.smallerTextTwo.innerHTML = ' Ready to go with our maximum size cabin baggage.';
        this.largeTextTwo.innerHTML = 'Congrats!';
    }
}
