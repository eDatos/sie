package es.gobcan.istac.sie.service;

import es.gobcan.istac.sie.domain.TipoEleccionesDatasetUrlEntity;
import java.util.List;

public interface TipoEleccionesDatasetUrlService {

    TipoEleccionesDatasetUrlEntity findOne(String tipoElecciones);
    List<TipoEleccionesDatasetUrlEntity> findAll();
}
