---
title: "Cloud-Native DevOps Toolchain Cheatsheet"
description: "The reference stack I reach for across build, deploy, run and observe — and when to choose each tool over the alternatives."
category: "DevOps"
type: "Cheatsheet"
level: "Intermediate"
date: 2026-04-20
featured: true
url: "/resources/devops-toolchain-cheatsheet"
---

## Build & Package

- **Containers:** Docker / BuildKit, then ko or Buildpacks for Go/JVM speed.
- **IaC:** Terraform (multi-cloud), OpenTofu (open governance), Pulumi (real code).

## Deliver

- **CI:** GitHub Actions for repo-native pipelines.
- **CD / GitOps:** Argo CD (pull-based reconciliation) + Argo Rollouts (canary).
- **Config:** Helm for packaging, Kustomize for environment overlays.

## Run

- **Orchestration:** Kubernetes; Karpenter for node autoscaling.
- **Service mesh:** Istio / Linkerd when you genuinely need mTLS + traffic shaping.
- **Secrets:** External Secrets Operator backed by a cloud secret manager.

## Observe

- **Metrics:** Prometheus + Grafana.
- **Traces/Logs:** OpenTelemetry Collector → Jaeger / Loki / Tempo.
- **SLOs:** define them before you add more dashboards.

## Rule of Thumb

Adopt the *simplest* tool that solves the problem in front of you. A service mesh
you don't need is just latency and a pager you'll regret.
