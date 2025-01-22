import {Component, ComponentFactoryResolver, ElementRef, OnInit, Renderer2, ViewContainerRef} from '@angular/core';
import {TemplateService} from '../template';
import {ConfigService} from '../../config';
import {TerritorioAutocompleteComponent} from "../../shared";

declare const Edatos;

@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
    public navbar = '';

    constructor(
        private elementRef: ElementRef,
        private templateService: TemplateService,
        private configService: ConfigService,
        private viewContainerRef: ViewContainerRef,
        private renderer: Renderer2,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {
    }

    ngOnInit() {
        this.templateService.getNavbar().subscribe((navbarHtml) => {
            this.navbar = navbarHtml;
            this.appendContextualFragment(this.navbar, 'header');
            this.initializeNavbarComponents();
        });

    }

    private initializeNavbarComponents() {
        const componentRef = this.viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(TerritorioAutocompleteComponent));
        if (typeof Edatos !== 'undefined' && Edatos.HeaderManagement) {
            Edatos.HeaderManagement.addAtEnd(componentRef.location.nativeElement);
        }
    }

    private appendContextualFragment(html: string, id: string) {
        const element = document.getElementById(id);
        if (element) {
            element.appendChild(document.createRange().createContextualFragment(html));
        }
        return element;
    }
}
