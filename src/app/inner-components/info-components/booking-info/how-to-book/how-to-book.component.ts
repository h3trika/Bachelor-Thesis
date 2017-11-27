import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-how-to-book',
    templateUrl: './how-to-book.component.html',
    styleUrls: ['./how-to-book.component.css']
})

export class HowToBookComponent {
    constructor(private router: Router) {}

    goToMainPage(): void {
        this.router.navigateByUrl(`/`);
    }
}
