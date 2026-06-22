---
title: "GitOps Platform on EKS with Terraform & Argo CD"
summary: "A reproducible, self-service Kubernetes platform: infrastructure defined in Terraform, applications delivered via Argo CD, and every change flowing through pull requests."
date: 2026-03-02
role: "Platform Engineer"
timeline: "8 weeks"
featured: true
order: 2
stack: ["Terraform", "AWS EKS", "Argo CD", "Helm", "Kustomize", "GitHub Actions", "Karpenter"]
domains: ["Platform Engineering", "GitOps", "Infrastructure as Code"]
impact:
  - { value: "100%", label: "Infra as code" }
  - { value: "< 5 min", label: "Cluster bootstrap" }
  - { value: "0", label: "Manual kubectl applies" }
links:
  repo: "https://github.com/ahsankhan420"
---

> **TL;DR** — Built a "platform in a repo": `terraform apply` provisions the VPC
> and EKS cluster, Argo CD bootstraps itself, and from then on Git is the single
> source of truth for every workload.

## The Problem

Clusters were configured by hand. Nobody could confidently answer "what is
actually running in production?", drift accumulated, and onboarding a new
service meant a senior engineer running commands locally.

## Architecture Decisions

- **Terraform for infrastructure, GitOps for workloads.** A clean seam: cloud
  primitives (VPC, EKS, IAM, node config) live in Terraform modules; everything
  *inside* the cluster is reconciled by Argo CD from Git.
- **App-of-apps pattern.** A single root Argo CD `Application` points at a repo
  directory; adding a service is a pull request, not a deployment ticket.
- **Karpenter for nodes.** Replaced static node groups with just-in-time,
  consolidation-aware provisioning to keep utilisation high.

```hcl
module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  cluster_name    = "platform-prod"
  cluster_version = "1.30"
  enable_irsa     = true
  eks_managed_node_groups = {
    system = { instance_types = ["t3.large"], min_size = 2, max_size = 4 }
  }
}
```

## Challenges

- **Bootstrap chicken-and-egg.** Argo CD must exist before it can manage itself.
  Solved by having Terraform install the Argo CD Helm release once, after which
  Argo CD manages its own upgrades from Git.
- **Secret management.** Plaintext secrets can't live in Git — integrated
  External Secrets Operator backed by AWS Secrets Manager.

## Results

A brand-new environment is reproducible from an empty AWS account. Every change
is reviewable, auditable and revertable via Git history, and drift is
automatically corrected by Argo CD's continuous reconciliation.

## Lessons Learned

- Keep the Terraform/GitOps boundary crisp — blurring it recreates drift.
- Progressive rollout (sync waves + health checks) prevents a bad manifest from
  taking down the whole platform at once.
