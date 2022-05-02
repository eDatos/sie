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
import { DefaultNullPipe, PercentagePipe } from './pipes';

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
        SideMenuComponent,
        DefaultNullPipe,
        PercentagePipe,
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
        SideMenuComponent,
        PercentagePipe,
        DefaultNullPipe,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class SieSharedModule { }
