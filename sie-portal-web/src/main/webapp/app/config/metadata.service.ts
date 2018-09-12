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
