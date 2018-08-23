(function () {
    "use strict";

    App.namespace("App.widget.filter.sidebar");

    var FilterSidebarMultidatasetNodeView = App.widget.filter.sidebar.FilterSidebarMultidatasetNodeView;
    var FilterRepresentation = App.modules.dataset.filter.models.FilterRepresentation;

    App.widget.filter.sidebar.FilterSidebarMultidatasetView = Backbone.View.extend({

        template: App.templateManager.get('dataset/filter/sidebar/filter-sidebar-multidataset'),

        initialize: function (options) {
            this.filterDimensions = options.filterDimensions;
            this.multidatasetId = this.filterDimensions.getMultidatasetId();
            this.collapsable = _(options).has('collapsable') ? options.collapsable : true;
            this.loadMultidataset(this.multidatasetId).then(_.bind(this.render, this));
        },

        destroy: function () {
            _.invoke(this.subviews, 'destroy');
            this._unbindEvents();
            this.remove();
        },

        close: function () {
            this.remove();
        },

        events: {
            "click .filter-sidebar-multidataset-title": "_onClickTitle"
        },

        _bindEvents: function () {
            this.listenTo(this.filterDimensions, "change:open", this._onChangeOpenFilterDimensions);
            if (this.multidataset) {

                this.listenTo(this.multidataset, "change:open", this._onChangeOpenMultidataset);
            }
        },

        _unbindEvents: function () {
            this.stopListening();
        },

        loadMultidataset: function (multidatasetIdentifier) {
            var multidataset = new App.modules.multidataset.Multidataset({
                multidatasetIdentifier: multidatasetIdentifier,
                filterDimensions: this.filterDimensions
            });
            if (multidataset.equals(this.multidataset)) {
                var deferred = $.Deferred();
                deferred.resolve();
                return deferred.promise();
            } else {
                this.multidataset = multidataset;
                return this.multidataset.fetch();
            }
        },

        render: function () {
            this.delegateEvents();
            this._unbindEvents();
            this._bindEvents();
            var self = this;

            this.$el.html(this.template({
                multidataset: self.multidataset.toJSON(),
                // nodes: this.multidataset.nodes.toJSON()
            }));

            this.subviews = [];

            var $nodes = this.$(".filter-sidebar-multidataset-nodes");
            if (this.multidataset.get('nodes')) {
                this.nodesSubviews = this.multidataset.get('nodes').map(function (multidatasetNode) {
                    var view = new App.widget.filter.sidebar.FilterSidebarMultidatasetNodeView({
                        multidatasetNode: multidatasetNode
                    });
                    view.render();
                    $nodes.append(view.el);
                    return view;
                }, this);

                this.subviews = this.subviews.concat(this.nodesSubviews);
            }
            $nodes.perfectScrollbar();

            this.searchbarView = new App.components.searchbar.SearchbarView({
                model: this.multidataset,
                modelAttribute: "filterQuery",
                el: this.$(".filter-sidebar-multidataset-searchbar")
            });
            this.searchbarView.render();
            this.subviews.push(this.searchbarView);

            this.setMaxHeight(this.maxHeight);
            this._onChangeOpenFilterDimensions(this.filterDimensions);
            this._onChangeOpenMultidataset(this.multidataset);

            return this.el;
        },

        updateMultidatasetUrls: function (oldChart, newChart) {
            this.multidataset.get('nodes').forEach(function(node) {
                var url = node.get("url");
                url = url.replace(oldChart, newChart);
                node.set("url", url);
            });
            this.render();
        },

        updateScrollbar: function () {
            // Wait for DOM
            setTimeout(function () {
                this.$(".filter-sidebar-multidataset-nodes").perfectScrollbar('update');
            }, 10);
        },

        getCollapsedHeight: function () {
            return this.$(".filter-sidebar-multidataset-title").outerHeight(true);
        },

        _onClickTitle: function (e) {
            e.preventDefault();
            if (this.collapsable) {
                this.multidataset.toggle('open');
            }
        },

        _onChangeOpenMultidataset: function (model) {
            this._toggleDrawer(this.multidataset.get('open'));
            if (this.multidataset.get('open')) {
                this.filterDimensions.closeOpenDimensions();
            }
        },

        _onChangeOpenFilterDimensions: function (model) {
            if (model && model.get('open')) {
                this.multidataset.set('open', false);
            }
        },

        _toggleDrawer: function (isOpen) {
            this.$el.find('.collapse').toggleClass('in', isOpen);
            this.$el.find('.filter-sidebar-multidataset-title').toggleClass('active', isOpen);
            this.updateScrollbar();
        },

        setMaxHeight: function (maxHeight) {
            this.maxHeight = maxHeight;
            this.$('.collapse').css('max-height', maxHeight);
            var SIDEBAR_MULTIDATASET_HEADER_HEIGHT = 65;
            var height = maxHeight - SIDEBAR_MULTIDATASET_HEADER_HEIGHT;
            this.$('.filter-sidebar-multidataset-nodes').css('height', height);
            this.updateScrollbar();
        },

    });
}());