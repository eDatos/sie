package es.gobcan.istac.sie.web.rest.dto;

import java.util.List;

public class ResultadoElectoralDTO {

    private LugarDTO territorio;
    private ProcesoElectoralDTO procesoElectoral;
    private List<ResultadoElectoralData> data;
    private String appOrganisationLogoUrl;

    public LugarDTO getTerritorio() {
        return territorio;
    }

    public void setTerritorio(LugarDTO territorio) {
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

    public String getAppOrganisationLogoUrl() {
        return appOrganisationLogoUrl;
    }

    public void setAppOrganisationLogoUrl(String appOrganisationLogoUrl) {
        this.appOrganisationLogoUrl = appOrganisationLogoUrl;
    }
}
