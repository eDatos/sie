import { Injectable } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import * as FileSaver from 'file-saver';
import { TranslateService } from '@ngx-translate/core';
import { JhiAlertService } from 'ng-jhipster';
import { Observable } from 'rxjs/Observable';
import { ResultadoElectoral } from '../dataset';

@Injectable()
export class DocumentoService {

    public resourceUrl = 'api/documento';

    constructor(
        private http: Http,
        private translateService: TranslateService,
        private alertService: JhiAlertService
    ) { }

    descargarPdfEvolucionElectoral(evolucionElectoral: any): Observable<any> {
        const formData = new FormData();
        formData.append('evolucionElectoral', new Blob([JSON.stringify(evolucionElectoral)], { type: 'application/json' }));
        formData.append('grafica', new Blob([this.sanitizeSvg(document.getElementsByTagName('svg')[0].outerHTML)], { type: 'image/svg+xml' }));
        return this.http.post(`${this.resourceUrl}/evolucion-electoral`, formData, { responseType: ResponseContentType.Blob });
    }

    descargarPdfResultadoElectoral(resultadoElectoral: ResultadoElectoral): Observable<any> {
        const formData = new FormData();
        formData.append('resultadoElectoral', new Blob([JSON.stringify(resultadoElectoral)], { type: 'application/json' }));
        formData.append('grafica', new Blob([this.sanitizeSvg(document.getElementsByTagName('svg')[0].outerHTML)], { type: 'image/svg+xml' }));
        return this.http.post(`${this.resourceUrl}/resultado-electoral`, formData, { responseType: ResponseContentType.Blob });
    }

    private sanitizeSvg(svg) {
        return svg
            .replace(/zIndex="[^"]+"/g, '')
            .replace(/isShadow="[^"]+"/g, '')
            .replace(/symbolName="[^"]+"/g, '')
            .replace(/jQuery[0-9]+="[^"]+"/g, '')
            .replace(/isTracker="[^"]+"/g, '')
            .replace(/url\([^#]+#/g, 'url(#')
            .replace(/ href=/g, ' xlink:href=')
            .replace(/\n/, ' ')
            .replace(/<\/svg>.*?$/, '</svg>') // any HTML added to the container after the SVG (#894)
            .replace(/&nbsp;/g, '\u00A0') // no-break space
            .replace(/&shy;/g, '\u00AD') // soft hyphen
            .replace(/fill="#FFFFFF"/g, 'fill="#FFFFFF"') // set background to white, this is a very bad hack
            .replace(new RegExp('#FFFFFD', 'g'), '#909090'); // Ugly hack to style correctly the credits
    }

    saveToFileSystem(response) {
        const contentDispositionHeader: string = response.headers.get('Content-Disposition');
        const blob = new Blob([response._body], { type: response.headers.get('content-type') + ';base64,' });
        const filename = contentDispositionHeader.match(/filename[^;=\n]*=((['"])(.*?)\2)/)[3] || 'fichero';
        FileSaver.saveAs(blob, filename);
    }
}
