import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatasetEvolucionElectoralService, MultidatasetProcesosElectoralesService, ProcesoElectoral, Lugar } from '../../dataset';
import { Chart, YElement } from '../../shared';
import { TranslateService } from '@ngx-translate/core';
import { DocumentoService } from '../../documento';
import { JhiAlertService } from 'ng-jhipster';
import {
    ELECCIONES_REGIONALES_ID_FRAGMENT, INDICADOR_GRAFICA_ELECTORES, INDICADORES_GRAFICA_PARTICIPACION,
    ORDEN_TIPO_ELECCIONES, STACKING_TYPE, TIPO_COLUMNA,
    TIPO_ELECCIONES_AUTONOMICAS,
    TIPO_ELECCIONES_DEFAULT,
    TIPO_ELECCIONES_REFERENDUM, TIPO_LINEA
} from "../../config";

@Component({
    selector: 'jhi-evolucion-electoral',
    styleUrls: ['evolucion-electoral.component.scss'],
    templateUrl: './evolucion-electoral.component.html'
})
export class EvolucionElectoralComponent implements OnInit {

    hashProcesos;
    tiposEleccion: Array<string>;
    hashGraficas;
    tipoEleccionesVisible: string;

    lugar: Lugar;
    lugarId: string;
    downloadingPdf = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private datasetEvolucionElectoralService: DatasetEvolucionElectoralService,
        private translateService: TranslateService,
        private alertService: JhiAlertService,
        private documentoService: DocumentoService,
        private multidatasetProcesosElectoralesService: MultidatasetProcesosElectoralesService
    ) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => {
            this.lugarId = params.id;

            this.datasetEvolucionElectoralService.getLugarById(params.id).then((resultadoBusquedaLugar) => {
                if (!resultadoBusquedaLugar) {
                    this.alertService.error('lugar.errorNoEncontrado', { codigo: params.id });
                    throw new Error(this.translateService.instant('lugar.errorNoEncontrado', { codigo: params.id }));
                }

                this.lugar = resultadoBusquedaLugar;
            });

            this.datasetEvolucionElectoralService.getProcesosElectoralesByRegionId(params.id).then((listaProcesoElectoral) => {
                this.limpiarAtributos();
                this.inicializarProcesosElectorales(listaProcesoElectoral);
                this.inicializarTiposEleccion(listaProcesoElectoral);
                this.inicializarGraficas();

                this.activatedRoute.queryParams.subscribe((queryParams) => {
                    this.tipoEleccionesVisible = queryParams.tipoEleccion ? queryParams.tipoEleccion.toUpperCase() : TIPO_ELECCIONES_DEFAULT;
                    this.comprobarDatosPagina3();
                })
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
        const tiposEleccion = listaProcesoElectoral.map((procesoElectoral) => procesoElectoral.tipoProcesoElectoral)
            .filter((tipoProcesoElectoral) => tipoProcesoElectoral !== TIPO_ELECCIONES_REFERENDUM); // METAMAC-2905 TRAPICHE! Se ocultan los referéndums
        this.tiposEleccion = Array.from(new Set(tiposEleccion)).sort((a, b) => {
            return ORDEN_TIPO_ELECCIONES.indexOf(a) - ORDEN_TIPO_ELECCIONES.indexOf(b);
        });
    }

    private inicializarGraficas() {
        this.tiposEleccion.forEach((tipoEleccion) => {
            this.inicializarGrafica(tipoEleccion);
        });
    }

    private inicializarGrafica(tipoEleccion: string) {
        let listaProcesoElectoral = this.hashProcesos[tipoEleccion];
        // METAMAC-2931 TRAPICHE! Se ocultan las autonómicas regionales de la gráfica.
        if (tipoEleccion === TIPO_ELECCIONES_AUTONOMICAS) {
            listaProcesoElectoral = listaProcesoElectoral.filter((procesoElectoral) => !procesoElectoral.id.includes(ELECCIONES_REGIONALES_ID_FRAGMENT));
        }

        const grafica = new Chart();
        grafica.xAxis = this.crearEjeX(listaProcesoElectoral);
        grafica.yAxis = this.crearEjeY(listaProcesoElectoral);

        this.hashGraficas[tipoEleccion] = grafica;
    }

    private crearEjeX(listaProcesoElectoral: ProcesoElectoral[]): any[] {
        const resultado = [];
        listaProcesoElectoral.forEach((eleccion) => {
            resultado.push(eleccion.nombre);
        });
        return resultado;
    }

    private crearEjeY(listaProcesoElectoral: any) {
        return [
            this.crearElementoEjeY(INDICADOR_GRAFICA_ELECTORES, TIPO_COLUMNA, listaProcesoElectoral, 0),
            this.crearElementoEjeY(INDICADORES_GRAFICA_PARTICIPACION, TIPO_LINEA, listaProcesoElectoral, 1),
        ];
    }

    private crearElementoEjeY(indicador: any, type: string, listaProcesoElectoral: ProcesoElectoral[], yAxisIndex: number): YElement {
        const resultado = new YElement();
        resultado.name = this.translateService.instant('evolucionElectoral.indicador.' + indicador.nombre);
        resultado.color = indicador.color;
        resultado.stacking = STACKING_TYPE;
        resultado.type = type;
        resultado.yAxis = yAxisIndex;
        resultado.data = [];
        for (const eleccion of listaProcesoElectoral) {
            const valorPrincipal = eleccion.indicadores[indicador.nombre];
            const valorAlternativo = eleccion.indicadores[indicador.indicadorAlternativo];
            resultado.data.push({
                y: valorPrincipal ? parseFloat(valorPrincipal) : null,
                altData: valorAlternativo ? parseFloat(valorAlternativo) : null
            });
        }
        return resultado;
    }

    private comprobarDatosPagina3() {
        this.multidatasetProcesosElectoralesService.getDatasetsByTipoElecciones(this.tipoEleccionesVisible).subscribe((multidataset) => {
            this.router.navigate([], {queryParams: {tipoEleccion: this.tipoEleccionesVisible.toLowerCase()}});
            multidataset.datasetList.forEach((dataset) => {
                const procesoElectoral = this.hashProcesos[this.tipoEleccionesVisible].find((proceso) => proceso.id === dataset.identifier);
                if (procesoElectoral) {
                    procesoElectoral.clickable = true;
                }
            });
        }, () => {
            console.log(this.translateService.instant('error.noMultidatasetForTipoElecciones', { tipoElecciones: this.tipoEleccionesVisible }));
        });
    }

    onTabChange(event) {
        this.tipoEleccionesVisible = event.nextId;
        this.router.navigate([], {queryParams: {tipoEleccion: this.tipoEleccionesVisible.toLowerCase()}});
        this.comprobarDatosPagina3();
    }

    transition(lugarId) {
        this.router.navigate(['evolucion-electoral', lugarId], { queryParams: { tipoEleccion: this.tipoEleccionesVisible.toLowerCase() } });
    }

    descargarPdf(event: Event, tipoEleccion: string) {
        event.stopPropagation();
        this.downloadingPdf = true;
        const evolucionElectoral = {
            territorio: this.lugar.nombre,
            tipoElecciones: this.translateService.instant('evolucionElectoral.nombreCompletoEleccion.' + tipoEleccion),
            procesosElectorales: this.hashProcesos[tipoEleccion].slice().reverse(),
        };
        this.documentoService.descargarPdfEvolucionElectoral(evolucionElectoral).subscribe(
            (response) => this.documentoService.saveToFileSystem(response),
            () => this.alertService.error('error.cannotDownloadDocument'),
            () => this.downloadingPdf = false,
        );
    }

    getLugar(id: string) {
        return id.startsWith('38013') ? '38013' : id;
    }
}
