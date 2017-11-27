import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { DateAdapter, MdRadioButton } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { GetCurrentUserService } from './../services/getcurrentuser.service';
import { FlightsFetchService } from './../services/flightsfetch.service';
import { DataService } from './../services/data.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
    constructor(
        private currentUser: GetCurrentUserService,
        private FlightsFetchService: FlightsFetchService,
        private DataService: DataService,
        private dateAdapter: DateAdapter<Date>,
        private formBuilder: FormBuilder,
        private router: Router)
    {
        this.currentUser.updateNavBar();
        this.createForm();
        this.dateAdapter.setLocale('en-GB');      
        this.FlightsFetchService.getFlights();      
    }

    ngOnInit(): void {
        this.FlightsFetchService.flights.subscribe(data => {
            this.flights = data;

            this.flights.map(obj => {
                this.originCities.push(obj.fromCity);
                this.destinationCities.push(obj.toCity);
            });

            this.filteredOriginCities = this.searchFlightsForm.controls.origin.valueChanges
                .startWith(null)
                .map(val => val ? this.filterOrigin(val) : this.originCities.slice());

            this.filteredDestinationCities = this.searchFlightsForm.controls.origin.valueChanges
                .startWith(null)
                .map(val => val ? this.filterDestination(val) : this.originCities.slice());
        });
    }

    @ViewChildren(MdRadioButton) radioButtons: QueryList<MdRadioButton>;

    flights: any;
    originCities: Array<string> = [];
    destinationCities: Array<string> = [];
    filteredOriginCities: Observable<string[]>;
    filteredDestinationCities: Observable<string[]>;
    searchFlightsForm: FormGroup;
    radioButtonOneState: boolean;
    returnDatePickerDisabled: boolean = false;

    createForm(): void {
        this.searchFlightsForm = this.formBuilder.group({
            origin: ['', [Validators.required]],
            destination: ['',[Validators.required]],
            departureDate: [new Date(), [Validators.required]],
            returnDate: [new Date(), [Validators.required]],
        });
    };

    filterOrigin(val: string): string[] { 
        return this.originCities.filter(option =>
            option.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }

    filterDestination(val: string): string[] {   
        let avaiableDestinationCities = [];
        this.flights.map(obj => {
            if(obj.toCity === val)
                avaiableDestinationCities.push(obj.fromCity);
        });
        return avaiableDestinationCities;
    }

    radioButtonsOnChange(): void {
        const myToDateDatePickerIcon = (<HTMLElement>document.querySelector('.flight-search-container').querySelectorAll('md-icon')[1]);
        this.radioButtons.map(radioButton => {
            if(radioButton.checked) {
                this.searchFlightsForm.controls.returnDate.disable();
                this.returnDatePickerDisabled = true;
                myToDateDatePickerIcon.style.color = 'grey';
            } else {
                this.searchFlightsForm.controls.returnDate.enable();
                this.returnDatePickerDisabled = false;
                myToDateDatePickerIcon.style.color = '#C6007E';
            }
        });
    }

    closeErrorDialog(): void {
        const errorDialog = <HTMLElement>document.querySelector('.error-on-flight-search-container');

        setTimeout(_=> {
            errorDialog.style.display = 'none';
        },3000);
    }

    searchFlights(): void {
        let price;
        const originCity = this.searchFlightsForm.controls.origin.value;
        const destinationCity = this.searchFlightsForm.controls.destination.value;
        const departureDate = this.searchFlightsForm.controls.departureDate.value;
        const returnDate = this.searchFlightsForm.controls.returnDate.value;

        const errorDialog = <HTMLElement>document.querySelector('.error-on-flight-search-container');
        const errorTextContainer = <HTMLElement>document.querySelector('.error-text');

        if(this.originCities.indexOf(originCity) === -1) {
            errorTextContainer.innerHTML = 'No Such Origin City';
            errorDialog.style.display = 'block';
            this.closeErrorDialog();
            return;     
        }

        if(this.destinationCities.indexOf(destinationCity) === -1) { 
            errorTextContainer.innerHTML = 'No Such Destination City';
            errorDialog.style.display = 'block';
            this.closeErrorDialog();
            return;   
        }

        try {
            this.flights.map(obj => {
                if(obj.fromCity === originCity) {
                    if(new Date(obj.takingOff).getTime() === departureDate.getTime()) {
                        price = obj.price;
                    } else {
                        errorTextContainer.innerHTML = 'No Flights At Choosen Departure Date';
                        errorDialog.style.display = 'block';
                        this.closeErrorDialog();
                        throw 'Error';
                    }   
                }                        
            });
        } catch (e) {
            return; 
        }

        const isOneWayTrip = this.returnDatePickerDisabled;

        if(!isOneWayTrip) {
            try {
                this.flights.map(obj => {
                    if(obj.fromCity === destinationCity) {
                        if(new Date(obj.takingOff).getTime() === returnDate.getTime()) {
        
                        } else {
                            errorTextContainer.innerHTML = 'No Flights At Choosen Return Date';
                            errorDialog.style.display = 'block';
                            this.closeErrorDialog();
                            throw 'error'
                        }   
                    }                        
                });
            } catch (e) {
                return; 
            }
        } 

        if(isOneWayTrip){
            this.DataService.getTicketBuyData(originCity, destinationCity, isOneWayTrip, price, departureDate.toDateString());
        } else {
            this.DataService.getTicketBuyData(originCity, destinationCity, isOneWayTrip, price, departureDate.toDateString(), returnDate.toDateString());
        }
        
        this.router.navigateByUrl('/ticket-buy');
    }

    navigateTo(url: string): void {
        window.location.href = url;
    }
}
