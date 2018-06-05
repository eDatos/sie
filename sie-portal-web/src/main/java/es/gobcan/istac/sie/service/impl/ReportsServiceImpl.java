package es.gobcan.istac.sie.service.impl;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import es.gobcan.istac.sie.config.Constants;
import es.gobcan.istac.sie.service.ReportsService;
import es.gobcan.istac.sie.web.rest.errors.CustomParameterizedException;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.engine.util.JRLoader;
import net.sf.jasperreports.export.ExporterInput;
import net.sf.jasperreports.export.OutputStreamExporterOutput;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;

@Service
public class ReportsServiceImpl implements ReportsService {

    private static final String ERROR_JASPER_REPORTS_GENERATING = "error.jasperreports.generating";
    private static final String ERROR_WHILE_GENERATING_JASPER_REPORT_MESSAGE = "Error while generating Jasper Report";
    
    private static final Logger LOGGER = LoggerFactory.getLogger(ReportsServiceImpl.class);

    @Override
    public byte[] generateFromTemplate(String templateFile, Map<String, Object> templateParams, List<? extends Object> dataSourceList) {
        try (InputStream resourceAsStream = getClass().getResourceAsStream(Constants.CARPETA_JASPER_REPORT + templateFile); OutputStream outputStream = new ByteArrayOutputStream()) {
            Map<String, Object> params = new HashMap<>();
            if (templateParams != null) {
                params.putAll(templateParams);
            }
            JasperReport compileReport = (JasperReport) JRLoader.loadObject(resourceAsStream);
            JRDataSource dataSource;
            if (dataSourceList != null) {
                dataSource = new JRBeanCollectionDataSource(dataSourceList);
            } else {
                dataSource = new JREmptyDataSource();
            }

            JasperPrint fillReport = JasperFillManager.fillReport(compileReport, params, dataSource);
            JRPdfExporter exporter = new JRPdfExporter();
            ExporterInput exportedInput = new SimpleExporterInput(fillReport);
            OutputStreamExporterOutput exporterOutput = new SimpleOutputStreamExporterOutput(outputStream);
            exporter.setExporterInput(exportedInput);
            exporter.setExporterOutput(exporterOutput);
            exporter.exportReport();

            return ((ByteArrayOutputStream) outputStream).toByteArray();
        } catch (JRException | IOException e) {
            LOGGER.error(ERROR_WHILE_GENERATING_JASPER_REPORT_MESSAGE, e);
            throw new CustomParameterizedException(ERROR_JASPER_REPORTS_GENERATING, ERROR_WHILE_GENERATING_JASPER_REPORT_MESSAGE);
        }
    }
}