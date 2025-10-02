-- Script de inserci�n de un mapeo entre tipo de elecciones y su multidataset.

insert into tb_tipo_elecciones_dataset_url (tipo_elecciones, dataset_url) values ('MUNICIPALES', '/multidatasets/ISTAC/C00010A_000003');
insert into tb_tipo_elecciones_dataset_url (tipo_elecciones, dataset_url) values ('CABILDO', '/multidatasets/ISTAC/C00010A_000002');
insert into tb_tipo_elecciones_dataset_url (tipo_elecciones, dataset_url) values ('AUTONOMICAS', '/multidatasets/ISTAC/C00010A_000007');
insert into tb_tipo_elecciones_dataset_url (tipo_elecciones, dataset_url) values ('CONGRESO', '/multidatasets/ISTAC/C00010A_000001');
insert into tb_tipo_elecciones_dataset_url (tipo_elecciones, dataset_url) values ('SENADO', '/multidatasets/ISTAC/C00010A_000006');
insert into tb_tipo_elecciones_dataset_url (tipo_elecciones, dataset_url) values ('PARLAMENTO_EUROPEO', '/multidatasets/ISTAC/C00010A_000004');
insert into tb_tipo_elecciones_dataset_url (tipo_elecciones, dataset_url) values ('REFERENDUM', '/multidatasets/ISTAC/C00010A_000005');

commit;