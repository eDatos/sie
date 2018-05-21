import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EvolucionElectoral, ProcesoElectoral } from './evolucion-electoral.model';

@Component({
    selector: 'jhi-evolucion-electoral',
    templateUrl: './evolucion-electoral.component.html'
})
export class EvolucionElectoralComponent implements OnInit {

    listaEvolucionElectoral: EvolucionElectoral[];
    procesoElectoral: ProcesoElectoral;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => console.log(params.id));
    }

    transition() {
        this.router.navigate(['visualizer']);
    }
}
