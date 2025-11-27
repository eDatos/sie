# UPGRADE - Proceso de actualización entre versiones

*Para actualizar de una versión a otra es suficiente con actualizar el WAR a la última versión. El siguiente listado
presenta aquellos cambios de versión en los que no es suficiente con actualizar y que requieren por parte del instalador
tener más cosas en cuenta. Si el cambio de versión engloba varios cambios de versión del listado, estos han de
ejecutarse en orden de más antiguo a más reciente.*

*De esta forma, si tuviéramos una instalación en una versión **A.B.C** y quisieramos actualizar a una versión
posterior **X.Y.Z** para la cual existan versiones anteriores que incluyan cambios listados en este documento, se deberá
realizar la actualización pasando por todas estas versiones antes de poder llegar a la versión deseada.*

*EJEMPLO: Queremos actualizar desde la versión 1.0.0 a la 3.0.0 y existe un cambio en la base de datos en la
actualización de la versión 1.0.0 a la 2.0.0.*

*Se deberá realizar primero la actualización de la versión 1.0.0 a la 2.0.0 y luego desde la 2.0.0 a la 3.0.0*

## 2.15.0 a 2.15.1-SNAPSHOT
* Esta versión tiene como dependencia complementos-apps en su versión 8.19.1-SNAPSHOT

## 2.12.1 a 2.13.0

* Solo en los entornos del IBESTAT es necesario ejecutar los scripts SQL contenidos en la carpeta
`etc/changes-from-release/2.12.1/db/sie/postgresql`.

## 2.11.0 a 2.12.0

* Es necesario ejecutar los scripts SQL contenidos en la carpeta
`etc/changes-from-release/2.11.0/db/common-metadata/postgresql`.

## 2.6.0 a 2.6.1

* Es necesario ejecutar los scripts SQL contenidos en la carpeta
`etc/changes-from-release/2.6.0/db/common-metadata/postgresql`.

## 2.4.0 a 2.5.0

* Es necesario ejecutar los scripts SQL contenidos en la carpeta
`etc/changes-from-release/2.4.0/db/common-metadata/postgresql`.

## 2.1.2 a 2.2.0

* Es necesario ejecutar los scripts SQL contenidos en la carpeta
`etc/changes-from-release/2.1.2/db/common-metadata/postgresql`.

## 0.0.0 a 2.1.2

* El proceso de actualizaciones entre versiones para versiones anteriores a la 2.1.2 está definido en "Metamac - Manual
  de instalación.doc"
