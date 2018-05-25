import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProcesoElectoral } from './proceso-electoral.model';
import { DatasetService } from '../../dataset';

@Component({
    selector: 'jhi-evolucion-electoral',
    templateUrl: './evolucion-electoral.component.html'
})
export class EvolucionElectoralComponent implements OnInit {

    listaProcesoElectoral: ProcesoElectoral[];

    constructor(
        private activatedRoute: ActivatedRoute,
        private datasetService: DatasetService
    ) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => {
            this.datasetService.getProcesosElectoralesByRegionId(params.id)
                .then((listaProcesoElectoral) => this.listaProcesoElectoral = listaProcesoElectoral);
        });
    }
}
