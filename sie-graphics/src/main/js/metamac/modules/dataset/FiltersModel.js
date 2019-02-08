(function () {
    App.namespace("App.modules.dataset");

    App.modules.dataset.FiltersModel = Backbone.Model.extend({
        defaults: {
            candidacyType: App.Constants.candidacyType.DEFAULT_VALUE
        },

        importJSON: function (json) {
            var self = this;
            _.forEach(Object.keys(json), function (key) {
                self.set(key, json[key]);
            })
        },

        exportJSON: function () {
            var result = {};
            var self = this;
            _.forEach(Object.keys(self.attributes), function (key) {
                result[key] = self.get(key);
            })
            return result;
        }
    });
})();