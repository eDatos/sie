(function () {
    "use strict";

    var Constants = App.Constants;

    App.namespace("App.Table.Delegate");

    App.Table.Delegate = function () {
        this.size = new App.Table.Size(150, 25);
        this.minSize = new App.Table.Size(50, 25);

        this.scrollSize = 10;
        this.spinnerSize = new App.Table.Size(70, 30);

        this.style = {
            bodyCell: {
                font: Constants.font.body.size + " " + Constants.font.family.sansSerif,
                color: Constants.colors.istacBlack,
                background: function (cell, view) {
                    if (view.isCellClicked(cell)) {
                        return Constants.colors.istacGreyMedium;
                    }

                    var isRowSelected = view.isSelectionActive({ rowsCells: [cell.y] });
                    var isColumnSelected = view.isSelectionActive({ columns: [cell.x] });

                    if (isRowSelected && isColumnSelected) {
                        return Constants.colors.istacGreyLight;
                    } else if (isRowSelected || isColumnSelected) {
                        return Constants.colors.istacGreyLight;
                    }
                    return Constants.colors.istacWhite;
                },
                border: {
                    color: Constants.colors.istacGreyMedium,
                    width: 0.5,
                    horizontal: true,
                    vertical: false
                },
                margin: {
                    right: 5
                }
            },
            headerCell: {
                font: {
                    mainLevel: "Bold " + Constants.font.body.size + " " + Constants.font.family.sansSerif,
                    secondLevel: "Bold " + Constants.font.body.size + " " + Constants.font.family.sansSerif,
                    default: Constants.font.body.size + " " + Constants.font.family.sansSerif,
                },
                color: Constants.colors.istacBlack,
                background: function (current, view, cell) {
                    if (view.isCellClicked(cell)) {
                         return Constants.colors.istacGreyMedium;
                    }
                    if (view.isSelectionActive(current)) {
                        return Constants.colors.istacGreyLight;
                    } else {
                        return Constants.colors.istacWhite;
                    }
                },
                border: {
                    color: {
                        default: Constants.colors.istacGreyMedium,
                        mainLevel: Constants.colors.istacBlueMedium
                    },
                    width: {
                        default: 1,
                        mainLevel: 2
                    }
                },
                shadow: {
                    show: false,
                    color: "rgba(0, 0, 0, 0.2)",
                    blur: "10",
                    offset: 1
                },
                margin: {
                    right: 5,
                    left: 5
                }
            },
            attributeCellMark: {
                background: Constants.colors.istacGreyMedium,
                margin: 2,
                size: 5
            },
            scroll: {
                color: function (scroll, view) {
                    if (view.mouseZone && view.mouseZone.indexOf(scroll) !== -1) {
                        return Constants.colors.istacBlueMedium;
                    } else if (view.lastClickZone && view.lastClickZone.indexOf(scroll) !== -1) {
                        return Constants.colors.istacBlueMedium;
                    } else {
                        return Constants.colors.istacGreyMedium;
                    }
                },
                minSize: 30,
                lineWidth: 7
            }
        };

        this.columnWidthOffsets = [];
        this.leftHeaderColumnWidthOffsets = [];
    };

    App.Table.Delegate.prototype = {

        rowHeight: function (row) {
            //return row % 2 === 0 ? 60 : 100;
            return this.size.height;
        },

        columnWidth: function (column) {
            var offset = this.columnWidthOffsets[column];
            var columnWidth = _.isUndefined(offset) ? this.size.width : this.size.width + offset;
            var validColumnWidth = columnWidth < this.minSize.width ? this.minSize.width : columnWidth;
            return validColumnWidth;
        },

        leftHeaderColumnWidth: function (leftHeaderColumn, view) {
            //var size = view.getSize();
            //var defaultWidth = size.width > 800 ? 200 : 100; //responsive
            var defaultWidth = 100;
            var offset = this.leftHeaderColumnWidthOffsets[leftHeaderColumn];
            var leftHeaderColumnWidth = _.isUndefined(offset) ? defaultWidth : defaultWidth + offset;
            return leftHeaderColumnWidth < this.minSize.width ? this.minSize.width : leftHeaderColumnWidth;
        },

        topHeaderRowHeight: function (topHeaderRow, view) {
            return 25;
        },

        _isNumber: function (string) {
            var floatValue = parseFloat(string);
            return !_.isNaN(floatValue);
        },

        format: function (value) {
            return value;
        },

        formatCellInfo: function (cellInfo) {
            var formattedCellAttributes = this.formatCellAttributes(cellInfo.attributes);

            var template = App.templateManager.get("dataset/dataset-cell-info");
            var context = {
                primaryMeasureAttributes: formattedCellAttributes ? formattedCellAttributes.primaryMeasureAttributes : undefined,
                combinatedDimensionsAttributes: formattedCellAttributes ? formattedCellAttributes.combinatedDimensionsAttributes : undefined,
                categories: cellInfo.categories,
                hasAttributes: formattedCellAttributes && (formattedCellAttributes.primaryMeasureAttributes.length || formattedCellAttributes.combinatedDimensionsAttributes.length)
            }
            return template(context);
        },

        formatCellAttributes: function (attributes) {
            if (attributes) {
                return {
                    primaryMeasureAttributes: _(_.compact(attributes.primaryMeasureAttributes)).map(this.formatAttribute),
                    combinatedDimensionsAttributes: _(_.compact(attributes.combinatedDimensionsAttributes)).map(this.formatAttribute)
                }
            }
        },

        formatHeaderInfo: function (headerInfo) {
            var template = App.templateManager.get("dataset/dataset-header-info");
            var context = {
                title: headerInfo.title,
                description: headerInfo.description,
                attributes: this.formatHeaderAttributes(_.pluck(headerInfo.attributes, 'value'))
            }
            return template(context);
        },

        formatHeaderAttributes: function (attributes) {
            return _(_.compact(attributes))
                .map(this.formatAttribute);
        },


        formatAttribute: function (attribute) {
            if (!attribute.href) {
                // It´s more efficient to replace it here on demand than replacing all the attributes on lower levels
                return attribute.replace(" \\| ", " | ");
            }
            return attribute;
        },

        resizableColumns: function () {
            return true;
        },

        resizeColumnWidth: function (separatorIndex, offset) {
            var columnIndex = separatorIndex - 1;
            if (_.isUndefined(this.columnWidthOffsets[columnIndex])) {
                this.columnWidthOffsets[columnIndex] = offset;
            } else {
                this.columnWidthOffsets[columnIndex] = this.columnWidthOffsets[columnIndex] + offset;
            }
        },

        resizeLeftHeaderColumnWidth: function (leftHeaderColumn, offset) {
            var columnIndex = leftHeaderColumn - 1;
            if (_.isUndefined(this.leftHeaderColumnWidthOffsets[columnIndex])) {
                this.leftHeaderColumnWidthOffsets[columnIndex] = offset;
            } else {
                this.leftHeaderColumnWidthOffsets[columnIndex] += offset;
            }
        }

    };

}());





