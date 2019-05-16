(function () {
    "use strict";

    App.namespace('App.AppRouter');

    App.AppRouter = Backbone.Router.extend({
        // The agency, identifier and version needs to come the query string "?resourceType=datasetagencyId=ISTAC&resourceId=C00031A_000002&version=001.000"

        routes: {

            "proceso-electoral/:territorio/:idProcesoElectoral": "home",

            "proceso-electoral/:territorio/:idProcesoElectoral/selection": "selection",
            "proceso-electoral/:territorio/:idProcesoElectoral/selection/permalink/:permalinkId": "selectionPermalink",

            "proceso-electoral/:territorio/:idProcesoElectoral/visualization": "visualization",
            "proceso-electoral/:territorio/:idProcesoElectoral/visualization/permalink/:permalinkId": "visualizationPermalink",

            "proceso-electoral/:territorio/:idProcesoElectoral/visualization/:visualizationType": "visualizationType",
            "proceso-electoral/:territorio/:idProcesoElectoral/visualization/:visualizationType/permalink/:permalinkId": "visualizationTypePermalink",

            "*path": "error"
        },

        initialize: function (options) {
            options || (options = {});

            this.datasetController = options.datasetController;
            this.datasetController.router = this;

            this.routesByName = _.invert(this.routes);
            this.checkQueryParamsValidity();
        },

        home: function () {
            var args = this._nameArguments(["territorio", "idProcesoElectoral"], arguments);
            var self = this;
            this._processArgs(args).done(function (processedArgs) {
                self.datasetController.showDataset(processedArgs);
            });
        },

        selection: function () {
            var args = this._nameArguments(["territorio", "idProcesoElectoral"], arguments);
            var self = this;
            this._processArgs(args).done(function (processedArgs) {
                self.datasetController.showDatasetSelection(processedArgs);
            });
        },

        selectionPermalink: function () {
            var args = this._nameArguments(["territorio", "idProcesoElectoral", "permalinkId"], arguments);
            var self = this;
            this._processArgs(args).done(function (processedArgs) {
                self.datasetController.showDatasetSelection(processedArgs);
            });
        },

        visualization: function () {
            var args = this._nameArguments(["territorio", "idProcesoElectoral"], arguments);
            var self = this;
            this._processArgs(args).done(function (processedArgs) {
                self.datasetController.showDatasetVisualization(processedArgs);
            });
        },

        visualizationPermalink: function () {
            var args = this._nameArguments(["territorio", "idProcesoElectoral", "permalinkId"], arguments);
            var self = this;
            this._processArgs(args).done(function (processedArgs) {
                self.datasetController.showDatasetVisualization(processedArgs);
            });
        },

        visualizationType: function () {
            var args = this._nameArguments(["territorio", "idProcesoElectoral", "visualizationType"], arguments);
            var self = this;
            this._processArgs(args).done(function (processedArgs) {
                self.datasetController.showDatasetVisualization(processedArgs);
            });
        },

        visualizationTypePermalink: function () {
            var args = this._nameArguments(["territorio", "idProcesoElectoral", "visualizationType", "permalinkId"], arguments);
            var self = this;
            this._processArgs(args).done(function (processedArgs) {
                self.datasetController.showDatasetVisualization(processedArgs);
            });
        },

        error: function () {
            console.error("error");
        },

        _processArgs: function (args) {
            args = _.defaults(args, App.queryParams);
            var tipoElecciones = args['idProcesoElectoral'].split('_')[0];
            return this._getDatasetsByTipoElecciones(tipoElecciones).then(function (datasetList) {
                var dataset = datasetList.find(function (element) {
                    return args['idProcesoElectoral'] === element.idProcesoElectoral;
                });
                if (dataset) {
                    args.identifier = dataset.id;
                    args.agency = dataset.agency;
                    args.version = dataset.version;
                }
                return args;
            });
        },

        _getDatasetsByTipoElecciones: function () {
            if (!this.multidatasetCache) {
                this.multidatasetCache = new $.Deferred();

                var identifiers = App.queryParams.multidatasetId.split(":");
                var agency = identifiers[0];
                var identifier = identifiers[1];
                var request = $.get(App.endpoints["statistical-resources"] + '/multidatasets/' + agency + '/' + identifier + '?_type=json');

                var self = this;
                $.when(request).done(function (multidataset) {
                    var datasetList = multidataset.data.nodes.node;
                    var result = datasetList.map(function (element) {
                        var urn = element.dataset.urn;
                        var datasetIdentifier = _.last(urn.split('='));
                        var urlPartMatches = datasetIdentifier.match(/(.*):(.*)\(([^\)]*?)\)/);
                        var agency = urlPartMatches[1];
                        var identifier = urlPartMatches[2];
                        var version = urlPartMatches[3];
                        var idProcesoElectoral = element.identifier;
                        return {
                            id: identifier,
                            idProcesoElectoral: idProcesoElectoral,
                            agency: agency,
                            version: version,
                            year: element.name.text[0].value
                        }
                    });
                    self.multidatasetCache.resolveWith(null, [result]);
                });
            }
            return this.multidatasetCache.promise();
        },

        linkTo: function (routeName, params) {
            var route = this.routesByName[routeName];

            if (_.isUndefined(route)) {
                throw new Error("Invalid route " + routeName);
            }

            var link = route;
            _.each(params, function (paramValue, paramName) {
                var paramRegExp = new RegExp(":" + paramName, "g");
                link = link.replace(paramRegExp, paramValue);
            });

            return link;
        },

        _nameArguments: function (names, args) {
            var results = {};
            _.each(names, function (name, i) {
                results[name] = args[i];
            });
            return results;
        },

        checkQueryParamsValidity: function () {
            switch (App.queryParams.type) {
                case 'dataset':
                case 'query':
                case 'indicator':
                case 'indicatorInstance':
                    break;
                default:
                    return this.error();
            }

            if (_.isUndefined(App.queryParams.type)) {
                return this.error();
            }

            if (_.isUndefined(App.queryParams.agency) && !(App.queryParams.type === 'indicator' || App.queryParams.type === 'indicatorInstance')) {
                return this.error();
            }

            if (App.queryParams.type === 'indicatorInstance' && _.isUndefined(App.queryParams.indicatorSystem)) {
                return this.error();
            }

            // Collections and queries dont use version, so is not required for them
        }

    });

}());