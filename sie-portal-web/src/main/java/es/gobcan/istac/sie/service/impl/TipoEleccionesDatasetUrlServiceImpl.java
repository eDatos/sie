package es.gobcan.istac.sie.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.gobcan.istac.sie.domain.TipoEleccionesDatasetUrlEntity;
import es.gobcan.istac.sie.repository.TipoEleccionesDatasetUrlRepository;
import es.gobcan.istac.sie.service.TipoEleccionesDatasetUrlService;

@Service
public class TipoEleccionesDatasetUrlServiceImpl implements TipoEleccionesDatasetUrlService {
    
    @Autowired
    private TipoEleccionesDatasetUrlRepository tipoEleccionesDatasetUrlRepository;
    
    public TipoEleccionesDatasetUrlEntity findOne(String tipoElecciones) {
        return this.tipoEleccionesDatasetUrlRepository.findOne(tipoElecciones);
    }
}