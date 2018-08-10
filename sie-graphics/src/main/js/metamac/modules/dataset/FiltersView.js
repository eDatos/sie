(function () {
    "use strict";

    App.namespace("App.modules.dataset");

    App.modules.dataset.FiltersView = Backbone.View.extend({

        template: App.templateManager.get('dataset/dataset-filters'),

        initialize: function (options) {
            this.optionsModel = options.optionsModel;
            this.filtersModel = options.filtersModel;
        },

        configuration: {
            pie: {
                selectors: {
                    candidacyType: {
                        options: [
                            {
                                key: "groups",
                                value: "G_"
                            },
                            {
                                key: "parties",
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
            "change .fixed-dimension-select-category": "_onChangeSelector"
        },

        _onChangeSelector: function (e) {
            var currentTarget = $(e.currentTarget);
            var selectorValue = currentTarget.val();
            var selectorId = currentTarget.data("selector-id");
            if (selectorId) {
                var currentChartType = this._getCurrentChartType();
                var attribute = {}
                attribute[selectorId] = selectorValue;
                this.filtersModel.set(currentChartType, attribute);
            }
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
                    selectedValue: this._getSelected(selector),
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
            return (currentChartType && this.configuration[currentChartType]) ? Object.keys(this.configuration[currentChartType].selectors) : [];
        },

        _getLiteral: function (selector, key) {
            var currentChartType = this._getCurrentChartType();
            return I18n.t("filter.selector." + currentChartType + "." + selector + "." + key);
        },

        _getSelected: function (selector) {
            var currentChartType = this._getCurrentChartType();
            return this.filtersModel.get(currentChartType)[selector];
        },

        _getOptionsFromSelector: function (selector) {
            var currentChartType = this._getCurrentChartType();
            var options = this.configuration[currentChartType].selectors[selector].options;
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