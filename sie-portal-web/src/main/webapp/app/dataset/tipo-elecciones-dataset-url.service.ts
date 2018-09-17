import { TipoEleccionesDatasetUrl } from './tipo-elecciones-dataset-url.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class TipoEleccionesDatasetUrlService {

    private mappingUrl = 'api/tipo-elecciones-dataset';

    private mappingCache = {};

    constructor(
        private http: Http
    ) { }

    getDatasetIdByTipoElecciones(tipoElecciones: string): Observable<TipoEleccionesDatasetUrl> {
        if (!this.mappingCache[tipoElecciones]) {
            this.mappingCache[tipoElecciones] = this.doGetDatasetIdByTipoElecciones(tipoElecciones).publishReplay(1).refCount();
        }
        return this.mappingCache[tipoElecciones];
    }

    private doGetDatasetIdByTipoElecciones(tipoElecciones: string): Observable<TipoEleccionesDatasetUrl> {
        return this.http.get(`${this.mappingUrl}/${tipoElecciones}`).map((response) => response.json());
    }
}
