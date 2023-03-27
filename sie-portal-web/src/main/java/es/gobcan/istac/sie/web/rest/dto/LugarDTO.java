package es.gobcan.istac.sie.web.rest.dto;

public class LugarDTO {
    private String id;
    private String nombre;
    private String granularidad;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getGranularidad() {
        return granularidad;
    }

    public void setGranularidad(String granularidad) {
        this.granularidad = granularidad;
    }
}
