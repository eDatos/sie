package es.gobcan.istac.sie.service;

import es.gobcan.istac.sie.domain.TipoEleccionesDataset;

public interface TipoEleccionesDatasetService {
    
    TipoEleccionesDataset findOne(String tipoElecciones);
}