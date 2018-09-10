package es.gobcan.istac.sie.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties are configured in the application.yml file.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {

    private final Endpoints endpoints = new Endpoints();
    
    private final Dataset dataset = new Dataset();
    
    private final Visualizer visualizer = new Visualizer();
    
    private final Estaticos estaticos = new Estaticos();
    
    private final Analytics analytics = new Analytics();
    
    private final Metadata metadata = new Metadata();
    
    public Endpoints getEndpoints() {
        return endpoints;
    }

    public Dataset getDataset() {
        return dataset;
    }

    public Visualizer getVisualizer() {
        return visualizer;
    }

    public Estaticos getEstaticos() {
        return estaticos;
    }
    
    public Analytics getAnalytics() {
        return analytics;
    }
    
    public Metadata getMetadata() {
        return metadata;
    }

    public static class Endpoints {
        
        private String statisticalResources;
        private String structuralResources;
        private String statisticalVisualizer;
        private String permalinks;
        private String export;
        private String indicators;
        private String metadata;
        
        public String getStatisticalResources() {
            return statisticalResources;
        }
        
        public void setStatisticalResources(String statisticalResources) {
            this.statisticalResources = statisticalResources;
        }
        
        public String getStructuralResources() {
            return structuralResources;
        }
        
        public void setStructuralResources(String structuralResources) {
            this.structuralResources = structuralResources;
        }
        
        public String getStatisticalVisualizer() {
            return statisticalVisualizer;
        }
        
        public void setStatisticalVisualizer(String statisticalVisualizer) {
            this.statisticalVisualizer = statisticalVisualizer;
        }
        
        public String getPermalinks() {
            return permalinks;
        }
        
        public void setPermalinks(String permalinks) {
            this.permalinks = permalinks;
        }
        
        public String getExport() {
            return export;
        }
        
        public void setExport(String export) {
            this.export = export;
        }
        
        public String getIndicators() {
            return indicators;
        }
        
        public void setIndicators(String indicators) {
            this.indicators = indicators;
        }

        public String getMetadata() {
            return metadata;
        }

        public void setMetadata(String metadata) {
            this.metadata = metadata;
        }
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
        private String installationType;
        
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
        
        public String getInstallationType() {
            return installationType;
        }
        
        public void setInstallationType(String installationType) {
            this.installationType = installationType;
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
    
    public static class Analytics {
        
        private String googleTrackingId;
        
        public String getGoogleTrackingId() {
            return googleTrackingId;
        }

        public void setGoogleTrackingId(String googleTrackingId) {
            this.googleTrackingId = googleTrackingId;
        }
    }
    
    public static class Metadata {
        
        private String statisticalResourcesEndpoint;
        private String structuralResourcesEndpoint;
        private String statisticalVisualizerEndpoint;
        private String permalinksEndpoint;
        private String exportEndpoint;
        private String indicatorsEndpoint;
        private String googleTrackingId;
        
        public String getStatisticalResourcesEndpoint() {
            return statisticalResourcesEndpoint;
        }

        public void setStatisticalResourcesEndpoint(String statisticalResourcesEndpoint) {
            this.statisticalResourcesEndpoint = statisticalResourcesEndpoint;
        }

        public String getStructuralResourcesEndpoint() {
            return structuralResourcesEndpoint;
        }

        public void setStructuralResourcesEndpoint(String structuralResourcesEndpoint) {
            this.structuralResourcesEndpoint = structuralResourcesEndpoint;
        }

        public String getStatisticalVisualizerEndpoint() {
            return statisticalVisualizerEndpoint;
        }
        
        public void setStatisticalVisualizerEndpoint(String statisticalVisualizerEndpoint) {
            this.statisticalVisualizerEndpoint = statisticalVisualizerEndpoint;
        }
        
        public String getPermalinksEndpoint() {
            return permalinksEndpoint;
        }
        
        public void setPermalinksEndpoint(String permalinksEndpoint) {
            this.permalinksEndpoint = permalinksEndpoint;
        }

        public String getExportEndpoint() {
            return exportEndpoint;
        }

        public void setExportEndpoint(String exportEndpoint) {
            this.exportEndpoint = exportEndpoint;
        }
        
        public String getIndicatorsEndpoint() {
            return indicatorsEndpoint;
        }

        public void setIndicatorsEndpoint(String indicatorsEndpoint) {
            this.indicatorsEndpoint = indicatorsEndpoint;
        }

        public String getGoogleTrackingId() {
            return googleTrackingId;
        }

        public void setGoogleTrackingId(String googleTrackingId) {
            this.googleTrackingId = googleTrackingId;
        }
    }
}