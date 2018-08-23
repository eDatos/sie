(function () {
    "use strict";

    App.namespace("App.VisualElement.SemiCircleChart");

    App.VisualElement.SemiCircleChart = function (options) {
        this.initialize(options);
        this._type = 'pie';

        _.extend(this._chartOptions, {
            chart: {
                animation: false,
                renderTo: '',
                defaultSeriesType: 'pie',
                backgroundColor: App.Constants.colors.istacWhite
            },
            title: {
                text: '',
                style: {
                    color: App.Constants.colors.hiddenText
                }
            },
            subtitle: {
                text: '',
                style: {
                    color: App.Constants.colors.hiddenText
                }
            },
            yAxis: {
                title: {
                    text: ""
                }
            },
            tooltip: {
                formatter: function () {
                    var tooltip = "<b>" + this.point.name + "</b><br/>";
                    tooltip += this.series.options.extraTooltip + ": " + Highcharts.numberFormat(this.point.y, -1, ',', '.') + "<br/>";
                    tooltip += this.series.options.extraTooltip1 + ": " + Highcharts.numberFormat(this.point.y1, -1, ',', '.') + "%<br/>";
                    if (this.point.y2) {
                        tooltip += this.series.options.extraTooltip2 + ": " + Highcharts.numberFormat(this.point.y2, -1, ',', '.');
                    }
                    return tooltip;
                }
            },
            plotOptions: {
                series: {
                    animation: false
                },
                pie: {
                    colors: ["#008BD0", "#67A23F", "#8C5C1D", "#7F5B97", "#C01A41", "#E5772D", "#8C9BA3"],
                    center: ['50%', '75%'],
                    innerSize: '40%',
                    endAngle: 90,
                    startAngle: -90
                }
            }
        });
    };

    App.VisualElement.SemiCircleChart.prototype = new App.VisualElement.Base();

    _.extend(App.VisualElement.SemiCircleChart.prototype, {

        load: function () {
            this._bindEvents();
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

        _bindEvents: function () {
            var debounceUpdate = _.debounce(this.update, 20);
            this.listenTo(this.filterDimensions, "change:drawable change:zone change:visibleLabelType reverse", debounceUpdate);
            this.listenTo(this.filtersModel, "change:candidacyType", debounceUpdate);
        },

        _unbindEvents: function () {
            this.stopListening();
            this.$el.off("resize");
        },

        updatingDimensionPositions: function () {
            this._applyVisualizationRestrictions();
            this.resetDimensionsLimits();

            this.filterDimensions.zones.get('left').set('fixedSize', 1);
            this.filterDimensions.zones.get('axisy').set('maxSize', 1);
        },

        _applyVisualizationRestrictions: function () {
            if (this._mustApplyVisualizationRestrictions()) {
                this._moveAllDimensionsToZone('left');

                this._forceMeasureDimensionInZone('top');
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
            self.showLoading();
            this.dataset.data.loadAllSelectedData().then(function () {
                self.hideLoading();
                self._updateTitle();
                self._renderContainers();
                self._renderChart();
            });
        },

        _updateTitle: function () {
            this.$el.empty();
            this.$title = $('<h3></h3>');
            /* this.updateTitle();
            this.$el.append(this.$title); */
        },

        _renderContainers: function () {
            this.$chartContainer = $('<div></div>');
            var newHeight = this.$el.height() - this.$title.height() - this.getRightsHolderHeight();
            this.$chartContainer.height(newHeight);

            this.$el.append(this.$chartContainer);
        },

        _renderChart: function () {
            var data = this.getData();
            this._chartOptions.series = data.series;
            this._chartOptions.chart.renderTo = this.$chartContainer[0];

            this._chartOptions.credits.text = this.getRightsHolderText();
            if (!this.showRightsHolderText()) {
                this._chartOptions.credits.style = {
                    color: App.Constants.colors.hiddenText
                }
            }

            this.chart = new Highcharts.Chart(this._chartOptions);
            this.$el.on("resize", function () { });
        },

        getData: function () {
            var self = this;

            var fixedPermutation = this.getFixedPermutation();

            var horizontalDimension = this.filterDimensions.dimensionsAtZone('left').at(0);
            var horizontalDimensionSelectedCategories = this.getDrawableRepresentations(horizontalDimension);

            var columnsDimension = this.filterDimensions.dimensionsAtZone('fixed').at(0);
            var columnsDimensionSelectedCategories = this.getDrawableRepresentations(columnsDimension);

            var extraData = this.filterDimensions.dimensionsAtZone('top').at(0);
            var extraDataSelectedCategories = this.getDrawableRepresentations(extraData);

            var listSeries = [];
            _.each(columnsDimensionSelectedCategories, function (columnCategory) {
                var serie = {};
                serie.data = [];
                _.each(extraDataSelectedCategories, function (extraCategory, index) {
                    var attrName = 'extraTooltip' + (index > 0 ? index : '');
                    serie[attrName] = extraCategory.get('visibleLabel');
                });

                _.each(horizontalDimensionSelectedCategories, function (horizontalCategory) {
                    if (!horizontalCategory.get('id').startsWith(self.filtersModel.get('candidacyType'))) {
                        return;
                    }

                    var element = {};
                    element.name = horizontalCategory.get('visibleLabel');

                    _.each(extraDataSelectedCategories, function (extraCategory, index) {
                        var currentPermutation = {};
                        currentPermutation[horizontalDimension.id] = horizontalCategory.id;
                        currentPermutation[columnsDimension.id] = columnCategory.id;
                        currentPermutation[extraData.id] = extraCategory.id;
                        _.extend(currentPermutation, fixedPermutation);

                        var y = self.dataset.data.getNumberData({ ids: currentPermutation });
                        var attrName = 'y' + (index > 0 ? index : '');
                        element[attrName] = y;
                    });

                    serie.data.push(element);
                });

                serie.name = columnCategory.get('visibleLabel');
                listSeries.push(serie);
            });

            // Changing the options of the chart
            var result = {};
            result.series = this._sortAndfilterSeries(listSeries);
            return result;
        },

        _sortAndfilterSeries: function (listSeries) {
            var resultSeries = listSeries;
            _.each(resultSeries, function (serie) {
                var data = _.sortBy(serie.data, function (data) {
                    return -data.y;
                });

                var othersData = {
                    name: I18n.t("ve.others"),
                    y: 0,
                    y1: 0,
                    y2: 0
                };
                while (data.length > 0 && (!data[data.length - 1].y1 || data[data.length - 1].y1 < App.Constants.minSemiCirclePercentage)) {
                    var element = data.pop();
                    othersData.y += element.y ? element.y : 0;
                    othersData.y1 += element.y1 ? element.y1 : 0;
                    othersData.y2 += element.y2 ? element.y2 : 0;
                }

                if (othersData.y1) {
                    data.push(othersData);
                }

                serie.data = data;
            });
            return resultSeries;
        },

        update: function () {
            if (!this.assertAllDimensionsHaveSelections()) {
                return;
            }
            if (!this.chart) {
                this.load();
            } else {
                var self = this;
                self.showLoading();
                this.dataset.data.loadAllSelectedData().then(function () {
                    self.hideLoading();

                    var data = self.getData();
                    self.replaceSeries(self.chart, data.series);
                    self.chart.counters.color = 0;
                    self.chart.redraw(false);
                });
            }
        }
    });

}());