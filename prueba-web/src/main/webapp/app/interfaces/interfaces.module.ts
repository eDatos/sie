import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { ArteApplicationTemplateLugarModule } from './lugar/lugar.module';
import { ArteApplicationTemplateEvolucionElectoralModule } from './evolucion-electoral/evolucion-electoral.module';

@NgModule({
    imports: [
        ArteApplicationTemplateLugarModule,
        ArteApplicationTemplateEvolucionElectoralModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArteApplicationTemplateInterfacesModule {}
