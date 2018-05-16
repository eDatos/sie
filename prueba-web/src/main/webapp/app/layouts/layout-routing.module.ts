import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { errorRoute } from './';

const LAYOUT_ROUTES = [
    ...errorRoute
];

@NgModule({
    imports: [
        RouterModule.forRoot(LAYOUT_ROUTES, { useHash: true, enableTracing: true })
    ],
    exports: [
        RouterModule
    ]
})
export class LayoutRoutingModule {}
