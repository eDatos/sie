import { DatasetEvolucionElectoralService } from './dataset-evolucion-electoral.service';
import { NgModule } from '@angular/core';
import { MultidatasetProcesosElectoralesService } from './multidataset-procesos-electorales.service';
import { TipoEleccionesDatasetUrlService } from './tipo-elecciones-dataset-url.service';
import { DatasetResultadoElectoralService } from './dataset-resultado-electoral.service';

@NgModule({
    providers: [
        DatasetEvolucionElectoralService,
        MultidatasetProcesosElectoralesService,
        TipoEleccionesDatasetUrlService,
        DatasetResultadoElectoralService,
    ],
})
export class SieDatasetServiceModule { }
