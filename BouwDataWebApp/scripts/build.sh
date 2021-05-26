#!/bin/bash
echo "############################################"
echo "EXECUTING BUILD SCRIPT"
echo "############################################"
echo " "

echo "-------------------------------------"
echo "Current Branch: ${GIT_BRANCH}"
echo "-------------------------------------"
echo " "

echo "-------------------------------------"
echo "changing dir to BouwDataApp..."
cd BouwDataWebApp
echo "-------------------------------------"
echo " "

echo "-------------------------------------"
echo "building ${GIT_BRANCH} branch"
ng build
echo "-------------------------------------"
echo " "
