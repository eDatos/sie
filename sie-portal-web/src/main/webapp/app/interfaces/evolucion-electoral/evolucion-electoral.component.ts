import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcesoElectoral } from './proceso-electoral.model';
import { DatasetService, ProcesoElectoralDatasetService } from '../../dataset';
import { Lugar } from '../lugar';
import { BarChart, YElement } from '../../shared';
import { TranslateService } from '@ngx-translate/core';
import { DocumentoService } from '../../documento';
import { JhiAlertService } from 'ng-jhipster';

const ISTAC_ORANGE = '#E5772D';
const ISTAC_GREEN = '#67A23F';
const ISTAC_BROWN = '#8C5C1D';
const ISTAC_BLUE = '#008BD0';
const ISTAC_BLUE_LIGHT = '#2CBCE2';
const ISTAC_BLUE_LIGHTEST = '#D5EDFA';

const INDICADORES_GRAFICA_VOTOS = [
    {nombre: 'VOTOS_VALIDOS_CANDIDATURA', color: ISTAC_BLUE, indicadorAlternativo: 'TASA_VOTOS_VALIDOS_CANDIDATURA'},
    {nombre: 'VOTOS_VALIDOS_BLANCO', color: ISTAC_GREEN, indicadorAlternativo: 'TASA_VOTOS_VALIDOS_BLANCO'},
    {nombre: 'VOTOS_NULOS', color: ISTAC_BROWN, indicadorAlternativo: 'TASA_VOTOS_NULOS'}
];
const INDICADORES_GRAFICA_PARTICIPACION = [
    { nombre: 'TASA_ABSTENCION', color: ISTAC_GREEN, indicadorAlternativo: 'ELECTORES_ABSTENIDOS' },
    { nombre: 'TASA_PARTICIPACION', color: ISTAC_BLUE, indicadorAlternativo: 'ELECTORES_VOTANTES' }
];
const GRAFICA_VOTOS_DEFAULT = false;
const TIPO_COLUMNA = 'column';
const TIPO_AREA = 'area';
const TIPO_LINEA = 'line';
const ELECTORES = 'ELECTORES';
const STACKING_TYPE = 'normal';

const TIPO_ELECCIONES_DEFAULT = 'MUNICIPALES';

@Component({
    selector: 'jhi-evolucion-electoral',
    styleUrls: ['evolucion-electoral.component.scss'],
    templateUrl: './evolucion-electoral.component.html'
})
export class EvolucionElectoralComponent implements OnInit {

    hashProcesos;
    tiposEleccion: Set<string>;
    hashGraficas;
    tipoGrafica = GRAFICA_VOTOS_DEFAULT;
    tipoEleccionesVisible = TIPO_ELECCIONES_DEFAULT;

    lugar: Lugar;
    lugarId: string;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private datasetService: DatasetService,
        private translateService: TranslateService,
        private alertService: JhiAlertService,
        private documentoService: DocumentoService,
        private procesoElectoralDatasetService: ProcesoElectoralDatasetService
    ) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => {
            this.lugarId = params.id;

            this.datasetService.getLugarById(params.id).then((resultadoBusquedaLugar) => {
                if (!resultadoBusquedaLugar) {
                    this.alertService.error('lugar.errorNoEncontrado', { codigo: params.id });
                    throw new Error(this.translateService.instant('lugar.errorNoEncontrado', { codigo: params.id }));
                }

                this.lugar = resultadoBusquedaLugar;
            });

            this.datasetService.getProcesosElectoralesByRegionId(params.id).then((listaProcesoElectoral) => {
                this.limpiarAtributos();
                this.inicializarProcesosElectorales(listaProcesoElectoral);
                this.inicializarTiposEleccion(listaProcesoElectoral);
                this.inicializarGraficas();
                this.comprobarDatosPagina3();
            });
        });
    }

    private limpiarAtributos() {
        this.hashProcesos = {};
        this.hashGraficas = {};
    }

    private inicializarProcesosElectorales(listaProcesoElectoral: ProcesoElectoral[]) {
        listaProcesoElectoral.forEach((procesoElectoral) => {
            if (!this.hashProcesos[procesoElectoral.tipoProcesoElectoral]) {
                this.hashProcesos[procesoElectoral.tipoProcesoElectoral] = [procesoElectoral];
            } else {
                this.hashProcesos[procesoElectoral.tipoProcesoElectoral].push(procesoElectoral);
            }
        });
    }

    private inicializarTiposEleccion(listaProcesoElectoral: ProcesoElectoral[]) {
        const tiposEleccion = listaProcesoElectoral.map((procesoElectoral) => procesoElectoral.tipoProcesoElectoral);
        this.tiposEleccion = new Set(tiposEleccion);
    }

    private inicializarGraficas() {
        this.tiposEleccion.forEach((tipoEleccion) => {
            this.inicializarGrafica(tipoEleccion);
        });
    }

    private inicializarGrafica(tipoEleccion: string) {
        const indicadores = this.getIndicadores();

        const grafica = new BarChart();
        grafica.xAxis = this.crearEjeX(tipoEleccion);
        grafica.yAxis = indicadores.map((indicador) => this.crearElementoEjeY(indicador, tipoEleccion));
        if (!this.tipoGrafica) {
            grafica.yAxis.push(this.crearLineaCenso(tipoEleccion));
        } else {
            grafica.yAxis.push(this.crearAreaAvance(tipoEleccion, 'TASA_PARTICIPACION_A2', ISTAC_BLUE_LIGHT));
            grafica.yAxis.push(this.crearAreaAvance(tipoEleccion, 'TASA_PARTICIPACION_A1', ISTAC_BLUE_LIGHTEST));
        }

        this.hashGraficas[tipoEleccion] = grafica;
    }

    private getIndicadores(): any[] {
        if (this.tipoGrafica) {
            return INDICADORES_GRAFICA_PARTICIPACION;
        } else {
            return INDICADORES_GRAFICA_VOTOS;
        }
    }

    private crearEjeX(tipoEleccion: string): any[] {
        const resultado = [];
        this.hashProcesos[tipoEleccion].forEach((eleccion) => {
            resultado.push(eleccion.fechaEleccion.getFullYear());
        });
        return resultado;
    }

    private crearElementoEjeY(indicador: any, tipoEleccion: string): YElement {
        const resultado = new YElement();
        resultado.name = this.translateService.instant('evolucionElectoral.indicador.' + indicador.nombre);
        resultado.color = indicador.color;
        resultado.stacking = STACKING_TYPE;
        resultado.type = this.tipoGrafica ? TIPO_AREA : TIPO_COLUMNA;
        resultado.alternativeName = this.translateService.instant('evolucionElectoral.indicador.' + indicador.indicadorAlternativo);
        resultado.data = [];
        this.hashProcesos[tipoEleccion].forEach((eleccion) => {
            resultado.data.push({
                y: parseFloat(eleccion.indicadores[indicador.nombre]),
                altData: parseFloat(eleccion.indicadores[indicador.indicadorAlternativo])
            });
        });
        return resultado;
    }

    private crearLineaCenso(tipoEleccion: string): YElement {
        const resultado = new YElement();
        resultado.name = this.translateService.instant('evolucionElectoral.indicador.ELECTORES');
        resultado.color = ISTAC_ORANGE;
        resultado.type = TIPO_LINEA;
        resultado['tooltip'] = { pointFormat: '{series.name}: {point.y}'}
        resultado.data = [];
        this.hashProcesos[tipoEleccion].forEach((eleccion) => {
            resultado.data.push(parseInt(eleccion.indicadores[ELECTORES], 10));
        });
        return resultado;
    }

    private crearAreaAvance(tipoEleccion: string, indicador: string, color: string): YElement {
        const resultado = new YElement();
        resultado.name = this.translateService.instant('evolucionElectoral.indicador.' + indicador);
        resultado.color = color;
        resultado.type = TIPO_AREA;
        resultado['tooltip'] = { pointFormat: '{series.name}: {point.y}'}
        resultado.data = [];
        this.hashProcesos[tipoEleccion].forEach((eleccion) => {
            const valorIndicador = eleccion.indicadores[indicador];
            const valorParseado = valorIndicador ? parseFloat(valorIndicador) : null;
            resultado.data.push(valorParseado);
        });
        return resultado;
    }

    private comprobarDatosPagina3() {
        this.procesoElectoralDatasetService.getDatasetsByTipoElecciones(this.tipoEleccionesVisible).then((multidataset) => {
            multidataset.datasetList.forEach((dataset) => {
                const procesoElectoral = this.hashProcesos[this.tipoEleccionesVisible].find((proceso) => proceso.id.includes(dataset.year));
                if (procesoElectoral) {
                    procesoElectoral.clickable = true;
                }
            });
        });
    }

    onTabChange(event) {
        this.tipoEleccionesVisible = event.nextId;
        this.comprobarDatosPagina3();
    }

    onChangeIndicador() {
        this.inicializarGraficas();
    }

    transition(lugarId) {
        this.router.navigate(['evolucion-electoral', lugarId]);
    }

    descargarPdf(event: Event, tipoEleccion: string) {
        event.stopPropagation();
        const evolucionElectoral = {
            territorio: this.lugar.nombre,
            tipoElecciones: this.translateService.instant('evolucionElectoral.nombreCompletoEleccion.' + tipoEleccion),
            procesosElectorales: this.hashProcesos[tipoEleccion].slice().reverse()
        };
        this.documentoService.descargarPdfEvolucionElectoral(evolucionElectoral);
    }
}
