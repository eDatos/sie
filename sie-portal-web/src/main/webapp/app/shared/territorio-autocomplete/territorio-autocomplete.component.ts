import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { DatasetEvolucionElectoralService, Lugar } from '../../dataset';
import {TIPO_PROCESO_ELECTORAL_REGEX} from "../../interfaces/proceso-electoral";
import {
    FRONTERA_DATASET_ID,
    FRONTERA_SEGREGATION_YEAR,
    NEW_FRONTERA_ID,
    OLD_FRONTERA_ID
} from "../constants/data.constants";
import {toInteger} from "@ng-bootstrap/ng-bootstrap/util/util";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'jhi-territorio-autocomplete',
    styleUrls: ['territorio-autocomplete.component.scss'],
    templateUrl: './territorio-autocomplete.component.html'
})
export class TerritorioAutocompleteComponent implements OnInit {

    lugares: Lugar[];
    _lugar: Lugar;

    _lugarIdentifier: string;

    @Output()
    onTransition = new EventEmitter<string>();

    @Input()
    loadOnlyDatasetTerritories: boolean = false;

    constructor(
        private datasetEvolucionElectoralService: DatasetEvolucionElectoralService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.activatedRoute.parent.url.subscribe(event => {
            this.update();
        })
    }

    private update() {
        this.datasetEvolucionElectoralService.getListaLugares().then((listaLugares) => {
            this.lugares = listaLugares;
            if (this._lugarIdentifier) {
                if (this.loadOnlyDatasetTerritories && this._lugarIdentifier.startsWith(FRONTERA_DATASET_ID)) {
                    const date = this.router.url.match(TIPO_PROCESO_ELECTORAL_REGEX)[2];
                    if (toInteger(date) <= FRONTERA_SEGREGATION_YEAR) {
                        this.lugar = this.lugares.find((el) => el.id === OLD_FRONTERA_ID);
                    } else {
                        this.lugar = this.lugares.find((el) => el.id === NEW_FRONTERA_ID);
                    }
                } else {
                    this.lugar = this.lugares.find((lugar) => lugar.id === this._lugarIdentifier);
                }
            }
        });
    }

    onTransitionMethod(event: Lugar) {
        this.onTransition.emit(event.id);
    }

    itemTemplate(item: Lugar, inputValue?: boolean) {
        if (inputValue) {
            return item.nombreConGranularidad;
        }
        return `<span class="font-weight-bold">${item.nombre}</span> <span class="text-muted">(${item.granularidad})</span>`;
    }

    set lugarIdentifier(lugarIdentifier: string) {
        if (this.lugares && this._lugarIdentifier !== lugarIdentifier) {
            this.lugar = this.lugares.find((lugar) => lugar.id === lugarIdentifier);
        }
        this._lugarIdentifier = lugarIdentifier;
    }

    @Input()
    get lugarIdentifier(): string {
        return this._lugarIdentifier;
    }

    set lugar(lugar: Lugar) {
        if (lugar instanceof Lugar) {
            this._lugar = lugar;
            this._lugarIdentifier = lugar.id;
        }
    }

    get lugar(): Lugar {
        return this._lugar;
    }
}
