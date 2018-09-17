package es.gobcan.istac.sie.web.rest;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.support.RequestContextUtils;

import es.gobcan.istac.sie.config.ApplicationProperties;

@Controller

public class DefaultController {
    
    private final Logger log = LoggerFactory.getLogger(DefaultController.class);
    
    @Autowired
    private ApplicationProperties applicationProperties;

    @RequestMapping(value = {"", "/index.html", "/**/{path:[^\\.]*}"})
    @SuppressWarnings("unchecked")
    public ModelAndView index(HttpServletRequest request) {
        log.debug("DefaultController index: Contextpath" + request.getContextPath() + "  ServletPath = " + request.getServletPath());
        Map<String, Object> model = new HashMap<>();
        model.put("visualizer", applicationProperties.getVisualizer());
        model.put("metadata", applicationProperties.getMetadata());
        Map<String, Object> flashMap = (Map<String, Object>) RequestContextUtils.getInputFlashMap(request);
        if (flashMap != null) {
            model.putAll(flashMap);
        }
        return new ModelAndView("index", model);
    }
    
    @RequestMapping(value = {"/widget"})
    public ModelAndView widget(HttpServletRequest request) {
        log.debug("DefaultController widget: Contextpath" + request.getContextPath() + "  ServletPath = " + request.getServletPath());
        Map<String, Object> model = new HashMap<>();
        model.put("visualizer", applicationProperties.getVisualizer());
        model.put("metadata", applicationProperties.getMetadata());
        return new ModelAndView("widget", model);
    }
}
