import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { ConfigService, MetadataService } from '../../config';

@Injectable()
export class TemplateService {

    constructor(
        private http: Http,
        private configService: ConfigService,
        private metadataService: MetadataService
    ) { }

    getNavbar(): Observable<string> {
        const config = this.configService.getConfig();
        return this.metadataService.getPropertyById(config.metadata.navbarPathKey).flatMap((endpoint) => {
            return this.http.get(`${endpoint}`).map((res: Response) => res.text());
        });
    }

    getFooter(): Observable<any> {
        const config = this.configService.getConfig();
        return this.metadataService.getPropertyById(config.metadata.footerPathKey).flatMap((endpoint) => {
            return this.http.get(`${endpoint}`).map((res: Response) => res.text());
        });
    }
}
