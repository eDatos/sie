export interface GenericConfig {
    dataset: {
        evolucionElectoralKey,
        metadata,
        data
    };

    visualizer: {
        showHeader,
        showRightsHolder
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
        footerPathKey,
        organisationUrnKey,
        geographicalGranularityUrnKey
    };

    baseUrl
};
