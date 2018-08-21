(function () {
    "use strict";

    App.namespace('App.modules.dataset.filter.models.FilterDimension');

    var FilterRepresentation = App.modules.dataset.filter.models.FilterRepresentation;

    App.modules.dataset.filter.models.FilterDimension = Backbone.Model.extend({

        defaults: {
            zone: undefined,
            filterQuery: '',
            filterLevel: undefined,
            open: false,
            visibleLabelType: FilterRepresentation.VISIBLE_LABEL_TYPES.LABEL,
            reversed: false
        },

        initialize: function () {
            this._bindEvents();
        },

        isFixedDimension: function () {
            if (this.get('zone')) {
                return this.get('zone').isFixed();
            } else {
                return false;
            }
        },

        isTimeDimension: function () {
            return this.get("type") === "TIME_DIMENSION";
        },

        _bindEvents: function () {
            this.listenTo(this, 'change:filterQuery', this._onChangeFilterQuery);
            this.listenTo(this, 'change:filterLevel', this._onChangeFilterLevel);
            this.listenTo(this, "change:visibleLabelType", this._onChangeVisibleLabelType);
            this.listenTo(this.get("representations"), "reverse", this._onReverse);
        },

        _unbindEvents: function () {
            this.stopListening();
        },

        _onReverse: function () {
            this.toggle('reversed');
            this.trigger("reverse");
        },

        removeFromZone: function () {
            var zone = this.get('zone');
            if (zone) {
                zone.remove(this);
            }
        },

        parse: function (attributes, options) {
            attributes.representations = App.modules.dataset.filter.models.FilterRepresentations.initializeWithRepresentations(attributes, options);
            attributes.representations.on('all', this._onRepresentationEvent, this);
            return attributes;
        },

        _onRepresentationEvent: function (event, model, collection, options) {
            // Don´t propagate this one from children to parents again, it´s already propagated from parent to children
            if (event != "change:visibleLabelType") {
                this.trigger.apply(this, arguments);
            }
        },

        _cleanFilterQuery: function (query) {
            return s.trim(s.cleanDiacritics(query).toLowerCase());
        },

        _onChangeFilterQuery: function () {
            this.set('filterLevel', this.defaults.filterLevel, { silent: true });

            var filterQuery = this._cleanFilterQuery(this.get('filterQuery'));
            var filterQueryLength = filterQuery.length;

            var representations = this.get('representations');
            representations.each(function (model) {
                model.set({ open: false }, { trigger: false });
            });

            var setObject = {};
            var visibleModels = [];
            representations.each(function (model) {
                var matchIndex = this._cleanFilterQuery(model.get('label')).indexOf(filterQuery);
                var match = matchIndex !== -1;

                if (match) {
                    setObject[model.id] = { id: model.id, visible: true, matchIndexBegin: matchIndex, matchIndexEnd: matchIndex + filterQueryLength };
                    visibleModels.push(model);
                } else {
                    setObject[model.id] = { id: model.id, visible: false, matchIndexBegin: undefined, matchIndexEnd: undefined };
                }
            }, this);

            _.each(visibleModels, function (model) {
                var parentId = model.get('parent');
                while (parentId) {
                    var parent = representations.get(parentId);
                    setObject[parent.id].open = true;
                    setObject[parent.id].visible = true;
                    parentId = parent.get('parent');
                }
            }, this);

            representations.each(function (model) {
                model.set(setObject[model.id]);
            });
        },

        _onChangeFilterLevel: function () {
            this.stopListening(this, 'change:filterQuery', this._onChangeFilterQuery); //unbind to not trigger _onChangeFilterQuery
            this.set('filterQuery', this.defaults.filterQuery);
            this.listenTo(this, 'change:filterQuery', this._onChangeFilterQuery);

            var filterLevel = this.get('filterLevel');
            var representations = this.get('representations');
            if (_.isUndefined(filterLevel)) {
                representations.invoke('set', { visible: true, open: true })
            } else {
                representations.each(function (model) {
                    var level = model.get('level');
                    var visible = level === filterLevel;
                    if (visible) {
                        model.set({ visible: true, open: false, matchIndexBegin: undefined, matchIndexEnd: undefined });
                    } else {
                        model.set({ visible: false, matchIndexBegin: undefined, matchIndexEnd: undefined });
                    }
                });
            }
        },

        getMaxHierarchyLevel: function () {
            var maxLevelModel = this.get('representations').max(function (model) {
                return model.get('level');
            });
            return maxLevelModel.get('level');
        },

        _onChangeVisibleLabelType: function () {
            var visibleLabelType = this.get("visibleLabelType");
            var representations = this.get("representations");
            representations.each(function (representation) {
                representation.set("visibleLabelType", visibleLabelType);
            });
        },

        getSelectedRepresentations: function () {
            return this.get('representations').getSelectedRepresentations();
        },

        getDrawableRepresentations: function () {
            return this.get('representations').getDrawableRepresentations();
        }


    });

    _.extend(App.modules.dataset.filter.models.FilterDimension.prototype, App.mixins.ToggleModel);

}());