// FIXME: Eliminar referencias a la plantilla (com.arte.application.template, arte-application-template, etc...)
import './vendor.ts';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';

import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
import { ArteApplicationTemplateConfigModule } from './config/config.module';
import { ArteApplicationTemplateDatasetServiceModule } from './dataset/dataset.module';
import { ArteApplicationTemplateInterfacesModule } from './interfaces/interfaces.module';
import { JhiMainComponent, LayoutRoutingModule, ErrorComponent, notFoundRoute } from './layouts';
import { ArteApplicationTemplateSharedModule } from './shared';
import { ArteApplicationTemplateVisualizerModule } from './visualizer/visualizer.module';

const APP_ROUTES = [
    notFoundRoute
]

@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),

        ArteApplicationTemplateConfigModule,
        ArteApplicationTemplateDatasetServiceModule,
        ArteApplicationTemplateInterfacesModule,
        ArteApplicationTemplateSharedModule,
        ArteApplicationTemplateVisualizerModule,

        // jhipster-needle-angular-add-module JHipster will add new module here
        RouterModule.forRoot(APP_ROUTES, { useHash: true })
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
