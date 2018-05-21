import { LOCALE_ID, NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';

import {
    SieSharedLibsModule,
    AutocompleteComponent,
    AutocompleteShortListComponent,
    AutocompleteLongListComponent,
    AutocompleteEnumComponent,
    AutofocusDirective,
    HelpTooltipComponent,
    JhiAlertErrorComponent,
    JhiLanguageHelper,
    MakeFixedRoomDirective,
    OrderListComponent,
    PaginationComponent,
    SpinnerComponent,
    StepsComponent,
    StickyTableHeaderDirective,
    TriInputSwitchComponent,
    CurrencyComponent
} from './';

@NgModule({
    imports: [
        SieSharedLibsModule
    ],
    declarations: [
        JhiAlertErrorComponent,
        StickyTableHeaderDirective,
        TriInputSwitchComponent,
        MakeFixedRoomDirective,
        AutocompleteComponent,
        AutocompleteShortListComponent,
        AutocompleteLongListComponent,
        AutocompleteEnumComponent,
        OrderListComponent,
        HelpTooltipComponent,
        PaginationComponent,
        AutofocusDirective,
        CurrencyComponent,
        SpinnerComponent,
        StepsComponent,
    ],
    providers: [
        JhiLanguageHelper,
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'es'
        },
    ],
    exports: [
        SieSharedLibsModule,
        JhiAlertErrorComponent,
        StickyTableHeaderDirective,
        TriInputSwitchComponent,
        MakeFixedRoomDirective,
        AutocompleteComponent,
        AutocompleteShortListComponent,
        AutocompleteLongListComponent,
        AutocompleteEnumComponent,
        OrderListComponent,
        HelpTooltipComponent,
        PaginationComponent,
        AutofocusDirective,
        CurrencyComponent,
        SpinnerComponent,
        StepsComponent,
    ]
})
export class SieSharedCommonModule { }