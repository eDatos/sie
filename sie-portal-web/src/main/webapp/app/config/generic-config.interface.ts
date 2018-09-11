export interface GenericConfig {
    dataset: {
        evolucionElectoral,
        metadata,
        data
    };

    visualizer: {
        showHeader,
        showRightsHolder,
        organisationUrn
    };

    navbar: {
        url
    };

    footer: {
        url
    };

    environment: {
        baseUrl
    };

    metadata: {
        endpoint,
        installationType,
        statisticalResourcesKey,
        structuralResourcesKey,
        indicatorsKey,
        statisticalVisualizerApiKey,
        permalinksEndpointKey,
        exportEndpointKey,
        googleTrackingIdKey
    };
};
