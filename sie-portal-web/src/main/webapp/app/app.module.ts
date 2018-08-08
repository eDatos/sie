import './vendor.ts';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';

import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
import { SieConfigModule } from './config/config.module';
import { SieDatasetServiceModule } from './dataset/dataset.module';
import { SieInterfacesModule } from './interfaces/interfaces.module';
import { JhiMainComponent, LayoutRoutingModule, ErrorComponent, notFoundRoute, NavbarComponent, FooterComponent } from './layouts';
import { SieSharedModule } from './shared';

const APP_ROUTES = [
    notFoundRoute
]

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
    ],
    bootstrap: [JhiMainComponent]
})
export class SieAppModule { }
