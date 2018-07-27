import { Routes, Route } from '@angular/router';

import { ErrorComponent } from './error.component';

export const errorRoute: Routes = [
    {
        path: 'error',
        component: ErrorComponent,
        data: {
            pageTitle: 'error.title'
        },
    },
    {
        path: 'accessdenied',
        component: ErrorComponent,
        data: {
            pageTitle: 'error.title',
            error403: true
        },
    },
    {
        path: 'notfound',
        component: ErrorComponent,
        data: {
            pageTitle: 'error.title',
            error404: true
        }
    },
    {
        path: 'non-existent-user',
        component: ErrorComponent,
        data: {
            pageTitle: 'error.title',
            nonExistentUser: true
        }
    },
    {
        path: 'blocked',
        component: ErrorComponent,
        data: {
            pageTitle: 'error.title',
            blockedUser: true
        }
    }
];

export const notFoundRoute: Route = {
    path: '**',
    redirectTo: 'notfound'
};
