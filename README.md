# WhatsApp-Clone (Kubernetes Distributed Services)

This repository contains a Kubernetes-based distributed system implementing a WhatsApp-like clone. It uses a Laravel backend API, a React frontend, Kafka for messaging, Redis for caching/session, and MySQL for persistent storage. The repo includes Kubernetes manifests and Dockerfiles for deploying the services.

## Repository Layout

- `api/` — Laravel backend API (PHP). Controllers, Models, migrations and app code.
- `frontend/` — React single-page application.
- `k8s/` — Kubernetes manifests and Dockerfiles for `api` and `frontend`, plus manifests for Kafka, MySQL, Redis, and services.

## Architecture Overview

- Frontend (React) — serves UI and connects to backend API.
- Backend (Laravel API) — authenticates users, manages messages, and produces/consumes events to/from Kafka.
- Kafka — message broker for distributed messaging between services (e.g., message delivery, notifications).
- Redis — caching and session store for fast lookups and presence state.
- MySQL — primary relational store for users, conversations, and messages.
- Kubernetes — deploys the services, databases, and messaging infrastructure for production-like orchestration.

## Tech Stack

- Backend: PHP + Laravel
- Frontend: React (Vite)
- Messaging: Apache Kafka
- Cache/Session: Redis
- Database: MySQL
- Orchestration: Kubernetes manifests in `k8s/`

## Quickstart (Local Kubernetes)

Prerequisites: `docker`, `kubectl`, and a local Kubernetes cluster (`minikube`, `kind`, or similar).

1. Build images locally:

```bash
docker build -f k8s/Dockerfile.api -t whatsapp-api:local ./api
docker build -f k8s/Dockerfile.frontend -t whatsapp-frontend:local ./frontend
```

2. Load images into your cluster (example for `kind`):

```bash
kind load docker-image whatsapp-api:local
kind load docker-image whatsapp-frontend:local
```

3. Start your cluster (example):

```bash
minikube start
kubectl apply -f k8s/
```

4. Confirm pods/services:

```bash
kubectl get pods,svc -A
```

Notes:
- The `k8s/` manifests include deployments for Kafka, Redis, MySQL, the API, and the frontend. Adjust resource/replica counts and storage as needed.
- Configure environment variables (DB host, Redis host, Kafka brokers, etc.) through configMaps or Secrets mapped into the `api` and `frontend` deployments.

## Local Development (API)

- For local Laravel development you can work inside the `api/` folder. Use Composer to install dependencies, then run migrations and seeders.

```bash
cd api
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
```

In a k8s environment these commands are typically run during image build or via init containers / jobs.

## Environment Variables (high level)

- `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`
- `REDIS_HOST`, `REDIS_PORT`
- `KAFKA_BROKERS` (comma-separated)
- `APP_URL`, `APP_ENV`

## Deploying to a Cluster

- Build container images and push to a registry accessible to your cluster, or load them into local clusters (see Quickstart).
- Update `k8s/` manifests with image tags, Secrets for DB credentials, and proper Ingress configuration for production.

## Troubleshooting

- Check pod logs: `kubectl logs <pod>`
- Describe failing resources: `kubectl describe pod <pod>`
- Confirm connectivity between services (DNS, service names): `kubectl exec` into pods and ping service hostnames.

## Next Steps / Contributing

- Add CI/CD pipeline to build/push images and apply k8s manifests.
- Add Helm charts or kustomize overlays for environment-specific deployments.
- Expand docs with developer-specific `docker-compose` flows if desired.
