import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
    originCity: string;
    destinationCity: string
    isOneWay: boolean
    price: number;
    departureDate: string;
    returnDate: string;

    getTicketBuyData(
        originCity: string, 
        destinationCity: string, 
        isOneWay: boolean, 
        price: number,
        departureDate: string,
        returnDate?: string,
        ): void {
        this.originCity = originCity;
        this.destinationCity = destinationCity;
        this.isOneWay = isOneWay;
        this.price = price;
        this.departureDate = departureDate;
        this.returnDate = returnDate;
    }
}

