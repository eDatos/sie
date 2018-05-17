import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArteApplicationTemplateSharedModule } from '../../shared';
import { EvolucionElectoralComponent, evolucionElectoralRoute } from './';

const ENTITY_STATES = [
    ...evolucionElectoralRoute
];

@NgModule({
    imports: [
        ArteApplicationTemplateSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        EvolucionElectoralComponent
    ],
    entryComponents: [
        EvolucionElectoralComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArteApplicationTemplateEvolucionElectoralModule {}
