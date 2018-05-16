import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { createRequestOption, convertResponse, ResponseWrapper } from '../../shared';
import { EvolucionElectoral } from './evolucion-electoral.model';

@Injectable()
export class EvolucionElectoralService {

    private resourceUrl = 'api/evolucion-electoral';

    constructor(private http: Http) { }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        // return this.http.get(this.resourceUrl, options).map((res: Response) => convertResponse(res));
        const result: EvolucionElectoral[] = [];
        const responseWrapper = new ResponseWrapper(null, result, 200);

        return Observable.create((observer) => {
            observer.next(new ResponseWrapper(null, result, 200));
            observer.complete();
        });
    }
}
