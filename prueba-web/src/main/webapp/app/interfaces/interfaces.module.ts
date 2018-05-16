import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { ArteApplicationTemplateLugarModule } from './lugar/lugar.module';

@NgModule({
    imports: [
        ArteApplicationTemplateLugarModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArteApplicationTemplateInterfacesModule {}
