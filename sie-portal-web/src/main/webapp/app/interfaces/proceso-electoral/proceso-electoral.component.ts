import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';

declare var I18n: any;
declare var App: any;
declare var Backbone: any;

export const LINK_TAG = 'link';
export const COMPILED_SASS_NAME = 'main-sass';
export const STYLES_IDENTIFIER_CLASS = 'vendorStyles';
export const METAMAC_CSS_LINK = './visualizer-static/metamac.css';
export const METAMAC_CSS_REL = 'stylesheet';

@Component({
    selector: 'jhi-proceso-electoral',
    styleUrls: ['proceso-electoral.component.scss'],
    templateUrl: './proceso-electoral.component.html'
})
export class ProcesoElectoralComponent implements OnInit, AfterViewInit, OnDestroy {

    constructor(private host: ElementRef) { }

    ngOnInit() {
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
        this.insertMetamacStyles();
    }

    ngOnDestroy() {
        this.setGlobalStyleSheetsDisabled(false);

        App.removeRegion('mainRegion');
        App._initCallbacks.reset();
        Backbone.history.stop();
    }

    private setGlobalStyleSheetsDisabled(disabled: boolean) {
        const styleSheetList = <any> document.head.getElementsByClassName(STYLES_IDENTIFIER_CLASS);
        for (const sheet of styleSheetList) {
            sheet.disabled = disabled;
        }

        const linkList = <any> document.head.getElementsByTagName(LINK_TAG);
        for (const link of linkList) {
            if (link.href.includes(COMPILED_SASS_NAME)) {
                link.disabled = disabled;
            }
        }
    }

    private insertMetamacStyles() {
        const estilosMetamac = document.createElement('link');
        estilosMetamac.href = METAMAC_CSS_LINK;
        estilosMetamac.rel = METAMAC_CSS_REL;
        this.host.nativeElement.appendChild(estilosMetamac);
    }
}
