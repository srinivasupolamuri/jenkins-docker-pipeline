# Jenkins Docker CI/CD Portfolio

A hands-on DevOps portfolio demonstrating the progressive implementation of **Continuous Integration (CI), Jenkins Declarative Pipelines, Docker-based build environments, multi-stage/multi-agent pipelines, GitHub SCM integration, automated testing, and Continuous Deployment (CD) on AWS EC2**.

This repository contains three practical projects developed progressively to understand how Jenkins and Docker are used in DevOps workflows.

---

## 🚀 Projects Overview

| Project | Technologies | Main Objective |
|---|---|---|
| **First Pipeline** | GitHub, Jenkins, Docker, Node.js, npm | Basic Jenkins CI pipeline |
| **Multi-Stage Multi-Agent** | Jenkins, Docker, Maven, Java, Node.js | Multiple stages with different Docker agents |
| **CI/CD Pipeline** | GitHub, Jenkins, Docker, Nginx, AWS EC2 | Automated application deployment |

The projects demonstrate the progression:

```text
Basic CI
   ↓
Multi-Stage / Multi-Agent CI
   ↓
CI/CD Deployment
```

---

# 📁 Repository Structure

```text
jenkins-docker-pipeline/
│
├── first-pipeline/
│   ├── Jenkinsfile
│   ├── app.js
│   ├── package.json
│   └── test.js
│
├── multi-stage-multi-agent/
│   ├── Jenkinsfile
│   ├── backend/
│   │   ├── pom.xml
│   │   └── src/
│   │       ├── main/java/com/example/App.java
│   │       └── test/java/com/example/AppTest.java
│   │
│   └── frontend/
│       ├── package.json
│       ├── package-lock.json
│       ├── app.js
│       ├── index.html
│       └── test.js
│
├── ci-cd-pipeline/
│   ├── Jenkinsfile
│   └── index.html
│
└── README.md
```

---

# 🛠️ Technologies Used

### DevOps / CI/CD

- Jenkins
- Jenkins Declarative Pipeline
- Git
- GitHub
- Docker
- Docker Agents
- Continuous Integration
- Continuous Deployment

### Application Technologies

- Node.js
- npm
- Java
- Maven
- JUnit
- HTML
- Nginx

### Cloud / Infrastructure

- AWS EC2
- AWS Security Groups
- Linux / Ubuntu
- Docker containers
- Port mapping

---

# 🏗️ Overall Architecture

```text
                         GitHub
                           │
                           ▼
                       Jenkins
                           │
          ┌────────────────┼─────────────────┐
          │                │                 │
          ▼                ▼                 ▼
    First Pipeline    Multi-Agent CI    CI/CD Pipeline
          │                │                 │
          ▼                ▼                 ▼
      Node.js          Maven + Node       Docker/Nginx
       Docker             Docker              │
          │                │                  ▼
          ▼                ▼              AWS EC2
       Testing          Testing              │
                                             ▼
                                          Browser
```

---

# 1️⃣ First Pipeline

## 🎯 Objective

The first project demonstrates the fundamentals of a Jenkins CI pipeline.

The pipeline retrieves source code from GitHub and executes the Node.js application inside a Docker-based Node.js environment.

## Architecture

```text
GitHub
   │
   ▼
Jenkins
   │
   ▼
Node.js Docker Agent
   │
   ├── node --version
   ├── npm --version
   ├── npm install
   │
   ▼
npm test
   │
   ▼
SUCCESS
```

## Project Structure

```text
first-pipeline/
├── Jenkinsfile
├── app.js
├── package.json
└── test.js
```

## Jenkins Pipeline

```groovy
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
```

## Jenkins Configuration

```text
Definition:
Pipeline script from SCM

SCM:
Git

Repository:
https://github.com/srinivasupolamuri/jenkins-docker-pipeline.git

Branch:
*/main

Script Path:
first-pipeline/Jenkinsfile
```

Click **Build Now**.

Expected:

```text
Test Passed: 10 + 20 = 30
Finished: SUCCESS
```

## Key Learning

- Jenkins Declarative Pipeline
- Jenkins SCM integration
- GitHub integration
- Docker agents
- Node.js CI
- npm
- Automated testing
- Jenkins console troubleshooting

---

# 2️⃣ Multi-Stage Multi-Agent Pipeline

## 🎯 Objective

The second project demonstrates how Jenkins can use different Docker environments for different pipeline stages.

The project contains:

- Java/Maven backend
- Node.js frontend

Instead of installing Maven and Node.js directly on the Jenkins server, each stage uses an appropriate Docker image.

## Architecture

```text
                         Jenkins
                            │
                        agent none
                            │
               ┌────────────┴────────────┐
               ▼                         ▼
       Maven Docker Agent         Node.js Docker Agent
               │                         │
               ▼                         ▼
        Java Backend                 Frontend
               │                         │
          mvn clean test            npm test
               │                         │
               │                    npm run build
               │                         │
               └────────────┬────────────┘
                            │
                            ▼
                         SUCCESS
```

## Backend

```text
backend/
├── pom.xml
└── src/
    ├── main/java/com/example/App.java
    └── test/java/com/example/AppTest.java
```

Run:

```bash
mvn clean test
```

Expected:

```text
Tests run: 1
Failures: 0
Errors: 0
Skipped: 0

BUILD SUCCESS
```

## Frontend

```text
frontend/
├── package.json
├── package-lock.json
├── app.js
├── index.html
└── test.js
```

Run:

```bash
npm test
npm run build
```

## Docker Agents

Backend:

```text
maven:3.9.16-eclipse-temurin-21-alpine
```

Frontend:

```text
node:22-alpine
```

## Why `agent none`?

The pipeline uses:

```groovy
pipeline {
    agent none
```

Individual stages define their own Docker agents.

Example:

```groovy
stage('Backend') {
    agent {
        docker {
            image 'maven:3.9.16-eclipse-temurin-21-alpine'
        }
    }
}
```

Frontend:

```groovy
stage('Frontend') {
    agent {
        docker {
            image 'node:22-alpine'
        }
    }
}
```

## Jenkins Configuration

```text
Repository:
https://github.com/srinivasupolamuri/jenkins-docker-pipeline.git

Branch:
*/main

Script Path:
multi-stage-multi-agent/Jenkinsfile
```

Expected:

```text
Back-end
   ✓ Maven version
   ✓ Maven test
   ✓ BUILD SUCCESS

Front-end
   ✓ npm test
   ✓ npm run build

Finished: SUCCESS
```

## Key Learning

- `agent none`
- Stage-specific Jenkins agents
- Docker agents
- Maven
- Java
- Node.js
- npm
- Multi-stage pipelines
- Backend/frontend separation
- Containerized CI environments

---

# 3️⃣ CI/CD Deployment Pipeline

## 🎯 Objective

The third project extends Jenkins CI into actual **Continuous Deployment**.

Jenkins validates the source code and automatically deploys the application using Docker and Nginx on an AWS EC2 instance.

## Architecture

```text
                       GitHub
                          │
                          ▼
                      Jenkins
                          │
                          ▼
                       Checkout
                          │
                          ▼
                         Test
                          │
                          ▼
                    Docker Deploy
                          │
                          ▼
                    Nginx Container
                          │
                    Port 80 → 8081
                          │
                          ▼
                      AWS EC2
                          │
                          ▼
                       Browser
```

## Project Structure

```text
ci-cd-pipeline/
├── Jenkinsfile
└── index.html
```

## Application

The deployed page contains:

```html
<h1>CI/CD Pipeline Successful!</h1>
<p>Application deployed using Jenkins and Docker.</p>
<p>Environment: AWS EC2</p>
```

---

# Jenkins Pipeline Stages

## Stage 1 — Checkout

Jenkins retrieves source code from GitHub through SCM.

## Stage 2 — Test

The pipeline validates:

```bash
test -f ci-cd-pipeline/index.html
```

and:

```bash
grep -q "CI/CD Pipeline Successful" ci-cd-pipeline/index.html
```

## Stage 3 — Deploy

The previous container is removed:

```bash
docker rm -f ci-cd-app 2>/dev/null || true
```

Then Nginx is started:

```bash
docker run -d \
    --name ci-cd-app \
    -p 8081:80 \
    -v "$WORKSPACE/ci-cd-pipeline/index.html:/usr/share/nginx/html/index.html:ro" \
    nginx:alpine
```

## Stage 4 — Verify

```bash
docker ps --filter name=ci-cd-app
```

and:

```bash
curl -f http://localhost:8081
```

Successful verification produces:

```text
Deployment verification successful
Finished: SUCCESS
```

---

# Understanding Port Mapping

```text
-p 8081:80
```

means:

```text
AWS EC2 Host
Port 8081
     │
     ▼
Docker Container
Port 80
     │
     ▼
Nginx
     │
     ▼
index.html
```

Jenkins uses port `8080`, so the application uses `8081`.

---

# AWS EC2 Configuration

```text
Jenkins:      8080
Application:  8081
Container:    80
```

## Security Group

Allow:

```text
Type: Custom TCP
Port: 8081
Source: My IP
```

Using your own IP is preferable for a learning environment where practical.

---

# Local Verification

```bash
docker ps
curl http://localhost:8081
curl -I http://localhost:8081
docker port ci-cd-app
```

Expected:

```text
HTTP/1.1 200 OK
```

Expected application response:

```text
CI/CD Pipeline Successful!

Application deployed using Jenkins and Docker.

Environment: AWS EC2
```

---

# Cloud / Browser Verification

Open:

```text
http://<EC2_PUBLIC_IP>:8081
```

The application should display:

```text
CI/CD Pipeline Successful!

Application deployed using Jenkins and Docker.

Environment: AWS EC2
```

---

# Demonstrating Continuous Deployment

Modify:

```bash
nano ci-cd-pipeline/index.html
```

For example:

```html
<h1>CI/CD Pipeline Version 2</h1>
```

Commit and push:

```bash
git add ci-cd-pipeline/index.html
git commit -m "Update deployed application"
git push origin main
```

Run the Jenkins pipeline again.

Verify:

```bash
curl http://localhost:8081
```

Refresh the browser.

Workflow:

```text
Application Change
       ↓
Git Commit
       ↓
GitHub
       ↓
Jenkins
       ↓
Validation
       ↓
Docker Deployment
       ↓
Updated Application
```

---

# 🐳 Useful Docker Commands

```bash
docker ps
docker ps -a
docker images
docker system df
docker logs ci-cd-app
docker exec ci-cd-app cat /usr/share/nginx/html/index.html
docker port ci-cd-app
```

Stop:

```bash
docker stop ci-cd-app
```

Start:

```bash
docker start ci-cd-app
```

Remove:

```bash
docker rm -f ci-cd-app
```

---

# 🔧 Jenkins Troubleshooting

## Jenkins Waiting for Executor

Check:

```text
Manage Jenkins
    ↓
Nodes
    ↓
Built-In Node
```

Also:

```bash
df -h /
free -h
```

A very full disk can cause Jenkins node health monitoring to mark the node offline.

## Docker Permission

```bash
sudo -u jenkins docker ps
```

If required:

```bash
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

## Container Already Exists

```bash
docker rm -f ci-cd-app
```

## Port Already in Use

```bash
sudo ss -lntp | grep 8081
docker ps
```

---

# 📊 CI vs CD

## Continuous Integration

Projects 1 and 2 demonstrate:

```text
Developer
   ↓
GitHub
   ↓
Jenkins
   ↓
Build
   ↓
Test
   ↓
Result
```

Examples:

```bash
npm test
mvn clean test
```

## Continuous Deployment

Project 3 extends the process:

```text
Developer
   ↓
GitHub
   ↓
Jenkins
   ↓
Test
   ↓
Docker Deployment
   ↓
Nginx
   ↓
AWS EC2
   ↓
Browser
```

Overall progression:

```text
CI
 ↓
Multi-Stage CI
 ↓
CD
```

---

# 🔐 Git and GitHub Workflow

```bash
git status
git add .
git commit -m "Describe the change"
git push origin main
git remote -v
```

---

# 📌 Recommended `.gitignore`

```gitignore
# Maven
**/target/
**/.m2/

# Node.js
**/node_modules/

# Frontend build
**/dist/

# Environment files
.env
.env.*

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
```

---

# 📚 Key DevOps Concepts Demonstrated

### Jenkins

- Declarative Pipeline
- Pipeline stages
- Pipeline agents
- `agent any`
- `agent none`
- Docker agents
- Pipeline from SCM
- Jenkins executors
- Jenkins node monitoring
- Pipeline troubleshooting

### Git/GitHub

- Git repository
- GitHub remote
- Git commits
- Git push
- Branch configuration
- Jenkins Git SCM

### Docker

- Docker images
- Docker containers
- Docker agents
- Volume mounts
- Port mapping
- Container lifecycle
- Image management
- Docker troubleshooting

### CI/CD

- Automated builds
- Automated testing
- Maven testing
- Node.js testing
- Multi-stage pipelines
- Containerized deployment
- Deployment verification

### AWS / Linux

- AWS EC2
- Security Groups
- SSH
- Linux shell
- Disk-space troubleshooting
- Services
- Ports
- Network connectivity

---

# 🧠 Interview Explanation

> **"I created three progressive Jenkins projects to understand CI/CD practically. In the first project, I integrated Jenkins with GitHub and used a Node.js Docker agent to install dependencies and run automated tests. In the second project, I implemented a multi-stage, multi-agent pipeline where the Java backend runs in a Maven Docker agent and the frontend runs in a Node.js Docker agent. In the third project, I extended this into actual Continuous Deployment by using Jenkins to validate the source code and deploy the application using an Nginx Docker container on AWS EC2. I also implemented deployment verification using Docker and curl and verified the application through the EC2 public endpoint."**

---

# 💼 Resume Description

### Jenkins Docker CI/CD Portfolio

**Technologies:** Jenkins, GitHub, Git, Docker, Node.js, Maven, Java, Nginx, AWS EC2, Linux

> Developed a progressive DevOps portfolio implementing Jenkins CI/CD pipelines with GitHub SCM integration, Docker-based build environments, multi-stage/multi-agent execution, automated application testing, and containerized deployment on AWS EC2 using Nginx. Implemented deployment verification using Docker and curl and validated application availability through the EC2 public endpoint.

### First Pipeline — Jenkins CI

> Implemented a Jenkins CI pipeline integrated with GitHub to build and test a Node.js application inside a Docker-based Node.js environment using npm and automated testing.

### Multi-Stage Multi-Agent Pipeline

> Implemented a Jenkins Declarative Pipeline using separate Docker agents for Maven/Java backend and Node.js frontend stages, automating backend testing and frontend build activities.

### CI/CD Deployment Pipeline

> Implemented an end-to-end Jenkins CI/CD pipeline integrated with GitHub to validate source code and automatically deploy a web application using Docker and Nginx on AWS EC2, with deployment verification using curl.

---

# 🚀 Future Enhancements

```text
                         GitHub
                            │
                            ▼
                         Jenkins
                            │
                     Build + Test
                            │
                            ▼
                       Docker Build
                            │
                            ▼
                    Docker Hub / ECR
                            │
                            ▼
                       Kubernetes
                            │
                            ▼
                         Argo CD
                            │
                            ▼
                       Application
```

Potential enhancements:

- Dockerfile-based application image
- Docker Hub
- Amazon ECR
- Kubernetes
- Kubernetes Deployment
- Kubernetes Service
- ConfigMaps and Secrets
- Argo CD
- GitOps
- Jenkins webhooks
- Automated deployments on Git push
- HTTPS/TLS
- Application monitoring
- Centralized logging
- AWS EKS

---

# 🎯 Learning Outcomes

- Git and GitHub workflow
- Jenkins Declarative Pipeline
- Jenkins SCM integration
- Docker-based Jenkins agents
- Multi-stage pipelines
- Multi-agent pipelines
- Maven CI
- Node.js CI
- Automated testing
- Docker container management
- Nginx deployment
- AWS EC2 deployment
- Linux administration
- Port mapping
- Security Group configuration
- Deployment verification
- CI/CD troubleshooting

---

# ⭐ Project Status

| Component | Status |
|---|---|
| First Jenkins Pipeline | ✅ Completed |
| GitHub SCM Integration | ✅ Completed |
| Node.js Docker Agent | ✅ Completed |
| Multi-Stage Pipeline | ✅ Completed |
| Multi-Agent Pipeline | ✅ Completed |
| Maven Docker Agent | ✅ Completed |
| Node.js Docker Agent | ✅ Completed |
| CI/CD Deployment | ✅ Completed |
| Docker/Nginx Deployment | ✅ Completed |
| AWS EC2 Deployment | ✅ Completed |
| Local Verification | ✅ Completed |
| Browser/Cloud Verification | ✅ Completed |

---

# 👨‍💻 Author

**Srinivasu Polamuri**

DevOps / IT Support Engineer building hands-on experience in:

- DevOps
- AWS
- Jenkins
- Docker
- Linux
- Git/GitHub
- CI/CD
- Ansible
- Terraform
- Kubernetes

---

> **This repository is a hands-on DevOps learning portfolio focused on implementing CI/CD concepts practically using Jenkins, Docker, GitHub, Linux and AWS EC2.**
