pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKER_IMAGE_FRONTEND = "taeyoondev/frontend"
        DOCKER_IMAGE_BACKEND = "taeyoondev/backend"
    }
    
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t ${DOCKER_IMAGE_FRONTEND}:${BUILD_NUMBER} ./frontend'
                sh 'docker build -t ${DOCKER_IMAGE_BACKEND}:${BUILD_NUMBER} ./backend'
            }
        }
        
        stage('Login to DockerHub') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }
        
        stage('Push to DockerHub') {
            steps {
                sh 'docker push ${DOCKER_IMAGE_FRONTEND}:${BUILD_NUMBER}'
                sh 'docker push ${DOCKER_IMAGE_BACKEND}:${BUILD_NUMBER}'
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/'
                sh 'kubectl set image deployment/frontend frontend=${DOCKER_IMAGE_FRONTEND}:${BUILD_NUMBER}'
                sh 'kubectl set image deployment/backend backend=${DOCKER_IMAGE_BACKEND}:${BUILD_NUMBER}'
            }
        }
    }
    
    post {
        always {
            sh 'docker logout'
        }
    }
}



// pipeline {
//     agent any
    
//     stages {
//         stage('Build') {
//             steps {
//                 sh 'docker build -t frontend:${BUILD_NUMBER} ./frontend'
//                 sh 'docker build -t backend:${BUILD_NUMBER} ./backend'
//             }
//         }
        
//         stage('Push to Harbor') {
//             steps {
//                 withCredentials([usernamePassword(credentialsId: 'harbor-credentials', usernameVariable: 'HARBOR_USERNAME', passwordVariable: 'HARBOR_PASSWORD')]) {
//                     sh 'docker login your-harbor-registry.com -u $HARBOR_USERNAME -p $HARBOR_PASSWORD'
//                     sh 'docker tag frontend:${BUILD_NUMBER} your-harbor-registry.com/project/frontend:${BUILD_NUMBER}'
//                     sh 'docker tag backend:${BUILD_NUMBER} your-harbor-registry.com/project/backend:${BUILD_NUMBER}'
//                     sh 'docker push your-harbor-registry.com/project/frontend:${BUILD_NUMBER}'
//                     sh 'docker push your-harbor-registry.com/project/backend:${BUILD_NUMBER}'
//                 }
//             }
//         }
        
//         stage('Deploy to Kubernetes') {
//             steps {
//                 sh 'kubectl apply -f k8s/'
//                 sh 'kubectl set image deployment/frontend frontend=your-harbor-registry.com/project/frontend:${BUILD_NUMBER}'
//                 sh 'kubectl set image deployment/backend backend=your-harbor-registry.com/project/backend:${BUILD_NUMBER}'
//             }
//         }
//     }
// }