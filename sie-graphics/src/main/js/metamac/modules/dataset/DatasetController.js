(function () {
    "use strict";

    App.namespace('App.modules.dataset.DatasetController');

    App.modules.dataset.DatasetController = App.Controller.extend({

        initialize: function (options) {
            this.region = options.region;
            this.metadata = undefined;
        },

        showDataset: function (datasetIdentifier) {
            var self = this;
            this._loadMetadata(datasetIdentifier)
                .then(function () {
                    var routeParts = [];

                    if (self.metadata.getAutoOpen()) {
                        routeParts.push("visualization");
                    } else {
                        routeParts.push("selection");
                    }

                    var route = window.location.hash + "/" + routeParts.join("/");
                    Backbone.history.navigate(route, { trigger: true, replace: true });
                });
        },

        showDatasetSelection: function (datasetIdentifier) {
            var link = this._linkToDatasetSelection(datasetIdentifier);
            this.router.navigate(link);

            var self = this;
            this._loadMetadata(datasetIdentifier)
                .then(function () {
                    self.region.show(self.selectionView);
                });
        },

        showDatasetVisualization: function (options) {
            var link = this._linkToDatasetVisualization(options);
            this.router.navigate(link);

            var self = this;
            var datasetIdentifier = _.pick(options, "type", "agency", "identifier", "version", "permalinkId", "indicatorSystem", "geo", "multidatasetId", "territorio", "tipoElecciones", "fecha");
            if (this.visualizationView) {
                this.visualizationView.showLoading();
            }
            this._loadMetadata(datasetIdentifier)
                .then(function () {
                    options = _.defaults(options, {
                        visualizationType: "pie",
                        fullScreen: false
                    });
                    if (self.region.currentView !== self.visualizationView) {
                        self.region.show(self.visualizationView);
                    }
                    self.visualizationView.showChart(options);
                });
        },

        changeDatasetVisualization: function (options) {
            var link = this._linkToDatasetVisualization(options);
            this.router.navigate(link, { replace: true });
            this.visualizationView.showChart(options);
        },

        _linkToDatasetVisualization: function (options) {
            var routeName = "visualization";
            if (options.visualizationType) {
                routeName = routeName + "Type";
            }
            if (options.permalinkId) {
                routeName = routeName + "Permalink";
            }
            return this.router.linkTo(routeName, options);
        },

        _linkToDatasetSelection: function (options) {
            var routeName = "selection";
            if (options.permalinkId) {
                routeName = routeName + "Permalink";
            }
            return this.router.linkTo(routeName, options);
        },

        _loadMetadata: function (datasetIdentifier) {
            var self = this;
            var deferred = $.Deferred();

            var metadata = new App.dataset.Metadata(_.pick(datasetIdentifier, "type", "agency", "identifier", "version", "indicatorSystem", "permalinkId", "multidatasetId", "territorio", "tipoElecciones", "fecha"));
            if (metadata.equals(this.metadata)) {
                deferred.resolve();
            } else {
                this.metadata = metadata;
                metadata.fetch().then(function () {
                    self.filtersModel = new App.modules.dataset.FiltersModel();
                    self.filterDimensions = App.modules.dataset.filter.models.FilterDimensions.initializeWithMetadata(metadata);
                    self.selectionView = new App.modules.selection.SelectionView({ controller: self, collection: self.filterDimensions, metadata: metadata });
                    self.visualizationView = new App.modules.dataset.DatasetView({ controller: self, filterDimensions: self.filterDimensions, metadata: metadata, filtersModel: self.filtersModel });

                    if (datasetIdentifier.permalinkId) {
                        App.modules.dataset.DatasetPermalink.retrievePermalink(datasetIdentifier.permalinkId)
                            .done(function (content) {
                                self.filtersModel.importJSON(content.filters);
                                self.filterDimensions.importJSON(content.selection);
                                if (!window.location.hash.includes(content.hash)) {
                                    self.visualizationView.optionsModel.set('mustApplyVisualizationRestrictions', true);
                                }
                                deferred.resolve();
                            })
                            .fail(function () {
                                deferred.resolve();
                            });
                    } else if (datasetIdentifier.geo) {
                        self.filterDimensions.importGeographicSelection(datasetIdentifier.geo);
                        deferred.resolve();
                    } else {
                        deferred.resolve();
                    }
                });
            }
            return deferred.promise();
        }

    });

}());