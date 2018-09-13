(function () {
    "use strict";

    var DatasetPermalink = App.modules.dataset.DatasetPermalink;

    App.namespace('App.modules.dataset.DatasetShareView');

    App.modules.dataset.DatasetShareView = Backbone.View.extend({

        template: App.templateManager.get("dataset/dataset-share"),

        initialize: function () {
            this.filterDimensions = this.options.filterDimensions;
        },

        render: function () {
            var self = this;
            if (this.needsPermalink()) {
                var savePermalinkRequest = this.savePermalink();
                savePermalinkRequest.done(function (response) {
                    self.renderShare(response.id);
                });
            } else {
                self.renderShare(this.getExistingPermalinkId());
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

        getSharedUrl: function (permalinkId) {
            return [
                App.endpoints["sie-base-url"],
                window.location.hash.split("/").slice(0,7).join("/"),
                '/permalink/',
                permalinkId
            ].join('');
        },

        renderShare: function (permalinkId) {
            var context = {
                url: this.getSharedUrl(permalinkId),
                title: this.filterDimensions.metadata.getTitle(),
                description: this.filterDimensions.metadata.getDescription()
            };
            this.$el.html(this.template(context));

            var config = {
                data_track_addressbar: true
            };

            var share = {
                url: context.url,
                title: context.title,
                description: context.description,
                passthrough: {
                    twitter: {
                        via: 'istac_es',
                        text: context.title
                    }
                }
            };

            addthis.toolbox(".addthis_toolbox", config, share);
        }

    });

}());