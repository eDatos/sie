// FIXME: Eliminar referencias a la plantilla (com.arte.application.template, arte-application-template, etc...)
import { DatePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    AcAlertService,
    ArteApplicationTemplateSharedCommonModule,
    ArteApplicationTemplateSharedLibsModule,
    CalendarComponent,
    CSRFService,
    EntityListEmptyComponent,
    GenericModalService,
    ScrollService,
    SideMenuComponent,
    SplitButtonComponent,
    StateStorageService
} from './';

@NgModule({
    imports: [
        ArteApplicationTemplateSharedLibsModule,
        ArteApplicationTemplateSharedCommonModule,
        RouterModule
    ],
    declarations: [
        EntityListEmptyComponent,
        SplitButtonComponent,
        CalendarComponent,
        SideMenuComponent
    ],
    providers: [
        StateStorageService,
        CSRFService,
        DatePipe,
        GenericModalService,
        AcAlertService,
        ScrollService
    ],
    entryComponents: [],
    exports: [
        ArteApplicationTemplateSharedCommonModule,
        DatePipe,
        EntityListEmptyComponent,
        SplitButtonComponent,
        CalendarComponent,
        SideMenuComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ArteApplicationTemplateSharedModule { }
