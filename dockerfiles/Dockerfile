###
# Dockerfile usado para consutruir la imagen del SIE
#
# Antes de construir la imagen debemos haber compilado previamente el proyecto (desde el directorio raíz):
#
# mvn clean package -Penv
#
# A continuación podremos construir la imagen ejecutando siempre desde el directorio raíz del proyecto:
#
# docker build -f dockerfiles/Dockerfile -t sie:<version> .
#
# Para ejecutar un contenedor asociado a esta imagen:
# docker run -i --rm -p 8080:8080 sie:<version>
#
# Para ejecutar con opciones de debug habilitadas:
# docker run -i --rm \
# -e JAVA_OPTS="-agentlib:jdwp=transport=dt_socket,address=5005,server=y,suspend=n" \
# -p 8080:8080 \
# -p 5005:5005 \
# sie:<version>
###
FROM eclipse-temurin:8-jdk
LABEL MAINTAINER=info@arte-consultores.com

RUN mkdir -p /data/edatos/sie/conf

COPY dockerfiles/conf /data/edatos/sie/conf
COPY sie-portal-web/target/*.war /data/edatos/sie/sie.war

# Definir variables de entorno con ubicaciones externas de configuración
ENV SPRING_CONFIG_LOCATION=file:/data/edatos/sie/conf/
ENV DATA_LOCATION_CONFIG=file:/data/edatos/sie/conf/data-location.properties
ENV LANG='es_ES.UTF-8'

# Exponer el puerto típico de Spring Boot
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/data/edatos/sie/sie.war"]
