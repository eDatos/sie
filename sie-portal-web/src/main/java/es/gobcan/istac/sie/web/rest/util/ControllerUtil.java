package es.gobcan.istac.sie.web.rest.util;

import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StreamUtils;

import es.gobcan.istac.sie.web.rest.errors.CustomParameterizedException;
import es.gobcan.istac.sie.web.rest.errors.ErrorConstants;

public final class ControllerUtil {

    private static final Logger LOGGER = LoggerFactory.getLogger(ControllerUtil.class);
    
    private ControllerUtil() {
        super();
    }
    
    public static void download(byte[] documento, String nombre, HttpServletResponse response) {
        try (OutputStream os = response.getOutputStream()) {
            response.setContentLength(documento.length);
            response.setContentType("application/pdf");
            response.setHeader("Content-Disposition", String.format("attachment; filename=\"%s\"", nombre));
            StreamUtils.copy(documento, os);
        } catch (IOException e) {
            LOGGER.error("Exception obtaining the file.", e);
            throw new CustomParameterizedException(String.format("Exception obtaining file"), ErrorConstants.FICHERO_NO_ENCONTRADO);
        }
    }
}