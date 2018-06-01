import { Injectable } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import * as FileSaver from 'file-saver';
import { ProcesoElectoral } from '../interfaces/evolucion-electoral';

@Injectable()
export class DocumentoService {

    public resourceUrl = 'api/documento';

    constructor(private http: Http) { }

    descargarPdfEvolucionElectoral(procesosElectorales: ProcesoElectoral[]) {
        this.http.post(`${this.resourceUrl}/evolucion-electoral`, procesosElectorales, { responseType: ResponseContentType.Blob })
            .map((response) => this.saveToFileSystem(response))
            .subscribe();
    }

    private saveToFileSystem(response) {
        const contentDispositionHeader: string = response.headers.get('Content-Disposition');
        const blob = new Blob([response._body], { type: response.headers.get('content-type') + ';base64,' });
        const filename = contentDispositionHeader.match(/filename[^;=\n]*=((['"])(.*?)\2)/)[3] || 'fichero';
        FileSaver.saveAs(blob, filename);
    }
}
