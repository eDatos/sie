(function () {
    "use strict";

    I18n.fallbacks = true;

    var App = new Backbone.Marionette.Application();

    App.addInitializer(function () {
        App.datasetController = new App.modules.dataset.DatasetController({ region: this.mainRegion });

        App.router = new App.AppRouter({
            datasetController: App.datasetController
        });

        Backbone.history.start();
    });

    App.context = "";
    App.resourceContext = "";

    // Start empty, initizialized outside, before App.start
    App.endpoints = {
        "structural-resources": "",
        "statistical-resources": "",
        "statistical-visualizer": ""
    };

    App.queryParams = {
        "agency": undefined,
        "identifier": undefined,
        "version": undefined,
        "type": undefined,
		"territorio": undefined,
		"idProcesoElectoral": undefined,

        "indicatorSystem": undefined, // Only for indicatorsInstances

        "geo": undefined
    }

    App.config = {
        "widget": false,
        "showHeader": true,
        "showRightsHolder": true,
        "chromeFrameObject": false,
        "installationType": "EXTERNAL"
    }

    App.namespace = function (namespaceString) {

        if (!namespaceString) {
            return null;
        }

        var parts = namespaceString.split('.'),
            parent = window,
            currentPart = '',
            i,
            length = parts.length;

        for (i = 0; i < length; i++) {
            currentPart = parts[i];
            parent[currentPart] = parent[currentPart] || {};
            parent = parent[currentPart];
        }

        return parent;
    };

    Backbone.Marionette.Renderer.render = function (template, data) {
        return App.templateManager.get(template)(data);
    };

    _.extend(App, Backbone.Events);

    window.App = App;

}());