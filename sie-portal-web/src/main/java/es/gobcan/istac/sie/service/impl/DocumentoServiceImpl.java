package es.gobcan.istac.sie.service.impl;

import java.io.ByteArrayInputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.text.NumberFormat;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import es.gobcan.istac.sie.config.Constants;
import es.gobcan.istac.sie.service.DocumentoService;
import es.gobcan.istac.sie.service.ReportsService;
import es.gobcan.istac.sie.web.rest.dto.EvolucionElectoralDTO;
import es.gobcan.istac.sie.web.rest.dto.ResultadoElectoralDTO;
import es.gobcan.istac.sie.web.rest.errors.CustomParameterizedException;
import es.gobcan.istac.sie.web.rest.errors.ErrorConstants;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Service
public class DocumentoServiceImpl implements DocumentoService {

    private static final String LOGO_CABECERA                                    = "logo_istac.png";
    private static final String EVOLUCION_ELECTORAL_TEMPLATE                     = "evolucion-electoral.jasper";
    private static final String RESULTADO_ELECTORAL_TEMPLATE                     = "resultado-electoral.jasper";
    private static final String RUTA_RELATIVA_DIRECTORIO_SUBINFORME              = "./jasper/";
    private static final String EXCEPCION_RUTA_LOGO_CABECERA_EVOLUCION_ELECTORAL = "Error al construir URI al logo cabecera de evolución electoral";

    private static final Logger LOGGER                                           = LoggerFactory.getLogger(DocumentoServiceImpl.class);

    private ReportsService      reportsService;
    private MessageSource       messageSource;

    public DocumentoServiceImpl(ReportsService reportsService, MessageSource messageSource) {
        this.reportsService = reportsService;
        this.messageSource = messageSource;
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

    @Override
    public byte[] generarPdfResultadoElectoral(ResultadoElectoralDTO resultadoElectoral, byte[] grafica) {
        try {
            LOGGER.debug("Request to print electoral results");

            Map<String, Object> parametros = new HashMap<>();
            parametros.put("GRAFICA", new ByteArrayInputStream(grafica));
            parametros.put("TERRITORIO", resultadoElectoral.getTerritorio());
            parametros.put("TIPO_ELECCIONES", messageSource.getMessage("report.header." + resultadoElectoral.getProcesoElectoral().getTipoProcesoElectoral(), null, Locale.getDefault()));
            parametros.put("ANNO_ELECCIONES", Integer.toString(getYear(resultadoElectoral)));
            parametros.put("DATA_SOURCE", new JRBeanCollectionDataSource(Collections.singletonList(resultadoElectoral.getProcesoElectoral())));
            parametros.put("SUBREPORT_DIR", RUTA_RELATIVA_DIRECTORIO_SUBINFORME);
            parametros.put("RUTA_LOGO", new URI(this.getClass().getResource(Constants.CARPETA_JASPER_REPORT + LOGO_CABECERA).toString()).getPath());
            parametros.put("RESULTADOS_ELECTORALES_PARTIDOS", new JRBeanCollectionDataSource(resultadoElectoral.getData()));
            parametros.put("INT_FORMATTER", getIntFormatter());
            parametros.put("FLOAT_FORMATTER", getFloatFormatter());

            return this.reportsService.generateFromTemplate(RESULTADO_ELECTORAL_TEMPLATE, parametros, null);
        } catch (URISyntaxException e) {
            throw new CustomParameterizedException(EXCEPCION_RUTA_LOGO_CABECERA_EVOLUCION_ELECTORAL, e, ErrorConstants.ERROR_GENERANDO_PDF,
                    this.getClass().getResource(Constants.CARPETA_JASPER_REPORT + LOGO_CABECERA).toString());

        }
    }

    private int getYear(ResultadoElectoralDTO resultadoElectoral) {
        // https://stackoverflow.com/questions/9243578/java-util-date-and-getyear
        Date date = resultadoElectoral.getProcesoElectoral().getFechaEleccion();
        Calendar calendar = new GregorianCalendar();
        calendar.setTime(date);
        return calendar.get(Calendar.YEAR);
    }

    private NumberFormat getIntFormatter() {
        return NumberFormat.getNumberInstance(new java.util.Locale("es", "ES"));
    }

    private NumberFormat getFloatFormatter() {
        NumberFormat floatFormatter = NumberFormat.getNumberInstance(new java.util.Locale("es", "ES"));
        floatFormatter.setMinimumFractionDigits(2);
        floatFormatter.setMaximumFractionDigits(2);
        return floatFormatter;
    }
}

