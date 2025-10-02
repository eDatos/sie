-- -----------------------------------------------------------------------------------------------
-- EDATOS-5072 - Eliminar menciones de ISTAC Canarias de SIE en preparación de su puesta en marcha en IBESTAT
-- -----------------------------------------------------------------------------------------------

INSERT INTO tb_tipo_elecciones_dataset_url (tipo_elecciones, dataset_url) VALUES ('EVOLUCION_ELECTORAL', '/datasets/IBESTAT/000199A_000026/~latest.json');
INSERT INTO tb_tipo_elecciones_dataset_url (tipo_elecciones, dataset_url) VALUES ('MUNICIPALES', '/multidatasets/IBESTAT/000199A_000004');
INSERT INTO tb_tipo_elecciones_dataset_url (tipo_elecciones, dataset_url) VALUES ('CONSEJO_INSULAR', '/multidatasets/IBESTAT/000199A_000005');
INSERT INTO tb_tipo_elecciones_dataset_url (tipo_elecciones, dataset_url) VALUES ('AUTONOMICAS', '/multidatasets/IBESTAT/000199A_000006');
INSERT INTO tb_tipo_elecciones_dataset_url (tipo_elecciones, dataset_url) VALUES ('CONGRESO', '/multidatasets/IBESTAT/000199A_000007');
INSERT INTO tb_tipo_elecciones_dataset_url (tipo_elecciones, dataset_url) VALUES ('SENADO', '/multidatasets/IBESTAT/000199A_000008');
INSERT INTO tb_tipo_elecciones_dataset_url (tipo_elecciones, dataset_url) VALUES ('PARLAMENTO_EUROPEO', '/multidatasets/IBESTAT/000199A_000009');

COMMIT;
