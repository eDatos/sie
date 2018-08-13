package es.gobcan.istac.sie.domain;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

@Entity
@Table(name = "tb_tipo_elecciones_dataset_id")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TipoEleccionesDataset implements Serializable {

    private static final long serialVersionUID = -9150644377868901854L;

    @Id
    @Column(name = "tipo_elecciones", nullable = false)
    private String tipoElecciones;

    @Column(name = "dataset_id", nullable = false)
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
        TipoEleccionesDataset idioma = (TipoEleccionesDataset) o;
        if (idioma.getTipoElecciones() == null || getTipoElecciones() == null) {
            return false;
        }
        return Objects.equals(getTipoElecciones(), idioma.getTipoElecciones());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getTipoElecciones());
    }

    @Override
    public String toString() {
        return "TipoEleccionesDataset{" + "tipo elecciones = " + getTipoElecciones() + "}";
    }
}