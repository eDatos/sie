import { Component, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { BarChart } from '.';

declare var Highcharts: any;

const EJE_Y = 'y';

@Component({
    selector: 'ac-stacked-bar-chart',
    templateUrl: './stacked-bar-chart.component.html'
})
export class StackedBarChartComponent implements OnChanges, AfterViewInit {

    // Parametros externos
    @Input()
    public isPercentaje = false;

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
            this.grafica.axes.find((axis) => EJE_Y === axis.xOrY).update({ max: this.getMaxY() });
            this.grafica.series.forEach((serie, index) => {
                serie.update(this.data.yAxis[index], true);
            });
        }
    }

    ngAfterViewInit() {
        Highcharts.setOptions({
            lang: {
                decimalPoint: ',',
                thousandsSep: '.'
            }
        });
        this.grafica = new Highcharts.Chart({
            xAxis: {
                categories: this.data.xAxis
            },
            series: this.data.yAxis,
            chart: {
                renderTo: this.name,
                type: 'column'
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.total:,.0f}'
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
        return this.isPercentaje ? 100 : undefined;
    }
}
