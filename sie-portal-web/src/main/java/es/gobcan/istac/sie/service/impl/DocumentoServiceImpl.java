package es.gobcan.istac.sie.service.impl;

import es.gobcan.istac.sie.config.ApplicationProperties;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
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

import java.util.Objects;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.util.JRLoader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

import es.gobcan.istac.sie.config.Constants;
import es.gobcan.istac.sie.service.DocumentoService;
import es.gobcan.istac.sie.service.ReportsService;
import es.gobcan.istac.sie.web.rest.dto.EvolucionElectoralDTO;
import es.gobcan.istac.sie.web.rest.dto.ResultadoElectoralDTO;
import es.gobcan.istac.sie.web.rest.errors.CustomParameterizedException;
import es.gobcan.istac.sie.web.rest.errors.ErrorConstants;
import net.sf.jasperreports.engine.JRParameter;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Service
public class DocumentoServiceImpl implements DocumentoService {

    private static final String EVOLUCION_ELECTORAL_TEMPLATE                     = "evolucion-electoral.jasper";
    private static final String RESULTADO_ELECTORAL_TEMPLATE                     = "resultado-electoral.jasper";
    private static final String SUBINFORME_TABLAS                                = "tablas.jasper";
    private static final String SUBINFORME_TABLA_RESULTADO                       = "tabla-resultado-electoral.jasper";
    private static final String ERROR_PDF                                        = "Error al generar el PDF";

    private static final Logger LOGGER                                           = LoggerFactory.getLogger(DocumentoServiceImpl.class);

    private final ReportsService reportsService;
    private final MessageSource messageSource;
    private final ApplicationProperties applicationProperties;

    public DocumentoServiceImpl(ReportsService reportsService, MessageSource messageSource, ApplicationProperties applicationProperties) {
        this.reportsService = reportsService;
        this.messageSource = messageSource;
        this.applicationProperties = applicationProperties;
    }

    @Override
    public byte[] generarPdfEvolucionElectoral(EvolucionElectoralDTO evolucionElectoral, byte[] grafica) {
        LOGGER.debug("Request to print Evolucion Electoral");

        Map<String, Object> parametros = new HashMap<>();
        parametros.put("GRAFICA", new ByteArrayInputStream(grafica));
        parametros.put("TERRITORIO", evolucionElectoral.getTerritorio());
        parametros.put("TIPO_ELECCIONES", evolucionElectoral.getTipoElecciones());
        parametros.put("dataSource", new JRBeanCollectionDataSource(evolucionElectoral.getProcesosElectorales()));
        parametros.put("RUTA_LOGO", applicationProperties.getMetadata().getAppOrganisationLogoUrl());
        parametros.put("INT_FORMATTER", getIntFormatter());
        parametros.put(JRParameter.REPORT_LOCALE, new Locale(getLanguage()));

        try (InputStream subReport = getClass().getResourceAsStream(Constants.CARPETA_JASPER_REPORT + SUBINFORME_TABLAS)) {
            parametros.put("SUBREPORT_TABLAS", JRLoader.loadObject(subReport));
        } catch (IOException | JRException e) {
            throw new CustomParameterizedException(ERROR_PDF, e, ErrorConstants.ERROR_GENERANDO_PDF,
                    Objects.requireNonNull(this.getClass().getResource(Constants.CARPETA_JASPER_REPORT)).toString());
        }

        return this.reportsService.generateFromTemplate(EVOLUCION_ELECTORAL_TEMPLATE, parametros, null);
    }

    @Override
    public byte[] generarPdfResultadoElectoral(ResultadoElectoralDTO resultadoElectoral, byte[] grafica) {
        LOGGER.debug("Request to print electoral results");

        Map<String, Object> parametros = new HashMap<>();
        parametros.put("GRAFICA", new ByteArrayInputStream(grafica));
        parametros.put("TERRITORIO", resultadoElectoral.getTerritorio().getNombre());
        parametros.put("GRANULARIDAD", resultadoElectoral.getTerritorio().getGranularidad());
        parametros.put("TIPO_ELECCIONES", messageSource.getMessage("report.header." + resultadoElectoral.getProcesoElectoral().getTipoProcesoElectoral(), null, Locale.getDefault()));
        parametros.put("ANNO_ELECCIONES", Integer.toString(getYear(resultadoElectoral)));
        parametros.put("DATA_SOURCE", new JRBeanCollectionDataSource(Collections.singletonList(resultadoElectoral.getProcesoElectoral())));
        parametros.put("RUTA_LOGO", applicationProperties.getMetadata().getAppOrganisationLogoUrl());
        parametros.put("RESULTADOS_ELECTORALES_PARTIDOS", new JRBeanCollectionDataSource(resultadoElectoral.getData()));
        parametros.put("INT_FORMATTER", getIntFormatter());
        parametros.put("FLOAT_FORMATTER", getFloatFormatter());
        parametros.put(JRParameter.REPORT_LOCALE, new Locale(getLanguage()));

        try (InputStream subReport = getClass().getResourceAsStream(Constants.CARPETA_JASPER_REPORT + SUBINFORME_TABLA_RESULTADO)) {
            parametros.put("SUBREPORT_TABLA_RESULTADO", JRLoader.loadObject(subReport));
        } catch (IOException | JRException e) {
            throw new CustomParameterizedException(ERROR_PDF, e, ErrorConstants.ERROR_GENERANDO_PDF,
                    Objects.requireNonNull(this.getClass().getResource(Constants.CARPETA_JASPER_REPORT)).toString());
        }

        return this.reportsService.generateFromTemplate(RESULTADO_ELECTORAL_TEMPLATE, parametros, null);
    }

    private int getYear(ResultadoElectoralDTO resultadoElectoral) {
        // https://stackoverflow.com/questions/9243578/java-util-date-and-getyear
        Date date = resultadoElectoral.getProcesoElectoral().getFechaEleccion();
        Calendar calendar = new GregorianCalendar();
        calendar.setTime(date);
        return calendar.get(Calendar.YEAR);
    }

    private String getLanguage() {
        Locale locale = LocaleContextHolder.getLocale();
        return locale.toString().split("_")[0];
    }

    private NumberFormat getIntFormatter() {
        return NumberFormat.getNumberInstance(new java.util.Locale(getLanguage()));
    }

    private NumberFormat getFloatFormatter() {
        NumberFormat floatFormatter = NumberFormat.getNumberInstance(new java.util.Locale(getLanguage()));
        floatFormatter.setMinimumFractionDigits(2);
        floatFormatter.setMaximumFractionDigits(2);
        return floatFormatter;
    }
}
