#!/bin/bash
echo "############################################"
echo "EXECUTING DEPLOYMENT SCRIPT"
echo "############################################"
echo " "

echo "-------------------------------------"
echo "Current Branch: ${GIT_BRANCH}"
echo "-------------------------------------"
echo " "

echo "-------------------------------------"
echo "Execute this script ONLY if current branch = Master"
echo "-------------------------------------"
echo " "
if [ ${GIT_BRANCH} == "master" ] || [ ${GIT_BRANCH} == "origin/master" ]
then

  echo "############################################"
  echo "Current branch =  ${GIT_BRANCH}"
  echo "############################################"
  echo " "

  echo "-------------------------------------"
  echo "changing dir to BouwDataApp..."
  cd ${WORKSPACE}/BouwDataWebApp
  ls
  echo "-------------------------------------"
  echo " "

  echo "-------------------------------------"
  echo "installing NPM Firebase..."
  sudo npm install -g firebase-tools
  echo "-------------------------------------"
  echo " "

  echo "-------------------------------------"
  echo "building ${GIT_BRANCH} branch AoT (Ahead-of-Time)"
  ng build --aot
  ls ${WORKSPACE}/BouwDataWebApp/dist/BouwDataWebApp
  echo "-------------------------------------"
  echo " "

  echo "-------------------------------------"
  echo "Create Firebase.json file and copy dist folder and rename it to public"
  touch firebase.json
  echo "{
	\"hosting\": {
		\"site\": \"bouwdatadb\",
		\"public\": \"public\",
		\"ignore\": [
			\"firebase.json\",
			\"**/.*\",
			\"**/node_modules/**\"
		],
		\"rewrites\": [{
			\"source\": \"**\",
			\"destination\": \"/index.html\"
		}]
	}
}" >> firebase.json

  echo "-------------------------------------"
  echo "Move build in BouwDataWebApp/dist/BouwDataWebApp/ to BouwDataWebApp/public/"
  mv ${WORKSPACE}/BouwDataWebApp/dist/BouwDataWebApp/ ${WORKSPACE}/BouwDataWebApp/public/
  echo "-------------------------------------"
  echo " "

  echo "-------------------------------------"
  echo "DEBUG ls public folder"
  ls public/
  echo "-------------------------------------"
  echo " "
  echo " "

  echo "-------------------------------------"
  echo "FireBase deploy using token"
  sudo firebase deploy --project bouwdatadb --only hosting --token "1//099fqs9pJtr5PCgYIARAAGAkSNwF-L9IrEnxnZqa3mslR7QHPeifMVNAHPlQHtnAzqOGtPRhPYZIP2JLDUDnzUuKujLbZ0TKJvUo"
  echo "-------------------------------------"

else

  echo "############################################"
  echo "Current branch != Master => EXITING SCRIPT"
  echo "############################################"

fi
