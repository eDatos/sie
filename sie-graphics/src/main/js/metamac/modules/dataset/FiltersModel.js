(function () {
    App.namespace("App.modules.dataset");

    App.modules.dataset.FiltersModel = Backbone.Model.extend({
        defaults: {
            pie: {
                candidacyType: App.Constants.candidacyType.DEFAULT_VALUE
            },
            map: {
                candidacyType: App.Constants.candidacyType.DEFAULT_VALUE
            },
            column: {
                candidacyType: App.Constants.candidacyType.DEFAULT_VALUE
            }
        }
    });
})();