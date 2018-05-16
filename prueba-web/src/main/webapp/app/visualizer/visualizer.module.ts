import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ArteApplicationTemplateSharedModule } from '../shared';
import {
    VisualizerComponent,
    visualizerRoute
} from './';

const ENTITY_STATES = [
    ...visualizerRoute
];

@NgModule({
    imports: [
        ArteApplicationTemplateSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        VisualizerComponent
    ],
    entryComponents: [
        VisualizerComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArteApplicationTemplateVisualizerModule {}
