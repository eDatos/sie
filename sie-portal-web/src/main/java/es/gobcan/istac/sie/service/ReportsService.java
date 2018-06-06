package es.gobcan.istac.sie.service;

import java.util.List;
import java.util.Map;

public interface ReportsService {

    byte[] generateFromTemplate(String templateFile, Map<String, Object> params, List<? extends Object> dataSource);
}