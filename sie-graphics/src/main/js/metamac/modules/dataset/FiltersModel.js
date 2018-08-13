(function () {
    App.namespace("App.modules.dataset");

    App.modules.dataset.FiltersModel = Backbone.Model.extend({
        defaults: {
            candidacyType: App.Constants.candidacyType.DEFAULT_VALUE
        }
    });
})();