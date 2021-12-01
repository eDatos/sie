import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { SieSharedModule } from '../shared';
import { RouterModule } from '@angular/router';
import { lugarRoute, LugarComponent } from './lugar';
import { SieDocumentoModule } from '../documento/documento.module';
import { evolucionElectoralRoute, EvolucionElectoralComponent } from './evolucion-electoral';
import { procesoElectoralRoute, ProcesoElectoralComponent } from './proceso-electoral';
import { DefaultNullPipe } from './proceso-electoral/default-null.pipe';
import { PercentagePipe } from './proceso-electoral/percentage.pipe';

const ENTITY_STATES = [
    ...lugarRoute,
    ...evolucionElectoralRoute,
    ...procesoElectoralRoute
];

@NgModule({
    imports: [
        SieSharedModule,
        SieDocumentoModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TitleBarComponent,
        LugarComponent,
        EvolucionElectoralComponent,
        ProcesoElectoralComponent,
        DefaultNullPipe,
        PercentagePipe,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SieInterfacesModule {}
