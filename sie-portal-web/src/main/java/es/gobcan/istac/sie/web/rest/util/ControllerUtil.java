package es.gobcan.istac.sie.web.rest.util;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.http.HttpServletResponse;

import org.springframework.util.StreamUtils;

public final class ControllerUtil {

    private static void copyContentToResponse(InputStream inputStream, String name, String contentType, Long length, HttpServletResponse response) throws IOException {
        if (length != null) {
            response.setContentLength(length.intValue());
        }
        response.setContentType(contentType);
        response.setHeader("Content-Disposition", String.format("attachment; filename=\"%s\"", name));
        try (OutputStream os = response.getOutputStream()) {
            StreamUtils.copy(inputStream, os);
        }
    }
}