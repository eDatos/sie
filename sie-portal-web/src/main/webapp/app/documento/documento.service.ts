import { Injectable } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import * as FileSaver from 'file-saver';

@Injectable()
export class DocumentoService {

    public resourceUrl = 'api/evolucion-electoral';

    constructor(private http: Http) { }

    download(lugarId: string, tipoEleccion: string) {
        this.http.get(`${this.resourceUrl}/${lugarId}/${tipoEleccion}/download`, { responseType: ResponseContentType.Blob })
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
