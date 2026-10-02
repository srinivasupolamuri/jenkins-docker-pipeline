# Multi-Stage Multi-Agent Pipeline

## Objective

Demonstrate separate Docker execution environments for backend and
frontend stages.

## Architecture

``` text
Jenkins
   |
agent none
 /        Maven      Node
Agent      Agent
 |          |
mvn test   npm test/build
 \        /
  SUCCESS
```

## Structure

``` text
multi-stage-multi-agent/
├── Jenkinsfile
├── backend/
└── frontend/
```

## Backend

Docker image:

``` text
maven:3.9.16-eclipse-temurin-21-alpine
```

Command:

``` bash
mvn clean test
```

## Frontend

Docker image:

``` text
node:22-alpine
```

Commands:

``` bash
npm test
npm run build
```

## Jenkins configuration

``` text
Repository: https://github.com/srinivasupolamuri/jenkins-docker-pipeline.git
Branch: */main
Script Path: multi-stage-multi-agent/Jenkinsfile
```

## Key concept

Use:

``` groovy
pipeline {
    agent none
```

and define a Docker agent inside each stage.

## Learning outcomes

-   Multi-stage Jenkins pipelines
-   Stage-specific agents
-   Maven CI
-   Node.js CI
-   Dockerized build environments
