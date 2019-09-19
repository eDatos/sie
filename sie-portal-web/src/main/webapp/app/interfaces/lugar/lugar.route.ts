import { LugarComponent } from './lugar.component';
import { Routes } from '@angular/router';
import { footerRoute } from '../../layouts/footer/footer.route';

export const lugarRoute: Routes = [
    {
        path: '',
        pathMatch: 'full',
        children: [
            {
                path: '',
                component: LugarComponent,
                data: {
                    pageTitle: 'lugar.pageTitle'
                }
            },
            footerRoute
        ]
    }
];
