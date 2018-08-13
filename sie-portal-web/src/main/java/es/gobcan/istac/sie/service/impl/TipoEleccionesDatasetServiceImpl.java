package es.gobcan.istac.sie.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.gobcan.istac.sie.domain.TipoEleccionesDataset;
import es.gobcan.istac.sie.repository.TipoEleccionesDatasetRepository;
import es.gobcan.istac.sie.service.TipoEleccionesDatasetService;

@Service
public class TipoEleccionesDatasetServiceImpl implements TipoEleccionesDatasetService {
    
    @Autowired
    private TipoEleccionesDatasetRepository tipoEleccionesDatasetRepository;
    
    public TipoEleccionesDataset findOne(String tipoElecciones) {
        return this.tipoEleccionesDatasetRepository.findOne(tipoElecciones);
    }
}