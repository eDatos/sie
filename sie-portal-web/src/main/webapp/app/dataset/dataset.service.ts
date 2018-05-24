import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ConfigService } from '../config';

@Injectable()
export class DatasetService {

    private datasetObservable: Observable<any>;

    constructor(private http: Http, private configService: ConfigService) { }

    getMetadata(): Observable<any> {
        if (!this.datasetObservable) {
            const config = this.configService.getConfig();
            this.datasetObservable = this.http.get(config.dataset.endpoint + config.dataset.metadata)
            .map((res: Response) => res.json())
            .publishReplay(1)
            .refCount();
        }
        return this.datasetObservable;
    }
}
