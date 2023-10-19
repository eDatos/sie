import './vendor.ts';

import {APP_INITIALIZER, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {Ng2Webstorage} from 'ng2-webstorage';

import {customHttpProvider} from './blocks/interceptor/http.provider';
import {PaginationConfig} from './blocks/config/uib-pagination.config';
import {SieConfigModule} from './config/config.module';
import {SieDatasetServiceModule} from './dataset/dataset.module';
import {SieInterfacesModule} from './interfaces/interfaces.module';
import {
    ErrorComponent,
    FooterComponent,
    JhiMainComponent,
    LayoutRoutingModule,
    NavbarComponent,
    notFoundRoute
} from './layouts';
import {SieSharedModule} from './shared';
import {XsrfNoopInterceptor} from "./xsrf-noop-interceptor.service";
import {LocationStrategy} from "@angular/common";
import {SieLocationStrategy} from "./sie-location.strategy";
import {XSRFStrategy} from "@angular/http";
import {TranslateService} from "@ngx-translate/core";

const APP_ROUTES = [
    notFoundRoute
]


function initializeTranslateService(translateService: TranslateService) {
    // Note that the language should be obtained from some configuration file or service. For
    // now, direct injection is enough.
    return () => translateService.setDefaultLang('es');
}

@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),

        SieConfigModule,
        SieDatasetServiceModule,
        SieInterfacesModule,
        SieSharedModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
        RouterModule.forRoot(APP_ROUTES, { useHash: true })
    ],
    declarations: [
        JhiMainComponent,
        ErrorComponent,
        NavbarComponent,
        FooterComponent
    ],
    providers: [
        customHttpProvider(),
        PaginationConfig,
        { provide: LocationStrategy, useClass: SieLocationStrategy },
        { provide: XSRFStrategy, useClass: XsrfNoopInterceptor },
        {
            provide: APP_INITIALIZER,
            useFactory: initializeTranslateService,
            deps: [TranslateService],
            multi: true
        }
    ],
    bootstrap: [JhiMainComponent]
})

export class SieAppModule { }
