import { Routes, UrlSegment } from '@angular/router';
import { UserRouteAccessService } from '../shared';
import { VisualizerComponent } from './visualizer.component';

export function visualizerUrls(url: UrlSegment[]) {
    return url[0].path === 'visualizer' ? {consumed: url} : null;
  }

export const visualizerRoute: Routes = [
    {
        matcher: visualizerUrls,
        component: VisualizerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'arteApplicationTemplateApp.actor.home.title'
        }
    }
];
