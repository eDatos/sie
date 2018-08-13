(function () {
    "use strict";

    var Constants = App.Constants;

    App.namespace("App.VisualElement.ColumnChart");

    App.VisualElement.ColumnChart = function (options) {
        this.initialize(options);
        this._type = 'column';

        _.extend(this._chartOptions, {
            chart: {
                animation: false,
                renderTo: '',
                defaultSeriesType: 'column',
                backgroundColor: Constants.colors.istacWhite
            },
            title: {
                text: '',
                style: {
                    color: App.Constants.colors.hiddenText,
                    fontSize: App.Constants.font.title.size
                }
            },
            subtitle: {
                text: '',
                style: {
                    color: App.Constants.colors.hiddenText
                }
            },
            xAxis: {
                categories: [],
                labels: {
                    maxStaggerLines: 1
                }
            },
            yAxis: {
                title: {
                    text: ""
                }
            },
            tooltip: {
                formatter: this.tooltipFormatter
            },
            plotOptions: {
                series: {
                    animation: false
                },
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    events: {
                        legendItemClick: function () {
                            return false;
                        }
                    }
                }
            },
            series: []
        });
    };

    App.VisualElement.ColumnChart.prototype = new App.VisualElement.Base();

    _.extend(App.VisualElement.ColumnChart.prototype, {

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

            var resize = _.debounce(_.bind(this._updateSize, this), 200);
            var self = this;
            this.$el.on("resize", function (e) {
                e.stopPropagation();
                resize();
            });
        },

        _unbindEvents: function () {
            this.stopListening();
            this.$el.off("resize");
        },

        updatingDimensionPositions: function () {
            this._applyVisualizationRestrictions();
            this.resetDimensionsLimits();

            this.filterDimensions.zones.get('left').set('fixedSize', 1); // AxisX
            this.filterDimensions.zones.get('axisy').set('maxSize', 1);
            this.filterDimensions.zones.get('top').set('maxSize', 1); // columns                                                  
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
            this._preselectMostRecentTimeRepresentation();
        },

        render: function () {
            var self = this;

            this.dataset.data.loadAllSelectedData()
                .then(function () {
                    self.$el.html("");
                    self.$title = $('<h3></h3>');
                    self.updateTitle();
                    self.$el.append(self.$title);

                    self.$chartContainer = $('<div></div>');
                    var newHeight = self.$el.height() - self.$title.height() - self.getRightsHolderHeight();
                    self.$chartContainer.height(newHeight);

                    self.$el.append(self.$chartContainer);

                    var data = self.getData();
                    self._chartOptions.series = data.series;
                    self._chartOptions.xAxis.categories = data.xAxis;
                    self._chartOptions.chart.renderTo = self.$chartContainer[0];

                    self._chartOptions.credits.text = self.getRightsHolderText();
                    if (!self.showRightsHolderText()) {
                        self._chartOptions.credits.style = {
                            color: App.Constants.colors.hiddenText
                        }
                    }
                    // TODO METAMAC-2615
                    // self._chartOptions.title.text = self.dataset.metadata.getTitle();
                    // self._chartOptions.subtitle.text = self.getTitle();

                    self.chart = new Highcharts.Chart(self._chartOptions);
                    self.$el.on("resize", function () { });
                });
        },

        resizeFullScreen: function () { },

        tooltipFormatter: function () {
            return '<strong>' + this.series.name + ', ' + this.x + '</strong>:<br/>' + this.point.name;
        },

        getData: function () {
            var self = this;

            var result = {};
            var fixedPermutation = this.getFixedPermutation();

            var horizontalDimension = this.filterDimensions.dimensionsAtZone('left').at(0);
            var columnsDimension = this.filterDimensions.dimensionsAtZone('top').at(0);
            if (!columnsDimension) {
                columnsDimension = this.filterDimensions.dimensionsAtZone('fixed').at(0);
            }
            var horizontalDimensionSelectedCategories = this.getDrawableRepresentations(horizontalDimension);
            if (horizontalDimension.get('type') == "TIME_DIMENSION") {
                horizontalDimensionSelectedCategories = _.sortBy(horizontalDimensionSelectedCategories, function (representation) {
                    return representation.normCode;
                }).reverse();
            }
            var columnsDimensionSelectedCategories = this.getDrawableRepresentations(columnsDimension);

            var listSeries = [];
            _.each(columnsDimensionSelectedCategories, function (columnCategory) {
                var serie = {};
                serie.data = [];
                serie.name = "";

                _.each(horizontalDimensionSelectedCategories, function (horizontalCategory) {
                    if (!horizontalCategory.get('id').startsWith(self.filtersModel.get('candidacyType'))) {
                        return;
                    }

                    var currentPermutation = {};
                    currentPermutation[horizontalDimension.id] = horizontalCategory.id;
                    currentPermutation[columnsDimension.id] = columnCategory.id;
                    _.extend(currentPermutation, fixedPermutation);

                    var y = self.dataset.data.getNumberData({ ids: currentPermutation });
                    var name = self.dataset.data.getStringData({ ids: currentPermutation });
                    serie.data.push({ y: y, name: name });
                });

                serie.name = columnCategory.get('visibleLabel');
                listSeries.push(serie);
            });

            var xaxis = _.invoke(horizontalDimensionSelectedCategories, 'get', 'visibleLabel');

            // Changing the options of the chart
            result.series = listSeries;
            result.xAxis = xaxis;
            return result;
        },

        update: function () {
            if (!this.assertAllDimensionsHaveSelections()) {
                return;
            }
            if (!this.chart) {
                this.load();
            } else {
                this.chart.showLoading();

                var self = this;
                this.dataset.data.loadAllSelectedData().then(function () {
                    self.chart.hideLoading();

                    self.updateTitle();
                    var data = self.getData();

                    self.replaceSeries(self.chart, data.series);
                    self.chart.xAxis[0].setCategories(data.xAxis, false);
                    self.chart.counters.color = 0;
                    self.chart.redraw(false);
                });
            }
        },

        _updateSize: function () {
            var newHeight = this.$el.height() - this.$title.height() - this.getRightsHolderHeight();
            this.$chartContainer.height(newHeight);
            this.chart.setSize(this.$chartContainer.width(), this.$chartContainer.height(), false);
        }

    });



}());
