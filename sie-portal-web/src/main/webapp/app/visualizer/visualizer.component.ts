import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

declare var I18n: any;
declare var App: any;

@Component({
    selector: 'jhi-visualizer',
    templateUrl: './visualizer.component.html'
})
export class VisualizerComponent implements OnInit, AfterViewInit, OnDestroy {

    constructor() { }

    ngOnInit() {
        I18n.defaultLocale = 'es';
        I18n.locale = 'es';

        // http://estadisticas.arte-consultores.com/statistical-resources
        App.endpoints['statistical-resources'] = 'http://estadisticas.arte-consultores.com/statistical-resources-internal/apis/statistical-resources-internal/v1.0';

        // http://estadisticas.arte-consultores.com/structural-resources-internal/apis/structural-resources-internal
        App.endpoints['structural-resources'] = 'http://estadisticas.arte-consultores.com/structural-resources-internal/apis/structural-resources-internal/v1.0';

        // http://estadisticas.arte-consultores.com/statistical-visualizer
        App.endpoints['statistical-visualizer'] = 'http://estadisticas.arte-consultores.com/statistical-visualizer';

        // http://estadisticas.arte-consultores.com/permalinks
        App.endpoints['permalinks'] = 'http://estadisticas.arte-consultores.com/permalinks/v1.0';

        // http://estadisticas.arte-consultores.com/export
        App.endpoints['export'] = 'http://estadisticas.arte-consultores.com/export/v1.0';

        // http://estadisticas.arte-consultores.com/indicators
        App.endpoints['indicators'] = 'http://estadisticas.arte-consultores.com/indicators-internal/internal/api/indicators/v1.0';

        App.config['showHeader'] = false;
        App.config['showRightsHolder'] = false;
        App.config['organisationUrn'] = 'urn:sdmx:org.sdmx.infomodel.base.Agency=SDMX:AGENCIES(1.0).ISTAC';
        App.config['installationType'] = 'INTERNAL';

        App.queryParams['agency'] = 'ISTAC';
        App.queryParams['identifier'] = 'C00010A_000005';
        App.queryParams['version'] = '001.001';
        App.queryParams['type'] = 'dataset';
        App.queryParams['indicatorSystem'] = '';
        App.queryParams['geo'] = '';
        App.queryParams['multidatasetId'] = '';

        App.start();
    }

    ngAfterViewInit() {
        this.setGlobalStyleSheetsDisabled(true);
    }

    ngOnDestroy() {
        this.setGlobalStyleSheetsDisabled(false);
    }

    private setGlobalStyleSheetsDisabled(disabled: boolean) {
        const styleSheetList = document.styleSheets;
        for (let i = 0; i < styleSheetList.length; i++) {
            const styleSheet = styleSheetList.item(i);
            if (!styleSheet.href) {
                styleSheet.disabled = disabled;
            }
        }
    }
}
