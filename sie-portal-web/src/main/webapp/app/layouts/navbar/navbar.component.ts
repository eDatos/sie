import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../template';

@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

    public navbar: string;

    constructor(
        private templateService: TemplateService
    ) { }

    ngOnInit() {
        this.templateService.getNavbar().subscribe((navbarHtml) => this.navbar = navbarHtml);
    }
}
