import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GetCurrentUserService } from './../../../services/getcurrentuser.service';

@Component({
    selector: 'app-travel-info',
    templateUrl: './travel-info.component.html',
    styleUrls: ['./travel-info.component.css']
})

export class TravelInfoComponent {
    constructor(private router: Router, private currentUser: GetCurrentUserService) {
        this.router.events.subscribe(event => {
            if (event.constructor.name === 'NavigationEnd') {
                const currentRoute = this.router.url;
                switch(currentRoute) {
                    case '/travel-info/baggage':
                        this.addActiveClass(0);
                        break;
                    case '/travel-info/electronic-devices':
                        this.addActiveClass(1);
                        break;
                    case '/travel-info/special-assistance':
                        this.addActiveClass(2);
                        break;
                }
            }        
        });

        this.currentUser.updateNavBar();
    }

    activeRoute: string = 'Baggage';

    addActiveClass(routerNumber: number): void {
        const routes = document.querySelectorAll('.list-item');
        
        for(let i = 0; i < routes.length; i++){
            routes[i].classList.remove('active');
        }
        
        routes[routerNumber].classList.add('active');

        this.activeRoute = routes[routerNumber].innerHTML;
    }

    navigateToRoute(path: string): void {
        this.router.navigateByUrl(`/travel-info/${path}`);
    }

    navigateToOuterRoute(path: string): void {
        this.router.navigateByUrl(`/${path}`);
    }
}
