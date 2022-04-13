import { Component, Input, AfterViewInit, OnChanges, SimpleChanges } from "@angular/core";
import { Chart } from ".";

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

    @Input()
    public footnote: string;

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
                thousandsSep: '.',
                numericSymbols: null,
            },
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
                renderTo: this.name,
                events: {
                    load() {
                        const points0 = this.series[0].data;
                        const points1 = this.series[1].data;
                        // Look for points which y positions are close and move them
                        points0.forEach(function(point, i) {
                            let { x, y } = point.dataLabel.attr();
                            let { x: x1, y: y1 } = points1[i].dataLabel.attr();
                            if (Math.abs(y - y1) < 30) {
                                // Add y offsets
                                if (y < y1) {
                                    y += Math.abs(y - y1);
                                } else {
                                    y -= Math.abs(y - y1);
                                }
                                y += 35;
                                // Set new positions
                                points1[i].dataLabel.attr({ x: x1, y: y1 });
                                point.dataLabel.attr({ x: x, y: y });
                            }
                        });
                    },
                }
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}'
            },
            yAxis: [
                { // Primary yAxis
                    title: {
                        text: '',
                    },
                }, { // Secondary yAxis
                    title: {
                        text: '',
                    },
                    labels: {
                        format: '{value:.1f} %',
                    },
                    opposite: true,
                    min: 0,
                    max: 100,
                },
            ],
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
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f}',
                        style: {
                            color: '#454545',
                            textOutline: 'white',
                        }
                    },
                },
                column: {
                    states: {
                        inactive: {
                            opacity: 1
                        }
                    },
                    dataLabels: {
                        allowOverlap: true,
                        enabled: true,
                        inside: false,
                        style: {
                            color: '#454545',
                            textOutline: 'white',
                        }
                    },
                }
            },
            credits: {
                enabled: true,
                text: this.footnote,
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
