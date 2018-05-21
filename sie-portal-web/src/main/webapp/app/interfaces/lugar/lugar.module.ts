import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SieSharedModule } from '../../shared';
import { LugarComponent, lugarRoute } from './';

const ENTITY_STATES = [
    ...lugarRoute
];

@NgModule({
    imports: [
        SieSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        LugarComponent
    ],
    entryComponents: [
        LugarComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SieLugarModule {}
