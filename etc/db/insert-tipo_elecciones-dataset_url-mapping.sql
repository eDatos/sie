-- Script de inserción de un mapeo entre tipo de elecciones y su multidataset.

-- Ejemplo:
-- insert into tb_tipo_elecciones_dataset_url (tipo_elecciones, dataset_url) values ('MUNICIPALES', '/multidatasets/ISTAC/C00010A_000003');

insert into tb_tipo_elecciones_dataset_url (tipo_elecciones, dataset_url) values ('FILL_TIPO_ELECCIONES', 'FILL_DATASET_URL');
commit;