(function () {
    "use strict";

    App.namespace("App.Constants");

    App.Constants = {
        // See variables.less        
        colors: {
            istacBlueScale: ['#EAF6FE', '#D5EDFA', '#8CD2EA', '#2CBCE2', '#00A6DC', '#008BD0', '#0072A2', '#005980', '#003956', '#002E48'],
            istacBlueWhite: "#EAF6FE",
            istacBlueLight: "#8CD2EA",
            istacBlueMedium: "#008BD0",
            istacBlueDark: "#002E48",
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