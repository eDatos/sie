import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { ConfigService, MetadataService } from '../config';
import { Lugar } from './lugar.model';
import { ProcesoElectoral } from './proceso-electoral.model';
import { TipoEleccionesDatasetUrlService } from './tipo-elecciones-dataset-url.service';
import { DatePipe } from '@angular/common';

const GEOGRAPHIC_DIMENSION = 'GEOGRAPHIC_DIMENSION';
const FECHA_ELECCION = 'FECHA_ELECCION';
const TIPO_PROCESO_ELECTORAL = 'TIPO_PROCESO_ELECTORAL';
const NOMBRE_CORTO_PROCESO_ELECTORAL = 'NOMBRE_CORTO_PROCESO_ELECTORAL';
const SEPARADOR = '|';
const TERRITORIO = 'TERRITORIO';
const PROCESO_ELECTORAL = 'PROCESO_ELECTORAL';
const INDICADORES = 'INDICADORES';

@Injectable()
export class DatasetEvolucionElectoralService {

    // Atributos para la lista de lugares
    private promesaLugares: Promise<Lugar[]>;

    // Atributos para la lista de procesos electorales
    private multiplicadores = {};
    private idsDimensiones: string[] = [];

    constructor(
        private http: Http,
        private configService: ConfigService,
        private metadataService: MetadataService,
        private tipoEleccionesDatasetUrlService: TipoEleccionesDatasetUrlService,
        private datePipe: DatePipe
    ) { }

    getListaLugares(): Promise<Lugar[]> {
        if (!this.promesaLugares) {
            this.promesaLugares = new Promise<Lugar[]>((resolve) => {
                this.doGetMetadata().subscribe(
                    (json) => {
                        resolve(this.parseListaLugares(json));
                    },
                    () => {
                        resolve([]);
                    });
            });
        }
        return this.promesaLugares;
    }

    getLugarById(id: string): Promise<Lugar> {
        return this.getListaLugares().then((listaLugares) => listaLugares.find((element) => element.id === id));
    }

    private doGetMetadata(): Observable<any> {
        const config = this.configService.getConfig();
        return Observable.zip(
            this.metadataService.getPropertyById(config.metadata.statisticalResourcesKey),
            this.tipoEleccionesDatasetUrlService.getDatasetIdByTipoElecciones(config.dataset.evolucionElectoralKey),
        ).flatMap((responses) => {
            return this.http.get(`${responses[0]}/v1.0${responses[1].datasetUrl}${config.dataset.metadata}`)
                .map((res: Response) => res.json());
        });
    }

    private parseListaLugares(json: any): Lugar[] {
        const geographicDimension = json.metadata.dimensions.dimension.find((dimension) => dimension.type === GEOGRAPHIC_DIMENSION);
        const lugares = geographicDimension.dimensionValues.value.filter((element) => !/.+_O$/.test(element.id));
        return lugares.map((element) => {
            return new Lugar(element.id, element.name.text[0].value, element.geographicGranularity.name.text[0].value);
        });
    }

    getProcesosElectoralesByRegionId(id: string): Promise<ProcesoElectoral[]> {
        return new Promise<ProcesoElectoral[]>((resolve) => {
            this.doGetDataByRegionId(id).subscribe(
                (json) => {
                    resolve(this.parseListaProcesosElectorales(json));
                },
                () => {
                    resolve([]);
                }
            );
        });
    }

    private parseListaProcesosElectorales(json: any): ProcesoElectoral[] {
        // Atributos
        const fechas = this.procesaAtributo(json, FECHA_ELECCION);
        const tipos = this.procesaAtributo(json, TIPO_PROCESO_ELECTORAL);
        const nombres = this.procesaAtributo(json, NOMBRE_CORTO_PROCESO_ELECTORAL);

        // Datos
        const datos = this.procesaDatos(json);

        // Inicializacion de atributos para calcular los indices
        this.idsDimensiones = this.creaListaIdsDimensiones(json);
        this.multiplicadores = this.creaMultiplicador(json);

        // Ensamblaje de los procesos electorales
        const listaProcesoElectoral = this.creaProcesosElectorales(json);
        const listaIndicadores = this.creaIndicadores(json);

        for (let i = 0; i < listaProcesoElectoral.length; i++) {
            const procesoElectoral = listaProcesoElectoral[i];
            procesoElectoral.fechaEleccion = new Date(fechas[i].trim());
            procesoElectoral.tipoProcesoElectoral = tipos[i].trim();
            procesoElectoral.nombre = this.datePipe.transform(procesoElectoral.fechaEleccion, 'yyyy');
            if (nombres && nombres[i] && nombres[i].trim()) {
                procesoElectoral.nombre = nombres[i].trim();
            }

            for (let j = 0; j < listaIndicadores.length; j++) {
                const indicador = listaIndicadores[j];
                const coordenadas = {
                    'INDICADORES': indicador.index,
                    'TERRITORIO': 0,
                    'PROCESO_ELECTORAL': procesoElectoral.indiceDimension
                }
                procesoElectoral.indicadores[indicador.code] = datos[this.calcularIndice(coordenadas)].trim();
            }
        }

        const listaProcesosConDatos = listaProcesoElectoral.filter((proceso) => this.tieneDatos(proceso));
        return listaProcesosConDatos.sort((proceso1, proceso2) => {
            const ordenPorProceso = this.tipoEleccionesToNumber(proceso1.tipoProcesoElectoral) - this.tipoEleccionesToNumber(proceso2.tipoProcesoElectoral);
            if (ordenPorProceso === 0) {
                return proceso1.fechaEleccion.getTime() - proceso2.fechaEleccion.getTime();
            } else {
                return ordenPorProceso;
            }
        });
    }

    private tipoEleccionesToNumber(tipoElecciones: string) {
        switch (tipoElecciones) {
            case 'MUNICIPALES': {
                return 0;
            }
            case 'CABILDO': {
                return 1;
            }
            case 'AUTONOMICAS': {
                return 2;
            }
            case 'CONGRESO': {
                return 3;
            }
            case 'SENADO': {
                return 4;
            }
            case 'PARLAMENTO_EUROPEO': {
                return 5;
            }
            case 'REFERENDUM': {
                return 6;
            }
            default:
                return 7;
        }
    }

    private tieneDatos(procesoElectoral: ProcesoElectoral): boolean {
        let result = true;
        Object.keys(procesoElectoral.indicadores).find((key) => {
            if (!procesoElectoral.indicadores[key]) {
                result = false;
            }
            return true;
        });
        return result;
    }

    private doGetDataByRegionId(id: string): Observable<any> {
        const config = this.configService.getConfig();
        return Observable.zip(
            this.metadataService.getPropertyById(config.metadata.statisticalResourcesKey),
            this.tipoEleccionesDatasetUrlService.getDatasetIdByTipoElecciones(config.dataset.evolucionElectoralKey),
        ).flatMap((responses) => {
            return this.http.get(`${responses[0]}/v1.0${responses[1].datasetUrl}${config.dataset.data}${id}`)
                .map((res: Response) => res.json());
        });
    }

    private procesaAtributo(json: any, nombreAtributo: string): string[] {
        const atributo = json.data.attributes.attribute.find((attribute) => attribute.id === nombreAtributo);
        if (atributo) {
            return atributo.value.split(SEPARADOR);
        }
    }

    private procesaDatos(json: any): string[] {
        return json.data.observations.split(SEPARADOR);
    }

    private creaListaIdsDimensiones(json: any) {
        const listaIdsDimensiones = [];
        for (let i = 0; i < json.data.dimensions.dimension.length; i++) {
            listaIdsDimensiones.push(json.data.dimensions.dimension[i].dimensionId);
        }
        return listaIdsDimensiones;
    }

    private creaMultiplicador(json: any) {
        const multiplicadores = {};
        const numDimensiones = json.data.dimensions.dimension.length;
        for (let i = 1; i <= numDimensiones; i++) {
            const dimensionActual = json.data.dimensions.dimension[numDimensiones - i];
            const idDimension = dimensionActual.dimensionId;
            if (i === 1) {
                multiplicadores[idDimension] = 1;
            } else {
                const dimensionAnterior = json.data.dimensions.dimension[numDimensiones - i + 1];
                const multiplicadorAnterior = multiplicadores[dimensionAnterior.dimensionId];
                const multiplicador = dimensionAnterior.representations.total * multiplicadorAnterior;

                multiplicadores[idDimension] = multiplicador;
            }
        }
        return multiplicadores;
    }

    private creaProcesosElectorales(json: any): ProcesoElectoral[] {
        const lugarId = this.parseLugarId(json);
        return json.data.dimensions.dimension.find((dimension) => dimension.dimensionId === PROCESO_ELECTORAL)
            .representations.representation
            .map((element) => {
                return new ProcesoElectoral(element.code, element.index, lugarId);
            });
    }

    private parseLugarId(json: any): string {
        return json.data.dimensions.dimension.find((dimension) => dimension.dimensionId === TERRITORIO)
            .representations.representation[0].code;
    }

    private creaIndicadores(json: any): any[] {
        return json.data.dimensions.dimension.find((dimension) => dimension.dimensionId === INDICADORES)
            .representations.representation;
    }

    private calcularIndice(coordenadas: any) {
        let indice = 0;
        for (let i = 0; i < this.idsDimensiones.length; i++) {
            const idDimension = this.idsDimensiones[i];
            indice += this.multiplicadores[idDimension] * coordenadas[idDimension];
        }
        return indice;
    }
}
