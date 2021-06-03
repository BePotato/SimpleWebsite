pipeline {
  agent any
  tools {nodejs "NodeJSinstaller"}

  stages {
    stage('Install') {
	    steps {
 	      echo "Installing NPM"
        sh 'npm install'
	    }
    }

    stage('Build') {
      steps {
          echo "Running build script...."
          sh 'chmod 777 ${WORKSPACE}/BouwDataWebApp/scripts/build.sh'
          sh '${WORKSPACE}/BouwDataWebApp/scripts/build.sh'
      }
    }

    stage('Test') {
      steps {
        echo "running test script"
         sh 'chmod 777 ${WORKSPACE}/BouwDataWebApp/scripts/test.sh'
         sh '${WORKSPACE}/BouwDataWebApp/scripts/test.sh'
      }
      //parallel {
        //stage('unit test (ng test)') {
            //steps {
              //echo "Running ng test"
              //sh 'npm run-script lint'
            //}
        //}
          //stage ('Static Analysis') {
            //steps {
              //echo "Running static code test"
          //}
        //}
      //}
    }


    stage('Deploy') {
      steps {
          echo "Running deployment script...."
          sh 'chmod 777 ${WORKSPACE}/BouwDataWebApp/scripts/deployment.sh'
          sh '${WORKSPACE}/BouwDataWebApp/scripts/deployment.sh'
          cleanWs()
      }
    }
    stage('deploy production via asible'){
      steps{
        ansiblePlaybook installation: 'Ansible', inventory: 'hosts', playbook: 'groupvars/app.yml'
      }
    }
  }
}