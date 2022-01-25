package es.gobcan.istac.sie.web.rest.dto;

import java.util.List;
import java.util.Map;

public class ResultadoElectoralDTO {

    private String territorio;
    private ProcesoElectoralDTO procesoElectoral;
    private List<Map<String, String>> data;

    public String getTerritorio() {
        return territorio;
    }

    public void setTerritorio(String territorio) {
        this.territorio = territorio;
    }

    public ProcesoElectoralDTO getProcesoElectoral() {
        return procesoElectoral;
    }

    public void setProcesoElectoral(ProcesoElectoralDTO procesoElectoral) {
        this.procesoElectoral = procesoElectoral;
    }

    public List<Map<String, String>> getData() {
        return data;
    }

    public void setData(List<Map<String, String>> data) {
        this.data = data;
    }
}
