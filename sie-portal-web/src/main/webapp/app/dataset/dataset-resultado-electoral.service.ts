import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response, Http } from '@angular/http';
import { ConfigService, MetadataService } from '../config';
import { zip } from 'rxjs/observable/zip';

@Injectable()
export class DatasetResultadoElectoralService {

    constructor(private http: Http,
        private configService: ConfigService,
        private metadataService: MetadataService) {
    }

    getDatasetResultadoElectoral(datasetId: string): Observable<any> {
        const config = this.configService.getConfig();
        return zip(
            this.metadataService.getPropertyById(config.metadata.statisticalResourcesKey),
            this.metadataService.getPropertyById(config.metadata.organisationKey),
        ).flatMap(([srmUrl, organisationName]) => {
            return this.http.get(`${srmUrl}/v1.0/datasets/${organisationName}/${datasetId}/~latest?_type=json`).map((res: Response) => res.json());
        });
    }
}
