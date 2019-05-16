package es.gobcan.istac.sie.web.rest.dto;

import java.util.Date;
import java.util.Map;

public class ProcesoElectoralDTO {

    private String id;
    
    private int indiceDimension;
    
    private String idLugar;
    
    private String nombre;
    
    private Date fechaEleccion;
    
    private String tipoProcesoElectoral;
    
    private Map<String, String> indicadores;

    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public int getIndiceDimension() {
        return indiceDimension;
    }
    
    public void setIndiceDimension(int indiceDimension) {
        this.indiceDimension = indiceDimension;
    }

    public String getIdLugar() {
        return idLugar;
    }

    public void setIdLugar(String idLugar) {
        this.idLugar = idLugar;
    }
    
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Date getFechaEleccion() {
        return fechaEleccion;
    }

    public void setFechaEleccion(Date fechaEleccion) {
        this.fechaEleccion = fechaEleccion;
    }

    public String getTipoProcesoElectoral() {
        return tipoProcesoElectoral;
    }

    public void setTipoProcesoElectoral(String tipoProcesoElectoral) {
        this.tipoProcesoElectoral = tipoProcesoElectoral;
    }

    public Map<String, String> getIndicadores() {
        return indicadores;
    }
    
    public void setIndicadores(Map<String, String> indicadores) {
        this.indicadores = indicadores;
    }
}