package com.arte.application.template.domain;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.arte.application.template.optimistic.AbstractVersionedEntity;
import com.arte.application.template.optimistic.OptLockId;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "rol")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Rol extends AbstractVersionedEntity implements Serializable, Comparable<Rol> {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rol_id_seq")
    @SequenceGenerator(name = "rol_id_seq", sequenceName = "rol_id_seq", allocationSize = 50, initialValue = 10)
    @OptLockId
    private Long id;

    @NotNull
    @Size(min = 0, max = 50)
    @Column(length = 50, unique = true, nullable = false)
    private String codigo;

    @NotNull
    @Size(min = 0, max = 255)
    @Column(length = 255, unique = true, nullable = false)
    private String nombre;

    @JsonIgnore
    @ManyToMany
    @JoinTable(name = "roles_operaciones", joinColumns = {@JoinColumn(name = "rol_id", referencedColumnName = "id")}, inverseJoinColumns = {
            @JoinColumn(name = "operacion_id", referencedColumnName = "id")})
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @BatchSize(size = 20)
    private Set<Operacion> operaciones = new HashSet<>();

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Set<Operacion> getOperaciones() {
        return operaciones;
    }

    public void setOperaciones(Set<Operacion> operaciones) {
        this.operaciones = operaciones;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Rol authority = (Rol) o;

        return !(nombre != null ? !nombre.equals(authority.nombre) : authority.nombre != null);
    }

    @Override
    public int hashCode() {
        return nombre != null ? nombre.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "Authority{" + "codigo='" + codigo + '\'' + "nombre='" + nombre + '\'' + "}";
    }

    @Override
    public int compareTo(Rol o) {
        if (o == null || o.getCodigo() == null) {
            return -1;
        }
        if (this.getCodigo() == null) {
            return 1;
        }
        return this.codigo.compareTo(o.getCodigo());
    }

}
