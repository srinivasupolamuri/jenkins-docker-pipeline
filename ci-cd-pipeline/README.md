# CI/CD Deployment Pipeline

## Objective

Demonstrate actual Continuous Deployment to an AWS EC2 instance using
Jenkins, Docker and Nginx.

## Architecture

``` text
GitHub
 ↓
Jenkins
 ↓
Checkout
 ↓
Test
 ↓
Docker/Nginx
 ↓
EC2 :8081
 ↓
curl
 ↓
Browser
```

## Structure

``` text
ci-cd-pipeline/
├── Jenkinsfile
└── index.html
```

## Jenkins stages

1.  Checkout
2.  Test
3.  Deploy
4.  Verify

## Deployment command

``` bash
docker rm -f ci-cd-app 2>/dev/null || true

docker run -d   --name ci-cd-app   -p 8081:80   -v "$WORKSPACE/ci-cd-pipeline/index.html:/usr/share/nginx/html/index.html:ro"   nginx:alpine
```

## Local verification

``` bash
docker ps
curl http://localhost:8081
curl -I http://localhost:8081
docker port ci-cd-app
```

## AWS verification

Allow TCP 8081 in the EC2 Security Group.

Open:

``` text
http://<EC2_PUBLIC_IP>:8081
```

## Continuous deployment test

``` bash
nano ci-cd-pipeline/index.html
git add ci-cd-pipeline/index.html
git commit -m "Update deployed application"
git push origin main
```

Run Jenkins again and refresh the browser.

## Learning outcomes

-   CI/CD concepts
-   Jenkins SCM
-   Docker deployment
-   Nginx
-   AWS EC2
-   Port mapping
-   Deployment verification
