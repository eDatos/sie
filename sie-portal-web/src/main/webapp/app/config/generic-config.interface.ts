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
        googleTrackingIdKey
    };
};
