import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GetCurrentUserService } from './../../../services/getcurrentuser.service';

@Component({
    selector: 'app-prices-discounts',
    templateUrl: './prices-discounts.component.html',
    styleUrls: ['./prices-discounts.component.css']
})

export class PricesDiscountsComponent {
    constructor(private router: Router, private currentUser: GetCurrentUserService) {
        this.router.events.subscribe(event => {
            if (event.constructor.name === 'NavigationEnd') {
                const currentRoute = this.router.url;
                switch(currentRoute) {
                    case '/prices-discounts/refunds-and-compensations':
                        this.addActiveClass(0);
                        break;
                    case '/prices-discounts/billing-guide':
                        this.addActiveClass(1);
                        break;
                    case '/prices-discounts/fares-bundles':
                        this.addActiveClass(2);
                        break;
                }
            }        
        });

        this.currentUser.updateNavBar();
    }

    activeRoute: string = 'Refunds And Compensations';

    addActiveClass(routerNumber: number): void {
        const routes = document.querySelectorAll('.list-item');
        
        for(let i = 0; i < routes.length; i++){
            routes[i].classList.remove('active');
        }
        
        routes[routerNumber].classList.add('active');
        let routeName = routes[routerNumber].innerHTML;

        if(routeName === 'Fares &amp; Bundles')
            routeName = 'Fares & Bundles';

        this.activeRoute = routeName;
    }

    navigateToRoute(path: string): void {
        this.router.navigateByUrl(`/prices-discounts/${path}`);
    }

    navigateToOuterRoute(path: string): void {
        this.router.navigateByUrl(`/${path}`);
    }
}
