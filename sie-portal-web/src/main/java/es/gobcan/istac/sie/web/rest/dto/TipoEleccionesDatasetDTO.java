package es.gobcan.istac.sie.web.rest.dto;

import java.io.Serializable;
import java.util.Objects;

public class TipoEleccionesDatasetDTO implements Serializable {

    private static final long serialVersionUID = -349842552342716081L;

    private String tipoElecciones;

    private String datasetId;

    public String getTipoElecciones() {
        return tipoElecciones;
    }
    
    public void setTipoElecciones(String tipoElecciones) {
        this.tipoElecciones = tipoElecciones;
    }

    public String getDatasetId() {
        return datasetId;
    }
    
    public void setDatasetId(String url) {
        this.datasetId = url;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TipoEleccionesDatasetDTO idiomaDTO = (TipoEleccionesDatasetDTO) o;
        if (idiomaDTO.getTipoElecciones() == null || getTipoElecciones() == null) {
            return false;
        }
        return Objects.equals(getTipoElecciones(), idiomaDTO.getTipoElecciones());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getTipoElecciones());
    }

    @Override
    public String toString() {
        return "TipoEleccionesDatasetDTO{" + "tipo elecciones = " + getTipoElecciones() + "}";
    }
}
