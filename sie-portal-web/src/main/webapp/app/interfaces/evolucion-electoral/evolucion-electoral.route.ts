import { EvolucionElectoralComponent } from './evolucion-electoral.component';
import { Routes } from '@angular/router';

export const evolucionElectoralRoute: Routes = [
    {
        path: 'evolucion-electoral/:id',
        component: EvolucionElectoralComponent,
        data: {
            roles: [],
            pageTitle: 'home.pageTitle'
        }
    }
];
