package es.gobcan.istac.sie.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties are configured in the application.yml file.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {

    private final Estadisticas estadisticas = new Estadisticas();
    
    private final Estaticos estaticos = new Estaticos();

    public Estadisticas getEstadisticas() {
        return estadisticas;
    }
    
    public Estaticos getEstaticos() {
        return estaticos;
    }

    public static class Estadisticas {

        private String endpoint;

        public String getEndpoint() {
            return endpoint;
        }

        public void setEndpoint(String endpoint) {
            this.endpoint = endpoint;
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
}