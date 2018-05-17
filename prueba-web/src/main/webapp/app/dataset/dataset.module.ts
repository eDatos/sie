// FIXME: Eliminar referencias a la plantilla (com.arte.application.template, arte-application-template, etc...)

import { DatasetService } from './dataset.service';
import { NgModule } from '@angular/core';

@NgModule({
    providers: [
        DatasetService,
    ],
})
export class ArteApplicationTemplateDatasetServiceModule { }
