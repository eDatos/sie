(function () {
    "use strict";

    App.namespace("App.modules.dataset");

    App.modules.dataset.FiltersView = Backbone.View.extend({

        template: App.templateManager.get('dataset/dataset-filters'),

        initialize: function (options) {
            this.dataset = options.dataset;
            this.filterDimensions = options.filterDimensions;
            this.optionsModel = options.optionsModel;
            this.measureAttribute = null;
        },

        configuration: {
            pie: {
                selectors: {
                    grupos: {
                        default: "grupos",
                        options: [
                            {
                                key: "grupos",
                                value: "G_"
                            },
                            {
                                key: "partidos",
                                value: "P_"
                            }
                        ]
                    }
                }
            }
        },

        events: {
            "click a.order-sidebar-dimension": "_dontFollowLinks",
            "click a.order-sidebar-measure-attribute": "_dontFollowLinks",
            "change .fixed-dimension-select-category": "_onChangeCategory",

            "focusin .order-sidebar-dimension": "_onFocusin",
            "focusout .order-sidebar-dimension": "_onFocusout"
        },

        _dontFollowLinks: function (e) {
            e.preventDefault();
        },

        render: function () {
            var context = this._renderContext();
            this.$el.html(this.template(context));
            this.$el.find('select').select2({
                dropdownParent: $('.metamac-container')
            });
        },

        _renderContext: function () {
            var selectorsIds = this._getSelectorsByChartType();
            var selectors = _.map(selectorsIds, function (selector) {
                return {
                    id: selector,
                    label: this._getLiteral(selector, "label"),
                    default: this._getDefault(selector),
                    options: this._getOptionsFromSelector(selector),
                };
            }, this);

            return {
                leftColumns: selectors.length,
                selectors: selectors
            };
        },

        _getSelectorsByChartType: function () {
            var currentChartType = this._getCurrentChartType();
            return currentChartType ? Object.keys(this.configuration[currentChartType].selectors) : [];
        },

        _getLiteral: function (selector, key) {
            var currentChartType = this._getCurrentChartType();
            return I18n.t("filter.selector." + currentChartType + "." + selector + "." + key);
        },

        _getDefault: function (selector) {
            var currentChartType = this._getCurrentChartType();
            return currentChartType ? this.configuration[currentChartType].selectors[selector].default : "";
        },

        _getOptionsFromSelector: function (selector) {
            var currentChartType = this._getCurrentChartType();
            var options = currentChartType ? this.configuration[currentChartType].selectors[selector].options : [];
            var self = this;
            options.forEach(function (option) {
                option.name = self._getLiteral(selector, option.key);
            });
            return options;
        },

        _getCurrentChartType: function () {
            return this.optionsModel.get("type");
        },
    });
}());