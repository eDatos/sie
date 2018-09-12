package es.gobcan.istac.sie.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

@Entity
@Table(name = "tb_tipo_elecciones_dataset_url")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TipoEleccionesDatasetUrlEntity implements Serializable {

    private static final long serialVersionUID = -9150644377868901854L;

    @Id
    @Column(name = "tipo_elecciones", nullable = false)
    private String tipoElecciones;

    @Column(name = "dataset_url", nullable = false)
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
        return "TipoEleccionesDatasetUrl{" + "tipo elecciones = " + getTipoElecciones() + "}";
    }
}