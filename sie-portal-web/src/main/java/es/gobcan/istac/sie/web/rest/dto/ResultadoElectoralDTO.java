package es.gobcan.istac.sie.web.rest.dto;

import java.util.List;

public class ResultadoElectoralDTO {

    private String territorio;
    private ProcesoElectoralDTO procesoElectoral;
    private List<ResultadoElectoralData> data;

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

    public List<ResultadoElectoralData> getData() {
        return data;
    }

    public void setData(List<ResultadoElectoralData> data) {
        this.data = data;
    }
}
