pipeline {
         agent { label 'Front-agent' }
         tools{
               nodejs 'NodeJS'
               }


         stages {

            stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/Anir-sadiqui/Sirius-front.git'
            }
        }

             stage('Build') {
                 steps {
                    sh 'cd /home/front/agent/workspace/front-jfile && npm install && npm run build'

                 }
             }

             stage('Deploy to dev') {
                 steps {
                     sh 'bash /home/front/runFront.sh'
                 }
             }
         }
       }