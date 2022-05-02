package es.gobcan.istac.sie.service;

import es.gobcan.istac.sie.web.rest.dto.EvolucionElectoralDTO;
import es.gobcan.istac.sie.web.rest.dto.ResultadoElectoralDTO;

public interface DocumentoService {

    byte[] generarPdfEvolucionElectoral(EvolucionElectoralDTO evolucionElectoral, byte[] grafica);
    byte[] generarPdfResultadoElectoral(ResultadoElectoralDTO resultadoElectoral, byte[] grafica);
}

