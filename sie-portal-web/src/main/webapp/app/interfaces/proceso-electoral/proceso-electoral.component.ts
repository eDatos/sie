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
import { BasicDataset } from './basic-dataset';
import { ElectoralResult } from './electoral-result';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { JhiLanguageHelper } from '../../shared';
import { REPRESENTANTES_ELEGIDOS, REPRESENTANTES_ELEGIDOS_TYPES } from '../../shared';
import {FRONTERA_DATASET_ID} from "../../shared/constants/data.constants";

declare var I18n: any;
declare var App: any;
declare var Backbone: any;

export const METAMAC_CSS_LINK = './visualizer-static/metamac.css';
export const METAMAC_CSS_REL = 'stylesheet';
export const TIPO_PROCESO_ELECTORAL_REGEX = /([A-Za-z_]+)\_(\d{4}).*/;

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

    svgGraphic: SVGElement | null = null;

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
        private jhiLanguageHelper: JhiLanguageHelper
    ) {
    }

    ngOnInit() {
        combineLatest(this.activatedRoute.parent.url, this.activatedRoute.parent.params).subscribe((value) => {
            const [url, params] = value;

            if (!this.lugarId || this.lugarId !== url[1].path) {
                this.lugarId = url[1].path;
            }

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
        this.datasetEvolucionElectoralService.getProcesosElectoralesByRegionId(this.lugar.id).then((listaProcesoElectoral) => {
            this.proceso = listaProcesoElectoral.find((proceso) => proceso.id === idProcesoElectoral);
        });
    }

    private updateLugar(lugarId: string) {
        return this.datasetEvolucionElectoralService.getLugarById(lugarId, this.fecha).then((result) => {
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
        const urlSegments = this.activatedRoute.parent.snapshot.url;
        if (lugarId.startsWith(FRONTERA_DATASET_ID)) {
            lugarId = FRONTERA_DATASET_ID;
        }
        window.location.hash = window.location.hash.replace(urlSegments[1].path, lugarId);
    }

    descargarPdf(event: Event) {
        event.stopPropagation();
        this.downloadingPdf = true;

        this.datasetResultadoElectoralService.getDatasetResultadoElectoral(this.dataset.datasetId).subscribe((dataset) => {
            const resultadoElectoral: ResultadoElectoral = {
                territorio: this.lugar,
                procesoElectoral: this.proceso,
                data: this.parseDatasetForPdf(dataset, this.lugar),
            };
            this.documentoService.descargarPdfResultadoElectoral(resultadoElectoral, this.svgGraphic).pipe(finalize(() => this.downloadingPdf = false)).subscribe(
                (response) => this.documentoService.saveToFileSystem(response),
                () => this.alertService.error('error.cannotDownloadDocument'),
            );
        });
    }

    private onChangeTipoElecciones(idProcesoElectoral: string, tipoElecciones: string) {
        this.multidatasetProcesosElectoralesService.getDatasetsByTipoElecciones(tipoElecciones).subscribe((multidataset) => {
            this.tipoElecciones = tipoElecciones;
            this.multidataset = multidataset;
            this.onChangeProcesoElectoral(idProcesoElectoral);

            if (App.mainRegion) {
                this.stopBackbone();
            }
            this.multidatasetId = multidataset.id;
            this.startBackbone(this.multidatasetId);
        }, () => {
            this.router.navigate(['not-found'], { skipLocationChange: true });
        });
    }

    private onChangeProcesoElectoral(idProcesoElectoral: string) {
        this.dataset = this.multidataset.datasetList.find((element) => element.identifier === idProcesoElectoral);
        if (this.dataset) {
            this.fecha = idProcesoElectoral.match(TIPO_PROCESO_ELECTORAL_REGEX)[2];
            this.updateLugar(this.lugarId).then(() => {
                this.updateProceso(idProcesoElectoral);
            });
        } else {
            throw new Error(this.translateService.instant('procesoElectoral.errorNoEncontrado', { id: idProcesoElectoral }));
        }
    }

    private startBackbone(multidatasetId: string) {
        const config = this.configService.getConfig();

        this.jhiLanguageHelper.getLanguages(config).then((languages) => {
            I18n.defaultLocale = languages[0];
            this.jhiLanguageHelper.getInternationalizationCookieValue(config).then((cookieValue)=> {
                this.jhiLanguageHelper.getCurrentLocale(cookieValue, languages).then((currentLocale) => {
                    I18n.locale = currentLocale
                });
            });
        });

        App.addRegions({
            mainRegion: '.metamac-container',
        });

        Observable.zip(
            this.metadataService.getPropertyById(config.metadata.statisticalResourcesKey),
            this.metadataService.getPropertyById(config.metadata.structuralResourcesKey),
            this.metadataService.getPropertyById(config.metadata.externalUsersKey),
            this.metadataService.getPropertyById(config.metadata.externalUsersWebKey),
            this.metadataService.getPropertyById(config.metadata.indicatorsKey),
            this.metadataService.getPropertyById(config.metadata.permalinksEndpointKey),
            this.metadataService.getPropertyById(config.metadata.exportEndpointKey),
            this.metadataService.getPropertyById(config.metadata.statisticalVisualizerKey),
            this.metadataService.getPropertyById(config.metadata.organisationKey),
            this.metadataService.getPropertyById(config.metadata.organisationUrnKey),
            this.metadataService.getPropertyById(config.metadata.geographicalGranularityUrnKey),
            this.metadataService.getPropertyById(config.metadata.firstTerritoryHierarchyLevelKey),
            (statisticalResources,
                structuralResources,
                externalUsers,
                externalUsersWeb,
                indicators,
                permalinks,
                exportEndpoint,
                statisticalVisualizer,
                organizationName,
                organisationUrn,
                geographicalGranularityUrn,
                firstTerritoryHierarchyLevel) => {
                App.endpoints['statistical-resources'] = statisticalResources + '/v1.0';
                App.endpoints['structural-resources'] = structuralResources + '/v1.0';
                App.endpoints['external-users'] = externalUsers;
                App.endpoints['external-users-web'] = externalUsersWeb;
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
                App.config['firstTerritoryHierarchyLevel'] = firstTerritoryHierarchyLevel;

                App.queryParams['agency'] = organizationName;
                App.queryParams['type'] = 'dataset';
                App.queryParams['multidatasetId'] = multidatasetId;
            },
        ).subscribe(() => {
            App.start();
            App.on('graphic.visualizer:ready', this.saveSvg, this);
        });
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
    private parseDatasetForPdf(dataset: BasicDataset, territory: Lugar): ElectoralResult[] {
        // parse the string of observations to an array of numbers
        const observations = dataset.data.observations.split(' | ').map((observation) => {
            if (observation.length === 0) {
                return null;
            }
            return Number(observation);
        });

        // create a map of dimensions, where
        //  key     ->  dimension id (i.e. MEDIDAS, TERRITORIO)
        //  value   ->  categories array (i.e. for MEDIDAS: VOTOS_VALIDOS, REPRESENTANTES_ELEGIDOS, ...)
        const dimensions = dataset.data.dimensions.dimension.map((dim) => [dim.dimensionId, dim.representations.representation]).reduce((map, arr) => {
            map.set(arr[0], arr[1]);
            return map;
        }, new Map);

        const dimIds = Array.from(dimensions.keys());

        const cat1 = dimensions.get(dimIds[0]);
        const cat2 = dimensions.get(dimIds[1]);
        const cat3 = dimensions.get(dimIds[2]);

        const data = [];

        // We do all this hastle because we know there are gonna be three dimensions
        // that we need: medidas, territorio, and candidaturas. Thing is we don't know beforehand the order
        // they come on the dataset, which it matters because that's how we access the values on the
        // observations array
        for (let i = 0; i < cat1.length; i++) {
            const v1 = cat1[i];

            for (let j = 0; j < cat2.length; j++) {
                const v2 = cat2[j];

                for (let k = 0; k < cat3.length; k++) {
                    const v3 = cat3[k];

                    const arr = [v1.code, v2.code, v3.code];
                    const measure = arr[dimIds.indexOf('MEDIDAS')];
                    const observation = observations[k + cat3.length * (j + cat2.length * i)]; // see https://eli.thegreenplace.net/2015/memory-layout-of-multi-dimensional-arrays
                    if (observation !== null) {
                        data.push({
                            measure: this.normalizeMeasureForPdf(measure),
                            territory: this.getTerritoryInfo(dataset, "TERRITORIO", arr[dimIds.indexOf("TERRITORIO")]),
                            candidacy: this.getName(dataset, 'CANDIDATURAS', arr[dimIds.indexOf('CANDIDATURAS')]),
                            value: observation
                        });
                    }
                }
            }
        }

        // it's easy to deal with the data if it's grouped the results by the candidacy
        const resultsByCandidacy = new Map();
        for (const row of data) {
            if (row.territory.name === territory.nombre && row.territory.granularity === territory.granularidad) {
                const obj = resultsByCandidacy.get(row.candidacy) || {};
                obj[row.measure] = row.value;
                resultsByCandidacy.set(row.candidacy, obj);
            }
        }

        return Array.from(resultsByCandidacy.entries()).map((entry) => {
            return {
                candidacy: entry[0],
                results: entry[1],
            }
        });
    }

    private getName(dataset, dimensionId: string, dimensionValue: string): string {
        return dataset.metadata.dimensions.dimension.find((dim) => dim.id === dimensionId)
                      .dimensionValues.value.find((val) => val.id === dimensionValue)
                      .name.text.find((text) => text.lang === 'es').value;
    }

    private getTerritoryInfo(dataset, dimensionId: string, dimensionValue: string): { name: string, granularity: string } {
        const territory = dataset.metadata.dimensions.dimension.find((dim) => dim.id === dimensionId)
                      .dimensionValues.value.find((val) => val.id === dimensionValue);

        return {
            name: territory.name.text.find((text) => text.lang === 'es').value,
            granularity: territory.geographicGranularity.name.text.find((text) => text.lang === 'es').value,
        }
    }

    private saveSvg() {
        this.svgGraphic = document.querySelector('.dataset-visualization-visual-element svg').cloneNode(true) as SVGElement;
    }

    private normalizeMeasureForPdf(measure: string): string {
        return REPRESENTANTES_ELEGIDOS_TYPES.indexOf(measure) > -1 ? REPRESENTANTES_ELEGIDOS : measure;
    }
}

