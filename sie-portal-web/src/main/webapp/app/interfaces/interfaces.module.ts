import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { SieLugarModule } from './lugar/lugar.module';
import { SieEvolucionElectoralModule } from './evolucion-electoral/evolucion-electoral.module';

@NgModule({
    imports: [
        SieLugarModule,
        SieEvolucionElectoralModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SieInterfacesModule {}
