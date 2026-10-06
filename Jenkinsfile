pipeline {
  agent any

  environment {
    DEPLOY_BRANCH = 'gh-pages'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build') {
      steps {
        script {
          if (isUnix()) {
            sh 'node --version && npm --version && npm run build'
          } else {
            bat 'node --version && npm --version && npm run build'
          }
        }
      }
    }

    stage('Test') {
      steps {
        script {
          if (isUnix()) {
            sh 'npm test'
          } else {
            bat 'npm test'
          }
        }
      }
    }

    stage('Deploy') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'github-token', usernameVariable: 'GITHUB_USERNAME', passwordVariable: 'GITHUB_TOKEN')]) {
          script {
            if (isUnix()) {
              sh 'npm run deploy'
            } else {
              bat 'npm run deploy'
            }
          }
        }
      }
    }
  }

  post {
    success {
      echo 'Pipeline passed: website was built, tested, and deployed.'
    }
    failure {
      echo 'Pipeline failed: check the red stage, fix the code, commit, and push again.'
    }
  }
}
