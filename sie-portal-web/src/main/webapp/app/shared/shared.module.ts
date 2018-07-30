import { DatePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    AcAlertService,
    SieSharedCommonModule,
    SieSharedLibsModule,
    CalendarComponent,
    CSRFService,
    EntityListEmptyComponent,
    GenericModalService,
    ScrollService,
    SideMenuComponent,
    SplitButtonComponent,
    StateStorageService
} from '.';

@NgModule({
    imports: [
        SieSharedLibsModule,
        SieSharedCommonModule,
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
        SieSharedCommonModule,
        DatePipe,
        EntityListEmptyComponent,
        SplitButtonComponent,
        CalendarComponent,
        SideMenuComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class SieSharedModule { }
