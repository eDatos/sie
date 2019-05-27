import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { MultidatasetProcesosElectoralesService } from '../../dataset';
import { ActivatedRoute, Router } from '@angular/router';
import { MultidatasetProcesosElectorales } from '../../dataset/multidataset-procesos-electorales.model';
import { ConfigService, MetadataService } from '../../config';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

declare var I18n: any;
declare var App: any;
declare var Backbone: any;

export const METAMAC_CSS_LINK = './visualizer-static/metamac.css';
export const METAMAC_CSS_REL = 'stylesheet';
const TIPO_PROCESO_ELECTORAL_REGEX = /([A-Za-z_]+)\_(\d{4}).*/;

@Component({
    selector: 'jhi-proceso-electoral',
    styleUrls: ['proceso-electoral.component.scss'],
    templateUrl: './proceso-electoral.component.html'
})
export class ProcesoElectoralComponent implements OnInit, AfterViewInit, OnDestroy {

    tipoElecciones: string;
    idProcesoElectoral: string;
    multidataset: MultidatasetProcesosElectorales;

    lugarId: string;
    fecha: string;

    constructor(
        private host: ElementRef,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private multidatasetProcesosElectoralesService: MultidatasetProcesosElectoralesService,
        private configService: ConfigService,
        private metadataService: MetadataService,
        private translateService: TranslateService
    ) { }

    ngOnInit() {
        this.activatedRoute.parent.url.subscribe((url) => {
            if (!this.lugarId || this.lugarId !== url[1].path) {
                this.lugarId = url[1].path;
            }
        });

        this.activatedRoute.parent.params.subscribe((params) => {
            const matchResult = params.idProcesoElectoral.match(TIPO_PROCESO_ELECTORAL_REGEX);
            if (!matchResult) {
                this.router.navigate(['not-found'], { skipLocationChange: true });
            }

            const tipoElecciones = matchResult[1];
            if (tipoElecciones !== this.tipoElecciones) {
                this.onChangeTipoElecciones(params.idProcesoElectoral, tipoElecciones);
            } else if (params.idProcesoElectoral !== this.idProcesoElectoral) {
                this.onChangeProcesoElectoral(params.idProcesoElectoral);
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

    private onChangeTipoElecciones(idProcesoElectoral: string, tipoElecciones: string) {
        this.multidatasetProcesosElectoralesService.getDatasetsByTipoElecciones(tipoElecciones).then((multidataset) => {
            this.tipoElecciones = tipoElecciones;
            this.multidataset = multidataset;
            this.onChangeProcesoElectoral(idProcesoElectoral);

            if (App.mainRegion) {
                this.stopBackbone();
            }
            this.startBackbone(multidataset.id);
        }).catch(() => {
            this.router.navigate(['not-found'], { skipLocationChange: true });
        });
    }

    private onChangeProcesoElectoral(idProcesoElectoral: string) {
        const dataset = this.multidataset.datasetList.find((element) => element.identifier === idProcesoElectoral);
        if (dataset) {
            this.fecha = idProcesoElectoral.match(TIPO_PROCESO_ELECTORAL_REGEX)[2];
        } else {
            throw new Error(this.translateService.instant('procesoElectoral.errorNoEncontrado', { id: idProcesoElectoral }));
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
        if (App.mainRegion) {
            App.removeRegion('mainRegion');
        }
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
