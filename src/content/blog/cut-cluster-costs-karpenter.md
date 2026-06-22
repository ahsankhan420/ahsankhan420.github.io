---
title: "Cutting EKS Costs ~40% with Karpenter and Spot"
description: "A practical walkthrough of right-sizing a production EKS cluster using Karpenter consolidation and Spot instances — without sacrificing availability."
date: 2026-05-10
category: "Deep Dive"
featured: true
readingTime: "8 min"
tags: ["kubernetes", "finops", "karpenter", "aws"]
---

> **TL;DR** — Replaced the Cluster Autoscaler with Karpenter, enabled
> consolidation, and shifted stateless workloads to Spot. Result: roughly 40%
> lower monthly compute spend with no measurable impact on availability.

## The Problem

The cluster ran on a handful of fixed managed node groups. Bin-packing was poor:
nodes sat at 35–45% utilisation because the autoscaler could only add/remove
whole nodes of pre-defined types, and it never *re-packed* existing workloads.

## The Approach

Karpenter provisions right-sized nodes just-in-time based on actual pending-pod
requirements, and — crucially — **consolidates**: it actively moves pods onto
fewer nodes and terminates the emptied ones.

```yaml
apiVersion: karpenter.sh/v1
kind: NodePool
metadata: { name: default }
spec:
  disruption:
    consolidationPolicy: WhenEmptyOrUnderutilized
    consolidateAfter: 1m
  template:
    spec:
      requirements:
        - key: karpenter.sh/capacity-type
          operator: In
          values: ["spot", "on-demand"]
        - key: kubernetes.io/arch
          operator: In
          values: ["amd64", "arm64"]
```

Stateless, retry-tolerant workloads were allowed onto Spot; stateful and
singleton workloads stayed on-demand via `nodeAffinity`.

## Validation

- **PodDisruptionBudgets** on every important deployment so consolidation and
  Spot reclaims never take down too many replicas at once.
- Watched the Karpenter metrics and node-count graphs for a week before trusting
  it in production.

## The Result

Utilisation climbed past 70%, on-demand spend fell as Spot absorbed the bulk of
stateless capacity, and the total compute bill dropped by about 40%. Availability
SLOs held because disruption budgets and on-demand fallbacks kept the critical
path safe.

---

*This is example content — swap in your own figures and screenshots. The folder
`src/content/blog/` accepts any new Markdown file and it appears automatically.*
