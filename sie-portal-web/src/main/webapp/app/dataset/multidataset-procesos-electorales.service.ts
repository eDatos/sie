import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigService, MetadataService } from '../config';
import { DatasetProcesoElectoral } from './dataset-proceso-electoral.model';
import { Observable } from 'rxjs';
import { MultidatasetProcesosElectorales } from './multidataset-procesos-electorales.model';
import { TipoEleccionesDatasetUrlService } from './tipo-elecciones-dataset-url.service';

@Injectable()
export class MultidatasetProcesosElectoralesService {

    private multidatasetsCache = {};

    constructor(
        private http: Http,
        private configService: ConfigService,
        private metadataService: MetadataService,
        private tipoEleccionesDatasetUrlService: TipoEleccionesDatasetUrlService
    ) { }

    getDatasetsByTipoElecciones(tipoElecciones: string): Promise<MultidatasetProcesosElectorales> {
        if (!this.multidatasetsCache[tipoElecciones]) {
            this.multidatasetsCache[tipoElecciones] = new Promise<MultidatasetProcesosElectorales>((resolve, reject) => {
                this.doGetDatasets(tipoElecciones).subscribe(
                    (json) => {
                        if (json.data.nodes) {
                            resolve(this.parseMultidataset(json));
                        } else {
                            reject();
                        }
                    },
                    (error) => reject(error)
                );
            });
        }
        return this.multidatasetsCache[tipoElecciones];
    }

    private doGetDatasets(tipoElecciones: string): Observable<any> {
        const config = this.configService.getConfig();
        return Observable.zip(
            this.metadataService.getPropertyById(config.metadata.statisticalResourcesKey),
            this.tipoEleccionesDatasetUrlService.getDatasetIdByTipoElecciones(tipoElecciones),
        ).flatMap((responses) => {
            return this.http.get(`${responses[0]}/v1.0${responses[1].datasetUrl}?_type=json`).map((response) => response.json());
        });
    }

    private parseMultidataset(json: any): MultidatasetProcesosElectorales {
        const nodes = json.data.nodes.node;
        const datasetList = nodes.map((element) => {
            return new DatasetProcesoElectoral(element.identifier, element.name.text[0].value);
        });
        const splittedUrn = json.urn.split('=');
        return new MultidatasetProcesosElectorales(splittedUrn[1], datasetList);
    }
}
