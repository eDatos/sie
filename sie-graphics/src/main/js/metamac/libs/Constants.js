(function () {
    "use strict";

    App.namespace("App.Constants");

    App.Constants = {
        // See variables.less        
        colors: {
            istacBlueWhite: "#B3D9FF",
            istacBlueLight: "#8CD2EA",
            istacBlueMedium: "#008BD0",
            istacBlueDark: "#005980",
            istacYellow: '#EBCC5C',

            istacWhite: "#FFFFFF",
            istacGreyLight: "#EBEBEB",
            istacGreyMedium: "#BBC8D0",
            istacGreyDark: "#8C9BA3",
            istacBlack: "#222222",

            hiddenText: "#FFFFFD"
        },

        font: {
            family: {
                sansSerif: "Helvetica,Arial,sans-serif",
                serif: "serif"
            },
            body: {
                size: "11px"
            },
            title: {
                size: "13px"
            }
        },

        api: {
            type: {
                INDICATOR: "indicator",
                DATASET: "dataset"
            }
        },

        candidacyType: {
            DEFAULT_VALUE: "G_"
        },

        maxSemiCircleElements: 5,

        maxUrlQueryLength: 1700

    };

}());