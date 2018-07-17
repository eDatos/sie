package es.gobcan.istac.sie.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties are configured in the application.yml file.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {

    private final Estadisticas estadisticas = new Estadisticas();

    public Estadisticas getEstadisticas() {
        return estadisticas;
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
}