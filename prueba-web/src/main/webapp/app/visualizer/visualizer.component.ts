import { Component, OnInit } from '@angular/core';

declare var I18n: any;
declare var App: any;

@Component({
    selector: 'jhi-visualizer',
    styles: ['./metamac.css', './gobcanoverwrite.css'],
    templateUrl: './visualizer.component.html'
})
export class VisualizerComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        I18n.defaultLocale = 'es';
        I18n.locale = 'es';

        App.endpoints['statistical-resources'] = 'http://estadisticas.arte-consultores.com/statistical-resources/v1.0';
        App.endpoints['structural-resources'] = 'http://estadisticas.arte-consultores.com/structural-resources-internal/apis/structural-resources-internal/v1.0';
        App.endpoints['statistical-visualizer'] = 'http://estadisticas.arte-consultores.com/statistical-visualizer';
        App.endpoints['permalinks'] = 'http://estadisticas.arte-consultores.com/permalinks/v1.0';
        // App.endpoints['permalinks'] = 'http://localhost:8080/statistical-visualizer-3.0.1-SNAPSHOT/apis/permalinks/v1.0';
        App.endpoints['export'] = 'http://localhost:8080/statistical-visualizer-api-5.0.1-SNAPSHOT/apis/export/v1.0';
        // App.endpoints['export'] = 'http://localhost:8080/statistical-visualizer-3.0.1-SNAPSHOT/apis/export/v1.0';
        // App.endpoints['export'] = 'http://localhost:8080/statistical-visualizer-api-4.1.2-SNAPSHOT/apis/export/v1.0';

        App.endpoints['indicators'] = 'http://estadisticas.arte-consultores.com/indicators/v1.0';
        // App.endpoints['indicators'] = 'http://localhost:8080/indicators-internal-6.0.1-SNAPSHOT/internal/api/indicators/v1.0';

        // App.queryParams = { 'agency': 'ISTAC', 'identifier': 'C00031A_000002', 'version': '~latest', 'type': 'dataset', 'geo': 'LANZAROTE|LA_GOMERA' };

        // App.queryParams = { 'agency': 'ISTAC', 'identifier': 'C00098A_000002', 'version': '001.001', 'type': 'dataset' };
        // App.queryParams = { 'agency': 'ISTAC', 'identifier': 'C00031A_000002', 'version': '~latest', 'type': 'dataset' };

        // Ejemplo de dataset con atributos a distintos niveles
        // App.queryParams = { 'agency': 'ISTAC', 'identifier': 'C00031A_000002', 'version': '001.006', 'type': 'dataset' };

        // Ejemplo de indicador
        // App.queryParams = { 'identifier': 'IND_0001', 'type': 'indicator' };

        // Ejemplo de indicador con atributos
        // App.queryParams = { 'identifier': 'PUESTOS_TOTALES_ISTAC', 'type': 'indicator' };

        // Ejemplo de instancia de indicador
        // App.queryParams = { 'identifier': '0a36fed2-5c42-4c42-8162-a247f55fe4ed', 'type': 'indicatorInstance', 'indicatorSystem': 'E30308A' };

        // Ejemplo con atributo de medida en vez de measure dimension
        // App.queryParams = { 'agency': 'ISTAC', 'identifier': 'C00031A_000004', 'version': '001.000', 'type': 'dataset' }

        // Ejemplo de query INDICE_OCUPACION_TFE_2016
        // App.queryParams = { 'agency': 'ISTAC', 'identifier': 'INDICE_OCUPACION_TFE_2016', 'type': 'query' }

        // Ejemplo de query INDICADORES_OCUPACION
        // App.queryParams = { 'agency': 'ISTAC', 'identifier': 'INDICADORES_OCUPACION', 'type': 'query' }

        // Puestos del trabajo
        // App.queryParams = { 'agency': 'ISTAC', 'identifier': 'C00098A_000001', 'version': '001.000', 'type': 'dataset' };

        // http://estadisticas.arte-consultores.com/statistical-visualizer/visualizer/data.html?
        // resourceType=indicatorInstance&resourceId=0a36fed2-5c42-4c42-8162-a247f55fe4ed&indicatorSystem=E30308A&
        // measure=ABSOLUTE,ANNUAL_PERCENTAGE_RATE,INTERPERIOD_PERCENTAGE_RATE&geo=ES611#visualization/table
        // App.queryParams = { 'identifier': '0a36fed2-5c42-4c42-8162-a247f55fe4ed', 'indicatorSystem': 'E30308A', 'type': 'indicatorInstance', 'geo': 'ES611' };

        // Ejemplo de multidataset
        // http://estadisticas.arte-consultores.com/statistical-resources/v1.0/multidatasets/ISTAC/C00031A_000001.json
        // App.queryParams = { 'agency': 'ISTAC', 'identifier': 'C00031A_000004', 'version': '001.000', 'type': 'dataset' };
        App.queryParams = { 'agency': 'ISTAC', 'identifier': 'C00031A_000004', 'version': '001.000', 'type': 'dataset', 'multidatasetId': 'ISTAC:C00031A_000001' };

        // Vista widget
        // App.config.widget = true;
        App.config['organisationUrn'] = 'urn:sdmx:org.sdmx.infomodel.base.Agency=SDMX:AGENCIES(1.0).ISTAC';
        App.config['installationType'] = 'EXTERNAL';

        App.start();
    }
}
