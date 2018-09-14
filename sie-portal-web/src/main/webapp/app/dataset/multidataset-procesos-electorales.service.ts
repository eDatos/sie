import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigService, MetadataService } from '../config';
import { DatasetProcesoElectoral } from './dataset-proceso-electoral.model';
import { Observable } from 'rxjs';
import { MultidatasetProcesosElectorales } from './multidataset-procesos-electorales.model';

@Injectable()
export class MultidatasetProcesosElectoralesService {

    private mappingUrl = 'api/tipo-elecciones-dataset';

    private multidatasetsCache = {};

    constructor(
        private http: Http,
        private configService: ConfigService,
        private metadataService: MetadataService
    ) { }

    getDatasetsByTipoElecciones(tipoElecciones: string): Promise<MultidatasetProcesosElectorales> {
        if (!this.multidatasetsCache[tipoElecciones]) {
            this.multidatasetsCache[tipoElecciones] = new Promise<MultidatasetProcesosElectorales>((resolve, reject) => {
                this.getDatasetIdByTipoElecciones(tipoElecciones).subscribe(
                    (tipoEleccionesDataset) => {
                        this.doGetDatasets(tipoEleccionesDataset).subscribe(
                            (json) => {
                                if (json.data.nodes) {
                                    resolve(this.parseMultidataset(json));
                                } else {
                                    reject();
                                }
                            },
                            (error) => reject(error)
                        );
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
        return this.metadataService.getPropertyById(config.metadata.statisticalResourcesKey).flatMap((endpoint) => {
            return this.http.get(`${endpoint}/v1.0${tipoEleccionesDataset.datasetUrl}?_type=json`).map((response) => response.json());
        });
    }

    private parseMultidataset(json: any): MultidatasetProcesosElectorales {
        const nodes = json.data.nodes.node;
        const datasetList = nodes.map((element) => {
            return new DatasetProcesoElectoral(element.dataset.id, element.name.text[0].value);
        });
        const splittedUrn = json.urn.split('=');
        return new MultidatasetProcesosElectorales(splittedUrn[1], datasetList);
    }
}

class TipoEleccionesDataset {

    constructor(
        public tipoElecciones: string,
        public datasetUrl: string
    ) { }
}
