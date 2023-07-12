import {Component, ComponentFactoryResolver, ElementRef, OnInit, Renderer2, ViewContainerRef} from '@angular/core';
import {TemplateService} from '../template';
import {ConfigService} from '../../config';
import {TerritorioAutocompleteComponent} from "../../shared";

declare var setNavbarMode: Function;

@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
    static readonly TITLE_NAVBAR_ID = 'title-bar';
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
            setTimeout(() => {
                this.reinsertScripts();
                const config = this.configService.getConfig();
                setNavbarMode(config.metadata.installationType);
                this.initializeNavbarComponents();
            });
        });

    }

    private initializeNavbarComponents() {
        const componentRef = this.viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(TerritorioAutocompleteComponent));
        this.renderer.appendChild(
            document.getElementById(NavbarComponent.TITLE_NAVBAR_ID),
            componentRef.location.nativeElement
        );
    }

    private reinsertScripts() {
        const scriptList = this.elementRef.nativeElement.getElementsByTagName('script');
        for (const script of scriptList) {
            const scriptCopy = document.createElement('script');
            if (script.innerHTML) {
                scriptCopy.innerHTML = script.innerHTML;
            } else if (script.src) {
                scriptCopy.src = script.src;
            }
            scriptCopy.async = false;
            script.parentNode.replaceChild(scriptCopy, script);
        }
    }
}
