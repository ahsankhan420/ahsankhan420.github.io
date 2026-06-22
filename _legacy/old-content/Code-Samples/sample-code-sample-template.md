---
title: "Snippet Name — what it does in one line"
date: 2026-06-22
author: Ehsan Ullah
language: bash
tags: [automation, kubernetes]
---

# Snippet Name

**Purpose:** Briefly describe what this script/manifest does and when to use it.

## Usage

```bash
./script.sh <namespace>
```

## Code

```bash
#!/usr/bin/env bash
set -euo pipefail

NS="${1:?Usage: $0 <namespace>}"

# Example: list pods not in Running state in a namespace
kubectl get pods -n "$NS" \
  --field-selector=status.phase!=Running \
  -o wide
```

## Notes

- Document prerequisites (tools, RBAC, environment variables).
- Mention any safety considerations (idempotency, dry-run flags).
