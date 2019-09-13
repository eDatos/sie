-- --------------------------------------------------------------------------------
-- METAMAC-2837 - Limpiar de la aplicación las cuestiones relativas a CAS y e-mail
-- --------------------------------------------------------------------------------

insert into tb_tipo_elecciones_dataset_url (tipo_elecciones, dataset_url) values ('EVOLUCION_ELECTORAL', '/datasets/ISTAC/C00010A_000001/~latest.json');
commit;