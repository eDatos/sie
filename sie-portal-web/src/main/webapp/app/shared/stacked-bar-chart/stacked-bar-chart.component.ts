import { Component, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { BarChart } from '.';

declare var Highcharts: any;

@Component({
    selector: 'ac-stacked-bar-chart',
    templateUrl: './stacked-bar-chart.component.html'
})
export class StackedBarChartComponent implements OnChanges, AfterViewInit {

    // Parametros externos
    @Input()
    public isPercentage = false;

    @Input()
    public data: BarChart;

    // Atributos de uso interno
    public name: string = 'container-' + new Date().getTime().toString() + '-' + Math.floor(Math.random() * 10000).toString();

    private grafica;

    ngOnChanges(changes: SimpleChanges) {
        if (!this.data) {
            throw new Error('Data parameter is required for ac-stacked-bar-chart');
        }

        if (this.grafica) {
            this.buildChart();
        }
    }

    ngAfterViewInit() {
        Highcharts.setOptions({
            lang: {
                decimalPoint: ',',
                thousandsSep: '.'
            }
        });
        this.buildChart();
    }

    private buildChart(): void {
        this.grafica = new Highcharts.Chart({
            xAxis: {
                categories: this.data.xAxis
            },
            series: this.data.yAxis,
            chart: {
                renderTo: this.name
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>{series.options.alternativeName}: {point.altData'.concat(this.isPercentage ? ':,.0f' : ':,.2f').concat('}')
            },
            yAxis: {
                min: 0,
                max: this.getMaxY(),
                title: {
                    text: ''
                },
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                },
                area: {
                    stacking: 'normal',
                    fillOpacity: 0.5
                },
                areaspline: {
                    fillOpacity: 0.5
                }
            },
            credits: {
                enabled: false
            },
            title: {
                text: ''
            }
        });
    }

    private getMaxY() {
        return this.isPercentage ? 100 : undefined;
    }
}
