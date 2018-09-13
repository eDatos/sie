(function () {
    "use strict";

    var DatasetPermalink = App.modules.dataset.DatasetPermalink;

    App.namespace('App.modules.dataset.DatasetEmbedView');

    App.modules.dataset.DatasetEmbedView = Backbone.View.extend({

        template: App.templateManager.get("dataset/dataset-embed"),

        initialize: function () {
            this.filterDimensions = this.options.filterDimensions;
        },

        render: function () {
            var self = this;
            if (this.needsPermalink()) {
                var savePermalinkRequest = this.savePermalink();
                savePermalinkRequest.done(function (response) {
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
            var permalinkContent = DatasetPermalink.buildPermalinkContent(this.filterDimensions);
            return DatasetPermalink.savePermalinkShowingCaptchaInElement(permalinkContent, this.$el);
        },

        renderEmbed: function (permalinkId) {
            var context = {
                baseUrl: App.endpoints["sie-base-url"],
                hash: window.location.hash.split("/").slice(0,6).join("/"),
                permalink: permalinkId
            };
            this.$el.html(this.template(context));
        }
    });
}());