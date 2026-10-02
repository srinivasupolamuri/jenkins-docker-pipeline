# First Pipeline

## Objective

Demonstrate basic Continuous Integration using GitHub, Jenkins, Node.js
and Docker.

## Architecture

``` text
GitHub
 ↓
Jenkins SCM
 ↓
Node.js Docker Agent
 ↓
npm install
 ↓
npm test
 ↓
SUCCESS
```

## Structure

``` text
first-pipeline/
├── Jenkinsfile
├── app.js
├── package.json
└── test.js
```

## Jenkins setup

Create a Pipeline job and select **Pipeline script from SCM**.

``` text
Repository: https://github.com/srinivasupolamuri/jenkins-docker-pipeline.git
Branch: */main
Script Path: first-pipeline/Jenkinsfile
```

## Key Jenkinsfile concept

``` groovy
agent {
    docker {
        image 'node:22-alpine'
    }
}
```

Build steps:

``` bash
node --version
npm --version
npm install
npm test
```

## Verification

A successful console should end with:

``` text
Finished: SUCCESS
```

## Learning outcomes

-   GitHub SCM
-   Jenkins Declarative Pipeline
-   Docker agent
-   Node.js/npm
-   Automated testing
