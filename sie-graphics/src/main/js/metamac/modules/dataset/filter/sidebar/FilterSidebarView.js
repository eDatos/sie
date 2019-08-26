(function () {
    "use strict";

    App.namespace("App.widget.filter.sidebar");

    var FilterSidebarDimensionView = App.widget.filter.sidebar.FilterSidebarDimensionView;
    var FilterSidebarMultidatasetView = App.widget.filter.sidebar.FilterSidebarMultidatasetView;

    App.widget.filter.sidebar.FilterSidebarView = Backbone.View.extend({

        template: App.templateManager.get('dataset/filter/sidebar/filter-sidebar-view'),

        id: "filterSidebar",
        icon: "filter-sidebar-icon-filter",
        title: I18n.t("filter.sidebar.filter.title"),

        initialize: function (options) {
            this.filterDimensions = options.filterDimensions;
            this.optionsModel = options.optionsModel;
            this.valuesToIgnore = {};

            //Initialize subviews here to keep state

            this.subviews = this.filterDimensions.map(function (dimension) {
                return new FilterSidebarDimensionView({
                    filterDimensions: this.filterDimensions,
                    filterDimension: dimension
                });
            }, this);

            if (this.filterDimensions.hasMultidataset()) {
                this.multidataset = new FilterSidebarMultidatasetView({
                    filterDimensions: this.filterDimensions
                });
            }

            this.title = I18n.t("filter.sidebar.filter.title");

            //_.last(this.subviews).stateModel.set('collapsed', false); // open last subview
        },

        destroy: function () {
            _.invoke(this.subviews, 'destroy');
            this._unbindEvents();
        },

        events: {
            "resize": "_onResize",
            "change .control-ignore-value": "onIgnoreDimensionValue"
        },

        onIgnoreDimensionValue: function(event) {
            var $target = $(event.target);
            var value = $target.data('value');
            this.valuesToIgnore[value] = $target.is(':checked');
            var self = this;
            this.filterDimensions.trigger('change:filterByValues', Object.keys(this.valuesToIgnore || {}).filter(function(value) {return self.valuesToIgnore[value]}));
        },

        _bindEvents: function () {
            _.invoke(this.subviews, '_bindEvents');
        },

        _unbindEvents: function () {
            _.invoke(this.subviews, '_unbindEvents');
        },

        render: function () {
            this._unbindEvents();
            this._bindEvents();

            this.$el.html(this.template({valuesToIgnore: this.valuesToIgnore}));

            var $dimensions = this.$('.filter-sidebar-dimensions');

            _.each(this.subviews, function (subview) {
                $dimensions.append(subview.render());
            }, this);

            if (this.multidataset) {
                var $multidatasets = this.$('.filter-sidebar-multidatasets');
                $multidatasets.append(this.multidataset.render());
            }

            this._onResize();
        },

        updateMultidatasetUrlsIfExist: function (oldChart, newChart) {
            if (this.filterDimensions.hasMultidataset()) {
                this.multidataset.updateMultidatasetUrls(oldChart, newChart);
            }
        },

        _onSubviewChangeCollapsed: function (changedView) {
            if (!changedView.stateModel.get('collapsed')) {
                _.chain(this.subviews)
                    .filter(function (subview) {
                        return changedView.cid !== subview.cid;
                    }).each(function (subview) {
                        subview.stateModel.set('collapsed', true);
                    });
            }
        },

        _onResize: function () {
            var totalCollapsedHeight = _.reduce(this.subviews, function (memo, subview) {
                return memo + subview.getCollapsedHeight();
            }, 0);

            if (this.multidataset) {
                totalCollapsedHeight += this.multidataset.getCollapsedHeight();
            }

            var maxHeight = this.$el.height() - totalCollapsedHeight;
            _.each(this.subviews, function (subview) {
                subview.setMaxHeight(maxHeight);
            });
        }

    });


}());