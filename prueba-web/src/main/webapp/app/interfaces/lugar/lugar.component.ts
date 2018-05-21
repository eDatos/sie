import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Lugar } from './lugar.model';
import { DatasetService } from '../../dataset';

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
        private datasetService: DatasetService,
        private renderer: Renderer2
    ) {
        this.renderer.addClass(document.body, BACKGROUND_CLASS);
    }

    ngOnInit() {
        this.datasetService.getDataset().subscribe((json) => {
            this.lugares = json.metadata.geographicCoverages.resource.map((element) => {
                const result: Lugar = {
                    id: element.id,
                    nombre: element.name.text[0].value
                }
                return result;
            });
        });
    }

    ngOnDestroy() {
        this.renderer.removeClass(document.body, BACKGROUND_CLASS);
    }

    transition() {
        this.router.navigate(['evolucion-electoral', this.lugar.id]);
    }
}
