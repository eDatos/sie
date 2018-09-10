import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { DatasetEvolucionElectoralService, Lugar } from '../../dataset';

const BACKGROUND_CLASS = 'lugar-background';

@Component({
    selector: 'jhi-lugar',
    templateUrl: './lugar.component.html',
    styleUrls: ['lugar.component.scss']
})
export class LugarComponent implements OnInit, OnDestroy {

    lugares: Lugar[];
    lugar: Lugar;

    constructor(
        private router: Router,
        private datasetEvolucionElectoralService: DatasetEvolucionElectoralService,
        private renderer: Renderer2
    ) { }

    ngOnInit() {
        this.renderer.addClass(document.body.parentNode, BACKGROUND_CLASS);
        this.datasetEvolucionElectoralService.getListaLugares().then((listaLugares) => this.lugares = listaLugares);
    }

    ngOnDestroy() {
        this.renderer.removeClass(document.body.parentNode, BACKGROUND_CLASS);
    }

    transition() {
        this.router.navigate(['evolucion-electoral', this.lugar.id]);
    }
}
