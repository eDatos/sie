package es.gobcan.istac.sie.web.rest;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.gobcan.istac.sie.domain.TipoEleccionesDataset;
import es.gobcan.istac.sie.service.TipoEleccionesDatasetService;
import es.gobcan.istac.sie.web.rest.dto.TipoEleccionesDatasetDTO;
import es.gobcan.istac.sie.web.rest.mapper.TipoEleccionesDatasetMapper;
import io.github.jhipster.web.util.ResponseUtil;

@RestController
@RequestMapping("/api/tipo-elecciones-dataset")
public class TipoEleccionesDatasetResource extends AbstractResource {
    
    private static final Logger LOGGER = LoggerFactory.getLogger(TipoEleccionesDatasetResource.class);
    
    private TipoEleccionesDatasetService tipoEleccionesDatasetService;
    
    private TipoEleccionesDatasetMapper tipoEleccionesDatasetMapper;
    
    public TipoEleccionesDatasetResource(TipoEleccionesDatasetService tipoEleccionesDatasetService, TipoEleccionesDatasetMapper tipoEleccionesDatasetMapper) {
        this.tipoEleccionesDatasetService = tipoEleccionesDatasetService;
        this.tipoEleccionesDatasetMapper = tipoEleccionesDatasetMapper;
    }
    
    @GetMapping("/{tipoElecciones}")
    public ResponseEntity<TipoEleccionesDatasetDTO> getByTipoElecciones(@PathVariable String tipoElecciones) {
        LOGGER.debug("REST petición para obtener una url de dataset. Tipo Elecciones: {}", tipoElecciones);
        TipoEleccionesDataset tipoEleccionesDataset = this.tipoEleccionesDatasetService.findOne(tipoElecciones);
        TipoEleccionesDatasetDTO tipoEleccionesDatasetDTO = this.tipoEleccionesDatasetMapper.toDto(tipoEleccionesDataset);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tipoEleccionesDatasetDTO));
    }
}