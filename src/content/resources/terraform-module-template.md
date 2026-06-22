---
title: "Production-Ready Terraform Module Template"
description: "A starter layout for reusable, testable Terraform modules — inputs, outputs, examples, versioning and CI validation baked in."
category: "Cloud"
type: "Template"
level: "Intermediate"
date: 2026-03-15
url: "https://github.com/ahsankhan420"
---

## Why a Standard Module Layout

Consistent modules are the difference between infrastructure you can reuse and a
pile of copy-pasted HCL. This template enforces a clean input/output contract and
ships with example usage and CI checks.

## Layout

```
modules/<name>/
├── main.tf          # resources
├── variables.tf     # typed inputs with descriptions + validation
├── outputs.tf       # everything a consumer needs
├── versions.tf      # required_providers + terraform version pins
├── README.md        # auto-generated with terraform-docs
└── examples/
    └── basic/       # a runnable example used by CI
```

## CI Checks to Wire In

- `terraform fmt -check` and `terraform validate`
- `tflint` + `trivy config` (security/misconfig scanning)
- `terraform-docs` to keep the README honest
- Plan against the `examples/basic` directory on every PR

*Point this entry's `url` at your real module repo when it's published.*
