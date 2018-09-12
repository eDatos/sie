package es.gobcan.istac.sie.web.rest.dto;

import java.io.Serializable;

public class TipoEleccionesDatasetUrlDTO implements Serializable {

    private static final long serialVersionUID = -349842552342716081L;

    private String tipoElecciones;

    private String datasetUrl;

    public String getTipoElecciones() {
        return tipoElecciones;
    }
    
    public void setTipoElecciones(String tipoElecciones) {
        this.tipoElecciones = tipoElecciones;
    }

    public String getDatasetUrl() {
        return datasetUrl;
    }

    public void setDatasetUrl(String datasetUrl) {
        this.datasetUrl = datasetUrl;
    }

    @Override
    public String toString() {
        return "TipoEleccionesDatasetUrlDTO{" + "tipo elecciones = " + getTipoElecciones() + "}";
    }
}
