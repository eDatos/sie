package es.gobcan.istac.sie.web.rest;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.gobcan.istac.sie.domain.TipoEleccionesDatasetUrlEntity;
import es.gobcan.istac.sie.service.TipoEleccionesDatasetUrlService;
import es.gobcan.istac.sie.web.rest.dto.TipoEleccionesDatasetUrlDTO;
import es.gobcan.istac.sie.web.rest.mapper.TipoEleccionesDatasetUrlMapper;
import io.github.jhipster.web.util.ResponseUtil;

@RestController
@RequestMapping("/api/tipo-elecciones-dataset")
public class TipoEleccionesDatasetUrlResource extends AbstractResource {

    private static final Logger LOGGER = LoggerFactory.getLogger(TipoEleccionesDatasetUrlResource.class);

    private final TipoEleccionesDatasetUrlService tipoEleccionesDatasetUrlService;
    private final TipoEleccionesDatasetUrlMapper tipoEleccionesDatasetUrlMapper;

    public TipoEleccionesDatasetUrlResource(TipoEleccionesDatasetUrlService tipoEleccionesDatasetUrlService, TipoEleccionesDatasetUrlMapper tipoEleccionesDatasetUrlMapper) {
        this.tipoEleccionesDatasetUrlService = tipoEleccionesDatasetUrlService;
        this.tipoEleccionesDatasetUrlMapper = tipoEleccionesDatasetUrlMapper;
    }

    @GetMapping
    public ResponseEntity<List<TipoEleccionesDatasetUrlDTO>> getAllTipoEleccionesAvailable() {
        LOGGER.debug("Petición REST para obtener todos los tipos de elecciones disponibles");
        return ResponseEntity.ok(tipoEleccionesDatasetUrlMapper.toDto(this.tipoEleccionesDatasetUrlService.findAll()));
    }

    @GetMapping("/{tipoElecciones}")
    public ResponseEntity<TipoEleccionesDatasetUrlDTO> getByTipoElecciones(@PathVariable String tipoElecciones) {
        LOGGER.debug("REST petición para obtener una url de dataset. Tipo Elecciones: {}", tipoElecciones);
        TipoEleccionesDatasetUrlEntity tipoEleccionesDatasetUrl = this.tipoEleccionesDatasetUrlService.findOne(tipoElecciones);
        TipoEleccionesDatasetUrlDTO tipoEleccionesDatasetUrlDTO = this.tipoEleccionesDatasetUrlMapper.toDto(tipoEleccionesDatasetUrl);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tipoEleccionesDatasetUrlDTO));
    }
}
