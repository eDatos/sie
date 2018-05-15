// FIXME: Eliminar referencias a la plantilla (com.arte.application.template, arte-application-template, etc...)
import { DatePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    AcAlertService,
    ArteApplicationTemplateSharedCommonModule,
    ArteApplicationTemplateSharedLibsModule,
    AuthServerProvider,
    CalendarComponent,
    CSRFService,
    EntityListEmptyComponent,
    GenericModalService,
    HasAnyOperacionDirective,
    LoginService,
    Principal,
    RolService,
    ScrollService,
    SideMenuComponent,
    SplitButtonComponent,
    StateStorageService,
    UserService,
} from './';

@NgModule({
    imports: [
        ArteApplicationTemplateSharedLibsModule,
        ArteApplicationTemplateSharedCommonModule,
        RouterModule
    ],
    declarations: [
        HasAnyOperacionDirective,
        EntityListEmptyComponent,
        SplitButtonComponent,
        CalendarComponent,
        SideMenuComponent
    ],
    providers: [
        LoginService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
        RolService,
        UserService,
        DatePipe,
        GenericModalService,
        AcAlertService,
        ScrollService
    ],
    entryComponents: [],
    exports: [
        ArteApplicationTemplateSharedCommonModule,
        HasAnyOperacionDirective,
        DatePipe,
        EntityListEmptyComponent,
        SplitButtonComponent,
        CalendarComponent,
        SideMenuComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ArteApplicationTemplateSharedModule { }
