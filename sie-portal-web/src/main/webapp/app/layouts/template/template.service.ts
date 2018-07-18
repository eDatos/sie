import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../../config';

@Injectable()
export class TemplateService {

    constructor(
        private http: Http,
        private configService: ConfigService
    ) { }

    getNavbar(): Observable<string> {
        const config = this.configService.getConfig();
        return this.http.get(`${config.navbar.url}`).map((res: Response) => res.text());
    }

    getFooter(): Observable<any> {
        const config = this.configService.getConfig();
        return this.http.get(`${config.footer.url}`).map((res: Response) => res.text());
    }
}
