import { DatasetEvolucionElectoralService } from './dataset-evolucion-electoral.service';
import { NgModule } from '@angular/core';
import { MultidatasetProcesosElectoralesService } from './multidataset-procesos-electorales.service';
import { TipoEleccionesDatasetUrlService } from './tipo-elecciones-dataset-url.service';

@NgModule({
    providers: [
        DatasetEvolucionElectoralService,
        MultidatasetProcesosElectoralesService,
        TipoEleccionesDatasetUrlService
    ],
})
export class SieDatasetServiceModule { }
