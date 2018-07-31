import { Routes, UrlSegment } from '@angular/router';
import { VisualizerComponent } from './visualizer.component';

export function visualizerUrls(url: UrlSegment[]) {
    if (url.length === 0) {
        return null;
    }
    return url[0].path === 'proceso-electoral' ? { consumed: url } : null;
}

export const visualizerRoute: Routes = [
    {
        matcher: visualizerUrls,
        component: VisualizerComponent,
        data: {
            pageTitle: 'visualizer.pageTitle'
        }
    }
];
