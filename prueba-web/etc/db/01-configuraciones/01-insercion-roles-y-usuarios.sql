-- Crea el rol y se le asigna todos las operaciones
SELECT add_rol_with_all_operaciones('RELLENAR_CODIGO_ROL', 'RELLENAR_NOMBRE_ROL');

-- Crea un usuario y se le asigna un rol existente
SELECT add_usuario_with_existing_rol('RELLENAR_USUARIO_LDAP', 'RELLENAR_NOMBRE_USUARIO', 'RELLENAR_PRIMER_APPELLIDO_USUARIO', 'RELLENAR_SEGUNDO_APPELLIDO_USUARIO', 'RELLENAR_CORREO_ELECTRONICO_USUARIO', 'RELLENAR_CODIGO_ROL_EXISTENTE');
