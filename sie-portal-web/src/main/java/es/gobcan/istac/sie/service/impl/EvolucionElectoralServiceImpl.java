package es.gobcan.istac.sie.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import es.gobcan.istac.sie.domain.Idioma;
import es.gobcan.istac.sie.service.EvolucionElectoralService;

@Service
public class EvolucionElectoralServiceImpl implements EvolucionElectoralService {

    private static final Logger LOGGER = LoggerFactory.getLogger(EvolucionElectoralServiceImpl.class);

    public EvolucionElectoralServiceImpl() {
    }

    @Override
    public Idioma save(Idioma idioma) {
        LOGGER.debug("Request to save Idioma : {}", idioma);
        return null;
    }
}
