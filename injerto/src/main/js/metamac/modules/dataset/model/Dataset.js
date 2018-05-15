(function () {
    "use strict";

    var Data = App.dataset.data.Data,
        BigData = App.dataset.data.BigData;

    App.namespace("App.dataset.Dataset");

    App.dataset.Dataset = function (options) {
        this.initialize(options);
    };

    App.dataset.Dataset.prototype = {

        /**
         * @param options.metadata
         * @param options.filterOptions
         */
        initialize : function (options) {
            this.metadata = options.metadata;
            this.filterDimensions = options.filterDimensions;

            if (this.isBigData()) {
                this.data = new BigData(options);
            } else {
                this.data = new Data(options);
            }
        },

        isBigData : function () {
            return true;
            // IDEA: METAMAC-2283, refactorizar para eliminar modelo no usado Data
            // TODO: Revisar por qué se carga BigData si el namespace de BigData no es el correcto
            // return this.metadata.getTotalObservations() > 1000;
        }

    };

}());