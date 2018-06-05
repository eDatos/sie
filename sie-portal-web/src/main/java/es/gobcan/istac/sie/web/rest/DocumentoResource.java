package es.gobcan.istac.sie.web.rest;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;

import es.gobcan.istac.sie.service.DocumentoService;
import es.gobcan.istac.sie.web.rest.dto.EvolucionElectoralDTO;
import es.gobcan.istac.sie.web.rest.util.ControllerUtil;

@RestController
@RequestMapping("/api/documento")
public class DocumentoResource extends AbstractResource {

    private static final String NOMBRE_DOC_EVOLUCION_ELECTORAL = "evolucion-electoral.pdf";
    
    private static final Logger LOGGER = LoggerFactory.getLogger(DocumentoResource.class);

    private final DocumentoService documentoService;

    public DocumentoResource(DocumentoService documentoService) {
        this.documentoService = documentoService;
    }

    @Timed
    @PostMapping("/evolucion-electoral")
    public void getPdfEvolucionElectoral(@RequestBody EvolucionElectoralDTO evolucionElectoral, HttpServletResponse response) {
        LOGGER.debug("REST petición para generar PDF de un proceso electoral.");
        byte[] documento = this.documentoService.generarPdfEvolucionElectoral(evolucionElectoral);
        ControllerUtil.download(documento, NOMBRE_DOC_EVOLUCION_ELECTORAL, response);
    }
}