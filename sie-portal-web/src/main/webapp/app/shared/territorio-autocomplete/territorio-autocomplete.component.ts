import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Lugar } from '../../interfaces/lugar';
import { DatasetService } from '../../dataset';
import { TranslateService } from '@ngx-translate/core';
import { JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-territorio-autocomplete',
    styleUrls: ['territorio-autocomplete.component.scss'],
    templateUrl: './territorio-autocomplete.component.html'
})
export class TerritorioAutocompleteComponent {

    lugares: Lugar[];
    _lugar: Lugar;

    @Output()
    lugarChange = new EventEmitter<Lugar>();

    @Output()
    onTransition: EventEmitter<any> = new EventEmitter();

    constructor(
        private datasetService: DatasetService,
        private translateService: TranslateService,
        private alertService: JhiAlertService
    ) { }

    public initListaLugares(): Promise<any> {
        return this.datasetService.getListaLugares().then((listaLugares) => {
            this.lugares = listaLugares;
        });
    }

    public initLugar(lugarId: string) {
        const resultadoBusquedaLugar = this.lugares.find((lugar) => lugar.id === lugarId);
        if (!resultadoBusquedaLugar) {
            this.alertService.error('lugar.errorNoEncontrado', { codigo: lugarId });
            throw new Error(this.translateService.instant('lugar.errorNoEncontrado', { codigo: lugarId }));
        }

        this.lugar = resultadoBusquedaLugar;
    }

    set lugar(lugar: Lugar) {
        if (lugar instanceof Lugar) {
            this._lugar = lugar;
            this.lugarChange.emit(this._lugar);
        }
    }

    @Input()
    get lugar(): Lugar {
        return this._lugar;
    }

    onTransitionMethod($event) {
        this.onTransition.emit($event);
    }
}
