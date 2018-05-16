import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LugarService } from './lugar.service';
import { Lugar } from './lugar.model';

@Component({
    selector: 'jhi-lugar',
    templateUrl: './lugar.component.html'
})
export class LugarComponent implements OnInit {

    lugares: Lugar[];
    lugar: Lugar;

    constructor(
        private lugarService: LugarService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.lugarService.query().subscribe((response) => this.lugares = response.json);
    }

    transition() {
        this.router.navigate(['evolucion-electoral', this.lugar.id]);
    }
}
