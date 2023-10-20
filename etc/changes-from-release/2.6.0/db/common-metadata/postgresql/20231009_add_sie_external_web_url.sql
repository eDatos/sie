-- -----------------------------------------------------------------------------------------------
-- EDATOS-4083 - Modificar aplicaciones que se autentican con external-users para que lo hagan a través de complementos-apps
-- -----------------------------------------------------------------------------------------------

-- Añade propiedad que apunte a la URL de la aplicación SIE externa
INSERT INTO TB_DATA_CONFIGURATIONS (ID, VERSION, SYSTEM_PROPERTY, CONF_KEY, CONF_VALUE, EXTERNALLY_PUBLISHED)
VALUES (GET_NEXT_SEQUENCE_VALUE('DATA_CONFIGURATIONS'), 1, true, 'metamac.sie.web.external.url', 'FILL_ME', true);
-- Ejemplo DESARROLLO: INSERT INTO TB_DATA_CONFIGURATIONS (ID, VERSION, SYSTEM_PROPERTY, CONF_KEY, CONF_VALUE, EXTERNALLY_PUBLISHED) VALUES (GET_NEXT_SEQUENCE_VALUE('DATA_CONFIGURATIONS'), 1, true, 'metamac.sie.web.external.url', 'https://estadisticas.arte-consultores.com/sie', true);
-- Ejemplo PRE ISTAC: INSERT INTO TB_DATA_CONFIGURATIONS (ID, VERSION, SYSTEM_PROPERTY, CONF_KEY, CONF_VALUE, EXTERNALLY_PUBLISHED) VALUES (GET_NEXT_SEQUENCE_VALUE('DATA_CONFIGURATIONS'), 1, true, 'metamac.sie.web.external.url', 'https://www3-pre.gobiernodecanarias.org/istac/elecciones', true);
-- Ejemplo PRO ISTAC: INSERT INTO TB_DATA_CONFIGURATIONS (ID, VERSION, SYSTEM_PROPERTY, CONF_KEY, CONF_VALUE, EXTERNALLY_PUBLISHED) VALUES (GET_NEXT_SEQUENCE_VALUE('DATA_CONFIGURATIONS'), 1, true, 'metamac.sie.web.external.url', 'https://www3.gobiernodecanarias.org/istac/elecciones', true);

UPDATE TB_SEQUENCES
SET SEQUENCE_NEXT_VALUE = SEQUENCE_NEXT_VALUE + 1
WHERE SEQUENCE_NAME = 'DATA_CONFIGURATIONS';

commit;
