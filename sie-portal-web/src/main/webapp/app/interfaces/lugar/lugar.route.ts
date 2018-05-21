import { LugarComponent } from './lugar.component';
import { Routes } from '@angular/router';

export const lugarRoute: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: LugarComponent,
        data: {
            roles: [],
            pageTitle: 'lugar.pageTitle'
        }
    }
];
