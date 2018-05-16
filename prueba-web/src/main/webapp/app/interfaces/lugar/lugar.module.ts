import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArteApplicationTemplateSharedModule } from '../../shared';
import { LugarComponent, lugarRoute, LugarService } from './';

const ENTITY_STATES = [
    ...lugarRoute
];

@NgModule({
    imports: [
        ArteApplicationTemplateSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        LugarComponent
    ],
    entryComponents: [
        LugarComponent
    ],
    providers: [
        LugarService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArteApplicationTemplateLugarModule {}
