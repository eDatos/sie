import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ConfigService } from '../config';

@Injectable()
export class DatasetService {

    private datasetObservable: Observable<any>;

    constructor(private http: Http, private configService: ConfigService) { }

    getDataset(): Observable<any> {
        if (!this.datasetObservable) {
            this.datasetObservable = this.http.get(this.configService.getConfig().dataset.endpoint)
            .map((res: Response) => res.json())
            .publishReplay(1)
            .refCount();
        }
        return this.datasetObservable;
    }
}
