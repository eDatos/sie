import { EvolucionElectoralComponent } from './evolucion-electoral.component';
import { Routes } from '@angular/router';
import { footerRoute } from '../../layouts/footer/footer.route';

export const evolucionElectoralRoute: Routes = [
    {
        path: 'evolucion-electoral/:id',
        children: [
            {
                path: '',
                component: EvolucionElectoralComponent,
                data: {
                    pageTitle: 'evolucionElectoral.pageTitle'
                }
            },
            footerRoute
        ]
    }
];
