(function () {
    "use strict";

    var Constants = App.Constants;

    App.namespace("App.VisualElement.SemiCircleChart");

    App.VisualElement.SemiCircleChart = function (options) {
        this.initialize(options);
        this._type = 'pie';

        _.extend(this._chartOptions, {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: 'Browser<br>shares<br>2017',
                align: 'center',
                verticalAlign: 'middle',
                y: 40
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        distance: -50,
                        style: {
                            fontWeight: 'bold',
                            color: 'white'
                        }
                    },
                    startAngle: -90,
                    endAngle: 90,
                    center: ['50%', '75%']
                }
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                innerSize: '50%',
                data: [
                    ['Chrome', 58.9],
                    ['Firefox', 13.29],
                    ['Internet Explorer', 13],
                    ['Edge', 3.78],
                    ['Safari', 3.42],
                    {
                        name: 'Other',
                        y: 7.61,
                        dataLabels: {
                            enabled: false
                        }
                    }
                ]
            }]
        });
    };

    App.VisualElement.SemiCircleChart.prototype = new App.VisualElement.Base();

    _.extend(App.VisualElement.SemiCircleChart.prototype, {

        load: function () {
            if (!this.assertAllDimensionsHaveSelections()) {
                return;
            }
            this.render();
        },

        destroy: function () {
            this._unbindEvents();

            if (this.chart && this.chart.renderTo) {
                this.chart.destroy();
                this.chart = null;
            }
        },

        _unbindEvents: function () {
            this.stopListening();
            this.$el.off("resize");
        },

        updatingDimensionPositions: function () {
            this._applyVisualizationRestrictions();
            this.resetDimensionsLimits();

            this.filterDimensions.zones.get('top').set('maxSize', 1);
            this.filterDimensions.zones.get('left').set('fixedSize', 1);
            this.filterDimensions.zones.get('axisy').set('maxSize', 1);
        },

        _applyVisualizationRestrictions: function () {
            if (this._mustApplyVisualizationRestrictions()) {
                this._moveAllDimensionsToZone('left');

                this._forceMeasureDimensionInZone('axisy');
                this._forceTimeDimensionInZone('fixed');
                this._forceGeographicDimensionInZone('fixed');

                this._applyVisualizationPreselections();
            }
        },

        _applyVisualizationPreselections: function () {
            this._preselectBiggestHierarchyGeographicValue();
            this._preselectMostPopulatedTemporalGranularityRepresentations();
        },

        render: function () {
            var self = this;
            this.dataset.data.loadAllSelectedData().then(function () {
                self.$el.empty();
                self.$title = $('<h3></h3>');
                self.updateTitle();
                self.$el.append(self.$title);

                self._renderContainers();
                self._renderChart();
            });
        },

        _renderContainers: function () {
            this.$chartContainer = $('<div></div>');
            var newHeight = this.$el.height() - this.$title.height() - this.getRightsHolderHeight();
            this.$chartContainer.height(newHeight);

            this.$el.append(this.$chartContainer);
            this._chartOptions.chart.renderTo = this.$chartContainer[0];
        },

        _renderChart: function () {
            /* var data = this.getData();
            this._chartOptions.series = data.series;
            this._chartOptions.xAxis.categories = data.xAxis;
            this._chartOptions.chart.renderTo = this.$chartContainer[0]; */

            this._chartOptions.credits.text = this.getRightsHolderText();
            if (!this.showRightsHolderText()) {
                this._chartOptions.credits.style = {
                    color: App.Constants.colors.hiddenText
                }
            }

            this.chart = new Highcharts.Chart(this._chartOptions);
            this.$el.on("resize", function () { });
        }
    });

}());