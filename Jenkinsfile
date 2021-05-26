pipeline {
  agent {
        docker { image 'node:10-alpine' }
    }// {
        //docker {
            //image 'node:lts-buster-slim' 
            //args '-p 3000:3000' 
        //}
    //}

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
          //sh 'chmod 777 ${WORKSPACE}/BouwDataWebApp/scripts/build.sh'
          //sh '${WORKSPACE}/BouwDataWebApp/scripts/build.sh'
      }
    }

    //stage('Test') {
    //  parallel {
    //    stage('unit test (ng test)') {
    //        steps {
    //          echo "Running ng test"
    //          //sh 'npm run-script lint'
    //        }
    //    }
    //      stage ('Static Analysis') {
    //        steps {
    //          echo "Running static code test"
    //      }
    //    }
    //  }
    //}

    stage('Deploy') {
      steps {
          echo "Running deployment script...."
          sh 'chmod 777 ${WORKSPACE}/BouwDataWebApp/scripts/deployment.sh'
          sh '${WORKSPACE}/BouwDataWebApp/scripts/deployment.sh'
          cleanWs()
      }
    }
  }
}
