package es.gobcan.istac.sie.service.impl;

import java.io.ByteArrayInputStream;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import es.gobcan.istac.sie.config.Constants;
import es.gobcan.istac.sie.service.DocumentoService;
import es.gobcan.istac.sie.service.ReportsService;
import es.gobcan.istac.sie.web.rest.dto.EvolucionElectoralDTO;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Service
public class DocumentoServiceImpl implements DocumentoService {

    private static final String LOGO_CABECERA = "logo_istac.png";
    private static final String EVOLUCION_ELECTORAL_TEMPLATE = "evolucion-electoral.jasper";
    private static final String RUTA_RELATIVA_DIRECTORIO_SUBINFORME = "./jasper/";

    private static final Logger LOGGER = LoggerFactory.getLogger(DocumentoServiceImpl.class);

    private ReportsService reportsService;

    public DocumentoServiceImpl(ReportsService reportsService) {
        this.reportsService = reportsService; 
    }

    @Override
    public byte[] generarPdfEvolucionElectoral(EvolucionElectoralDTO evolucionElectoral, byte[] grafica) {
        LOGGER.debug("Request to print Evolucion Electoral");
        Map<String, Object> parametros = new HashMap<>();
        parametros.put("GRAFICA", new ByteArrayInputStream(grafica));
        parametros.put("TERRITORIO", evolucionElectoral.getTerritorio());
        parametros.put("TIPO_ELECCIONES", evolucionElectoral.getTipoElecciones());
        parametros.put("dataSource", new JRBeanCollectionDataSource(evolucionElectoral.getProcesosElectorales()));
        parametros.put("SUBREPORT_DIR", RUTA_RELATIVA_DIRECTORIO_SUBINFORME);
        String logoPath = getClass().getResource(Constants.CARPETA_JASPER_REPORT + LOGO_CABECERA).getPath();
        parametros.put("rutaLogo", logoPath);
        return this.reportsService.generateFromTemplate(EVOLUCION_ELECTORAL_TEMPLATE, parametros, null);
    }
}