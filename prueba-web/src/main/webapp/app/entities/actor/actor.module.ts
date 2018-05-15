import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ArteApplicationTemplateSharedModule } from '../../shared';
import {
    ActorComponent,
    ActorDeleteDialogComponent,
    ActorDeletePopupComponent,
    ActorDialogComponent,
    ActorPopupComponent,
    actorPopupRoute,
    ActorPopupService,
    ActorResolvePagingParams,
    actorRoute,
    ActorService,
} from './';

const ENTITY_STATES = [
    ...actorRoute,
    ...actorPopupRoute,
];

@NgModule({
    imports: [
        ArteApplicationTemplateSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true, enableTracing: true })
    ],
    declarations: [
        ActorComponent,
        ActorDialogComponent,
        ActorDeleteDialogComponent,
        ActorPopupComponent,
        ActorDeletePopupComponent,
    ],
    entryComponents: [
        ActorComponent,
        ActorDialogComponent,
        ActorPopupComponent,
        ActorDeleteDialogComponent,
        ActorDeletePopupComponent,
    ],
    providers: [
        ActorService,
        ActorPopupService,
        ActorResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArteApplicationTemplateActorModule {}
