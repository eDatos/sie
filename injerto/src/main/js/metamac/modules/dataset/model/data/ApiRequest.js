(function () {
    "use strict";

    App.namespace("App.dataset.data.ApiRequest");

    /**
     * Constructor
     * @param options.metadata
     * @param [options.dimensions]
     * @constructor
     */
    App.dataset.data.ApiRequest = function (options) {
        switch (options.metadata.options.type) {
            case "indicator":
            case "indicatorInstance":
                this.request = new App.dataset.data.ApiIndicatorRequest(options);
                break;
            default:
                this.request = new App.dataset.data.ApiDatasetRequest(options);
                break;
        }
    };

    App.dataset.data.ApiRequest.prototype = {

        url: function () {
            return this.request.url();
        },

        isFetching: function () {
            if (this.request.xhrId) {
                return this.request.ajaxManager.isFetching(this.request.xhrId);
            }
            return true;
        },

        fetch: function (callback) {
            return this.request.fetch(callback);
        }
    };


}());