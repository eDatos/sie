// FIXME: Eliminar referencias a la plantilla (com.arte.application.template, arte-application-template, etc...)

import './vendor.ts';

import { NgModule, APP_INITIALIZER } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';

import { ArteApplicationTemplateSharedModule, UserRouteAccessService, AuthServerProvider } from './shared';
import { ArteApplicationTemplateHomeModule } from './home/home.module';
import { ArteApplicationTemplateEntityModule } from './entities/entity.module';

import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import { ArteApplicationTemplateConfigModule, ConfigService } from './config';

import {
    JhiMainComponent,
    LayoutRoutingModule,
    NavbarComponent,
    ProfileService,
    ErrorComponent,
    notFoundRoute
} from './layouts';

const APP_ROUTES = [
    notFoundRoute
]

export function init(configService: ConfigService, authServerProvider: AuthServerProvider) {
    return () => {
        const promise: Promise<boolean> = new Promise((resolve, reject) => {
            if (authServerProvider.getToken()) {
                resolve(true);
            } else {
                const config = configService.getConfig();
                window.location.href = config.cas.login + '?service=' + encodeURIComponent(config.cas.applicationHome);
            }
        });
        return promise;
    }
}

@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        ArteApplicationTemplateSharedModule,
        ArteApplicationTemplateHomeModule,
        ArteApplicationTemplateEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
        ArteApplicationTemplateConfigModule,
        RouterModule.forRoot(APP_ROUTES, { useHash: true, enableTracing: true })
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
    ],
    providers: [
        {
            'provide': APP_INITIALIZER,
            'useFactory': init,
            'deps': [ConfigService, AuthServerProvider],
            'multi': true
        },
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService,
    ],
    bootstrap: [JhiMainComponent]
})
export class ArteApplicationTemplateAppModule { }
