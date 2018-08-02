(function () {
    "use strict";

    App.namespace("App.modules.dataset");

    App.modules.dataset.DatasetVisualizationView = Backbone.View.extend({

        template: App.templateManager.get("dataset/dataset-visualization"),

        initialize: function (options) {
            this.container = options.container;
            this.dataset = options.dataset;

            this.filterDimensions = options.filterDimensions;

            this.optionsModel = options.optionsModel;
            this.veElements = options.veElements;
            options.optionsView.on("enterFullScreen", this.enterFullScreen, this);
            options.optionsView.on("exitFullScreen", this.exitFullScreen, this);

            this._initializeVisualElements();
        },

        _initializeVisualElements: function () {
            var options = {
                dataset: this.dataset,
                filterDimensions: this.filterDimensions,
                animation: this.options.animation,
                optionsModel: this.optionsModel
            };
            this.ve = {
                info: new App.VisualElement.Info(options),
                column: new App.VisualElement.ColumnChart(options),
                line: new App.VisualElement.LineChart(options),
                pie: new App.VisualElement.SemiCircleChart(options),
                table: new App.VisualElement.Table(options),
                map: new App.VisualElement.Map(_.extend(options, { mapType: 'map' })),
                mapbubble: new App.VisualElement.Map(_.extend(options, { mapType: 'mapbubble' }))
            };
            this.ve.map.on('didLoadVe', this._hideSpinner, this);
            this.ve.mapbubble.on('didLoadVe', this._hideSpinner, this);
        },

        _initializeFullScreen: function () {
        },

        _showSpinner: function () {
            var img = App.resourceContext + "images/loadingSpinner.gif";
            this.$dataSpinner = $("<div class='spinner'><img src='" + img + "'/></div>");

            var $container = this.$el;
            var top = $container.height() / 2 - this.$dataSpinner.height() / 2;
            var left = $container.width() / 2 - this.$dataSpinner.width() / 2;

            this.$dataSpinner.css({ top: top, left: left });
            $container.prepend(this.$dataSpinner);
        },

        _hideSpinner: function () {
            if (this.$dataSpinner) {
                this.$dataSpinner.remove();
                this.$dataSpinner = null;
            }
        },

        activeVisualElement: function (element) {
            var oldElement = this._getCurrentVe();
            this._removeCurrentElement();
            this.currentElement = element;
            this.ve[this.currentElement].updatingDimensionPositions(oldElement);
        },

        load: function () {
            this.ve[this.currentElement].load();
        },

        _removeCurrentElement: function () {
            var currentVe = this._getCurrentVe();
            if (currentVe) {
                currentVe.destroy();
                this.$(".dataset-visualization-visual-element").empty();
            }
        },

        _getCurrentVe: function () {
            if (this.currentElement) {
                return this.ve[this.currentElement];
            }
        },

        enterFullScreen: function () {
            this.trigger("enterFullScreen");
            //this.fullScreen.enterFullScreen();
        },

        exitFullScreen: function () {
            this.trigger("exitFullScreen");
            //this.fullScreen.exitFullScreen();
        },

        _willEnterFullScreen: function () {
            //$(this._options.container.vecontainer).hide();
            this.trigger('willEnterFullScreen');
        },

        _didEnterFullScreen: function () {
            //$(this._options.container.vecontainer).show();

            var currentVe = this._getCurrentVe();
            currentVe.resizeFullScreen();
            this.trigger('didEnterFullScreen');
        },

        _willExitFullScreen: function () {
            //$(this._options.container.vecontainer).hide();
            this.trigger('willExitFullScreen');
        },

        _didExitFullScreen: function () {
            //$(this._options.container.vecontainer).show();
            var currentVe = this._getCurrentVe();
            currentVe.resizeFullScreen();
            this.trigger('didExitFullScreen');
        },

        render: function () {
            var context = {};
            this.$el.html(this.template(context));

            var veEl = this.$(".dataset-visualization-visual-element");
            _.each(this.ve, function (ve) {
                ve.setEl(veEl);
            });
        }

    });

}());
