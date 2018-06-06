import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcesoElectoral } from './proceso-electoral.model';
import { DatasetService } from '../../dataset';
import { Lugar } from '../lugar';
import { BarChart, YElement } from '../../shared';
import { TranslateService } from '@ngx-translate/core';
import { DocumentoService } from '../../documento';
import { JhiAlertService } from 'ng-jhipster';

const INDICADORES_ABSOLUTOS_GRAFICA = ['VOTOS_VALIDOS_CANDIDATURA', 'VOTOS_VALIDOS_BLANCO', 'VOTOS_NULOS'];
const INDICADORES_PORCENTAJE_GRAFICA = ['TASA_VOTOS_VALIDOS_CANDIDATURA', 'TASA_VOTOS_VALIDOS_BLANCO', 'TASA_VOTOS_NULOS'];
const INDICADORES_EN_PORCENTAJE_DEFAULT = false;
const TIPO_COLUMNA = 'column';
const TIPO_LINEA = 'spline';
const ELECTORES = 'ELECTORES';

@Component({
    selector: 'jhi-evolucion-electoral',
    styleUrls: ['evolucion-electoral.component.scss'],
    templateUrl: './evolucion-electoral.component.html'
})
export class EvolucionElectoralComponent implements OnInit {

    hashProcesos;
    tiposEleccion: Set<string>;
    hashGraficas;
    hashIndicadoresEnPorcentaje;

    lugares: Lugar[];
    _lugar: Lugar;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private datasetService: DatasetService,
        private translateService: TranslateService,
        private alertService: JhiAlertService,
        private documentoService: DocumentoService
    ) { }

    ngOnInit() {
        this.datasetService.getListaLugares().then((listaLugares) => {
            this.lugares = listaLugares;

            this.activatedRoute.params.subscribe((params) => {
                const resultadoBusquedaLugar = this.lugares.find((lugar) => lugar.id === params.id);
                if (!resultadoBusquedaLugar) {
                    this.alertService.success('lugar.errorNoEncontrado', { codigo: params.id });
                    throw new Error(this.translateService.instant('lugar.errorNoEncontrado', { codigo: params.id }));
                }

                this._lugar = resultadoBusquedaLugar;
                this.datasetService.getProcesosElectoralesByRegionId(params.id).then((listaProcesoElectoral) => {
                    this.limpiarAtributos();
                    this.inicializarProcesosElectorales(listaProcesoElectoral);
                    this.inicializarTiposEleccion(listaProcesoElectoral);
                    this.inicializarIndicadoresYGraficas();
                });
            });
        });
    }

    private limpiarAtributos() {
        this.hashProcesos = {};
        this.hashGraficas = {};
        this.hashIndicadoresEnPorcentaje = {};
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

    private inicializarIndicadoresYGraficas() {
        this.tiposEleccion.forEach((tipoEleccion) => {
            this.hashIndicadoresEnPorcentaje[tipoEleccion] = INDICADORES_EN_PORCENTAJE_DEFAULT;
            this.inicializarGrafica(tipoEleccion);
        });
    }

    private inicializarGrafica(tipoEleccion: string) {
        const indicadores = this.getIndicadores(tipoEleccion);

        const grafica = new BarChart();
        grafica.xAxis = this.crearEjeX(tipoEleccion);
        grafica.yAxis = indicadores.map((indicador) => this.crearElementoEjeY(indicador, tipoEleccion));
        if (!this.hashIndicadoresEnPorcentaje[tipoEleccion]) {
            grafica.yAxis.push(this.crearLineaCenso(tipoEleccion));
        }

        this.hashGraficas[tipoEleccion] = grafica;
    }

    private getIndicadores(tipoEleccion: string): string[] {
        if (this.hashIndicadoresEnPorcentaje[tipoEleccion]) {
            return INDICADORES_PORCENTAJE_GRAFICA;
        } else {
            return INDICADORES_ABSOLUTOS_GRAFICA;
        }
    }

    private crearEjeX(tipoEleccion: string): any[] {
        const resultado = [];
        this.hashProcesos[tipoEleccion].forEach((eleccion) => {
            resultado.push(eleccion.fechaEleccion.getFullYear());
        });
        return resultado;
    }

    private crearElementoEjeY(indicador: string, tipoEleccion: string): YElement {
        const resultado = new YElement();
        resultado.name = this.translateService.instant('evolucionElectoral.indicador.' + indicador);
        resultado.type = TIPO_COLUMNA;
        resultado.data = [];
        this.hashProcesos[tipoEleccion].forEach((eleccion) => {
            resultado.data.push(parseFloat(eleccion.indicadores[indicador]));
        });
        return resultado;
    }

    private crearLineaCenso(tipoEleccion: string): YElement {
        const resultado = new YElement();
        resultado.name = this.translateService.instant('evolucionElectoral.indicador.ELECTORES');
        resultado.type = TIPO_LINEA;
        resultado.data = [];
        this.hashProcesos[tipoEleccion].forEach((eleccion) => {
            resultado.data.push(parseInt(eleccion.indicadores[ELECTORES], 10));
        });
        return resultado;
    }

    onChangeIndicador(tipoEleccion: string) {
        this.inicializarGrafica(tipoEleccion);
    }

    transition() {
        if (this._lugar) {
            this.router.navigate(['evolucion-electoral', this._lugar.id]);
        }
    }

    descargarPdf(event: Event, tipoEleccion: string) {
        event.stopPropagation();
        const evolucionElectoral = {
            territorio: this._lugar.nombre,
            tipoElecciones: this.translateService.instant('evolucionElectoral.tipoEleccion.' + tipoEleccion),
            procesosElectorales: this.hashProcesos[tipoEleccion].slice().reverse()
        };
        this.documentoService.descargarPdfEvolucionElectoral(evolucionElectoral);
    }

    set lugar(lugar: Lugar) {
        if (lugar instanceof Lugar) {
            this._lugar = lugar;
        }
    }

    get lugar(): Lugar {
        return this._lugar;
    }
}
