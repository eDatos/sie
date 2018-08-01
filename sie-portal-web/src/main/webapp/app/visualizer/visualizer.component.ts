import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

declare var I18n: any;
declare var App: any;
declare var Backbone: any;

export const COMPILED_SASS_SUFFIX = '-sass';
export const METAMAC_CSS_ID = 'metamac-css';
export const METAMAC_CSS_LINK = './visualizer-static/metamac.css';
export const METAMAC_CSS_REL = 'stylesheet';

@Component({
    selector: 'jhi-visualizer',
    templateUrl: './visualizer.component.html'
})
export class VisualizerComponent implements OnInit, AfterViewInit, OnDestroy {

    constructor() { }

    ngOnInit() {
        this.insertMetamacStyles();

        I18n.defaultLocale = 'es';
        I18n.locale = 'es';

        App.addRegions({
            mainRegion: '.metamac-container'
        });

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
        App.removeRegion('mainRegion');
        App._initCallbacks.reset();
        Backbone.history.stop();

        this.setGlobalStyleSheetsDisabled(false);
        this.deleteMetamacStyles();
    }

    private setGlobalStyleSheetsDisabled(disabled: boolean) {
        const styleSheetList = document.styleSheets;
        for (let i = 0; i < styleSheetList.length; i++) {
            const styleSheet = styleSheetList.item(i);
            if (!styleSheet.href || styleSheet.href.includes(COMPILED_SASS_SUFFIX)) {
                styleSheet.disabled = disabled;
            }
        }
    }

    private insertMetamacStyles() {
        const estilosMetamac = document.createElement('link');
        estilosMetamac.id = METAMAC_CSS_ID;
        estilosMetamac.href = METAMAC_CSS_LINK;
        estilosMetamac.rel = METAMAC_CSS_REL;
        document.head.appendChild(estilosMetamac);
    }

    private deleteMetamacStyles() {
        const estilosMetamac = document.getElementById(METAMAC_CSS_ID);
        document.head.removeChild(estilosMetamac);
    }
}
