(function ($) {
    "use strict";

    App.namespace('App.Controller');

    App.Controller = function (options) {
        this.initialize(options);
    };

    $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
        if (App.apiKeyValue) {
            jqXHR.setRequestHeader('api-key', App.apiKeyValue);
        }
    });

    _.extend(App.Controller.prototype, {

        initialize : function (options) {

        }

    });

    App.Controller.extend = Backbone.Model.extend;
    _.extend(App.Controller.prototype, Backbone.Events);
}(window.jQuery));