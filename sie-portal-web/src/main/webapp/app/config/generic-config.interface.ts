export interface GenericConfig {
    endpoints: {
        statisticalResources,
        structuralResources,
        statisticalVisualizer,
        permalinks,
        export,
        indicators
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
    }
};
