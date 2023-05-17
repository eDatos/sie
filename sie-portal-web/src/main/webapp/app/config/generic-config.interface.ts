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
        organisationKey,
        organisationUrnKey,
        geographicalGranularityUrnKey,
        sieAdditionalInfoUrl,
        sieExplanatoryVideoUrl,
        firstTerritoryHierarchyLevelKey,
        internationalizationCookieKey,
        internationalizationLanguages,
        captchaExternalApiUrlBase
    };

    baseUrl
};
