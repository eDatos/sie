package es.gobcan.istac.sie.service;

import es.gobcan.istac.sie.domain.TipoEleccionesDatasetUrlEntity;

public interface TipoEleccionesDatasetUrlService {
    
    TipoEleccionesDatasetUrlEntity findOne(String tipoElecciones);
}