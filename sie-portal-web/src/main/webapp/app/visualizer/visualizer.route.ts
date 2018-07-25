import { Routes, UrlSegment } from '@angular/router';
import { VisualizerComponent } from './visualizer.component';

export function visualizerUrls(url: UrlSegment[]) {
    if (url.length === 0) {
        return null;
    }
    return url[0].path === 'visualizer' ? { consumed: url } : null;
}

export const visualizerRoute: Routes = [
    {
        matcher: visualizerUrls,
        component: VisualizerComponent,
        data: {
            roles: [],
            pageTitle: 'home.pageTitle'
        }
    }
];
