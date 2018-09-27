(function () {

    App.namespace('App.dataset.StructuralResourcesApi');

    App.dataset.StructuralResourcesApi = function (options) {
        this.metadata = options ? options.metadata : null;
    };

    App.dataset.StructuralResourcesApi.prototype = {

        getOrganisation: function (callback) {
            var requestParams = {
                url: this.buildOrganisationUrl() + "?_type=json",
                method: "GET",
                dataType: 'jsonp',
                jsonp: '_callback'
            };
            $.ajax(requestParams).
                done(function (response) {
                    callback(null, response);
                })
                .fail(function () {
                    callback("Error fetching organisation");
                });
        },

        // Output: "http://estadisticas.arte-consultores.com/structural-resources/latest/agencyschemes/SDMX/AGENCIES/1.0/agencies/ISTAC"
        buildOrganisationUrl: function () {
            var organisationIdentifier = App.URNUtils.getIdentifierFromUrn(App.config["organisationUrn"]);
            return [
                App.endpoints["structural-resources"],
                "agencyschemes",
                organisationIdentifier.agency,
                organisationIdentifier.identifier,
                organisationIdentifier.version,
                "agencies",
                organisationIdentifier.organisation
            ].join('/');
        },

        getDimensions: function (callback) {

            if (!this.metadata.metadata.relatedDsd.selfLink) { return; }

            var requestParams = {
                url: this.metadata.metadata.relatedDsd.selfLink.href + "?_type=json",
                method: "GET",
                dataType: 'jsonp',
                jsonp: '_callback'
            };

            $.ajax(requestParams).
                done(function (response) {
                    var result = _.map(response.dataStructureComponents.dimensions.dimension, function (dimension) {
                        return dimension;
                    });
                    callback(null, result);
                })
                .fail(function () {
                    callback("Error fetching related dsd");
                });
        },

        getDimensionsConcepts: function (dimensions, callback) {
            var conceptItems = _.map(dimensions, function (dimension) {
                return dimension.conceptIdentity;
            });
            this.getConcepts(conceptItems, callback);
        },

        getMeasureConcepts: function (callback) {
            var measureConcept;
            if (this.metadata.metadata.measureCoverages) {
                measureConcept = this.metadata.metadata.measureCoverages.resource;
            } else if (this.metadata.metadata.attributes) {
                var measureAttribute = _.findWhere(this.metadata.metadata.attributes.attribute, { type: "MEASURE", attachmentLevel: "DATASET" });
                if (measureAttribute) {
                    measureConcept = measureAttribute.attributeValues.value;
                }
            }

            if (measureConcept) {
                this.getConcepts(measureConcept, callback);
            }
        },

        getConcepts: function (conceptItems, callback) {
            var results = [];
            var promises = [];
            _.each(conceptItems, function (conceptItem) {

                var requestParams = {
                    url: conceptItem.selfLink.href + "?_type=json",
                    method: "GET",
                    dataType: 'jsonp',
                    jsonp: '_callback'
                };

                promises.push(
                    $.ajax(requestParams)
                        .done(function (response) {
                            results.push(response);
                        })
                        .fail(function () {
                            callback("Error fetching concept");
                        })
                );
            });
            $.when
                .apply($, promises)
                .done(function () {
                    callback(null, results);
                });
        }
    };

}());