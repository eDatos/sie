(function () {
    "use strict";

    var DatasetPermalink = App.modules.dataset.DatasetPermalink;

    App.namespace('App.modules.dataset.DatasetEmbedView');

    App.modules.dataset.DatasetEmbedView = Backbone.View.extend({

        template: App.templateManager.get("dataset/dataset-embed"),

        initialize: function () {
            this.filtersModel = this.options.filtersModel;
            this.filterDimensions = this.options.filterDimensions;
        },

        render: function () {
            var self = this;
            if (this.needsPermalink()) {
                var savePermalinkRequest = this.savePermalink();
                savePermalinkRequest.then(function (response) {
                    self.renderEmbed(response.id);
                });
            } else {
                self.renderEmbed(this.getExistingPermalinkId());
            }
        },

        needsPermalink: function () {
            return !(App.config.widget && this.getExistingPermalinkId());
        },

        getExistingPermalinkId: function () {
            return this.filterDimensions.metadata.identifier().permalinkId;
        },

        savePermalink: function () {
            var permalinkContent = DatasetPermalink.buildPermalinkContent(this.filterDimensions, this.filtersModel);
            return DatasetPermalink.savePermalink(permalinkContent, this.$el[0]);
        },

        renderEmbed: function (permalinkId) {
            var context = {
                baseUrl: App.endpoints["sie-base-url"],
                hash: window.location.hash.split("/").slice(0,6).join("/"), // Subpath inside SIE
                permalink: permalinkId
            };
            this.$el.html(this.template(context));
        }
    });
}());