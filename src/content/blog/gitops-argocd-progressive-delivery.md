---
title: "GitOps in Practice: Progressive Delivery with Argo CD"
description: "Why pull-based GitOps beats push-based pipelines for Kubernetes, and how sync waves plus Argo Rollouts give you safe, automated, reversible deployments."
date: 2026-04-04
category: "Guide"
featured: true
readingTime: "7 min"
tags: ["gitops", "argocd", "kubernetes", "ci-cd"]
---

## Push vs. Pull

In a classic push pipeline, CI runs `kubectl apply` against the cluster. That
means CI holds production credentials, and the cluster's real state can silently
drift from what's in Git.

GitOps inverts this: an in-cluster agent (Argo CD) **pulls** the desired state
from Git and continuously reconciles. Git is the single source of truth, the
cluster has no inbound credentials, and drift is auto-corrected.

## Ordering with Sync Waves

Not everything can apply at once — CRDs before the controllers that use them,
namespaces before the workloads inside them. Argo CD sync waves give you
deterministic ordering:

```yaml
metadata:
  annotations:
    argocd.argoproj.io/sync-wave: "-1"   # CRDs first
```

## Progressive Delivery

A successful `sync` doesn't mean a *healthy* release. Argo Rollouts replaces the
Deployment with a canary strategy and automated analysis:

```yaml
strategy:
  canary:
    steps:
      - setWeight: 20
      - pause: { duration: 2m }
      - analysis: { templates: [{ templateName: error-rate }] }
      - setWeight: 50
      - pause: { duration: 5m }
```

If the error-rate analysis breaches its threshold, the rollout aborts and
reverts automatically — no human in the critical path at 3am.

## Takeaways

- Keep one repo (or path) as the source of truth per environment.
- Health checks + analysis are what make automation trustworthy.
- Everything is a pull request: reviewable, auditable, revertable.
