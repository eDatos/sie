import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcesoElectoral } from './proceso-electoral.model';
import { DatasetService } from '../../dataset';
import { Lugar } from '../lugar';
import { BarChart, YElement } from '../../shared';
import { TranslateService } from '@ngx-translate/core';

const INDICADORES_ABSOLUTOS_GRAFICA = ['VOTOS_VALIDOS', 'VOTOS_BLANCOS', 'VOTOS_NULOS'];
const INDICADORES_PORCENTAJE_GRAFICA = ['VOTOS_VALIDOS_PORCENTAJE', 'VOTOS_BLANCOS_PORCENTAJE', 'VOTOS_NULOS_PORCENTAJE'];
const INDICADORES_EN_PORCENTAJE_DEFAULT = false;

@Component({
    selector: 'jhi-evolucion-electoral',
    styleUrls: ['evolucion-electoral.component.scss'],
    templateUrl: './evolucion-electoral.component.html'
})
export class EvolucionElectoralComponent implements OnInit {

    procesosPorTipo;
    tiposEleccion: Set<string>;
    graficasPorTipo;
    indicadoresPorTipo;

    lugares: Lugar[];
    _lugar: Lugar;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private datasetService: DatasetService,
        private translateService: TranslateService
    ) { }

    ngOnInit() {
        this.datasetService.getListaLugares().then((listaLugares) => {
            this.lugares = listaLugares;

            this.activatedRoute.params.subscribe((params) => {
                if (!this._lugar) {
                    this._lugar = this.lugares.find((lugar) => lugar.id === params.id);
                }

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
        this.procesosPorTipo = {};
        this.graficasPorTipo = {};
        this.indicadoresPorTipo = {};
    }

    private inicializarProcesosElectorales(listaProcesoElectoral: ProcesoElectoral[]) {
        listaProcesoElectoral.forEach((procesoElectoral) => {
            if (!this.procesosPorTipo[procesoElectoral.tipoProcesoElectoral]) {
                this.procesosPorTipo[procesoElectoral.tipoProcesoElectoral] = [procesoElectoral];
            } else {
                this.procesosPorTipo[procesoElectoral.tipoProcesoElectoral].push(procesoElectoral);
            }
        });
    }

    private inicializarTiposEleccion(listaProcesoElectoral: ProcesoElectoral[]) {
        const tiposEleccion = listaProcesoElectoral.map((procesoElectoral) => procesoElectoral.tipoProcesoElectoral);
        this.tiposEleccion = new Set(tiposEleccion);
    }

    private inicializarIndicadoresYGraficas() {
        this.tiposEleccion.forEach((tipoEleccion) => {
            this.indicadoresPorTipo[tipoEleccion] = INDICADORES_EN_PORCENTAJE_DEFAULT;
            this.inicializarGrafica(tipoEleccion);
        });
    }

    private inicializarGrafica(tipoEleccion: string) {
        const indicadores = this.getIndicadores(tipoEleccion);

        const grafica = new BarChart();
        grafica.xAxis = this.crearEjeX(tipoEleccion);
        grafica.yAxis = indicadores.map((indicador) => this.crearElementoEjeY(indicador, tipoEleccion));

        this.graficasPorTipo[tipoEleccion] = grafica;
    }

    private getIndicadores(tipoEleccion: string): string[] {
        if (this.indicadoresPorTipo[tipoEleccion]) {
            return INDICADORES_PORCENTAJE_GRAFICA;
        } else {
            return INDICADORES_ABSOLUTOS_GRAFICA;
        }
    }

    private crearEjeX(tipoEleccion: string): any[] {
        const resultado = [];
        this.procesosPorTipo[tipoEleccion].forEach((eleccion) => {
            resultado.push(eleccion.fechaEleccion.getFullYear());
        });
        return resultado;
    }

    private crearElementoEjeY(indicador: string, tipoEleccion: string): YElement {
        const resultado = new YElement();
        resultado.name = this.translateService.instant('evolucionElectoral.indicador.' + indicador);
        resultado.data = [];
        this.procesosPorTipo[tipoEleccion].forEach((eleccion) => {
            resultado.data.push(parseFloat(eleccion.indicadores[indicador]));
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
