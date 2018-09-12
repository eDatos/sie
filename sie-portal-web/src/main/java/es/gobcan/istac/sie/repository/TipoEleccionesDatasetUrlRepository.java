package es.gobcan.istac.sie.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import es.gobcan.istac.sie.domain.TipoEleccionesDatasetUrlEntity;

@Repository
public interface TipoEleccionesDatasetUrlRepository extends JpaRepository<TipoEleccionesDatasetUrlEntity, String> {
}