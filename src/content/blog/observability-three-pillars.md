---
title: "The Three Pillars of Observability, Wired Together with OpenTelemetry"
description: "Logs, metrics and traces stop being silos once they share trace context. A practical mental model for instrumenting microservices with OpenTelemetry."
date: 2026-02-15
category: "Tutorial"
readingTime: "6 min"
tags: ["observability", "opentelemetry", "sre", "kubernetes"]
---

## Monitoring vs. Observability

Monitoring answers questions you predicted ("is CPU > 80%?"). Observability lets
you ask questions you *didn't* predict ("why is the p99 for checkout slow, but
only for EU users on mobile?"). Getting there means correlating the three
signals instead of treating them as separate tools.

## The Three Pillars

- **Metrics** — cheap, aggregatable numbers over time. Great for dashboards,
  SLOs and alerting (the RED method: Rate, Errors, Duration).
- **Logs** — discrete, high-detail events. Great for the *what happened* once
  you know *where* to look.
- **Traces** — the request's journey across services, with timing per hop. This
  is the connective tissue that tells you *where* to look.

## OpenTelemetry Ties Them Together

The superpower is shared **trace context**. When a log line, a metric exemplar
and a span all carry the same `trace_id`, you can pivot from a slow trace
straight to the exact logs for that request.

```python
from opentelemetry import trace
tracer = trace.get_tracer(__name__)

with tracer.start_as_current_span("charge_card") as span:
    span.set_attribute("payment.provider", "stripe")
    result = provider.charge(amount)
    span.set_attribute("payment.status", result.status)
```

## Practical Advice

1. Start with auto-instrumentation, then add manual spans only around the
   business logic you actually care about.
2. Run the OpenTelemetry Collector so you can change backends without touching
   app code.
3. Use tail-based sampling in production — keep the slow and errored traces,
   drop the boring ones.
