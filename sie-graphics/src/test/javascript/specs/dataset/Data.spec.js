describe('Dataset Data', function () {

    var metadata;
    var data;
    var ids;

    beforeEach(function () {
        SpecUtils.configureI18n('es');

        var datasourceIdentificer = new App.datasource.DatasourceIdentifier(App.test.metadata.identifier);
        var datasetHelper = new App.datasource.helper.DatasetHelper();
        metadata = new App.datasource.model.MetadataResponse({ datasourceIdentifier: datasourceIdentificer, datasourceHelper: datasetHelper, response: App.test.response.metadata});
        data = new App.datasource.model.DataResponse(App.test.response.data, metadata, datasetHelper, undefined);

        ids = {
            TIME_PERIOD : "no_emun_code_11",
            INDICADORES : "INDICE_OCUPACION_HABITACIONES",
            DESTINO_ALOJAMIENTO : "GRAN_CANARIA",
            CATEGORIA_ALOJAMIENTO : "TOTAL"
        };
    });

    it('getData should return raw data', function () {
        var value = data.getData({ids : ids});
        expect(value).to.equal('6725.371433050962');
    });

    it('getStringData should format the string based on decimals metadata', function () {
        var value = data.getStringData({ids : ids});
        expect(value).to.equal('6.725,371433'); //6 decimals
    });

    it('getNumberData should return the data as number', function () {
        var value = data.getNumberData({ids : ids});
        expect(value).to.equal(parseFloat('6725.371433050962')); //6 decimals
    });

});