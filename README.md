# Elecciones

El módulo sie-graphics (visualizador) se copia del siguiente commit de metamac-portal-web-client (metamac-portal): 908e4dfae8a133b19c63232b3299b4c4f0334c0e con fecha 10 de mayo de 2018 a las 15:47:08.

----------

## Introducción

### Descripción de la aplicación
La aplicación SIE es un visualizador de resultados electorales del ISTAC.

### Requerimientos previos

#### Requisitos del entorno
En este apartado se especifican los requisitos necesarios, referidos al entorno, para que la aplicación funcione adecuadamente:
- Apache Tomcat.  8.5
- Java. 1.8.x
- PostgreSQL 9.6.2


### Componentes de la instalación
SIE consta de una aplicación con interfaz web y un servicio web REST.


----------

## Procedimiento de instalación desde cero

### Paso 1. Configuración del entorno
- Configuración del servidor de aplicaciones según los requisitos del entorno ya especificados.
- Configuración de la base de datos. 
    1. La aplicación cuenta con un mecanismo para llevar a cabo la gestión de los cambios de base de datos de manera automatizada (liquidbase).
    2. A priori lo único que es necesario es crear en la aplicación el esquema de base de datos que se va a utilizar.
    3. Por otra parte, será necesario que el usuario que use la aplicación tenga permisos para la creación de objetos sobre el esquema anterior.
    4. De esta forma la aplicación, en el momento de arrancar, llevará a cabo la creación de todos los objetos que sean necesarios sobre la base de datos.

### Paso 2. Despliegue en servidor de aplicaciones.
- Ubicar el archivo *.war compilado con el perfil adecuado en el servidor de aplicaciones. Se pueden obtener más detalles en el [Anexo de perfiles de compilación](#anexo-perfiles-de-compilaci%C3%B3n). 
- Definir si se desea externalizar la configuración de la aplicación o mantener dentro del propio archivo war.
    1. Si no se desea externalizar la configuración de las propiedades a un directorio DATA se puede omitir este paso.
    2. Si se desea externalizar la configuración de las propiedades a un directorio DATA se tendrán que realizar los siguientes pasos:
        - Se hará una copia del archivo **sie.war/WEB-INF/classes/config/application-env.yml** a un directorio externalizado de su elección.
        - Se editará el archivo **sie.war/WEB-INF/classes/config/data-location.properties** y se especificará la ruta anterior.
- Se cumplimentarán las propiedades del fichero **application-env.yml**. Se puede consultar el detalle sobre cada una de las propiedades en el [Anexo de descripción de propiedades de configuración](#anexo-descripci%C3%B3n-de-las-propiedades-de-configuraci%C3%B3n).


### Paso 3. Configuración de logging.
Pueden modificarse los ficheros relacionados con la configuración de logging en **sie.war/WEB-INF/classes/logback.xml**.

### Paso 4. Arrancar la aplicación.

----------

## Anexo. Descripción de las propiedades de configuración
- `spring.datasource.url`
   - Cadena de conexión a la base de datos.
- `spring.datasource.username`
   - Nombre del usuario de conexión a la base de datos.
- `spring.datasource.password`
   - Password de conexión a la base de datos.
- `spring.jpa.show-sql`
   - Permite añadir al log las sentencias SQL.
- `debug`
   - Permite aumentar el nivel de log a DEBUG.    
- `application.metadata.endpoint`
   - URL de metamac-common-metadata, incluyendo versión y sin barra al final. Por ejemplo: http://www.entorno.com/cmetadata/v1.0
- `application.metadata.installationType`
   - Tipo de instalación que se está realizando. Puede tomar los siguientes valores: EXTERNAL, INTERNAL

## Anexo. Perfiles de compilación

La aplicación se compila con [Maven][], por lo que para poder compilar la misma debemos tener instalado en nuestro entorno esta herramienta.

A la hora de compilar la aplicación podemos especificar un perfil. En función del perfil que especifiquemos, la aplicación se compilará para ser instalada en un servidor de aplicaciones real, o para ser usada en un entorno de desarrollo.

Existen dos perfiles de compilación que podemos especificar según el entorno: `dev` para entorno de desarrollo y `env` para entornos de producción.

En la aplicación existirá un archivo general `application.yml` en el que se ubicarán todas las propiedades de configuración comunes a todos los perfiles y que rara vez se editan.

Para configurar cada entorno, también existirán archivos específicos con las propiedades que pueden ser modificadas por el usuario y dependientes del entorno, teniendo así un fichero `application-env.yml` para configurar las propiedades del entorno de producción, y un `application-dev.yml` para el entorno de desarrollo.

Cuando compilemos el proyecto, se usará una configuración u otra en función del perfil indicado durante la compilación. Hay que tener en cuenta que, en el caso de que una misma propiedad exista tanto en el fichero general `application.yml` como en el dependiente del entorno, tendrá preferencia el valor configurado en el fichero de configuración del entorno.

Para proceder a instalar la aplicación en un servidor de aplicaciones, debemos compilar la misma con el perfil de producción. Sin embargo, si vamos a proceder a modificar la aplicación en nuestro entorno de desarrollo, bastará con que compilemos la aplicación con el perfil de desarrollo. 

Para compilar el proyecto con el perfil de producción es necesario ejecutar lo siguiente:

```bash
mvn clean install -Penv
```

Por otro lado, para compilar el proyecto con el perfil de desarrollo es necesario ejecutar:

```bash
mvn clean install -Pdev
```

Por defecto, si no se especifica un perfil, la aplicación se compila con el perfil de desarrollo `dev`.

Hay que tener presente que si la aplicación se compila con el perfil de desarrollo, para terminar de construir la misma y poder ejecutarla es necesario seguir los pasos descritos en el [Anexo de desarrollo](#anexo-desarrollo).

## Anexo. Desarrollo

A continuación se describen los pasos a seguir para configurar el entorno de desarrollo sobre el cual podamos arrancar y modificar la aplicación.

En primer lugar, tal y como se describe en el [Anexo Perfiles de compilación](#anexo-perfiles-de-compilaci%C3%B3n), debemos compilar la aplicación con Maven.  Para trabajar en un entorno de desarrollo, basta que la compilemos con el perfil `dev`.

A continuación, para terminar de construir la aplicación, es necesario instalar las siguientes dependencias:

1. [Node.js][]: Lo usamos para levantar un servidor de desarrollo y construir el proyecto.

2. [Yarn][]: Lo usamos para manejar las dependencias de Node.

Estas herramientas nos permitirán trabajar de forma sencilla con los ficheros y las dependencias de la capa cliente de la aplicación (JavaScript). 

El siguiente paso es instalar las dependencias que se necesitan para trabajar con JavaScript en el proyecto. Para ello debe ejecutarse el comando:

    yarn install

Generalmente este comando sólo es necesario ejecutarlo cuando modifiquemos las dependencias especificadas en nuestro proyecto (fichero [package.json](package.json)). 

Realizados los pasos anteriores, podemos proceder a arrancar la aplicación en "modo desarrollo".  Para ello necesitamos:

 1. Arrancar la parte servidora de la aplicación. Esto lo podemos hacer ejecutando la clase [SieApp](src/main/java/es/gobcan/istac/sie/SieApp.java). Al ejecutar esta clase se estamos levantando un servidor Tomcat embebido. Este Tomcat embebido nos permite desarrollar de forma más rápida y eficiente. 
 2. Ejecutar el siguiente comando de `yarn`:

    yarn start

Este comando arranca la parte cliente de la aplicación. Al ejecutar `yarn start` se abrirá una ventana en el navegador con la aplicación. Por defecto, la aplicación estará disponible en la URL [http://localhost:9000](http://localhost:9000).

A continuación, podemos comenzar a modificar los ficheros que deseemos en la aplicación. 
Si modificamos algún fichero de la parte servidora de la aplicación (ficheros Java y ficheros de configuración), debemos reiniciar el servidor Tomcat embebido que hemos levantado. 
Si modificamos algún fichero de la parte cliente de la aplicación (ficheros TS, CSS, HTML...), la aplicación se recargará de forma automática y podremos ver dichos cambios aplicados de forma inmediata en el navegador. Si modificamos algún fichero del módulo sie-graphics tendremos que ejecutar el siguiente comando en el directorio de dicho módulo:

    grunt dev


### Más información
La base de la aplicación ha sido generada usando JHipster 4.6.2. Puede consultarse más información en la [página oficial](http://www.jhipster.tech/documentation-archive/v4.6.2 "JHipster").


[Node.js]: https://nodejs.org/
[Yarn]: https://yarnpkg.org/
[Webpack]: https://webpack.github.io/
[Karma]: http://karma-runner.github.io/
[Jasmine]: http://jasmine.github.io/2.0/introduction.html
[Maven]: https://maven.apache.org/
[JUnit]: http://junit.org