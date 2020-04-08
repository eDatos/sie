#!/bin/sh

HOME_PATH=sie
TRANSFER_PATH=$HOME_PATH/tmp
DEMO_ENV=$HOME_PATH/env
DEPLOY_TARGET_PATH_EXTERNAL=/servers/edatos-external/tomcats/edatos-external01/webapps
DEPLOY_TARGET_PATH_INTERNAL=/servers/edatos-internal/tomcats/edatos-internal01/webapps
DATA_RELATIVE_PATH_FILE=WEB-INF/classes/config/data-location.properties
LOGBACK_RELATIVE_PATH_FILE=WEB-INF/classes/logback.xml
RESTART=1

if [ "$1" == "--no-restart" ]; then
    RESTART=0
fi

scp -o ProxyCommand="ssh -W %h:%p deploy@estadisticas.arte-consultores.com" -r etc/deploy deploy@192.168.10.16:$TRANSFER_PATH
scp -o ProxyCommand="ssh -W %h:%p deploy@estadisticas.arte-consultores.com" sie-portal-web/target/sie-portal-web-*.war deploy@192.168.10.16:$TRANSFER_PATH/sie.war
ssh -o ProxyCommand="ssh -W %h:%p deploy@estadisticas.arte-consultores.com" deploy@192.168.10.16 <<EOF

    chmod a+x $TRANSFER_PATH/deploy/*.sh;
    . $TRANSFER_PATH/deploy/utilities.sh
    
    
    ###
    # SIE - INTERNAL
    ###

    if [ $RESTART -eq 1 ]; then
        sudo service edatos-internal01 stop
        checkPROC "edatos-internal"
    fi

    # Update Process
    sudo rm -rf $DEPLOY_TARGET_PATH_INTERNAL/sie
    sudo cp $TRANSFER_PATH/sie.war $DEPLOY_TARGET_PATH_INTERNAL/sie.war
    sudo unzip $DEPLOY_TARGET_PATH_INTERNAL/sie.war -d $DEPLOY_TARGET_PATH_INTERNAL/sie
    sudo rm -rf $DEPLOY_TARGET_PATH_INTERNAL/sie.war

    # Restore Configuration
    sudo cp $DEMO_ENV/logback_internal.xml $DEPLOY_TARGET_PATH_INTERNAL/sie/$LOGBACK_RELATIVE_PATH_FILE
    sudo rm -f $DEPLOY_TARGET_PATH_INTERNAL/sie/WEB-INF/classes/config/application-env.yml
    sudo cp $DEMO_ENV/data-location_external.properties $DEPLOY_TARGET_PATH_INTERNAL/sie/$DATA_RELATIVE_PATH_FILE
    
    if [ $RESTART -eq 1 ]; then
        sudo chown -R edatos-internal.edatos-internal /servers/edatos-internal     
        sudo service edatos-internal01 start
    fi
    
    ###
    # SIE - EXTERNAL
    ###
    
    if [ $RESTART -eq 1 ]; then
        sudo service edatos-external01 stop
        checkPROC "edatos-external"
    fi
    
    # Update Process
    sudo rm -rf $DEPLOY_TARGET_PATH_EXTERNAL/sie
    sudo mv $TRANSFER_PATH/sie.war $DEPLOY_TARGET_PATH_EXTERNAL/sie.war
    sudo unzip $DEPLOY_TARGET_PATH_EXTERNAL/sie.war -d $DEPLOY_TARGET_PATH_EXTERNAL/sie
    sudo rm -rf $DEPLOY_TARGET_PATH_EXTERNAL/sie.war

    # Restore Configuration
    sudo cp $DEMO_ENV/logback_external.xml $DEPLOY_TARGET_PATH_EXTERNAL/sie/$LOGBACK_RELATIVE_PATH_FILE
    sudo rm -f $DEPLOY_TARGET_PATH_EXTERNAL/sie/WEB-INF/classes/config/application-env.yml
    sudo cp $DEMO_ENV/data-location_internal.properties $DEPLOY_TARGET_PATH_EXTERNAL/sie/$DATA_RELATIVE_PATH_FILE
    
    if [ $RESTART -eq 1 ]; then
        sudo chown -R edatos-external.edatos-external /servers/edatos-external        
        sudo service edatos-external01 start
    fi

    echo "Finished deploy"

EOF