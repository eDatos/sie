import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DatasetEvolucionElectoralService, Lugar} from '../../dataset';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {RouteType, TIPO_ELECCIONES_DEFAULT} from '../../config';
import {TIPO_PROCESO_ELECTORAL_REGEX} from '../../interfaces/proceso-electoral';
import {
    FRONTERA_DATASET_ID,
    FRONTERA_SEGREGATION_YEAR,
    NEW_FRONTERA_ID,
    OLD_FRONTERA_ID
} from '../constants/data.constants';
import {toInteger} from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
    selector: 'jhi-territorio-autocomplete',
    styleUrls: ['territorio-autocomplete.component.scss'],
    templateUrl: './territorio-autocomplete.component.html'
})
export class TerritorioAutocompleteComponent implements OnInit {

    lugares: Lugar[];
    _lugar: Lugar;

    OTHER_ROUTE_TYPE = RouteType.OTHER;

    @Output()
    onTransition = new EventEmitter<string>();

    @Input()
    loadOnlyDatasetTerritories = false;

    private tipoEleccionesVisible: string;

    constructor(
        private datasetEvolucionElectoralService: DatasetEvolucionElectoralService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit(): void {
        const lugarId = this.getLugarId();

        this.activatedRoute.parent.url.subscribe(() => {
            this.update(lugarId);
        })
    }

    private update(lugarId) {
        this.datasetEvolucionElectoralService.getListaLugares().then((listaLugares) => {
            this.lugares = listaLugares;
            this.updateLugar(lugarId);

            this.router.events.subscribe((event) => {
                if (event instanceof NavigationEnd) {
                    this.updateLugar(this.getLugarId());
                }
            })
        });

        this.activatedRoute.queryParams.subscribe((queryParams) => {
            this.tipoEleccionesVisible = queryParams.tipoEleccion ? queryParams.tipoEleccion.toUpperCase() : TIPO_ELECCIONES_DEFAULT;
        })
    }

    private updateLugar(lugarId: string) {
        if (lugarId) {
            if (this.loadOnlyDatasetTerritories && lugarId.startsWith(FRONTERA_DATASET_ID)) {
                const date = this.router.url.match(TIPO_PROCESO_ELECTORAL_REGEX)[2];
                if (toInteger(date) <= FRONTERA_SEGREGATION_YEAR) {
                    this.lugar = this.lugares.find((el) => el.id === OLD_FRONTERA_ID);
                } else {
                    this.lugar = this.lugares.find((el) => el.id === NEW_FRONTERA_ID);
                }
            } else {
                this.lugar = this.lugares.find((lugar) => lugar.id === lugarId);
            }
        }
    }

    getRouteType(): RouteType {
        if (this.router.url.startsWith('/evolucion-electoral')) {
            return RouteType.EVOLUCION_ELECTORAL;
        } else if (this.router.url.startsWith('/proceso-electoral')) {
            return RouteType.PROCESO_ELECTORAL;
        }
        return RouteType.OTHER;
    }

    getLugarId(): string {
        const routeType = this.getRouteType();
        if (RouteType.EVOLUCION_ELECTORAL === routeType || RouteType.PROCESO_ELECTORAL === routeType) {
            const url = this.router.url.split('/');
            const lugarId = url[2];
            const questionCharIndex = lugarId.indexOf('?')
            if (questionCharIndex !== -1) {
                return lugarId.substr(0, questionCharIndex);
            }
            return lugarId;
        }
        return null;
    }

    onTransitionMethod(event: Lugar) {
        const routeType = this.getRouteType();
        if (routeType === RouteType.PROCESO_ELECTORAL) {
            const urlSegments = this.router.url.split('/');
            window.location.hash = window.location.hash.replace(urlSegments[2], event.id);
        } else if (routeType === RouteType.EVOLUCION_ELECTORAL) {
            this.router.navigate(['evolucion-electoral', event.id], {queryParams: {tipoEleccion: this.tipoEleccionesVisible.toLowerCase()}});
        }
    }

    itemTemplate(item: Lugar, inputValue?: boolean) {
        if (inputValue) {
            return item.nombreConGranularidad;
        }
        return `<span class="font-weight-bold">${item.nombre}</span> <span class="text-muted">(${item.granularidad})</span>`;
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
