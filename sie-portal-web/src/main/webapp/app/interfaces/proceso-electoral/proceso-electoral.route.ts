import { Routes, UrlSegment } from '@angular/router';
import { ProcesoElectoralComponent } from './proceso-electoral.component';
import { footerRoute } from '../../layouts/footer/footer.route';

export function procesoElectoralUrls(url: UrlSegment[]) {
    if (url.length === 0) {
        return null;
    }

    let result = null;
    if (url.length >= 3 && url[0].path === 'proceso-electoral') {
        result = {
            consumed: url,
            posParams: {
                'idProcesoElectoral': url[2]
            }
        };
    }
    return result;
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
