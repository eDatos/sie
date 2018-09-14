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

    metadata: {
        endpoint,
        installationType,
        statisticalResourcesKey,
        structuralResourcesKey,
        indicatorsKey,
        statisticalVisualizerKey,
        statisticalVisualizerApiKey,
        permalinksEndpointKey,
        exportEndpointKey,
        googleTrackingIdKey,
        navbarPathKey,
        footerPathKey
    };

    baseUrl
};
