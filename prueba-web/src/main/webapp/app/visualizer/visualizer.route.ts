import { Routes, UrlSegment } from '@angular/router';
import { VisualizerComponent } from './visualizer.component';

export function visualizerUrls(url: UrlSegment[]) {
    return url[0].path === 'visualizer' ? {consumed: url} : null;
  }

export const visualizerRoute: Routes = [
    {
        matcher: visualizerUrls,
        component: VisualizerComponent,
        data: {
            roles: [],
            pageTitle: 'arteApplicationTemplateApp.actor.home.title'
        }
    }
];
