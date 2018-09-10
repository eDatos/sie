import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';

@Injectable()
export class MetadataService {

    private metadataCache = {};

    constructor(
        private http: Http,
        private configService: ConfigService
    ) { }

    getPropertyById(propertyId: string): Promise<string> {
        if (!this.metadataCache[propertyId]) {
            this.metadataCache[propertyId] = new Promise<string>((resolve, reject) => {
                this.doGetPropertyById(propertyId).subscribe(
                    (json) => resolve(json.value),
                    (error) => reject(error)
                );
            });
        }
        return this.metadataCache[propertyId];
    }

    private doGetPropertyById(propertyId: string): Observable<any> {
        const config = this.configService.getConfig();
        return this.http.get(`${config.endpoints.metadata}/properties/${propertyId}?_type=json`).map((response) => response.json());
    }
}
