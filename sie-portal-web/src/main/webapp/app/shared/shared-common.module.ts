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
} from '.';

import { ChartComponent } from './chart/chart.component';
import { TerritorioAutocompleteComponent } from './territorio-autocomplete/territorio-autocomplete.component';
import { AdditionalInformationButtonComponent } from './additional-information-button/additional-information-button.component';

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
        TerritorioAutocompleteComponent,
        ChartComponent,
        OrderListComponent,
        HelpTooltipComponent,
        PaginationComponent,
        AutofocusDirective,
        CurrencyComponent,
        SpinnerComponent,
        StepsComponent,
        AdditionalInformationButtonComponent,
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
        TerritorioAutocompleteComponent,
        ChartComponent,
        OrderListComponent,
        HelpTooltipComponent,
        PaginationComponent,
        AutofocusDirective,
        CurrencyComponent,
        SpinnerComponent,
        StepsComponent,
        AdditionalInformationButtonComponent,
    ]
})
export class SieSharedCommonModule { }
