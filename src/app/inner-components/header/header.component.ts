import { Component, ViewChildren, QueryList, ViewEncapsulation } from '@angular/core';
import { MdMenuTrigger, MdDialog } from '@angular/material';
import { Router } from '@angular/router';

import { GetCurrentUserService } from './../../services/getcurrentuser.service';

import { LoginDialogComponent } from './../login-dialog/login-dialog.component';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '(window:resize)': 'onResize()'
    }
})

export class HeaderComponent {
    constructor(private dialog: MdDialog, private router: Router, private GetCurrentUserService: GetCurrentUserService) {
        this.GetCurrentUserService.userData.subscribe(data => {

            if(data === null) {
                this.signedIn = false;
                return;
            }
                
            this.name = `${data.firstname} ${data.lastname}`;
            this.signedIn = true;
        });
    }

    name: string;
    signedIn: boolean = false;

    @ViewChildren(MdMenuTrigger) trigger: QueryList<MdMenuTrigger>;

    openLoginDialog(): void {
        const dialogRef = this.dialog.open(LoginDialogComponent);
    }

    onResize(): void {
        this.trigger.map(item => {
            item.closeMenu()
        });
    }

    onMenuOpened(currentMenu: number): void {
        this.trigger.map((item, index) => {
            if (index !== currentMenu)
                item.closeMenu();      
        });
    };

    navigateToRoute(path: string): void {
        this.router.navigateByUrl(`/${path}`);
    }
}
