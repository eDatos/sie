package es.gobcan.istac.sie.web.rest;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;

import es.gobcan.istac.sie.service.EvolucionElectoralService;
import es.gobcan.istac.sie.web.rest.dto.IdiomaDTO;

@RestController
@RequestMapping("/api/evolucion-electoral")
public class EvolucionElectoralResource extends AbstractResource {

    private static final Logger LOGGER = LoggerFactory.getLogger(EvolucionElectoralResource.class);

    private final EvolucionElectoralService evolucionElectoralService;

    public EvolucionElectoralResource(EvolucionElectoralService evolucionElectoralService) {
        this.evolucionElectoralService = evolucionElectoralService;
    }

    @Timed
    @GetMapping("/{lugarId}/{tipoEleccion}/download")
    public List<IdiomaDTO> getIdiomas(@PathVariable("lugarId") String lugarId, @PathVariable("tipoEleccion") String tipoEleccion) {
        LOGGER.debug("REST request to get all Idiomas");
        return null;
    }
}
