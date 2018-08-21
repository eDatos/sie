module.exports = (grunt) ->
    _ = require('underscore')
    path = require('path')

    grunt.loadNpmTasks 'grunt-contrib-less'
    grunt.loadNpmTasks 'grunt-contrib-handlebars'
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-contrib-connect'
    grunt.loadNpmTasks 'grunt-open'
    grunt.loadNpmTasks 'grunt-mocha'
    grunt.loadNpmTasks 'grunt-contrib-concat'
    grunt.loadNpmTasks 'grunt-contrib-copy'
    grunt.loadNpmTasks 'grunt-contrib-clean'
    grunt.loadNpmTasks 'grunt-webfont'
    grunt.loadNpmTasks 'grunt-zip'
    grunt.loadNpmTasks 'grunt-package'

    paths = {}
    paths.theme = 'src/main'
    paths.less = paths.theme + '/less'
    paths.lib = paths.theme + '/js/libs'
    paths.templates = paths.theme + "/js/metamac/templates"
    paths.js = "src/main/js"
    paths.modules = paths.js + "/metamac/modules"
    paths.assets = "target"

    modules =
        metamac:
            src: [
                # Polyfills
                # paths.lib + "/polyfills/es5-shim.js"
                paths.lib + "/polyfills/addEventListener-polyfill.js"
                paths.lib + "/polyfills/console-shim.js"
                paths.lib + "/CFInstall.min.js"

                # External libs
                paths.lib + "/jquery-1.9.0.js"
                paths.lib + "/jquery-ui.js"
                paths.lib + "/i18n.js"
                paths.lib + "/underscore.js"
                paths.lib + "/underscore.string.js"
                paths.lib + "/backbone.js"
                paths.lib + "/backbone.marionette.js"
                paths.lib + "/backbone.wreqr.js"
                paths.lib + "/handlebars.runtime.js"
                paths.lib + "/jquery.dotdotdot-1.5.0-packed.js"
                paths.lib + "/async.js"
                paths.js + "/metamac/App.js"
                paths.js + "/metamac/libs/HandlebarsHelpers.js"
                paths.js + "/metamac/templates/HandlebarsTemplates.js"
                paths.js + "/metamac/modules/TemplateManager.js"
                paths.js + "/libs/highmaps.js"
                paths.js + "/libs/highmaps.no-conflict.js"
                paths.js + "/libs/highcharts.js"
                paths.js + "/libs/jquery.mousewheel.js"
                paths.js + "/libs/jquery.ba-resize.js"
                paths.js + "/libs/perfect-scrollbar.jquery.js"
                paths.js + "/libs/select2.min.js"

                # Metamac libs
                paths.js + "/metamac/libs/i18n.js"
                paths.js + "/metamac/libs/DB.js"

                paths.js + "/metamac/libs/BrowsersCompatibility.js"
                paths.js + "/metamac/libs/jQueryUtils.js"

                paths.js + "/metamac/libs/Constants.js"
                paths.js + "/metamac/libs/Helpers.js"
                
                paths.js + "/metamac/mixins/ToggleModel.js"

                paths.js + "/metamac/Controller.js"
                paths.js + "/metamac/AppRouter.js"

                # svg
                paths.js + "/metamac/modules/svg/Exporter.js"
                paths.js + "/metamac/modules/svg/SVGNode.js"

                # translations
                paths.js + "/metamac/translations/es.js"
                paths.js + "/metamac/translations/en.js"
                paths.js + "/metamac/translations/pt.js"

                # DATASET MODULE
                paths.modules + "/dataset/DatasetPermalink.js"
                paths.modules + "/dataset/PermalinkBuilder.js"
                paths.modules + "/dataset/DatasetActionsView.js"
                paths.modules + "/dataset/DatasetExportView.js"
                paths.modules + "/dataset/DatasetView.js"
                paths.modules + "/dataset/OptionsModel.js"
                paths.modules + "/dataset/OptionsView.js"
                paths.modules + "/dataset/FiltersModel.js"
                paths.modules + "/dataset/FiltersView.js"
                paths.modules + "/dataset/DimensionsView.js"
                paths.modules + "/dataset/DatasetInfoView.js"
                paths.modules + "/dataset/DatasetVisualizationView.js"
                paths.modules + "/dataset/DatasetShareView.js"
                paths.modules + "/dataset/DatasetDownloadView.js"
                paths.modules + "/dataset/DatasetEmbedView.js"

                # data
                paths.js + "/metamac/modules/dataset/model/data/Attributes.js"
                paths.js + "/metamac/modules/dataset/model/data/ApiResponse.js"
                paths.js + "/metamac/modules/dataset/model/data/ApiIndicatorResponseToApiResponse.js"
                paths.js + "/metamac/modules/dataset/model/data/ApiRequest.js"
                paths.js + "/metamac/modules/dataset/model/data/ApiDatasetRequest.js"
                paths.js + "/metamac/modules/dataset/model/data/ApiIndicatorRequest.js"
                paths.js + "/metamac/modules/dataset/model/StructuralResourcesApi.js"
                paths.js + "/metamac/modules/dataset/model/data/NumberFormatter.js"
                paths.js + "/metamac/modules/dataset/model/data/BigDataCacheBlock.js"
                paths.js + "/metamac/modules/dataset/model/data/BigDataCache.js"
                paths.js + "/metamac/modules/dataset/model/data/BigData.js"
                paths.js + "/metamac/modules/dataset/model/data/Data.js"
                paths.js + "/metamac/modules/dataset/model/Dataset.js"
                paths.js + "/metamac/modules/dataset/model/Metadata.js"

                # components
                paths.js + "/metamac/components/tooltip/Tooltip.js"
                paths.js + "/metamac/components/scrollbuttons/Scrollbuttons.js"
                paths.js + "/metamac/components/sidebar/SidebarStateModel.js"
                paths.js + "/metamac/components/sidebar/SidebarView.js"
                paths.js + "/metamac/components/searchbar/SearchbarView.js"
                paths.js + "/metamac/components/accordion/AccordionView.js"
                paths.js + "/metamac/components/accordion/AccordionItemView.js"
                paths.js + "/metamac/components/select/SelectView.js"
                paths.js + "/metamac/components/toggleable/ToggleableView.js"
                paths.js + "/metamac/components/modal/ModalView.js"

                # filters
                paths.js + "/metamac/modules/dataset/filter/FilterOptionsDimensionRestriction.js"
                paths.js + "/metamac/modules/dataset/filter/FilterOptionsTable.js"
                paths.js + "/metamac/modules/dataset/filter/FilterOptions.js"


                paths.js + "/metamac/modules/dataset/filter/models/FilterTableInfo.js",
                paths.js + "/metamac/modules/dataset/filter/models/FilterZone.js",
                paths.js + "/metamac/modules/dataset/filter/models/FilterZones.js",
                paths.js + "/metamac/modules/dataset/filter/models/FilterRepresentation.js",
                paths.js + "/metamac/modules/dataset/filter/models/FilterRepresentations.js",
                paths.js + "/metamac/modules/dataset/filter/models/FilterDimension.js",
                paths.js + "/metamac/modules/dataset/filter/models/FilterDimensions.js"

                paths.js + "/metamac/modules/dataset/filter/popup/Filter-dimension-view.js"
                paths.js + "/metamac/modules/dataset/filter/popup/Filter-view.js"

                paths.js + "/metamac/modules/dataset/filter/sidebar/FilterSidebarCategoryView.js"
                paths.js + "/metamac/modules/dataset/filter/sidebar/FilterSidebarDimensionActionsView.js"
                paths.js + "/metamac/modules/dataset/filter/sidebar/FilterSidebarDimensionView.js"
                paths.js + "/metamac/modules/dataset/filter/sidebar/FilterSidebarMultidatasetView.js"
                paths.js + "/metamac/modules/dataset/filter/sidebar/FilterSidebarMultidatasetNodeView.js"
                paths.js + "/metamac/modules/dataset/filter/sidebar/FilterSidebarView.js"
                paths.js + "/metamac/modules/dataset/filter/sidebar/OrderSidebarView.js"

                # visual elements
                paths.js + "/metamac/modules/dataset/visual-element/Base.js"
                paths.js + "/metamac/modules/dataset/visual-element/Info.js"
                paths.js + "/metamac/modules/dataset/visual-element/Column.js"
                paths.js + "/metamac/modules/dataset/visual-element/Line.js"
                paths.js + "/metamac/modules/dataset/visual-element/Pie.js"
                paths.js + "/metamac/modules/dataset/visual-element/SemiCircle.js"
                paths.js + "/metamac/modules/dataset/visual-element/Table.js"
                paths.js + "/metamac/modules/dataset/visual-element/line/DetailZoomModel.js"
                paths.js + "/metamac/modules/dataset/visual-element/line/DetailZoomView.js"
                paths.js + "/metamac/modules/dataset/visual-element/Map.js"

                # canvas table
                paths.js + "/libs/lru.js"
                paths.js + "/libs/jquery.hotkeys.js"
                paths.js + "/libs/jquery.ajaxmanager.js"
                paths.js + "/metamac/modules/dataset/visual-element/table/Utils.js"
                paths.js + "/metamac/modules/dataset/visual-element/table/primitives/Point.js"
                paths.js + "/metamac/modules/dataset/visual-element/table/primitives/Cell.js"
                paths.js + "/metamac/modules/dataset/visual-element/table/primitives/Size.js"
                paths.js + "/metamac/modules/dataset/visual-element/table/primitives/Rectangle.js"
                paths.js + "/metamac/modules/dataset/visual-element/table/DataSourceDataset.js"
                paths.js + "/metamac/modules/dataset/visual-element/table/Delegate.js"
                paths.js + "/metamac/modules/dataset/visual-element/table/zones/Zone.js"
                paths.js + "/metamac/modules/dataset/visual-element/table/zones/BodyZone.js"
                paths.js + "/metamac/modules/dataset/visual-element/table/zones/RightScrollZone.js"
                paths.js + "/metamac/modules/dataset/visual-element/table/zones/BottomScrollZone.js"
                paths.js + "/metamac/modules/dataset/visual-element/table/zones/LeftHeaderZone.js"
                paths.js + "/metamac/modules/dataset/visual-element/table/zones/TopHeaderZone.js"
                paths.js + "/metamac/modules/dataset/visual-element/table/zones/SpinnerZone.js"
                paths.js + "/metamac/modules/dataset/visual-element/table/View.js"
                paths.js + "/metamac/modules/dataset/visual-element/table/ScrollManager.js"
                paths.js + "/metamac/modules/dataset/visual-element/table/KeyboardManager.js"

                # map
                paths.js + "/libs/db.js"
                paths.js + "/metamac/modules/dataset/visual-element/map/models/ShapesApi.js"
                paths.js + "/metamac/modules/dataset/visual-element/map/models/ShapesStore.js"
                paths.js + "/metamac/modules/dataset/visual-element/map/models/Shapes.js"
                paths.js + "/metamac/modules/dataset/visual-element/map/models/GeoJsonConverter.js"
                paths.js + "/metamac/modules/dataset/visual-element/map/models/MapModel.js"
                paths.js + "/metamac/modules/dataset/visual-element/map/views/MapTooltipDelegate.js"
                paths.js + "/metamac/modules/dataset/visual-element/map/views/MapContainerView.js"
                paths.js + "/metamac/modules/dataset/visual-element/map/views/MapView.js"
                paths.js + "/metamac/modules/dataset/visual-element/map/views/ZoomView.js"
                paths.js + "/metamac/modules/dataset/visual-element/map/views/LegendView.js"
                paths.js + "/metamac/modules/dataset/visual-element/map/views/CreditsView.js"
                paths.js + "/metamac/modules/dataset/visual-element/map/views/RangesView.js"

                # Utils
                paths.js + "/metamac/modules/dataset/utils/VisualElementManager.js"
                paths.js + "/metamac/modules/dataset/utils/FullScreen.js"

                # Selection
                paths.js + "/metamac/modules/selection/SelectionView.js"
                paths.js + "/metamac/modules/dataset/DatasetController.js"

                # Collection
                paths.modules + "/collection/CollectionNode.js"
                paths.modules + "/collection/Collection.js"
                paths.modules + "/collection/CollectionView.js"
                paths.modules + "/collection/CollectionController.js"

                # Multidatasets
                paths.modules + "/multidataset/MultidatasetNode.js"
                paths.modules + "/multidataset/Multidataset.js"

                # Error module
                paths.modules + "/error/ErrorController.js"
                paths.modules + "/error/ErrorView.js"

            ]
            dest: paths.assets + "/metamac.js"


    handlebarsTemplateNameProcesor = (srcFile) ->
        rootRelative = srcFile.substring(paths.templates.length + 1)
        ext = path.extname(rootRelative)
        dir = path.dirname(rootRelative)
        baseName = path.basename(rootRelative, ext)
        dir + "/" + baseName

    uglifyOptions =
        options:
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'

    concatOptions =
        options:
            separator: grunt.util.linefeed + ';'

    globalConfig =
        mocha:
            grep: ''


    config =
        pkg: grunt.file.readJSON('package.json')
        globalConfig: globalConfig

        less:
            dev:
                src: paths.less + '/bootstrap.less'
                dest: paths.assets + '/metamac.css'
            pro:
                src: paths.less + '/bootstrap.less'
                dest: paths.assets + '/metamac.css'
                options:
                    yuicompress: true
            map:
                src : paths.less + "/dataset/maps-export.less"
                dest: paths.assets + '/map.css'
                options:
                    yuicompress: true

        handlebars:
            compile:
                options:
                    namespace: "Handlebars.templates"
                    wrapped: true
                    processName: handlebarsTemplateNameProcesor

                src: paths.templates + "/**/*.html"
                dest: paths.templates + "/HandlebarsTemplates.js"

        watch:
            less:
                files: paths.less + '/**/*.less'
                tasks: ['less:dev']

            handlebars:
                files: paths.templates + "/**/*.html"
                tasks: ['handlebars', 'concat']

            concat:
                files: paths.js + "/**/*.js"
                tasks: 'concat'

        copy:
            main: {
                src: 'src/main/fonts/*',
                dest: 'target/',
                flatten: true,
                expand: true
            }

        clean:
            build: "target",


        uglify: _.extend(modules, uglifyOptions)
        concat: _.extend(modules, concatOptions)


        connect:
            server:
                options:
                    port: 3000
                    hostname: 'localhost'

        open:
            test:
                path: 'http://localhost:<%= connect.server.options.port %>/src/test/javascript/runner/runner.html'
            preview:
                path: 'http://localhost:<%= connect.server.options.port %>/src/main/preview.html#selection'
        mocha:
            all:
                src: [ 'src/test/javascript/runner/runner.html' ]
                options:
                    log: true
                    mocha:
                        ignoreLeaks: true
                    reporter: 'Dot'


            spec:
                src: [ 'src/test/javascript/runner/runner.html' ]
                options:
                    log: true
                    mocha:
                        ignoreLeaks: true
                        grep: '<%= globalConfig.mocha.grep %>'
                    reporter: 'mocha-unfunk-reporter'
                    
        webfont:
            icons:
                src: 'icons/*.svg'
                dest: 'src/main/fonts'
                destCss: 'src/main/less'
                options: {
                    relativeFontPath : "./"
                    destHtml : 'src/main/fonts'
                    stylesheet : "less"
                    hashes : false
                    syntax: "bootstrap",
                    htmlDemo : true,
                    autoHint : false,
                    types: 'eot,woff,ttf,svg';
                }

        package:
            release:
                pretty: false
                srcDir: "./"
                destDir: "target"
                remove: ["dependencies", "devDependencies"]
                add:
                    main: "metamac.js"
                    files: ["metamac.css", "metamac.js"]

        zip:
            'target/sie-graphics.zip': ['target/metamac.css', 'target/metamac.js', 'target/package.json']


    grunt.registerTask 'spec', 'Runs a task on a specified file', (fileName) ->
        globalConfig.mocha.grep = fileName
        grunt.task.run('mocha:spec')

    grunt.registerTask 'test', ['concat','mocha:all']
    grunt.registerTask 'dev', ['clean', 'copy', 'less:dev', 'less:map', 'handlebars', 'concat']
    grunt.registerTask 'build', ['clean', 'copy', 'less:pro', 'less:map', 'handlebars', 'uglify']
    grunt.registerTask 'deploy', ['package', 'zip']

    grunt.registerTask 'bdd', ['connect', 'open:test', 'watch' ]
    grunt.registerTask 'serve', ['connect', 'open:preview', 'watch' ]
    grunt.registerTask 'default', 'build'

    grunt.registerTask 'font', ['webfont', "dev"]

    grunt.initConfig(config)
