package es.gobcan.istac.sie.web.rest;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import es.gobcan.istac.sie.service.DocumentoService;
import es.gobcan.istac.sie.web.rest.dto.EvolucionElectoralDTO;
import es.gobcan.istac.sie.web.rest.errors.CustomParameterizedException;
import es.gobcan.istac.sie.web.rest.errors.ErrorConstants;
import es.gobcan.istac.sie.web.rest.util.ControllerUtil;

@RestController
@RequestMapping("/api/documento")
public class DocumentoResource extends AbstractResource {

    private static final String NOMBRE_DOC_EVOLUCION_ELECTORAL = "evolucion-electoral.pdf";
    private static final String EXCEPCION_GRAFICA_EVOLUCION_ELECTORAL = "Error generando la gráfica de evolución electoral";

    private static final Logger LOGGER = LoggerFactory.getLogger(DocumentoResource.class);

    private final DocumentoService documentoService;

    public DocumentoResource(DocumentoService documentoService) {
        this.documentoService = documentoService;
    }

    @PostMapping("/evolucion-electoral")
    public void getPdfEvolucionElectoral(@RequestPart("grafica") MultipartFile graficaSvg, @RequestPart("evolucionElectoral") EvolucionElectoralDTO evolucionElectoral, HttpServletResponse response) {
        LOGGER.debug("REST petición para generar PDF de un proceso electoral.");

        try {
            byte[] grafica = graficaSvg.getBytes();
            byte[] documento = this.documentoService.generarPdfEvolucionElectoral(evolucionElectoral, grafica);
            ControllerUtil.download(documento, NOMBRE_DOC_EVOLUCION_ELECTORAL, response);
        } catch (IOException e) {
            LOGGER.debug(EXCEPCION_GRAFICA_EVOLUCION_ELECTORAL, e);
            throw new CustomParameterizedException(EXCEPCION_GRAFICA_EVOLUCION_ELECTORAL, ErrorConstants.ERROR_GENERANDO_PDF);
        }
    }
}