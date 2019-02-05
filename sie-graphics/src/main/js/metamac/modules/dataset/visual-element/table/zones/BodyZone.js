(function () {
    "use strict";

    var Cell = App.Table.Cell,
        Size = App.Table.Size,
        Point = App.Table.Point,
        Utils = App.Table.Utils,
        Rectangle = App.Table.Rectangle;

    App.namespace("App.Table.BodyZone");

    App.Table.BodyZone = function (options) {
        App.Table.Zone.prototype.initialize.apply(this, arguments);
        this.initialize(options);
    };

    App.Table.BodyZone.prototype = {
        initialize: function (options) {
            if (!options) {
                options = {};
            }
            this.dataSource = options.dataSource;
            this.delegate = options.delegate;
            this.view = options.view;
            this.calculateIncrementalSize();
        },

        // Calcula en que posición empieza cada una de las filas y columnas
        // y el tamaño total
        calculateIncrementalSize: function () {
            if (this.dataSource && this.delegate) {
                var self = this;
                var rowsLen = this.dataSource.rows(),
                    columnsLen = this.dataSource.columns();

                var rows = Utils.acumulate(rowsLen, function (row) {
                    return self.delegate.rowHeight(row);
                });
                var columns = Utils.acumulate(columnsLen, function (column) {
                    return self.delegate.columnWidth(column);
                });

                this.incrementalCellSize = {
                    rows: rows,
                    columns: columns
                };

                var widthTotal = columns[columns.length - 1];
                var heightTotal = rows[rows.length - 1];

                this.setSize(new Size(widthTotal, heightTotal));
            }
        },

        // Calcula la primera celda visible (en la esquina superior izquierda)
        firstCell: function () {
            var x = Utils.floorIndex(this.incrementalCellSize.columns, this.origin.x),
                y = Utils.floorIndex(this.incrementalCellSize.rows, this.origin.y);

            return new Cell(x, y);
        },

        cell2AbsolutePoint: function (cell) {
            var x = this.incrementalCellSize.columns[cell.x],
                y = this.incrementalCellSize.rows[cell.y];
            return new Point(x, y);
        },

        cellAtPoint: function (point) {
            return this.relativePoint2Cell(point);
        },

        // IDEA: Improve implementation. It is not so transparent METAMAC-2282
        relativePoint2Cell: function (point) {
            var absolutePoint = this.relativePoint2AbsolutePoint(point);
            var x = Utils.floorIndex(this.incrementalCellSize.columns, absolutePoint.x),
                y = Utils.floorIndex(this.incrementalCellSize.rows, absolutePoint.y);
            y -= this.dataSource.blankRowsOffset(y);
            return new Cell(x, y);
        },

        // IDEA: Improve implementation. It is not so transparent METAMAC-2282
        absolutePoint2Cell: function (absolutePoint) {
            var point = this.relativePoint2AbsolutePoint(new Point(absolutePoint.x, absolutePoint.y))
            var x = Utils.floorIndex(this.incrementalCellSize.columns, point.x),
                y = Utils.floorIndex(this.incrementalCellSize.rows, point.y);
            y -= this.dataSource.blankRowsOffset(y);
            return new Cell(x, y);
        },

        cellSize: function (cell) {
            var width = this.delegate.columnWidth(cell.x);
            var height = this.delegate.rowHeight(cell.y);
            return new Size(width, height);
        },

        isCellVisible: function (cell) {
            if (!this.dataSource.cellExists(cell)) {
                return false;
            }
            var size = this.cellSize(cell);
            var topLeft = this.absolutePoint2RelativePoint(this.cell2AbsolutePoint(cell));

            var cellRectangle = new Rectangle(topLeft, size);
            return this.isRelativeRectangleVisible(cellRectangle);
        },

        visibleRowsAndColumns: function () {
            var xVisible = true,
                yVisible = true;
            var firstCell = this.firstCell();

            var xCell = firstCell.clone();
            while (xVisible) {
                xCell.x = xCell.x + 1;
                xVisible = this.isCellVisible(xCell);
            }

            var yCell = firstCell.clone();
            while (yVisible) {
                yCell.y = yCell.y + 1;
                yVisible = this.isCellVisible(yCell);
            }
            return {
                rows: {
                    begin: firstCell.y,
                    end: yCell.y
                },
                columns: {
                    begin: firstCell.x,
                    end: xCell.x
                }
            };
        },

        paintInfo: function () {
            var xVisible = true,
                yVisible = true;

            var totalRows = this.dataSource.rows();
            var totalColumns = this.dataSource.columns();

            var firstCell = this.firstCell();
            var firstCellPoint = this.absolutePoint2RelativePoint(this.cell2AbsolutePoint(firstCell));
            var firstCellSize = this.cellSize(firstCell);

            var columns = [], rows = [];

            var j = firstCell.x;
            var x = firstCellPoint.x;
            var size;

            while (xVisible && j < totalColumns) {
                size = this.delegate.columnWidth(j);

                columns.push({
                    x: x,
                    index: j,
                    width: size
                });

                j = j + 1;
                x = x + size;

                xVisible = this.isRelativeRectangleVisible(new Rectangle(x, firstCellPoint.y, size, firstCellSize.height));
            }

            var i = firstCell.y;
            var y = firstCellPoint.y;

            // IndexCell to account for the difference that blank rows add
            var indexCell = i - this.dataSource.blankRowsOffset(firstCell.y);
            while (yVisible && i < totalRows) {
                size = this.delegate.rowHeight(i);

                rows.push({
                    y: y,
                    index: i,
                    indexCell: indexCell,
                    height: size,
                    blank: this.dataSource.isBlankRow(i)
                });

                if (!this.dataSource.isBlankRow(i)) {
                    indexCell++;
                }

                i = i + 1;
                y = y + size;

                yVisible = this.isRelativeRectangleVisible(new Rectangle(firstCellPoint.x, y, firstCellSize.width, size));
            }

            return {
                rows: rows,
                columns: columns
            };
        },

        repaint: function () {
            this.clear();
            this.ctx.save();

            this.ctx.beginPath();
            this.ctx.rect(this.viewPort.x, this.viewPort.y, this.viewPort.width, this.viewPort.height);
            this.ctx.clip();

            var limits = this.visibleRowsAndColumns();
            var paintInfo = this.paintInfo();

            this.paintCells(paintInfo);

            this.ctx.restore();
            this.needRepaint = false;
        },

        getPaintInfoRowCell: function (y) {
            var nonBlankRows = _(this.paintInfo().rows)
                .filter(function (row) {
                    return !row.blank;
                });
            return nonBlankRows[y];
        },

        paintCells: function (paintInfo) {
            var x, y, bgColor, i, j;

            this.ctx.textAlign = "right";
            this.ctx.font = this.delegate.style.bodyCell.font;
            this.ctx.textBaseline = "middle";
            this.ctx.strokeStyle = this.delegate.style.bodyCell.border.color;

            var marginRight = this.delegate.style.bodyCell.margin.right;

            for (j = 0; j < paintInfo.columns.length; j++) {
                var column = paintInfo.columns[j];
                for (i = 0; i < paintInfo.rows.length; i++) {
                    var row = paintInfo.rows[i];
                    var cell = new Cell(column.index, row.indexCell);
                    var point = new Point(column.x, row.y);
                    var size = new Size(column.width, row.height);

                    this.ctx.beginPath();
                    this.ctx.rect(point.x, point.y, size.width, size.height);
                    if (_.isFunction(this.delegate.style.bodyCell.background)) {
                        bgColor = this.delegate.style.bodyCell.background(cell, this.view);
                    } else {
                        bgColor = this.delegate.style.bodyCell.background;
                    }
                    this.ctx.fillStyle = bgColor;
                    this.ctx.fill();
                    this.ctx.closePath();

                    var isLastRow = i == (paintInfo.rows.length - 1);
                    if (isLastRow) {
                        this.ctx.beginPath();
                        this.ctx.lineWidth = this.delegate.style.bodyCell.border.width;
                        this.ctx.moveTo(point.x - 1, point.y + size.height);
                        this.ctx.lineTo(point.x + size.width, point.y + size.height);
                        this.ctx.stroke();
                    }

                    var value = "";
                    if (!row.blank) {
                        value = this.dataSource.cellAtIndex(cell);

                        if (_.isFunction(this.delegate.format)) {
                            value = this.delegate.format(value);
                        }

                        if (this.dataSource.cellHasPrimaryAttributes(cell)) {
                            this.ctx.beginPath();
                            var marginMark = this.delegate.style.attributeCellMark.margin;
                            var sizeMark = this.delegate.style.attributeCellMark.size;
                            this.ctx.moveTo(point.x + size.width - marginMark, point.y + size.height - marginMark);
                            this.ctx.lineTo(point.x + size.width - marginMark - sizeMark, point.y + size.height - marginMark);
                            this.ctx.lineTo(point.x + size.width - marginMark, point.y + size.height - marginMark - sizeMark);
                            this.ctx.fillStyle = this.delegate.style.attributeCellMark.background;
                            this.ctx.fill();
                            this.ctx.closePath();
                        }
                    }

                    if (value !== undefined) {
                        this.ctx.fillStyle = this.delegate.style.bodyCell.color;
                        this.ctx.fillText(value, point.x + size.width - marginRight, point.y + size.height / 2);
                    }
                }
            }
        },

        cellInfoAtPoint: function (absolutePoint) {
            var bodyCellAtPoint = this.absolutePoint2Cell(absolutePoint);
            if (bodyCellAtPoint) {
                return this.delegate.formatCellInfo(this.dataSource.cellInfoAtIndex(bodyCellAtPoint));
            }
        }

    }

    _.defaults(App.Table.BodyZone.prototype, App.Table.Zone.prototype);
}());

