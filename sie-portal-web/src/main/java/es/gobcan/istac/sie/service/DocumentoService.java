package es.gobcan.istac.sie.service;

import es.gobcan.istac.sie.web.rest.dto.EvolucionElectoralDTO;

public interface DocumentoService {

    byte[] generarPdfEvolucionElectoral(EvolucionElectoralDTO evolucionElectoral, byte[] grafica);
}