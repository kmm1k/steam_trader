#!/bin/sh
# Written by: LM
if [[ -n "$1" ]] ; then
	PROJECT_NAME=$1
else
	PROJECT_NAME="steam_trader"
fi

if [[ -n "$2" ]] ; then
	BRANCH=$2
else
	BRANCH="master"
fi

cd /var/www/bin/$PROJECT_NAME
git reset --hard origin/$BRANCH
git clean -f
git pull
git checkout $BRANCH

npm install

forever stop /var/www/bin/$PROJECT_NAME/bin/www
sleep 5
forever start /var/www/bin/$PROJECT_NAME/bin/www
echo "#-----------------------------------------------#"
echo "#              Execution Completed              #"
echo "#-----------------------------------------------#"