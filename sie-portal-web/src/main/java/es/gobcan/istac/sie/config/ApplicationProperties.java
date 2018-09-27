package es.gobcan.istac.sie.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties are configured in the application.yml file.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {

    private final Visualizer visualizer = new Visualizer();

    private final Metadata   metadata   = new Metadata();

    public Visualizer getVisualizer() {
        return visualizer;
    }

    public Metadata getMetadata() {
        return metadata;
    }

    public static class Visualizer {

        private Boolean showHeader;
        private Boolean showRightsHolder;

        public Boolean getShowHeader() {
            return showHeader;
        }

        public void setShowHeader(Boolean showHeader) {
            this.showHeader = showHeader;
        }

        public Boolean getShowRightsHolder() {
            return showRightsHolder;
        }

        public void setShowRightsHolder(Boolean showRightsHolder) {
            this.showRightsHolder = showRightsHolder;
        }
    }

    public static class Metadata {

        private String endpoint;
        private String installationType;
        private String statisticalResourcesInternalKey;
        private String statisticalResourcesExternalKey;
        private String structuralResourcesInternalKey;
        private String structuralResourcesExternalKey;
        private String indicatorsInternalKey;
        private String indicatorsExternalKey;
        private String statisticalVisualizerKey;
        private String statisticalVisualizerApiKey;
        private String permalinksEndpointKey;
        private String exportEndpointKey;
        private String googleTrackingIdKey;
        private String navbarPathKey;
        private String footerPathKey;
        private String organisationUrnKey;
        private String geographicalGranularityUrnKey;

        public String getEndpoint() {
            return endpoint;
        }

        public void setEndpoint(String endpoint) {
            this.endpoint = endpoint;
        }

        public String getInstallationType() {
            return installationType;
        }

        public void setInstallationType(String installationType) {
            this.installationType = installationType;
        }

        public String getStatisticalResourcesInternalKey() {
            return statisticalResourcesInternalKey;
        }

        public void setStatisticalResourcesInternalKey(String statisticalResourcesInternalKey) {
            this.statisticalResourcesInternalKey = statisticalResourcesInternalKey;
        }

        public String getStatisticalResourcesExternalKey() {
            return statisticalResourcesExternalKey;
        }

        public void setStatisticalResourcesExternalKey(String statisticalResourcesExternalKey) {
            this.statisticalResourcesExternalKey = statisticalResourcesExternalKey;
        }

        public String getStructuralResourcesInternalKey() {
            return structuralResourcesInternalKey;
        }

        public void setStructuralResourcesInternalKey(String structuralResourcesInternalKey) {
            this.structuralResourcesInternalKey = structuralResourcesInternalKey;
        }

        public String getStructuralResourcesExternalKey() {
            return structuralResourcesExternalKey;
        }

        public void setStructuralResourcesExternalKey(String structuralResourcesExternalKey) {
            this.structuralResourcesExternalKey = structuralResourcesExternalKey;
        }

        public String getIndicatorsInternalKey() {
            return indicatorsInternalKey;
        }

        public void setIndicatorsInternalKey(String indicatorsInternalKey) {
            this.indicatorsInternalKey = indicatorsInternalKey;
        }

        public String getIndicatorsExternalKey() {
            return indicatorsExternalKey;
        }

        public void setIndicatorsExternalKey(String indicatorsExternalKey) {
            this.indicatorsExternalKey = indicatorsExternalKey;
        }

        public String getStatisticalVisualizerKey() {
            return statisticalVisualizerKey;
        }

        public void setStatisticalVisualizerKey(String statisticalVisualizerKey) {
            this.statisticalVisualizerKey = statisticalVisualizerKey;
        }

        public String getStatisticalVisualizerApiKey() {
            return statisticalVisualizerApiKey;
        }

        public void setStatisticalVisualizerApiKey(String statisticalVisualizerApiKey) {
            this.statisticalVisualizerApiKey = statisticalVisualizerApiKey;
        }

        public String getPermalinksEndpointKey() {
            return permalinksEndpointKey;
        }

        public void setPermalinksEndpointKey(String permalinksEndpointKey) {
            this.permalinksEndpointKey = permalinksEndpointKey;
        }

        public String getExportEndpointKey() {
            return exportEndpointKey;
        }

        public void setExportEndpointKey(String exportEndpointKey) {
            this.exportEndpointKey = exportEndpointKey;
        }

        public String getGoogleTrackingIdKey() {
            return googleTrackingIdKey;
        }

        public void setGoogleTrackingIdKey(String googleTrackingIdKey) {
            this.googleTrackingIdKey = googleTrackingIdKey;
        }

        public String getNavbarPathKey() {
            return navbarPathKey;
        }

        public void setNavbarPathKey(String navbarPathKey) {
            this.navbarPathKey = navbarPathKey;
        }

        public String getFooterPathKey() {
            return footerPathKey;
        }

        public void setFooterPathKey(String footerPathKey) {
            this.footerPathKey = footerPathKey;
        }

        public String getStatisticalResourcesKey() {
            if (isInternal()) {
                return getStatisticalResourcesInternalKey();
            } else {
                return getStatisticalResourcesExternalKey();
            }
        }

        public String getStructuralResourcesKey() {
            if (isInternal()) {
                return getStructuralResourcesInternalKey();
            } else {
                return getStructuralResourcesExternalKey();
            }
        }

        public String getIndicatorsKey() {
            if (isInternal()) {
                return getIndicatorsInternalKey();
            } else {
                return getIndicatorsExternalKey();
            }
        }

        private boolean isInternal() {
            return Constants.INTERNAL_CONFIG_ID.equalsIgnoreCase(getInstallationType());
        }

        public String getOrganisationUrnKey() {
            return organisationUrnKey;
        }

        public void setOrganisationUrnKey(String organisationUrnKey) {
            this.organisationUrnKey = organisationUrnKey;
        }

        public String getGeographicalGranularityUrnKey() {
            return geographicalGranularityUrnKey;
        }

        public void setGeographicalGranularityUrnKey(String geographicalGranularityUrnKey) {
            this.geographicalGranularityUrnKey = geographicalGranularityUrnKey;
        }
    }
}