-- -----------------------------------------------------------------------------------------------
-- EDATOS-5072 - Eliminar menciones de ISTAC Canarias de SIE en preparación de su puesta en marcha en IBESTAT
-- -----------------------------------------------------------------------------------------------

-- Edita la clave y el valor de la propiedad actual al nuevo valor
UPDATE TB_DATA_CONFIGURATIONS
SET CONF_KEY = 'edatos.shared.first_territory', CONF_VALUE = 'CCAA_CANARIAS'
WHERE CONF_KEY = 'metamac.sie.firstTerritoryHierarchyLevel';
-- Ejemplo DEMO:            UPDATE TB_DATA_CONFIGURATIONS SET CONF_KEY = 'edatos.shared.first_territory', CONF_VALUE = 'CCAA_CANARIAS' WHERE CONF_KEY = 'metamac.sie.firstTerritoryHierarchyLevel';
-- Ejemplo PRO ISTAC:       UPDATE TB_DATA_CONFIGURATIONS SET CONF_KEY = 'edatos.shared.first_territory', CONF_VALUE = 'CCAA_CANARIAS' WHERE CONF_KEY = 'metamac.sie.firstTerritoryHierarchyLevel';
-- Ejemplo PRO IBESTAT:     UPDATE TB_DATA_CONFIGURATIONS SET CONF_KEY = 'edatos.shared.first_territory', CONF_VALUE = 'CCAA_ILLES_BALEARS' WHERE CONF_KEY = 'metamac.sie.firstTerritoryHierarchyLevel';

commit;