import { Routes, UrlSegment } from '@angular/router';
import { ProcesoElectoralComponent } from './proceso-electoral.component';
import { footerRoute } from '../../layouts/footer/footer.route';

export function procesoElectoralUrls(url: UrlSegment[]) {
    if (url.length === 0) {
        return null;
    }
    return url[0].path === 'proceso-electoral' ? { consumed: url } : null;
}

export const procesoElectoralRoute: Routes = [
    {
        matcher: procesoElectoralUrls,
        children: [
            {
                path: '',
                component: ProcesoElectoralComponent,
                data: {
                    pageTitle: 'procesoElectoral.pageTitle'
                },
            },
            footerRoute
        ]
    }
];
