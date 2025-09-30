(function () {
    "use strict";

    App.namespace('App.modules.dataset.filter.models.FilterRepresentations');

    App.modules.dataset.filter.models.FilterRepresentations = Backbone.Collection.extend({

        model: App.modules.dataset.filter.models.FilterRepresentation,

        initialize: function () {
            this.drawableLimit = Infinity;

            this.selectedGeographicalLevel = null;
            this.selectedTemporalGranularity = null;
            this._bindEvents();
        },

        _bindEvents: function () {
            this.listenTo(this, 'change:selected', _.debounce(this._onChangeSelected, 100));
            this.listenTo(this, 'change:drawable', this._onChangeDrawable);
        },

        _unbindEvents: function () {
            this.stopListening();
        },

        initializeHierarchy: function () {
            var hasHierarchy = false;
            this.each(function (representation) {
                var children = this.where({ parent: representation.id });

                if (children.length) {
                    hasHierarchy = true;
                    representation.children.reset(children);
                    representation._onChangeOpen();
                }
            }, this);
            this.hasHierarchy = hasHierarchy;
        },

        _setSelectedGeographicDimension: function (attributes, options) {
            this.each(function (representation) {
                // TODO mejorar el rendimiento de esto
                const normCode = representation.get("normCode");
                if (normCode) {
                    const territoryVariableElementId = normCode.substring(normCode.indexOf(".") + 1);
                    if (territoryVariableElementId && attributes.type === "GEOGRAPHIC_DIMENSION" && options.metadata.identifier().territorio === territoryVariableElementId) {
                        representation.setMeAndMyChildren("selected", true, {silent: true});
                    }
                }
            }, this);
        },

        _updateDrawables: function () {
            var modelsToDraw = this._getModelsToDraw();

            _.invoke(this.models, 'set', { drawable: false }, { silent: true });
            _.invoke(modelsToDraw, 'set', { drawable: true });
            this.trigger("change:drawable");
        },

        _getModelsToDraw: function () {
            var nModelsSelected = this.getSelectedRepresentations().length;
            var nModelsToDraw = this.drawableLimit - nModelsSelected;
            if (this.drawableLimit == nModelsSelected) {
                nModelsToDraw += 1; // Draw at least one model
            }
            return this.getSelectedRepresentations().slice(0, nModelsToDraw);
        },

        selectAll: function () {
            _.invoke(this.models, 'set', { selected: true });
        },

        selectVisible: function () {
            var visibleModels = this.where({ visible: true, selected: false });
            _.invoke(visibleModels, 'set', { selected: true });
        },

        deselectVisible: function () {
            var visibleModels = this.where({ visible: true, selected: true });
            _.invoke(visibleModels, 'set', { selected: false });
        },

        setDrawableLimit: function (drawableLimit) {
            this.drawableLimit = drawableLimit;
            this._updateDrawables();
        },

        toggleRepresentationsVisibleRange: function (start, end, state) {
            var visibleModels = this.where({ visible: true });
            var modelsToChange = visibleModels.slice(start, end + 1);
            _.invoke(modelsToChange, 'set', { selected: state });
        },

        _onChangeSelected: function (model) {
            this._updateDrawables();
        },

        _onChangeDrawable: function (model) {
            if (!model) { return; }

            var drawableModels = this.getDrawableRepresentations();
            if (!model.get('drawable') && drawableModels.length === 0) {
                model.set('drawable', true);
            }

            if (model.get('drawable') && drawableModels.length > this.drawableLimit) {
                var otherModel = _.find(drawableModels, function (drawableModel) {
                    return drawableModel.id !== model.id;
                });
                otherModel.set('drawable', false);
            }
        },

        parse: function (representations) {
            //group by parents
            var representationsByParent = _.groupBy(representations, function (representation) {
                return representation.parent;
            });

            //sort by levels
            for (var parent in representationsByParent) {
                representationsByParent[parent] = _.sortBy(representationsByParent[parent], 'order');
            }

            // recursive depth tree traversal for hierarchy order
            var rootRepresentations = representationsByParent["undefined"];
            var sortedRepresentations = [];
            var depthTreeTraversal = function (level, node) {
                node.level = level;
                sortedRepresentations.push(node);
                _.each(representationsByParent[node.id], _.partial(depthTreeTraversal, level + 1));
            };
            _.each(rootRepresentations, _.partial(depthTreeTraversal, 0));

            return sortedRepresentations;
        },

        reverse: function () {
            this.reset(this.last(this.length).reverse());
            this.trigger("reverse");
        },

        getSelectedRepresentations: function () {
            return this.where({ selected: true });
        },

        getDrawableRepresentations: function () {
            return this.where({ drawable: true });
        },

        getGeographicRepresentationsWithAtLeastOneElementSelected : function() {
            return this.filter(item => {
                // Filter selected elements
                if (item.get('selected')) {
                  // check that there are more items selected in your level
                  return this.filter(subItem => subItem.get('level') === item.get('level') && subItem.get('selected')).length >= 1;
                }
                return false;
              });
        },

        updateDrawablesBySelectedLevel: function () {
            if (this.getSelectedRepresentationsByCurrentLevel().length === 0) {
                this.updateSelectedGeographicLevel();
            }

            _.invoke(this.models, 'set', { drawable: false }, { silent: true });
            _.invoke(this.getSelectedRepresentationsByCurrentLevel(), 'set', { drawable: true });
            this.trigger("change:drawable");
        },

        getSelectedRepresentationsByCurrentLevel: function () {
            return this.where({ level: parseInt(this.selectedGeographicalLevel), selected: true });
        },

        updateDrawablesBySelectedGranularity: function () {
            if (this.getSelectedRepresentationsByCurrentGranularity().length === 0) {
                this.updateSelectedTemporalGranularityWithMostRepeatedValue();
            }

            _.invoke(this.models, 'set', { drawable: false }, { silent: true });
            _.invoke(this.getSelectedRepresentationsByCurrentGranularity(), 'set', { drawable: true });
            this.trigger("change:drawable");
        },

        getSelectedRepresentationsByCurrentGranularity: function () {
            return this.where({ temporalGranularity: this.selectedTemporalGranularity, selected: true });
        },

        setSelectedGeographicLevel: function (geographicalLevel) {
            this.selectedGeographicalLevel = geographicalLevel;
        },

        getSelectedGeographicLevel: function () {
            if (this.selectedGeographicalLevel == null) {
                this.updateSelectedGeographicLevel();
            }
            return this.selectedGeographicalLevel;
        },

        updateSelectedGeographicLevel: function () {
            this.selectedGeographicalLevel = this.getDefaultLevel();
        },

        getSelectedGeographicLevels: function () {
            return _(this.getSelectedRepresentations()).invoke("get", "level");
        },

        getSelectedMunicipalities: function () {
            return this.getSelectedRepresentations().filter(representation => representation.get("geographicGranularityId") === "MUNICIPALITIES");
        },

        getDefaultLevel: function () {
            const selectedMunicipalities = this.getSelectedMunicipalities();
            if (selectedMunicipalities.length > 0) {
                return selectedMunicipalities[0].get("level");
            } else {
                return this._getMostRepeatedValue(this.getSelectedGeographicLevels());
            }
        },

        setSelectedTemporalGranularity: function(temporalGranularity) {
            this.selectedTemporalGranularity = temporalGranularity;
        },

        getSelectedTemporalGranularity: function () {
            if (this.selectedTemporalGranularity == null) {
                this.updateSelectedTemporalGranularityWithMostRepeatedValue();
            }
            return this.selectedTemporalGranularity;
        },

        updateSelectedTemporalGranularityWithMostRepeatedValue: function () {
            this.selectedTemporalGranularity = this._getMostRepeatedValue(this.getSelectedTemporalGranularities());
        },

        getSelectedTemporalGranularities: function () {
            return _(this.getSelectedRepresentations()).invoke("get", "temporalGranularity");
        },

        _getMostRepeatedValue: function (collection) {
            var countedBy = _(collection).countBy();
            var maxPopulation = _(countedBy).max();
            return _.invert(countedBy)[maxPopulation];
        },

    }, {
            initializeWithRepresentations: function (attributes, options) {
                var isGeographicDimension = attributes.type === "GEOGRAPHIC_DIMENSION";
                options['defaultSelectedValue'] = !isGeographicDimension;
                options['parse'] = true;
                var filterRepresentations = new App.modules.dataset.filter.models.FilterRepresentations(attributes.representations, options);
                filterRepresentations.initializeHierarchy();
                filterRepresentations._setSelectedGeographicDimension(attributes, options);
                return filterRepresentations;
            }
        });

}());