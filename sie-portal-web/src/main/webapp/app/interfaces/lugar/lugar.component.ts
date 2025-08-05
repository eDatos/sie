import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { DatasetEvolucionElectoralService, Lugar, TipoEleccionesDatasetUrlService, TipoEleccionesDatasetUrl } from '../../dataset';
import { MetadataService, ConfigService } from '../../config';

const BACKGROUND_CLASS = 'lugar-background';

@Component({
    selector: 'jhi-lugar',
    templateUrl: './lugar.component.html',
    styleUrls: ['lugar.component.scss']
})
export class LugarComponent implements OnInit, OnDestroy {

    lugares: Lugar[];
    lugar: Lugar;
    nutsTerritoryCode: string;
    elecciones: TipoEleccionesDatasetUrl[];

    constructor(
        private router: Router,
        private datasetEvolucionElectoralService: DatasetEvolucionElectoralService,
        private renderer: Renderer2,
        private metadataService: MetadataService,
        private tipoEleccionesDatasetUrlService: TipoEleccionesDatasetUrlService,
        private configService: ConfigService,
    ) {
        this.tipoEleccionesDatasetUrlService.getAll().subscribe((all) => {
            this.elecciones = all;
        })
        const config = this.configService.getConfig();
        this.metadataService.getPropertyById(config.metadata.firstTerritoryKey).subscribe((territorio) => {
            this.nutsTerritoryCode = territorio;
        });
    }

    ngOnInit() {
        this.renderer.addClass(document.body.parentNode, BACKGROUND_CLASS);
        this.datasetEvolucionElectoralService.getListaLugares().then((listaLugares) => this.lugares = listaLugares);
    }

    ngOnDestroy() {
        this.renderer.removeClass(document.body.parentNode, BACKGROUND_CLASS);
    }

    transition() {
        this.router.navigate(['evolucion-electoral', this.lugar.id]);
    }

    getInsularInstitutionType() {
        const tipoElecciones = this.elecciones.map((elem) => elem.tipoElecciones);
        return tipoElecciones.find((elem) => elem === 'CABILDO') || tipoElecciones.find((elem) => elem === 'CONSEJO_INSULAR');
    }
}
