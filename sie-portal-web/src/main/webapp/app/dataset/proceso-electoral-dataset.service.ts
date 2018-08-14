import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigService } from '../config';
import { ProcesoElectoralDataset } from './proceso-electoral-dataset.model';
import { Observable } from 'rxjs';

@Injectable()
export class ProcesoElectoralDatasetService {

    private mappingUrl = 'api/tipo-elecciones-dataset';

    private multidatasetsCache = {};

    constructor(
        private http: Http,
        private configService: ConfigService
    ) { }

    getDatasetsByTipoElecciones(tipoElecciones: string): Promise<ProcesoElectoralDataset[]> {
        if (!this.multidatasetsCache[tipoElecciones]) {
            this.multidatasetsCache[tipoElecciones] = new Promise<ProcesoElectoralDataset[]>((resolve) => {
                this.getDatasetIdByTipoElecciones(tipoElecciones).subscribe((tipoEleccionesDataset) => {
                    this.doGetDatasets(tipoEleccionesDataset).subscribe((json) => resolve(this.parseMultidataset(json)));
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
        return this.http.get(`${config.dataset.endpointExternal}${tipoEleccionesDataset.datasetId}?_type=json`).map((response) => response.json());
    }

    private parseMultidataset(json: any): ProcesoElectoralDataset[] {
        const datasetList = json.data.nodes.node;
        return datasetList.map((element) => {
            return new ProcesoElectoralDataset(element.dataset.id, element.name.text[0].value);
        });
    }
}

class TipoEleccionesDataset {

    constructor(
        public tipoElecciones: string,
        public datasetId: string
    ) { }
}
