#!/bin/sh


	PROJECT_NAME="steam_trader"


	BRANCH="master"


cd /var/www/bin/$PROJECT_NAME
git reset --hard origin/$BRANCH
git clean -f
git pull
git checkout $BRANCH

npm install

forever stop bin/www
forever start bin/www
echo "#-----------------------------------------------#"
echo "#              Execution Completed              #"
echo "#-----------------------------------------------#"