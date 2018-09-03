import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigService } from '../config';
import { ProcesoElectoralDataset } from './proceso-electoral-dataset.model';
import { Observable } from 'rxjs';
import { MultidatasetProcesosElectorales } from './multidataset-procesos-electorales.model';

@Injectable()
export class ProcesoElectoralDatasetService {

    private mappingUrl = 'api/tipo-elecciones-dataset';

    private multidatasetsCache = {};

    constructor(
        private http: Http,
        private configService: ConfigService
    ) { }

    getDatasetsByTipoElecciones(tipoElecciones: string): Promise<MultidatasetProcesosElectorales> {
        if (!this.multidatasetsCache[tipoElecciones]) {
            this.multidatasetsCache[tipoElecciones] = new Promise<MultidatasetProcesosElectorales>((resolve, reject) => {
                this.getDatasetIdByTipoElecciones(tipoElecciones).subscribe(
                    (tipoEleccionesDataset) => {
                        this.doGetDatasets(tipoEleccionesDataset).subscribe((json) => resolve(this.parseMultidataset(json)));
                    },
                    (error) => {
                        reject(error);
                    });
            });
        }
        return this.multidatasetsCache[tipoElecciones];
    }

    private getDatasetIdByTipoElecciones(tipoElecciones: string): Observable<TipoEleccionesDataset> {
        return this.http.get(`${this.mappingUrl}/${tipoElecciones}`).map((response) => response.json());
    }

    private doGetDatasets(tipoEleccionesDataset: TipoEleccionesDataset): Observable<any> {
        const config = this.configService.getConfig();
        return this.http.get(`${config.endpoints.statisticalResources}${tipoEleccionesDataset.datasetId}?_type=json`).map((response) => response.json());
    }

    private parseMultidataset(json: any): MultidatasetProcesosElectorales {
        const nodes = json.data.nodes.node;
        const datasetList = nodes.map((element) => {
            return new ProcesoElectoralDataset(element.dataset.id, element.name.text[0].value);
        });
        const splittedUrn = json.urn.split('=');
        return new MultidatasetProcesosElectorales(splittedUrn[1], datasetList);
    }
}

class TipoEleccionesDataset {

    constructor(
        public tipoElecciones: string,
        public datasetId: string
    ) { }
}
