(function () {
    "use strict";
    // see org.siemac.metamac.portal.rest.common.export.v1_0.mapper.DatasetSelectionMapper#toStatisticalResourcesApiRepresentationParameter
    const GLOBAL_CHAR_LENGTH_URL_LIMIT = 2000;

    App.namespace('App.modules.dataset.DatasetDownloadView');

    var svgExporter = new App.svg.Exporter();

    App.modules.dataset.DatasetDownloadView = Backbone.View.extend({

        template: App.templateManager.get("dataset/dataset-download"),

        className: "dataset-download",

        events: {
            "click a.download-xlsx": function(event) { this.clickDownloadButton(event, 'xlsx'); },
            "click a.download-tsv": function(event) { this.clickDownloadButton(event, 'tsv'); },
            "click a.download-px": function(event) { this.clickDownloadButton(event, 'px'); },
            "click a.download-png": function(event) { this.clickDownloadButton(event, 'png'); },
            "click a.download-pdf": function(event) { this.clickDownloadButton(event, 'pdf'); },
            "click a.download-svg": function(event) { this.clickDownloadButton(event, 'svg'); },
        },

        initialize: function () {
            this.optionsModel = this.options.optionsModel;
            var self = this;
            this.pageshowListener = function () {
                self.optionsModel.set('isDownloading', false);
            };
            window.addEventListener("pageshow", this.pageshowListener);

            this.visualizationType = this.optionsModel.get('type');
            this.filterDimensions = this.options.filterDimensions;

            var datasetAllSelected = this.getDatasetSelection(false);
            var datasetSelectionObject = this.getDatasetSelection();

            this.datasetAllSelected = JSON.stringify(datasetAllSelected);
            this.datasetSelection = JSON.stringify(datasetSelectionObject);

            this.svg = null;
            this.urls = {
                xlsx: this._buildExportEndpoint('excel'),
                px: this._buildExportEndpoint('px'),
                png: App.endpoints["export"] + "/image" + this._getImageExportApiParams('png'),
                pdf: App.endpoints["export"] + "/image" + this._getImageExportApiParams('pdf'),
                svg: App.endpoints["export"] + "/image" + this._getImageExportApiParams('svg')
            };

            this._bindEvents();
        },

        _bindEvents: function () {
            this.listenTo(this.optionsModel, "change:isDownloading", this.render);

            this.delegateEvents();
        },

        render: function () {
            var datasetAllSelected = this.getDatasetSelection(false);
            var datasetSelectionObject = this.getDatasetSelection();
            var identifierUrlPart = this.filterDimensions.metadata.urlIdentifierPart();

            var context = {
                selection: JSON.stringify(datasetSelectionObject),
                allSelected: JSON.stringify(datasetAllSelected),
                url: {
                    tsv: App.endpoints["export"] + "/tsv" + identifierUrlPart,
                    excel: App.endpoints["export"] + "/excel" + identifierUrlPart,
                    px: App.endpoints["export"] + "/px" + identifierUrlPart
                },
                buttonConfig: this._getButtonConfiguration()
            };

            if (this._exportableImage()) {
                var self = this;
                svgExporter.addStyleAsync(svgExporter.sanitizeSvgElement($('svg'))).done(function (svg) {
                    var svgContext = {
                        svg: svg,
                        url: {
                            png: App.endpoints["export"] + "/image" + self._getImageExportApiParams('png'),
                            pdf: App.endpoints["export"] + "/image" + self._getImageExportApiParams('pdf'),
                            svg: App.endpoints["export"] + "/image" + self._getImageExportApiParams('svg')
                        }
                    };
                    _.extend(context, svgContext);
                    self.$el.html(self.template(context));
                });
            } else {
                this.$el.html(this.template(context));
            }
        },

        _exportableImage: function () {
            return $('svg').exists();
        },

        _getButtonConfiguration: function () {
            var visualizationSupertype = '';
            switch (this.visualizationType) {
                case '': // On selection mode
                case 'info':
                case 'table':
                    visualizationSupertype = 'data';
                    break;
                case 'map':
                case 'mapbubble':
                    visualizationSupertype = 'map';
                    break;
                default:
                    visualizationSupertype = 'graph';
                    break;
            }

            var haveDataFormats = visualizationSupertype == 'data';
            var haveMapFormats = visualizationSupertype == 'map' && false; // TODO: METAMAC-2033
            var haveImageFormats = _.contains(['graph', 'map'], visualizationSupertype) && this._exportableImage();
            var allDimensionsWithSelections = this.filterDimensions.getDimensionsWithoutSelections().length == 0;
            var isQuery = this.filterDimensions.metadata.identifier().type == "query";

            const param = this.toStatisticalResourcesApiRepresentationParameter(this.getDatasetSelection());
            const disableAllSelectionFormat = param && param.length > GLOBAL_CHAR_LENGTH_URL_LIMIT && visualizationSupertype === 'data';

            var disableAnyFormat = this.optionsModel.get('isDownloading');

            return {
                dataFormats: haveDataFormats,
                allDimensionsWithSelections: allDimensionsWithSelections,
                mapFormats: haveMapFormats,
                imageFormats: haveImageFormats,
                iconPreffix: visualizationSupertype,
                drawSelectionButtons: !isQuery || haveImageFormats, // TODO METAMAC-2709
                disableFormat: {
                    all: {
                        excel: disableAnyFormat,
                        tsv: disableAnyFormat,
                        px: disableAnyFormat,
                    },
                    selection: {
                        excel: disableAllSelectionFormat || disableAnyFormat,
                        tsv: disableAllSelectionFormat || disableAnyFormat,
                        px: disableAllSelectionFormat || disableAnyFormat,
                        infoMessage: disableAllSelectionFormat ? I18n.t("filter.download.selectionDisabled") : null
                    }
                }
            };
        },

        _getImageExportApiParams: function (type) {
            var identifier = this.filterDimensions.metadata.identifier();
            var filename = "chart" + "-" + identifier.agency + "-" + identifier.identifier + "-" + identifier.version; // IDEA Add visualization type to the name

            var mime = svgExporter.mimeTypeFromType(type);
            var params = '?';
            params += 'filename=' + encodeURIComponent(filename);
            params += '&type=' + encodeURIComponent(mime);
            params += '&width=' + $('svg').width();
            params += '&scale=2';

            return params;
        },

        getDatasetSelection: function (includeSelectedCategories = true) {
            var result = {
                dimensions: {
                    dimension: []
                }
            };
            var selection = this.filterDimensions.exportJSONSelection();

            var self = this;
            _.each(selection, function (dimension, dimensionId) {
                const selectedIds = self.getSelectedDimensionCategoriesIds(dimension.categories);
                const totalCategories = dimension.categories.length;
                const selectedCount = selectedIds.length;
                const selectedDimension = {
                    dimensionId: dimensionId,
                    labelVisualisationMode: dimension.visibleLabelType,
                    position: dimension.position,
                    reversed: dimension.reversed
                };

                // Only include if some (but not all) are selected
                if (includeSelectedCategories && selectedCount > 0 && selectedCount < totalCategories) {
                    selectedDimension.dimensionValues = {
                        dimensionValue: selectedIds
                    };
                }
                result.dimensions.dimension.push(selectedDimension);
            });

            if (result.dimensions.dimension.length === 0) {
                return this.getEmptyDatasetSelection();
            }

            return {datasetSelection: result};
        },

        getSelectedDimensionCategoriesIds: function (categories) {
            var selectedCategoriesIds = [];
            _.each(categories, function(category) {
                if (category.selected) {
                    selectedCategoriesIds.push(category.id);
                }
            });
            return selectedCategoriesIds;
        },

        // Empty selection returns all
        getEmptyDatasetSelection: function () {
            return { datasetSelection: null };
        },

        // see org.siemac.metamac.portal.rest.common.export.v1_0.mapper.DatasetSelectionMapper.toStatisticalResourcesApiRepresentationParameter
        toStatisticalResourcesApiRepresentationParameter: function (exportationBody) {
            if (!exportationBody) {
                return null;
            }
            const datasetSelection = exportationBody.datasetSelection;
            if (!datasetSelection || !datasetSelection.dimensions || !datasetSelection.dimensions.dimension) {
                return null;
            }
            const dimensions = datasetSelection.dimensions.dimension;

            let sb = '';
            for (const dimension of dimensions) {
                sb += dimension.dimensionId;
                sb += '[';

                if (dimension.dimensionFilters) {
                    const dimensionFilters = dimension.dimensionFilters;
                    if (dimensionFilters.after) {
                        sb += `~after=${dimensionFilters.after}|`;
                    }
                    if (dimensionFilters.last) {
                        sb += `~last=${dimensionFilters.last}|`;
                    }
                    if (dimensionFilters.range) {
                        sb += `~range=${dimensionFilters.range.start};${dimensionFilters.range.end}|`;
                    }
                }
                if (dimension.dimensionValues && dimension.dimensionValues.dimensionValue && dimension.dimensionValues.dimensionValue.length > 0) {
                    sb += dimension.dimensionValues.dimensionValue.join('|');
                }
                if (sb.charAt(sb.length - 1) === '|') {
                    sb = sb.slice(0, -1); // delete last |
                }

                sb += ']';
                sb += ':';
            }
            if (sb.charAt(sb.length - 1) === ':') {
                sb = sb.slice(0, -1); // delete last :
            }

            return sb;
        },

        _buildExportEndpoint: function(type, additionalParams) {
            var exportEndpoint = new URL(App.endpoints["export"] + "/" + type + this.filterDimensions.metadata.urlIdentifierPart());
            additionalParams = _.extend({}, additionalParams, { lang: I18n.locale });
            _.each(additionalParams, function(value,key) {
                exportEndpoint.searchParams.append(key, value);
            });
            return exportEndpoint;
        },

        _showExportTsvAttributesConfig: function (callback) {
            var self = this;
            var modalContentView = new App.components.modal.ConfirmationModalView({
                question: I18n.t("filter.download.attributes.modal.question"),
                onConfirm: function() {
                    callback(self._buildExportEndpoint('tsv'), ".zip");
                    self.modal.close();
                },
                onReject: function() {
                    callback(self._buildExportEndpoint('tsv', { fields: '-attributes' }), "-observations.tsv");
                    self.modal.close();
                }
            });
            var title = I18n.t("filter.download.attributes.modal.title");
            this.modal = new App.components.modal.ModalView({ title: title, contentView: modalContentView });
            this.modal.show();
        },

        clickDownloadButton: function (e, type) {
            e.preventDefault();
            var $currentTarget = $(e.currentTarget);
            if ($currentTarget.hasClass('disabled')) {
                return;
            }

            var jsonBody = $currentTarget.hasClass('selection') ? this.datasetSelection : this.datasetAllSelected;
            var xlsxCsvAndTsvFilenameSuffix = $currentTarget.hasClass('selection') ? "-selection" : "";
            switch (type) {
                case "tsv":
                    var self = this;
                    this._showExportTsvAttributesConfig(function (url, suffixAndFileExtension) {
                        self.downloadFile('POST', url, { jsonBody: jsonBody }, xlsxCsvAndTsvFilenameSuffix + suffixAndFileExtension);
                    });
                    break;
                case "xlsx":
                case "px":
                    this.downloadFile('POST', this.urls[type], { jsonBody: jsonBody }, xlsxCsvAndTsvFilenameSuffix + "." + type);
                    break;
                case "png":
                case "pdf":
                case "svg":
                    this.downloadFile('POST', this.urls[type], { svg: $currentTarget.data("svg") }, "." + type, "chart");
                    break;
            }
        },

        downloadFile: function (requestMethod, url, requestParams, suffixAndFileExtension, filenameCustomPrefix) {
            this.optionsModel.set('isDownloading', true);

            var xhr = new XMLHttpRequest();
            xhr.open(requestMethod, url, true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('api-key', App.config["apiKey"]);
            xhr.responseType = 'arraybuffer';

            var self = this;
            xhr.onload = function () {
                if (this.status === 200) {
                    var blob = new Blob([this.response], { type: xhr.getResponseHeader('Content-Type') });
                    var filename = self._getFilenameFromContentDisposition(xhr);
                    if (!filename) {
                        filename = self._getFilenameFromIdentifier(suffixAndFileExtension, filenameCustomPrefix);
                    }
                    self._downloadFileInBrowserFromBlob(blob, filename);
                }
            };
            xhr.onloadend = function () {
                self.optionsModel.set('isDownloading', false);
            };
            xhr.ontimeout = xhr.onloadend;
            xhr.send(new URLSearchParams(requestParams));
        },

        _getFilenameFromContentDisposition: function (xhr) {
            var disposition = xhr.getResponseHeader('Content-Disposition');
            if (disposition && disposition.indexOf('attachment') !== -1) {
                var filenameRegex = /filename[^\w;=\n]*=((['"]).*?\2|[^;\n]*)/;
                var filenameMatches = filenameRegex.exec(disposition);
                if (filenameMatches != null && filenameMatches[1]) { return filenameMatches[1].replace(/['"]/g, ''); }
            }
            return "";
        },

        _getFilenameFromIdentifier: function (suffixAndFileExtension, customPrefix) {
            var identifier = this.filterDimensions.metadata.identifier();
            return [customPrefix ? customPrefix : identifier.type, identifier.agency, identifier.identifier, identifier.version].join("-").replace(".", "_") + suffixAndFileExtension;
        },

        _downloadFileInBrowserFromBlob: function (blob, filename) {
            var downloadUrl = window.URL.createObjectURL(blob);

            var a = $('a#blob-download-anchor')[0];
            if (!a) {
                a = document.createElement("a");
                a.id = "blob-download-anchor";
                document.body.appendChild(a);
            }

            if (typeof a.download === 'undefined') {
                window.location = downloadUrl;
            } else {
                a.href = downloadUrl;
                a.download = filename;
                a.click();
            }

            setTimeout(function () {
                window.URL.revokeObjectURL(downloadUrl);
            }, 150);
        },

        exportApiCall: function (exportType) {
            var identifier = this.filterDimensions.metadata.identifier();
            var url = App.endpoints["export"] + "/" + exportType + "/" + identifier.agency + "/" + identifier.identifier + "/" + identifier.version;
            var selection = this.getDatasetSelection();

            var downloadRequest = $.ajax({
                url: url,
                method: "POST",
                data: JSON.stringify(selection),
                contentType: "application/json; charset=utf-8"
            });

            downloadRequest.done(function (response) {
                console.log(response);
            });
        }


    });

}());