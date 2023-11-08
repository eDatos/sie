import { Routes, UrlSegment } from '@angular/router';
import { ProcesoElectoralComponent } from './proceso-electoral.component';
import { footerRoute } from '../../layouts/footer/footer.route';
import {PermalinkRedirectGuard} from './permalink-redirect.guard';

export function procesoElectoralUrls(url: UrlSegment[]) {
    if (url.length === 0) {
        return null;
    }

    let result = null;
    if (url.length >= 3 && url[0].path === 'proceso-electoral' && url[1].path !== 'permalink') {
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
        path: 'proceso-electoral/permalink/:permalinkId',
        canActivate: [PermalinkRedirectGuard],
        children: []
    },
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
