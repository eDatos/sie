import { Injectable } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import * as FileSaver from 'file-saver';
import { Observable } from 'rxjs/Observable';
import { ResultadoElectoral } from '../dataset';
import { MetadataService, ConfigService } from '../config';

@Injectable()
export class DocumentoService {

    public resourceUrl = 'api/documento';

    constructor(
        private http: Http,
        private metadataService: MetadataService,
        private configService: ConfigService
    ) { }

    descargarPdfEvolucionElectoral(evolucionElectoral: any): Observable<any> {
        return this.metadataService.getPropertyById(this.configService.getConfig().metadata.appOrganisationLogoUrlKey).switchMap((logoUrl: string) => {
            const formData = new FormData();
            evolucionElectoral.appOrganisationLogoUrl = logoUrl;
            formData.append('evolucionElectoral', new Blob([JSON.stringify(evolucionElectoral)], { type: 'application/json' }));
            formData.append('grafica', new Blob([this.sanitizeSvg(document.getElementsByTagName('svg')[0].outerHTML)], { type: 'image/svg+xml' }));
            return this.http.post(`${this.resourceUrl}/evolucion-electoral`, formData, { responseType: ResponseContentType.Blob });
        });
    }

    descargarPdfResultadoElectoral(resultadoElectoral: ResultadoElectoral, svg: SVGElement): Observable<any> {
        return this.metadataService.getPropertyById(this.configService.getConfig().metadata.appOrganisationLogoUrlKey).switchMap((logoUrl: string) => {
            const formData = new FormData();
            resultadoElectoral.appOrganisationLogoUrl = logoUrl;
            formData.append('resultadoElectoral', new Blob([JSON.stringify(resultadoElectoral)], { type: 'application/json' }));
            formData.append('grafica', new Blob([this.sanitizeSvg(this.processSvg(svg).outerHTML)], { type: 'image/svg+xml' }));
            return this.http.post(`${this.resourceUrl}/resultado-electoral`, formData, { responseType: ResponseContentType.Blob });
        });
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

    private processSvg(svg: SVGElement): SVGElement {
        const pieButton = document.querySelector('button[data-type="pie"]') as HTMLButtonElement;
        pieButton.click();

        document.body.appendChild(svg);

        Array.prototype.slice.call(svg.children).forEach((el) => {
            if (!(el.classList.contains('highcharts-series-group') || el.classList.contains('highcharts-data-labels'))) {
                el.remove();
            }
        });

        // https://typeofnan.dev/how-to-perfectly-fit-an-svg-to-its-contents-using-javascript/
        const { xMin, xMax, yMin, yMax } = Array.prototype.slice.call(svg.children).filter((el) => el.getBBox).reduce((acc, el) => {
          const { x, y, width, height } = el.getBBox();
            if (!acc.xMin || x < acc.xMin) {
                acc.xMin = x;
            }
            if (!acc.xMax || x + width > acc.xMax) {
                acc.xMax = x + width;
            }
            if (!acc.yMin || y < acc.yMin) {
                acc.yMin = y;
            }
            if (!acc.yMax || y + height > acc.yMax) {
                acc.yMax = y + height;
            }
            return acc;
        }, {});

        const viewbox = `${xMin} ${yMin} ${xMax - xMin + 15} ${yMax - yMin + 10}`;
        svg.setAttribute('viewBox', viewbox);
        svg.setAttribute('height', String(yMax - yMin + 10))
        svg.setAttribute('width', String(xMax - xMin + 15))

        document.body.removeChild(svg);

        return svg;
    }
}
