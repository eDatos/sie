import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EvolucionElectoralService } from './evolucion-electoral.service';
import { EvolucionElectoral, ProcesoElectoral } from './evolucion-electoral.model';

@Component({
    selector: 'jhi-evolucion-electoral',
    templateUrl: './evolucion-electoral.component.html'
})
export class EvolucionElectoralComponent implements OnInit {

    listaEvolucionElectoral: EvolucionElectoral[];
    procesoElectoral: ProcesoElectoral;

    constructor(
        private evolucionElectoralService: EvolucionElectoralService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.evolucionElectoralService.query().subscribe((response) => this.listaEvolucionElectoral = response.json);
    }

    transition() {
        this.router.navigate(['visualizer']);
    }
}
