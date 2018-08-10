(function () {
    App.namespace("App.modules.dataset");

    App.modules.dataset.FiltersModel = Backbone.Model.extend({
        defaults: {
            pie: {
                grupos: App.Constants.candidacyType.DEFAULT_VALUE
            }
        }
    });
})();