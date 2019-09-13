-- Script de inserción de un mapeo entre tipo de elecciones y su multidataset.

update tb_tipo_elecciones_dataset_url set dataset_url = '/multidatasets/ISTAC/C00010A_000001' where tipo_elecciones = 'CONGRESO';
update tb_tipo_elecciones_dataset_url set dataset_url = '/multidatasets/ISTAC/C00010A_000002' where tipo_elecciones = 'CABILDO';
update tb_tipo_elecciones_dataset_url set dataset_url = '/multidatasets/ISTAC/C00010A_000003' where tipo_elecciones = 'MUNICIPALES';
update tb_tipo_elecciones_dataset_url set dataset_url = '/multidatasets/ISTAC/C00010A_000004' where tipo_elecciones = 'PARLAMENTO_EUROPEO';
update tb_tipo_elecciones_dataset_url set dataset_url = '/multidatasets/ISTAC/C00010A_000005' where tipo_elecciones = 'REFERENDUM';
update tb_tipo_elecciones_dataset_url set dataset_url = '/multidatasets/ISTAC/C00010A_000006' where tipo_elecciones = 'SENADO';
update tb_tipo_elecciones_dataset_url set dataset_url = '/multidatasets/ISTAC/C00010A_000007' where tipo_elecciones = 'AUTONOMICAS';

commit;