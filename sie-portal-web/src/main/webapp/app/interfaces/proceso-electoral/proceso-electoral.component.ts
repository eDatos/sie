import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import {
    MultidatasetProcesosElectoralesService,
    DatasetEvolucionElectoralService,
    ProcesoElectoral,
    Lugar,
    ResultadoElectoral,
    DatasetProcesoElectoral,
    MultidatasetProcesosElectorales,
    DatasetResultadoElectoralService,
} from '../../dataset';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService, MetadataService } from '../../config';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { DocumentoService } from '../../documento';
import { JhiAlertService } from 'ng-jhipster';
import { finalize } from 'rxjs/operators';
import { zip } from 'rxjs/observable/zip';
import { BasicDataset } from './basic-dataset';
import { ElectoralResult } from './electoral-result';

declare var I18n: any;
declare var App: any;
declare var Backbone: any;

export const METAMAC_CSS_LINK = './visualizer-static/metamac.css';
export const METAMAC_CSS_REL = 'stylesheet';
const TIPO_PROCESO_ELECTORAL_REGEX = /([A-Za-z_]+)\_(\d{4}).*/;

@Component({
    selector: 'jhi-proceso-electoral',
    styleUrls: ['proceso-electoral.component.scss'],
    templateUrl: './proceso-electoral.component.html',
})
export class ProcesoElectoralComponent implements OnInit, AfterViewInit, OnDestroy {

    tipoElecciones: string;
    idProcesoElectoral: string;
    multidataset: MultidatasetProcesosElectorales;

    lugarId: string;
    fecha: string;
    proceso: ProcesoElectoral;
    downloadingPdf = false;
    lugar: Lugar;
    multidatasetId: string;
    dataset: DatasetProcesoElectoral;

    constructor(
        private host: ElementRef,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private multidatasetProcesosElectoralesService: MultidatasetProcesosElectoralesService,
        private configService: ConfigService,
        private metadataService: MetadataService,
        private translateService: TranslateService,
        private datasetEvolucionElectoralService: DatasetEvolucionElectoralService,
        private documentoService: DocumentoService,
        private alertService: JhiAlertService,
        private datasetResultadoElectoralService: DatasetResultadoElectoralService,
    ) {
    }

    ngOnInit() {
        zip(this.activatedRoute.parent.url, this.activatedRoute.parent.params).subscribe((value) => {
            const [url, params] = value;

            if (!this.lugarId || this.lugarId !== url[1].path) {
                this.lugarId = url[1].path;
            }

            this.updateLugar(this.lugarId);
            this.updateProceso(params.idProcesoElectoral);

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

    private updateProceso(idProcesoElectoral: string) {
        this.datasetEvolucionElectoralService.getProcesosElectoralesByRegionId(this.lugarId).then((listaProcesoElectoral) => {
            this.proceso = listaProcesoElectoral.find((proceso) => proceso.id === idProcesoElectoral);
        });
    }

    private updateLugar(lugarId: string) {
        this.datasetEvolucionElectoralService.getLugarById(lugarId).then((result) => {
            if (!result) {
                this.alertService.error('lugar.errorNoEncontrado', { codigo: lugarId });
                throw new Error(this.translateService.instant('lugar.errorNoEncontrado', { codigo: lugarId }));
            }

            this.lugar = result;
        });
    }

    ngAfterViewInit() {
        this.insertMetamacStyles();
    }

    ngOnDestroy() {
        this.stopBackbone();
    }

    transition(lugarId) {
        // this.router.navigate() // FIXME: porqué no se están actualizando los datos del lugar
        //                            al transicionar
        const urlSegments = this.activatedRoute.parent.snapshot.url;
        window.location.hash = window.location.hash.replace(urlSegments[1].path, lugarId);
    }

    descargarPdf(event: Event) {
        event.stopPropagation();
        this.downloadingPdf = true;

        this.datasetResultadoElectoralService.getDatasetResultadoElectoral(this.dataset.datasetId).subscribe((dataset) => {
            const resultadoElectoral: ResultadoElectoral = {
                territorio: this.lugar.nombre,
                procesoElectoral: this.proceso,
                data: this.parseDataset(dataset).filter(row => row.territory === this.lugar.nombre),
            };
            this.documentoService.descargarPdfResultadoElectoral(resultadoElectoral).pipe(finalize(() => this.downloadingPdf = false)).subscribe(
                (response) => this.documentoService.saveToFileSystem(response),
                () => this.alertService.error('error.cannotDownloadDocument'),
            );
        });
    }

    private onChangeTipoElecciones(idProcesoElectoral: string, tipoElecciones: string) {
        this.multidatasetProcesosElectoralesService.getDatasetsByTipoElecciones(tipoElecciones).then((multidataset) => {
            this.tipoElecciones = tipoElecciones;
            this.multidataset = multidataset;
            this.onChangeProcesoElectoral(idProcesoElectoral);

            if (App.mainRegion) {
                this.stopBackbone();
            }
            this.multidatasetId = multidataset.id;
            this.startBackbone(this.multidatasetId);
        }).catch(() => {
            this.router.navigate(['not-found'], { skipLocationChange: true });
        });
    }

    private onChangeProcesoElectoral(idProcesoElectoral: string) {
        this.dataset = this.multidataset.datasetList.find((element) => element.identifier === idProcesoElectoral);
        if (this.dataset) {
            this.fecha = idProcesoElectoral.match(TIPO_PROCESO_ELECTORAL_REGEX)[2];
        } else {
            throw new Error(this.translateService.instant('procesoElectoral.errorNoEncontrado', { id: idProcesoElectoral }));
        }
    }

    private startBackbone(multidatasetId: string) {
        I18n.defaultLocale = 'es';
        I18n.locale = 'es';

        App.addRegions({
            mainRegion: '.metamac-container',
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
            },
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

    /**
     * Converts the dataset to a simple table with the name of the party and the data of the elections
     */
    private parseDataset(dataset: BasicDataset): ElectoralResult[] {
        const data: ElectoralResult[] = [];

        // parse the string of observations to an array
        const observations = dataset.data.observations.split('|').map((observation) => {
            if (observation.trim().length === 0) {
                return null;
            }
            return observation.trim();
        });

        const medidas = dataset.data.dimensions.dimension.find((dim) => dim.dimensionId === 'MEDIDAS').representations.representation;
        const territorios = dataset.data.dimensions.dimension.find((dim) => dim.dimensionId === 'TERRITORIO').representations.representation;
        const candidaturas = dataset.data.dimensions.dimension.find((dim) => dim.dimensionId === 'CANDIDATURAS').representations.representation;

        function getName(id: string, code: string): string {
            return dataset.metadata.dimensions.dimension.find((dim) => dim.id === id)
                          .dimensionValues.value.find((val) => val.id === code)
                          .name.text.find((text) => text.lang === 'es').value;
        }

        for (let i = 0; i < medidas.length; i++) {
            const medida = medidas[i];
            for (let j = 0; j < territorios.length; j++) {
                const territorio = territorios[j];
                for (let k = 0; k < candidaturas.length; k++) {
                    const candidatura = candidaturas[k];
                    data.push({
                        measure: getName('MEDIDAS', medida.code),
                        territory: getName('TERRITORIO', territorio.code),
                        candidacy: getName('CANDIDATURAS', candidatura.code),
                        value: observations[i + j + k],
                    });
                }
            }
        }

        return data;
    }
}
