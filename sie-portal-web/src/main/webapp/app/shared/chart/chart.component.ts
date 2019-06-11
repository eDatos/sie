import { Component, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from '.';

declare var Highcharts: any;

@Component({
    selector: 'ac-chart',
    templateUrl: './chart.component.html'
})
export class ChartComponent implements OnChanges, AfterViewInit {

    // Parametros externos
    @Input()
    public isPercentage = false;

    @Input()
    public data: Chart;

    // Atributos de uso interno
    public name: string = 'container-' + new Date().getTime().toString() + '-' + Math.floor(Math.random() * 10000).toString();

    private grafica;

    ngOnChanges(changes: SimpleChanges) {
        if (!this.data) {
            throw new Error('Data parameter is required for ac-chart');
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
                pointFormat: '{series.name}: {point.y}<br/>{series.options.alternativeName}: {point.altData:,.f}'
            },
            yAxis: {
                min: 0,
                max: this.getMaxY(),
                title: {
                    text: ''
                },
            },
            plotOptions: {
                area: {
                    fillOpacity: 0.5,
                    states: {
                        inactive: {
                            opacity: 1
                        }
                    }
                },
                line: {
                    states: {
                        inactive: {
                            opacity: 1
                        }
                    }
                },
                column: {
                    states: {
                        inactive: {
                            opacity: 1
                        }
                    }
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
