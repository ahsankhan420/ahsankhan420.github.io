---
title: "Self-Healing, AI-Augmented CI/CD Pipeline"
summary: "A delivery pipeline that triages its own failures: when a build or deploy breaks, an LLM step classifies the root cause, suggests a fix, and auto-retries transient errors before paging a human."
date: 2026-01-20
role: "DevOps / Automation Engineer"
timeline: "5 weeks"
featured: true
order: 3
stack: ["GitHub Actions", "Python", "Kubernetes", "Prometheus", "Argo Rollouts", "LLM API"]
domains: ["AIOps", "Automation", "CI/CD"]
impact:
  - { value: "~60%", label: "Less triage time" }
  - { value: "Auto", label: "Transient retries" }
  - { value: "Canary", label: "Safe rollouts" }
---

> **TL;DR** — Wrapped a standard CI/CD pipeline with an AIOps layer: structured
> failure logs are summarised by an LLM into a likely root cause + remediation,
> transient failures self-retry, and only genuinely novel failures reach a human.

## The Problem

Most pipeline failures were noise — a flaky network call, a rate-limited
registry pull, an eventually-consistent resource. Engineers still had to read
walls of logs to separate the noise from the real regressions, and mean time to
acknowledge was creeping up.

## The Approach

1. **Structured failure capture.** Each job emits a compact JSON failure record
   (step, exit code, last N log lines, changed files) instead of raw text.
2. **LLM triage step.** On failure, a Python step sends that record to an LLM
   with a strict prompt: classify as `transient | config | code | infra`, give a
   one-line root cause and a suggested fix. The response is posted to the PR.
3. **Policy-driven action.** `transient` → automatic retry with backoff;
   everything else → labelled, summarised and routed to the right owner.
4. **Safe delivery.** Argo Rollouts performs a canary with automated metric
   analysis (error rate / latency) and rolls back on breach.

```python
verdict = triage(failure_record)            # {category, root_cause, fix}
if verdict["category"] == "transient":
    retry_with_backoff(max_attempts=3)
else:
    comment_on_pr(verdict)
    label_and_route(verdict["category"])
```

## Results

The volume of human-read failures dropped sharply because transient noise is
handled automatically, and the LLM summary means an engineer opens a PR already
knowing the likely cause instead of starting from zero.

## Lessons Learned

- **Constrain the model.** A strict, enum-based output schema makes the LLM a
  reliable classifier rather than a creative writer.
- **Keep humans in the loop for writes.** The AI suggests and retries transient
  errors; it never force-merges or edits production code unattended.
- Canary + automated analysis is what makes "self-healing" safe rather than
  reckless.
