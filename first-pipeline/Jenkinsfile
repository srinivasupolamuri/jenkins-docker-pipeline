pipeline {
    agent {
        docker {
            image 'node:22-alpine'
        }
    }

    stages {

        stage('Build') {
            steps {
                echo 'Building Node.js application'
                sh 'node --version'
                sh 'npm --version'
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running application tests'
                sh 'npm test'
            }
        }

        stage('Result') {
            steps {
                echo 'Application build and tests completed successfully'
            }
        }
    }
}
