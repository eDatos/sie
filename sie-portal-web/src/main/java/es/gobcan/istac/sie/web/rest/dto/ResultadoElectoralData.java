package es.gobcan.istac.sie.web.rest.dto;

import java.util.Map;

public class ResultadoElectoralData {
    private String candidacy;
    private Map<String, Number> results;

    public String getCandidacy() {
        return candidacy;
    }

    public void setCandidacy(String candidacy) {
        this.candidacy = candidacy;
    }

    public Map<String, Number> getResults() {
        return results;
    }

    public void setResults(Map<String, Number> results) {
        this.results = results;
    }
}
