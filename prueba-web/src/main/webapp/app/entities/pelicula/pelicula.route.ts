import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PeliculaDeletePopupComponent } from './pelicula-delete-dialog.component';
import { PeliculaFormComponent } from './pelicula-form.component';
import { PeliculaComponent } from './pelicula.component';
import { PeliculaResolve } from './pelicula.resolve';

@Injectable()
export class PeliculaResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const peliculaRoute: Routes = [
    {
        path: 'pelicula',
        component: PeliculaComponent,
        resolve: {
            'pagingParams': PeliculaResolvePagingParams,
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'arteApplicationTemplateApp.pelicula.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pelicula/:id',
        component: PeliculaFormComponent,
        resolve: {
            pelicula: PeliculaResolve
        },
        data: {
            pageTitle: 'arteApplicationTemplateApp.pelicula.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pelicula-new',
        component: PeliculaFormComponent,
        data: {
            pageTitle: 'arteApplicationTemplateApp.pelicula.home.title'
        },
        canActivate: [UserRouteAccessService],
    },
    {
        path: 'pelicula/:id/edit',
        component: PeliculaFormComponent,
        resolve: {
            pelicula: PeliculaResolve
        },
        data: {
            pageTitle: 'arteApplicationTemplateApp.pelicula.home.title'
        },
        canActivate: [UserRouteAccessService],
    }
];

export const peliculaPopupRoute: Routes = [
    {
        path: 'pelicula/:id/delete',
        component: PeliculaDeletePopupComponent,
        data: {
            pageTitle: 'arteApplicationTemplateApp.pelicula.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
