import { Injectable } from '@angular/core';
import { ConfigService, MetadataService } from '../config';
import { DatasetProcesoElectoral } from './dataset-proceso-electoral.model';
import { Observable } from 'rxjs';
import { MultidatasetProcesosElectorales } from './multidataset-procesos-electorales.model';
import { TipoEleccionesDatasetUrlService } from './tipo-elecciones-dataset-url.service';
import { JhiLanguageHelper } from "../shared";
import { HttpHeadersService } from '../http/headers/http-headers.service';

@Injectable()
export class MultidatasetProcesosElectoralesService {

    private multidatasetsCache = {};

    constructor(
        private http: HttpHeadersService,
        private configService: ConfigService,
        private metadataService: MetadataService,
        private tipoEleccionesDatasetUrlService: TipoEleccionesDatasetUrlService,
        private languageHelper: JhiLanguageHelper,
    ) { }

    getDatasetsByTipoElecciones(tipoElecciones: string): Observable<MultidatasetProcesosElectorales> {
        if (!this.multidatasetsCache[tipoElecciones]) {
            this.multidatasetsCache[tipoElecciones] = new Observable<MultidatasetProcesosElectorales>((subscriber) => {
                this.doGetDatasets(tipoElecciones).subscribe(
                    (json) => {
                        if (json.data.nodes) {
                            subscriber.next(this.parseMultidataset(json));
                        } else {
                            subscriber.error();
                        }
                    },
                    (error) => subscriber.error(error)
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
            return new DatasetProcesoElectoral(element.dataset.id, element.identifier, this.languageHelper.getLocalisedString(element.name));
        });
        const splittedUrn = json.urn.split('=');
        return new MultidatasetProcesosElectorales(splittedUrn[1], datasetList);
    }
}
