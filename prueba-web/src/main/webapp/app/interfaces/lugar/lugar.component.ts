import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lugar } from './lugar.model';
import { DatasetService } from '../../dataset';

@Component({
    selector: 'jhi-lugar',
    templateUrl: './lugar.component.html'
})
export class LugarComponent implements OnInit {

    lugares: Lugar[];
    lugar: Lugar;

    constructor(
        private router: Router,
        private datasetService: DatasetService,
    ) { }

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

    transition() {
        this.router.navigate(['evolucion-electoral', this.lugar.id]);
    }
}
