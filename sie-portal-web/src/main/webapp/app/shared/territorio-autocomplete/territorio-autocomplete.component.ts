import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { DatasetEvolucionElectoralService, Lugar } from '../../dataset';

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

    constructor(
        private datasetEvolucionElectoralService: DatasetEvolucionElectoralService
    ) { }

    ngOnInit(): void {
        this.datasetEvolucionElectoralService.getListaLugares().then((listaLugares) => {
            this.lugares = listaLugares;
            if (this._lugarIdentifier) {
                this.lugar = this.lugares.find((lugar) => lugar.id === this._lugarIdentifier);
            }
        });
    }

    onTransitionMethod() {
        this.onTransition.emit(this._lugar.id);
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
