-- -----------------------------------------------------------------------------------------------
-- EDATOS-5072 - Eliminar menciones de ISTAC Canarias de SIE en preparación de su puesta en marcha en IBESTAT
-- -----------------------------------------------------------------------------------------------

-- La propiedad ya puede existir por haberla creado otra aplicación.
INSERT INTO TB_DATA_CONFIGURATIONS (ID, VERSION, SYSTEM_PROPERTY, CONF_KEY, CONF_VALUE, EXTERNALLY_PUBLISHED)
VALUES (GET_NEXT_SEQUENCE_VALUE('DATA_CONFIGURATIONS'), 1, true, 'edatos.shared.first_territory', 'CCAA_CANARIAS', true)
ON CONFLICT (CONF_KEY) DO NOTHING;
-- Ejemplo DEMO:            INSERT INTO TB_DATA_CONFIGURATIONS (ID, VERSION, SYSTEM_PROPERTY, CONF_KEY, CONF_VALUE, EXTERNALLY_PUBLISHED) VALUES (GET_NEXT_SEQUENCE_VALUE('DATA_CONFIGURATIONS'), 1, true, 'edatos.shared.first_territory', 'CCAA_CANARIAS', true) ON CONFLICT DO NOTHING;
-- Ejemplo PRO ISTAC:       INSERT INTO TB_DATA_CONFIGURATIONS (ID, VERSION, SYSTEM_PROPERTY, CONF_KEY, CONF_VALUE, EXTERNALLY_PUBLISHED) VALUES (GET_NEXT_SEQUENCE_VALUE('DATA_CONFIGURATIONS'), 1, true, 'edatos.shared.first_territory', 'CCAA_CANARIAS', true) ON CONFLICT DO NOTHING;
-- Ejemplo PRO IBESTAT:     INSERT INTO TB_DATA_CONFIGURATIONS (ID, VERSION, SYSTEM_PROPERTY, CONF_KEY, CONF_VALUE, EXTERNALLY_PUBLISHED) VALUES (GET_NEXT_SEQUENCE_VALUE('DATA_CONFIGURATIONS'), 1, true, 'edatos.shared.first_territory', 'CCAA_ILLES_BALEARS', true) ON CONFLICT DO NOTHING;

UPDATE TB_SEQUENCES
SET SEQUENCE_NEXT_VALUE = SEQUENCE_NEXT_VALUE + 1
WHERE SEQUENCE_NAME = 'DATA_CONFIGURATIONS';

-- Elimina propiedad antigua, ahora obsoleta.
DELETE FROM TB_DATA_CONFIGURATIONS
WHERE CONF_KEY = 'metamac.sie.firstTerritoryHierarchyLevel';

commit;