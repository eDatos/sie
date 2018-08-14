import { DatasetService } from './dataset.service';
import { NgModule } from '@angular/core';
import { ProcesoElectoralDatasetService } from './proceso-electoral-dataset.service';

@NgModule({
    providers: [
        DatasetService,
        ProcesoElectoralDatasetService
    ],
})
export class SieDatasetServiceModule { }
