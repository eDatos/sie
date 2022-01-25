import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response, Http } from '@angular/http';
import { ConfigService, MetadataService } from '../config';

@Injectable()
export class DatasetResultadoElectoralService {

    constructor(private http: Http,
        private configService: ConfigService,
        private metadataService: MetadataService) {
    }

    getDatasetResultadoElectoral(datasetId: string): Observable<any> {
        const config = this.configService.getConfig();
        return this.metadataService.getPropertyById(config.metadata.statisticalResourcesKey).flatMap((srmUrl) => {
            // TODO: replace agency by config key
            return this.http.get(`${srmUrl}/v1.0/datasets/ISTAC/${datasetId}/~latest?_type=json`).map((res: Response) => res.json());
        });
    }
}
