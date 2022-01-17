package es.gobcan.istac.sie.web.rest.dto;

public class ResultadoElectoralDTO {

    private String territorio;
    private ProcesoElectoralDTO procesoElectoral;

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
}
