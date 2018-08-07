import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute } from '.';
import { navbarRoute } from './navbar/app.route';
import { TemplateService } from './template';
import { SafeHtmlPipe } from './template/safe-html.pipe';

const LAYOUT_ROUTES = [
    ...errorRoute,
    navbarRoute
];

@NgModule({
    imports: [
        RouterModule.forRoot(LAYOUT_ROUTES, { useHash: true })
    ],
    declarations: [
        SafeHtmlPipe
    ],
    providers: [
        TemplateService
    ],
    exports: [
        RouterModule,
        SafeHtmlPipe
    ]
})
export class LayoutRoutingModule {}
