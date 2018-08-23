import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { ProcesoElectoralDatasetService } from '../../dataset';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MultidatasetProcesosElectorales } from '../../dataset/multidataset-procesos-electorales.model';

declare var I18n: any;
declare var App: any;
declare var Backbone: any;

export const LINK_TAG = 'link';
export const COMPILED_SASS_NAME = 'main-sass';
export const STYLES_IDENTIFIER_CLASS = 'vendorStyles';
export const METAMAC_CSS_LINK = './visualizer-static/metamac.css';
export const METAMAC_CSS_REL = 'stylesheet';

@Component({
    selector: 'jhi-proceso-electoral',
    styleUrls: ['proceso-electoral.component.scss'],
    templateUrl: './proceso-electoral.component.html'
})
export class ProcesoElectoralComponent implements OnInit, AfterViewInit, OnDestroy {

    tipoElecciones: string;
    fecha: string;
    multidataset: MultidatasetProcesosElectorales;

    constructor(
        private host: ElementRef,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private procesoElectoralDatasetService: ProcesoElectoralDatasetService
    ) { }

    ngOnInit() {
        this.activatedRoute.parent.params.subscribe((params) => {
            if (params.tipoElecciones !== this.tipoElecciones) {
                this.onChangeTipoElecciones(params);
            } else if (params.fecha !== this.fecha) {
                this.onChangeFecha(params);
            }
        });
    }

    ngAfterViewInit() {
        this.setGlobalStyleSheetsDisabled(true);
        this.insertMetamacStyles();
    }

    ngOnDestroy() {
        this.setGlobalStyleSheetsDisabled(false);
        this.stopBackbone();
    }

    private onChangeTipoElecciones(params: Params) {
        this.procesoElectoralDatasetService.getDatasetsByTipoElecciones(params.tipoElecciones).then((multidataset) => {
            this.tipoElecciones = params.tipoElecciones;
            this.multidataset = multidataset;
            this.onChangeFecha(params);

            if (App.mainRegion) {
                this.stopBackbone();
            }
            this.startBackbone(multidataset.id);
        }).catch(() => {
            this.router.navigate(['not-found'], { skipLocationChange: true });
        });
    }

    private onChangeFecha(params: Params) {
        const dataset = this.multidataset.datasetList.find((element) => element.year === params.fecha);
        if (dataset) {
            this.fecha = params.fecha;
        } else {
            this.router.navigate(['not-found'], { skipLocationChange: true });
        }
    }

    private startBackbone(multidatasetId: string) {
        I18n.defaultLocale = 'es';
        I18n.locale = 'es';

        App.addRegions({
            mainRegion: '.metamac-container'
        });

        // http://estadisticas.arte-consultores.com/statistical-resources
        App.endpoints['statistical-resources'] = 'http://estadisticas.arte-consultores.com/statistical-resources-internal/apis/statistical-resources-internal/v1.0';

        // http://estadisticas.arte-consultores.com/structural-resources-internal/apis/structural-resources-internal
        App.endpoints['structural-resources'] = 'http://estadisticas.arte-consultores.com/structural-resources-internal/apis/structural-resources-internal/v1.0';

        // http://estadisticas.arte-consultores.com/statistical-visualizer
        App.endpoints['statistical-visualizer'] = 'http://estadisticas.arte-consultores.com/statistical-visualizer';

        // http://estadisticas.arte-consultores.com/permalinks
        App.endpoints['permalinks'] = 'http://estadisticas.arte-consultores.com/permalinks/v1.0';

        // http://estadisticas.arte-consultores.com/export
        App.endpoints['export'] = 'http://estadisticas.arte-consultores.com/export/v1.0';

        // http://estadisticas.arte-consultores.com/indicators
        App.endpoints['indicators'] = 'http://estadisticas.arte-consultores.com/indicators-internal/internal/api/indicators/v1.0';

        App.config['showHeader'] = false;
        App.config['showRightsHolder'] = false;
        App.config['organisationUrn'] = 'urn:sdmx:org.sdmx.infomodel.base.Agency=SDMX:AGENCIES(1.0).ISTAC';
        App.config['installationType'] = 'INTERNAL';

        App.queryParams['agency'] = 'ISTAC';
        App.queryParams['type'] = 'dataset';
        App.queryParams['multidatasetId'] = multidatasetId;

        App.start();
    }

    private stopBackbone() {
        App.removeRegion('mainRegion');
        App._initCallbacks.reset();
        Backbone.history.stop();
    }

    private setGlobalStyleSheetsDisabled(disabled: boolean) {
        const styleSheetList = <any> document.head.getElementsByClassName(STYLES_IDENTIFIER_CLASS);
        for (const sheet of styleSheetList) {
            sheet.disabled = disabled;
        }

        const linkList = <any> document.head.getElementsByTagName(LINK_TAG);
        for (const link of linkList) {
            if (link.href.includes(COMPILED_SASS_NAME)) {
                link.disabled = disabled;
            }
        }
    }

    private insertMetamacStyles() {
        const estilosMetamac = document.createElement('link');
        estilosMetamac.href = METAMAC_CSS_LINK;
        estilosMetamac.rel = METAMAC_CSS_REL;
        this.host.nativeElement.appendChild(estilosMetamac);
    }
}
