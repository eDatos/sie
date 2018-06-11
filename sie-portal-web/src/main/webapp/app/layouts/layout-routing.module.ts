import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { errorRoute } from './';
import { navbarRoute } from './navbar/app.route';
import { footerRoute } from './footer/footer.route';

const LAYOUT_ROUTES = [
    ...errorRoute,
    navbarRoute,
    footerRoute
];

@NgModule({
    imports: [
        RouterModule.forRoot(LAYOUT_ROUTES, { useHash: true })
    ],
    exports: [
        RouterModule
    ]
})
export class LayoutRoutingModule {}
