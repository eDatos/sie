#!/bin/sh

HOME_PATH=sie
TRANSFER_PATH=$HOME_PATH/tmp
DEPLOY_TARGET_PATH=/servers/metamac/tomcats/sie01/webapps
DEMO_ENV=$HOME_PATH/env

scp -r etc/deploy deploy@estadisticas.arte-consultores.com:$TRANSFER_PATH
scp target/sie-portal-web-*.war deploy@estadisticas.arte-consultores.com:$TRANSFER_PATH/sie.war
ssh deploy@estadisticas.arte-consultores.com <<EOF

    chmod a+x $TRANSFER_PATH/deploy/*.sh;
    
    sudo service sie01 stop
    
    ###
    # ARTE-APPLICATION-TEMPLATE
    ###

    # Update Process
    sudo rm -rf $DEPLOY_TARGET_PATH/sie
    sudo mv $TRANSFER_PATH/sie.war $DEPLOY_TARGET_PATH/sie.war
    sudo unzip $DEPLOY_TARGET_PATH/sie.war -d $DEPLOY_TARGET_PATH/sie
    sudo rm -rf $DEPLOY_TARGET_PATH/sie.war

    # Restore Configuration
    sudo cp $DEMO_ENV/logback.xml $DEPLOY_TARGET_PATH/sie/WEB-INF/classes/
    sudo rm -f $DEPLOY_TARGET_PATH/sie/WEB-INF/classes/config/application-env.yml
    sudo cp $DEMO_ENV/data-location.properties $DEPLOY_TARGET_PATH/sie/WEB-INF/classes/config/
    
    sudo chown -R metamac.metamac /servers/metamac
    sudo service sie01 start
    

    echo "Finished deploy"

EOF