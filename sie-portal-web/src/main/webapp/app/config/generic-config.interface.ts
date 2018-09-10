export interface GenericConfig {
    endpoints: {
        statisticalResources,
        structuralResources,
        statisticalVisualizer,
        permalinks,
        export,
        indicators
        metadata
    };

    dataset: {
        evolucionElectoral,
        metadata,
        data
    };

    visualizer: {
        showHeader,
        showRightsHolder,
        organisationUrn,
        installationType
    };

    navbar: {
        url
    };

    footer: {
        url
    };

    metadata: {
        statisticalResourcesEndpoint,
        structuralResourcesEndpoint,
        statisticalVisualizerEndpoint,
        permalinksEndpoint,
        exportEndpoint,
        indicatorsEndpoint
    };
};
