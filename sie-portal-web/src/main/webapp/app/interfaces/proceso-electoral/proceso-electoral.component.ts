import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { MultidatasetProcesosElectoralesService } from '../../dataset';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MultidatasetProcesosElectorales } from '../../dataset/multidataset-procesos-electorales.model';
import { ConfigService } from '../../config';

declare var I18n: any;
declare var App: any;
declare var Backbone: any;

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

    lugarId: string;

    constructor(
        private host: ElementRef,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private multidatasetProcesosElectoralesService: MultidatasetProcesosElectoralesService,
        private configService: ConfigService
    ) { }

    ngOnInit() {
        this.activatedRoute.parent.url.subscribe((url) => {
            if (!this.lugarId || this.lugarId !== url[1].path) {
                this.lugarId = url[1].path;
            }
        });

        this.activatedRoute.parent.params.subscribe((params) => {
            if (params.tipoElecciones !== this.tipoElecciones) {
                this.onChangeTipoElecciones(params);
            } else if (params.fecha !== this.fecha) {
                this.onChangeFecha(params);
            }
        });
    }

    ngAfterViewInit() {
        this.insertMetamacStyles();
    }

    ngOnDestroy() {
        this.stopBackbone();
    }

    transition(lugarId) {
        const urlSegments = this.activatedRoute.parent.snapshot.url;
        window.location.hash = window.location.hash.replace(urlSegments[1].path, lugarId);
    }

    private onChangeTipoElecciones(params: Params) {
        this.multidatasetProcesosElectoralesService.getDatasetsByTipoElecciones(params.tipoElecciones).then((multidataset) => {
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

        const config = this.configService.getConfig();
        App.endpoints['statistical-resources'] = config.endpoints.statisticalResources;
        App.endpoints['structural-resources'] = config.endpoints.structuralResources;
        App.endpoints['statistical-visualizer'] = config.endpoints.statisticalVisualizer;
        App.endpoints['permalinks'] = config.endpoints.permalinks;
        App.endpoints['export'] = config.endpoints.export;
        App.endpoints['indicators'] = config.endpoints.indicators;

        App.config['showHeader'] = config.visualizer.showHeader;
        App.config['showRightsHolder'] = config.visualizer.showRightsHolder;
        App.config['organisationUrn'] = config.visualizer.organisationUrn;
        App.config['installationType'] = config.visualizer.installationType;

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

    private insertMetamacStyles() {
        const estilosMetamac = document.createElement('link');
        estilosMetamac.href = METAMAC_CSS_LINK;
        estilosMetamac.rel = METAMAC_CSS_REL;
        this.host.nativeElement.appendChild(estilosMetamac);
    }
}
