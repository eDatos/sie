(function () {
    "use strict";

    App.namespace('App.components.modal.ModalView');

    App.components.modal.ModalView = Backbone.Marionette.Layout.extend({

        template : "components/modal/modal",

        initialize : function () {
            this.title = this.options.title;
            this.contentView = this.options.contentView;
        },

        regions : {
            content: ".modal-content"
        },

        events : {
            "click .modal-backdrop" : "onClickBackdrop",
            "click .modal-close" : "onClickClose"
        },

        serializeData : function () {
            var context = {
                title : this.title
            };
            return context;
        },

        onRender : function () {
            this.content.show(this.contentView);
        },

        show : function () {
            this.render();
            if ($(".full-screen").append(this.$el).length == 0) {
            	$("body").append(this.$el)
            };
        },

        onClickBackdrop : function () {
            this.close();
        },

        onClickClose : function () {
            this.close();
        }
        

    });

}());