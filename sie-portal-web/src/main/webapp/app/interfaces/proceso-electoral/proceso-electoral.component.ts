import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { MultidatasetProcesosElectoralesService } from '../../dataset';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MultidatasetProcesosElectorales } from '../../dataset/multidataset-procesos-electorales.model';
import { ConfigService, MetadataService } from '../../config';
import { Observable } from 'rxjs';

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
        private configService: ConfigService,
        private metadataService: MetadataService
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
        Observable.zip(
            this.metadataService.getPropertyById(config.metadata.statisticalResourcesKey),
            this.metadataService.getPropertyById(config.metadata.structuralResourcesKey),
            this.metadataService.getPropertyById(config.metadata.indicatorsKey),
            this.metadataService.getPropertyById(config.metadata.permalinksEndpointKey),
            this.metadataService.getPropertyById(config.metadata.exportEndpointKey),
            this.metadataService.getPropertyById(config.metadata.statisticalVisualizerKey),
            this.metadataService.getPropertyById(config.metadata.organisationUrnKey),
            this.metadataService.getPropertyById(config.metadata.geographicalGranularityUrnKey),
            (statisticalResources, structuralResources, indicators, permalinks, exportEndpoint, statisticalVisualizer, organisationUrn, geographicalGranularityUrn) => {
                App.endpoints['statistical-resources'] = statisticalResources + '/v1.0';
                App.endpoints['structural-resources'] = structuralResources + '/v1.0';
                App.endpoints['indicators'] = indicators + '/v1.0';
                App.endpoints['permalinks'] = permalinks + '/v1.0';
                App.endpoints['export'] = exportEndpoint + '/v1.0';
                App.endpoints['statistical-visualizer'] = statisticalVisualizer;
                App.endpoints['sie-base-url'] = config.baseUrl;

                App.config['showHeader'] = config.visualizer.showHeader;
                App.config['showRightsHolder'] = config.visualizer.showRightsHolder;
                App.config['organisationUrn'] = organisationUrn;
                App.config['geographicalGranularityUrn'] = geographicalGranularityUrn;
                App.config['installationType'] = config.metadata.installationType;

                App.queryParams['agency'] = 'ISTAC';
                App.queryParams['type'] = 'dataset';
                App.queryParams['multidatasetId'] = multidatasetId;
            }
        ).subscribe(() => App.start());
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
