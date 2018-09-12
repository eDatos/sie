import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd, RoutesRecognized } from '@angular/router';

import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper, StateStorageService } from '../../shared';
import { MetadataService, ConfigService } from '../../config';

declare var executeGoogleAnalyticsInlineCode: Function;

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class JhiMainComponent implements OnInit {

    private googleAnalyticsTrackId: string;

    constructor(
        private jhiLanguageHelper: JhiLanguageHelper,
        private router: Router,
        private configService: ConfigService,
        private metadataService: MetadataService,
        private languageService: JhiLanguageService,
        private $storageService: StateStorageService
    ) { }

    ngOnInit() {
        const config = this.configService.getConfig();
        this.metadataService.getPropertyById(config.metadata.statisticalVisualizerApiKey).subscribe((statisticalVisualizerApiEndpoint) => {
            this.addMetamacAuthenticationScriptTag(statisticalVisualizerApiEndpoint);
        });

        this.metadataService.getPropertyById(config.metadata.googleTrackingIdKey).subscribe((googleAnalyticsTrackId) => {
            this.googleAnalyticsTrackId = googleAnalyticsTrackId;
            this.addGoogleAnalyticsScriptTag(googleAnalyticsTrackId);
            executeGoogleAnalyticsInlineCode(googleAnalyticsTrackId);
        });

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
                if (this.googleAnalyticsTrackId) {
                    executeGoogleAnalyticsInlineCode(this.googleAnalyticsTrackId);
                }
            }
        });
    }

    private addGoogleAnalyticsScriptTag(googleAnalyticsTrackId: string) {
        const googleAnalyticsScript = document.createElement('script');
        googleAnalyticsScript.setAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=' + googleAnalyticsTrackId);
        googleAnalyticsScript.async = true;
        document.head.appendChild(googleAnalyticsScript);
    }

    private addMetamacAuthenticationScriptTag(baseUrl: string) {
        const metamacAuthenticationScript = document.createElement('script');
        metamacAuthenticationScript.setAttribute('src', baseUrl + '/js/authentication.js');
        document.head.appendChild(metamacAuthenticationScript);
    }

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'sieApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }
}
