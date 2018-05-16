// FIXME: Eliminar referencias a la plantilla (com.arte.application.template, arte-application-template, etc...)

import { NgModule, APP_INITIALIZER } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';

import { ArteApplicationTemplateSharedModule } from './shared';
import { ArteApplicationTemplateVisualizerModule } from './visualizer/visualizer.module';
import { ArteApplicationTemplateInterfacesModule } from './interfaces/interfaces.module';

import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    LayoutRoutingModule,
    ErrorComponent,
    notFoundRoute
} from './layouts';

const APP_ROUTES = [
    notFoundRoute
]

@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        ArteApplicationTemplateSharedModule,
        ArteApplicationTemplateVisualizerModule,
        ArteApplicationTemplateInterfacesModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
        RouterModule.forRoot(APP_ROUTES, { useHash: true, enableTracing: true })
    ],
    declarations: [
        JhiMainComponent,
        ErrorComponent,
    ],
    providers: [
        customHttpProvider(),
        PaginationConfig,
    ],
    bootstrap: [JhiMainComponent]
})
export class ArteApplicationTemplateAppModule { }
