import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export const DEFAULT_PATH = 'visualizer';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
        this.router.navigate([DEFAULT_PATH]);
    }
}
