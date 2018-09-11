package es.gobcan.istac.sie.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties are configured in the application.yml file.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {

    private final Dataset dataset = new Dataset();
    
    private final Visualizer visualizer = new Visualizer();
    
    private final Estaticos estaticos = new Estaticos();
    
    private final Metadata metadata = new Metadata();
    
    public Dataset getDataset() {
        return dataset;
    }

    public Visualizer getVisualizer() {
        return visualizer;
    }

    public Estaticos getEstaticos() {
        return estaticos;
    }
    
    public Metadata getMetadata() {
        return metadata;
    }

    public static class Dataset {
        
        private String evolucionElectoral;

        public String getEvolucionElectoral() {
            return evolucionElectoral;
        }
        
        public void setEvolucionElectoral(String evolucionElectoral) {
            this.evolucionElectoral = evolucionElectoral;
        }
    }

    public static class Visualizer {
        
        private Boolean showHeader;
        private Boolean showRightsHolder;
        private String organisationUrn;
        
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
        
        public String getOrganisationUrn() {
            return organisationUrn;
        }
        
        public void setOrganisationUrn(String organisationUrn) {
            this.organisationUrn = organisationUrn;
        }
    }
    
    public static class Estaticos {
        
        private String navbarUrl;
        private String footerUrl;

        public String getNavbarUrl() {
            return navbarUrl;
        }

        public void setNavbarUrl(String navbarUrl) {
            this.navbarUrl = navbarUrl;
        }

        public String getFooterUrl() {
            return footerUrl;
        }

        public void setFooterUrl(String footerUrl) {
            this.footerUrl = footerUrl;
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

        public String getStatisticalResourcesKey() {
            if (this.isInternal()) {
                return this.getStatisticalResourcesInternalKey();
            } else {
                return this.getStatisticalResourcesExternalKey();
            }
        }
        
        public String getStructuralResourcesKey() {
            if (this.isInternal()) {
                return this.getStructuralResourcesInternalKey();
            } else {
                return this.getStructuralResourcesExternalKey();
            }
        }
        
        public String getIndicatorsKey() {
            if (this.isInternal()) {
                return this.getIndicatorsInternalKey();
            } else {
                return this.getIndicatorsExternalKey();
            }
        }

        private boolean isInternal() {
            return Constants.INTERNAL_CONFIG_ID.equalsIgnoreCase(this.getInstallationType());
        }
    }
}