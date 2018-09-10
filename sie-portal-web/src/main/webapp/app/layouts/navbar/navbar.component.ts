import { Component, OnInit, ElementRef } from '@angular/core';
import { TemplateService } from '../template';
import { ConfigService } from '../../config';

declare var setActiveLink: Function;
declare var setNavbarMode: Function;
export const APPLICATION_LINK_ID = 'eleccionesLink';

@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

    public navbar = '';

    constructor(
        private elementRef: ElementRef,
        private templateService: TemplateService,
        private configService: ConfigService
    ) { }

    ngOnInit() {
        this.templateService.getNavbar().subscribe((navbarHtml) => {
            this.navbar = navbarHtml;
            setTimeout(() => {
                this.reinsertScripts();
                setActiveLink(APPLICATION_LINK_ID);

                const config = this.configService.getConfig();
                setNavbarMode(config.metadata.installationType);
            });
        });
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
