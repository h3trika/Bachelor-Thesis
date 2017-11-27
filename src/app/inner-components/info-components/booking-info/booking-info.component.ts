import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GetCurrentUserService } from './../../../services/getcurrentuser.service';

@Component({
    selector: 'app-booking-info',
    templateUrl: './booking-info.component.html',
    styleUrls: ['./booking-info.component.css']
})

export class BookingInfoComponent {
    constructor(private router: Router, private currentUser: GetCurrentUserService) {
        this.router.events.subscribe(event => {
            if (event.constructor.name === 'NavigationEnd') {
                const currentRoute = this.router.url;
                switch(currentRoute) {
                    case '/booking-info/how-to-book':
                        this.addActiveClass(0);
                        break;
                    case '/booking-info/children-and-infants':
                        this.addActiveClass(1);
                        break;
                    case '/booking-info/payments':
                        this.addActiveClass(2);
                        break;
                }
            }        
        });

        this.currentUser.updateNavBar();
    }

    activeRoute: string = 'How To Book';

    addActiveClass(routerNumber: number): void {
        const routes = document.querySelectorAll('.list-item');
        
        for(let i = 0; i < routes.length; i++){
            routes[i].classList.remove('active');
        }
        
        routes[routerNumber].classList.add('active');

        this.activeRoute = routes[routerNumber].innerHTML;
    }

    navigateToRoute(path: string): void {
        this.router.navigateByUrl(`/booking-info/${path}`);
    }

    navigateToOuterRoute(path: string): void {
        this.router.navigateByUrl(`/${path}`);
    }
}
