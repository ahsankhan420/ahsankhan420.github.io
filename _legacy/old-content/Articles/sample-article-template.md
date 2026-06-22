---
title: "How I Cut Cluster Costs 40% with Karpenter and Spot Instances"
date: 2026-06-22
author: Ehsan Ullah
tags: [kubernetes, finops, karpenter, aws]
summary: "A practical walkthrough of right-sizing a production EKS cluster using Karpenter consolidation and Spot instances."
---

# How I Cut Cluster Costs 40% with Karpenter and Spot Instances

> **TL;DR** — Replaced the Cluster Autoscaler with Karpenter, enabled
> consolidation, and shifted stateless workloads to Spot. Result: ~40% lower
> monthly compute spend with no measurable impact on availability.

## The Problem

Describe the situation: over-provisioned nodes, low bin-packing efficiency,
fixed node groups, etc.

## The Approach

1. Step one — what you changed and why.
2. Step two — configuration / manifest snippets.
3. Step three — validation and rollout strategy.

```yaml
# Example: Karpenter NodePool snippet
apiVersion: karpenter.sh/v1
kind: NodePool
metadata:
  name: default
spec:
  disruption:
    consolidationPolicy: WhenEmptyOrUnderutilized
```

## Results

| Metric            | Before | After |
| ----------------- | ------ | ----- |
| Monthly compute   | $X     | $Y    |
| Avg node util.    | 35%    | 68%   |
| p99 latency       | —      | —     |

## Lessons Learned

- Bullet the key takeaways.
- Note any gotchas (PodDisruptionBudgets, Spot interruptions, etc.).

## References

- Link to docs, repos, or related articles.
