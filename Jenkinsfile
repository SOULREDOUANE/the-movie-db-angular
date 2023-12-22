pipeline {
    agent any

    tools {
        maven 'Maven_3_8_7'  // Replace 'Maven_3_8_7' with the name of your Maven installation in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[credentialsId: 'my-github-access-key', url: 'https://github.com/SOULREDOUANE/deploy-angular-app.git']]])
         	}
            }
        }


        stage('Build Docker Image') {
            steps {
                script {

                    sh "docker logout"
                    // Build Docker image using the Dockerfile in your project
                    sh "docker build -t automate-angular ."
                }
            }
        }
        stage('Login') {
            steps {
                sh ' docker login -u soulredouane -p dckr_pat_mndldfyKQlNnEdV8ceQ4Uc97M-U'
                }
            }
        stage('Push') {
			steps {
				sh 'docker tag automate-angular:latest soulredouane/automate-angular:latest'
				sh 'docker push soulredouane/automate-angular'
				sh "docker logout"
			}
		}
    }
}
