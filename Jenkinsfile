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
          sh 'chmod 777 ${WORKSPACE}/scripts/build.sh'
          sh '${WORKSPACE}/scripts/build.sh'
      }
    }

    stage('Test') {
      parallel {
        stage('unit test (ng test)') {
            steps {
              echo "Running ng test"
              sh 'npm run-script lint'
            }
        }
          stage ('Static Analysis') {
            steps {
              echo "Running static code test"
          }
        }
      }
    }

    stage('Deploy') {
      steps {
          echo "Running deployment script...."
          sh 'chmod 777 ${WORKSPACE}/scripts/deployment.sh'
          sh '${WORKSPACE}/scripts/deployment.sh'
          cleanWs()
      }
    }
  }
}