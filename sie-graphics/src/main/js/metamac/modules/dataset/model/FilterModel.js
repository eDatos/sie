(function () {
    "use strict";

    var DatasetPermalink = App.modules.dataset.DatasetPermalink;

    App.namespace('App.modules.dataset.model');

    App.modules.dataset.model.FilterModel = Backbone.Model.extend({

        initialize: function (attributes) {
            this.resourceName = attributes.resourceName;
            this.name = attributes.name;
            this.notes = attributes.notes;
            this.userId = attributes.userId;
            this.permalinkType = "EXTERNAL";

            var hash = DatasetPermalink.removePermalink(window.location.hash);
            this.permalink = hash + "/permalink/" + attributes.permalink;
        },

        toString: function () {
            return JSON.stringify({
                id: null,
                name: this.name,
                resourceName: this.resourceName,
                externalUser: { id: this.userId },
                permalink: this.permalink,
                notes: this.notes,
                permalinkType: this.permalinkType,
            })
        }
    });

}());