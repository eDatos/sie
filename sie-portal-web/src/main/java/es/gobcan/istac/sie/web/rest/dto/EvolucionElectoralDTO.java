package es.gobcan.istac.sie.web.rest.dto;

import java.util.List;

public class EvolucionElectoralDTO {

    private String territorio;
    private String tipoElecciones;
    private List<ProcesoElectoralDTO> procesosElectorales;
    
    public String getTerritorio() {
        return territorio;
    }
    
    public void setTerritorio(String territorio) {
        this.territorio = territorio;
    }
    
    public String getTipoElecciones() {
        return tipoElecciones;
    }
    
    public void setTipoElecciones(String tipoElecciones) {
        this.tipoElecciones = tipoElecciones;
    }
    
    public List<ProcesoElectoralDTO> getProcesosElectorales() {
        return procesosElectorales;
    }
    
    public void setProcesosElectorales(List<ProcesoElectoralDTO> procesosElectorales) {
        this.procesosElectorales = procesosElectorales;
    }
}