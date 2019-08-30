package es.gobcan.istac.sie.service.impl;

import java.io.ByteArrayInputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import es.gobcan.istac.sie.config.Constants;
import es.gobcan.istac.sie.service.DocumentoService;
import es.gobcan.istac.sie.service.ReportsService;
import es.gobcan.istac.sie.web.rest.dto.EvolucionElectoralDTO;
import es.gobcan.istac.sie.web.rest.errors.CustomParameterizedException;
import es.gobcan.istac.sie.web.rest.errors.ErrorConstants;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Service
public class DocumentoServiceImpl implements DocumentoService {

    private static final String LOGO_CABECERA                                    = "logo_istac.png";
    private static final String EVOLUCION_ELECTORAL_TEMPLATE                     = "evolucion-electoral.jasper";
    private static final String RUTA_RELATIVA_DIRECTORIO_SUBINFORME              = "./jasper/";
    private static final String EXCEPCION_RUTA_LOGO_CABECERA_EVOLUCION_ELECTORAL = "Error al construir URI al logo cabecera de evolución electoral";

    private static final Logger LOGGER                                           = LoggerFactory.getLogger(DocumentoServiceImpl.class);

    private ReportsService      reportsService;

    public DocumentoServiceImpl(ReportsService reportsService) {
        this.reportsService = reportsService;
    }

    @Override
    public byte[] generarPdfEvolucionElectoral(EvolucionElectoralDTO evolucionElectoral, byte[] grafica) {
        try {
            LOGGER.debug("Request to print Evolucion Electoral");

            Map<String, Object> parametros = new HashMap<>();
            parametros.put("GRAFICA", new ByteArrayInputStream(grafica));
            parametros.put("TERRITORIO", evolucionElectoral.getTerritorio());
            parametros.put("TIPO_ELECCIONES", evolucionElectoral.getTipoElecciones());
            parametros.put("dataSource", new JRBeanCollectionDataSource(evolucionElectoral.getProcesosElectorales()));
            parametros.put("SUBREPORT_DIR", RUTA_RELATIVA_DIRECTORIO_SUBINFORME);
            parametros.put("rutaLogo", new URI(this.getClass().getResource(Constants.CARPETA_JASPER_REPORT + LOGO_CABECERA).toString()).getPath());

            return this.reportsService.generateFromTemplate(EVOLUCION_ELECTORAL_TEMPLATE, parametros, null);
        } catch (URISyntaxException e) {
            throw new CustomParameterizedException(EXCEPCION_RUTA_LOGO_CABECERA_EVOLUCION_ELECTORAL, e, ErrorConstants.ERROR_GENERANDO_PDF,
                    this.getClass().getResource(Constants.CARPETA_JASPER_REPORT + LOGO_CABECERA).toString());

        }
    }
}