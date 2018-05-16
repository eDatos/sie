import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { createRequestOption, convertResponse, ResponseWrapper } from '../../shared';
import { Lugar } from './lugar.model';

@Injectable()
export class LugarService {

    private resourceUrl = 'api/lugares';

    constructor(private http: Http) { }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        // return this.http.get(this.resourceUrl, options).map((res: Response) => convertResponse(res));
        const result: Lugar[] = [
            {
                id: 1,
                nombre: 'Canarias'
            },
            {
                id: 2,
                nombre: 'Santa Cruz de Tenerife'
            },
            {
                id: 3,
                nombre: 'Tenerife'
            },
            {
                id: 4,
                nombre: 'Santa Cruz'
            },
            {
                id: 5,
                nombre: 'La Laguna'
            },
            {
                id: 6,
                nombre: 'Santa Úrsula'
            },
        ];
        const responseWrapper = new ResponseWrapper(null, result, 200);

        return Observable.create((observer) => {
            observer.next(new ResponseWrapper(null, result, 200));
            observer.complete();
        });
    }
}
