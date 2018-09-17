import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { ConfigService, MetadataService } from '../../config';

@Injectable()
export class TemplateService {

    private footerCache: Observable<string>;

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
        if (!this.footerCache) {
            this.footerCache = this.doGetFooter().publishReplay(1).refCount();
        }
        return this.footerCache;
    }

    private doGetFooter(): Observable<string> {
        const config = this.configService.getConfig();
        return this.metadataService.getPropertyById(config.metadata.footerPathKey).flatMap((endpoint) => {
            return this.http.get(`${endpoint}`).map((res: Response) => res.text());
        });
    }
}
