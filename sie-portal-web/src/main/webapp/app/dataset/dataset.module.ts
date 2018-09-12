import { DatasetEvolucionElectoralService } from './dataset-evolucion-electoral.service';
import { NgModule } from '@angular/core';
import { MultidatasetProcesosElectoralesService } from './multidataset-procesos-electorales.service';

@NgModule({
    providers: [
        DatasetEvolucionElectoralService,
        MultidatasetProcesosElectoralesService
    ],
})
export class SieDatasetServiceModule { }
