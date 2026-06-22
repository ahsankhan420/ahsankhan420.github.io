---
title: "CKA Certification Roadmap"
description: "A focused study path to the Certified Kubernetes Administrator exam — domains, weightings, hands-on labs and the killer.sh strategy that actually works."
category: "Certification"
type: "Roadmap"
level: "Intermediate"
date: 2026-05-01
featured: true
url: "/resources/cka-roadmap"
---

## How to Use This Roadmap

The CKA is 100% hands-on and time-pressured. Reading won't pass it — `kubectl`
muscle memory will. Work through each domain below in a real cluster.

## Exam Domains (by weight)

- **Cluster Architecture, Installation & Configuration (25%)** — kubeadm,
  RBAC, etcd backup/restore, cluster upgrades.
- **Workloads & Scheduling (15%)** — deployments, rolling updates, config,
  taints/tolerations, affinity.
- **Services & Networking (20%)** — Services, Ingress, NetworkPolicy, CoreDNS.
- **Storage (10%)** — PV, PVC, StorageClasses, access modes.
- **Troubleshooting (30%)** — the biggest slice: node/pod/control-plane failures.

## A Working Study Plan

1. Learn each domain *in a cluster* (kind, minikube or a cheap cloud cluster).
2. Drill `kubectl` imperative commands + `--dry-run=client -o yaml` generation.
3. Memorise the [kubectl cheat sheet] flow and set up `alias k=kubectl`.
4. Do both killer.sh sessions (free with your exam registration).
5. Practise under a strict timer — speed is the real exam.

*Want the full annotated checklist as a download? It's coming — this entry is
the live placeholder. Add a PDF to `public/` and point `url` at it.*
