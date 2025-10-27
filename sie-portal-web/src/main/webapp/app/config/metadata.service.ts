import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';

@Injectable()
export class MetadataService {

    private metadataCache = {};

    constructor(
        private http: Http,
        private configService: ConfigService
    ) { }

    getPropertyById(propertyId: string): Observable<string> {
        if (!this.metadataCache[propertyId]) {
            this.metadataCache[propertyId] = this.doGetPropertyById(propertyId).publishReplay(1).refCount();
        }
        return this.metadataCache[propertyId];
    }

    private doGetPropertyById(propertyId: string): Observable<string> {
        const config = this.configService.getConfig();
        return this.http.get(`${config.metadata.endpoint}/properties/${propertyId}?_type=json`).map((response) => response.json().value);
    }
}
