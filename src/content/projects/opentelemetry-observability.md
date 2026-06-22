---
title: "Distributed Tracing Platform with OpenTelemetry"
summary: "End-to-end observability for a polyglot microservices app — tracing latency and bottlenecks across services with OpenTelemetry, then visualising the data for fast root-cause analysis."
date: 2026-04-18
role: "Platform / Observability Engineer"
timeline: "6 weeks"
featured: true
order: 1
stack: ["OpenTelemetry", "Kubernetes", "Jaeger", "Prometheus", "Grafana", "Go", "Helm"]
domains: ["Observability", "Platform Engineering", "SRE"]
impact:
  - { value: "100%", label: "Request path traced" }
  - { value: "~70%", label: "Faster root-cause" }
  - { value: "4", label: "Services instrumented" }
links:
  repo: "https://github.com/ahsankhan420/opentelemetry-app"
---

> **TL;DR** — Instrumented a multi-service application with the OpenTelemetry
> SDK + Collector, exported traces to Jaeger and metrics to Prometheus, and
> built Grafana dashboards that turned "the app feels slow" into a precise,
> service-level latency breakdown.

## The Problem

The application was a small fleet of microservices communicating over HTTP and
gRPC. When end-to-end latency spiked, there was no way to tell **which** hop was
responsible. Logs were siloed per service and timestamps didn't line up, so
debugging meant guesswork and SSH-ing into pods.

## The Approach

1. **Vendor-neutral instrumentation.** Adopted the OpenTelemetry SDK so the app
   isn't locked to a single backend — traces, metrics and logs share one
   context-propagation standard (W3C Trace Context).
2. **Collector as a pipeline.** Deployed the OpenTelemetry Collector as a
   DaemonSet to receive OTLP, batch, and fan out to Jaeger (traces) and
   Prometheus (metrics) — so backends can change without touching app code.
3. **Auto + manual spans.** Used auto-instrumentation for inbound/outbound calls
   and added manual spans around the hot business logic to surface the real
   bottleneck.

```yaml
# otel-collector: receive OTLP, batch, export to Jaeger + Prometheus
receivers:
  otlp:
    protocols: { grpc: {}, http: {} }
processors:
  batch: { timeout: 5s }
exporters:
  otlp/jaeger: { endpoint: "jaeger-collector:4317", tls: { insecure: true } }
  prometheus: { endpoint: "0.0.0.0:8889" }
service:
  pipelines:
    traces:  { receivers: [otlp], processors: [batch], exporters: [otlp/jaeger] }
    metrics: { receivers: [otlp], processors: [batch], exporters: [prometheus] }
```

## Results

A single trace now shows the full request waterfall across every service, with
span-level timing. The slow hop is visible in seconds rather than hours, and the
Grafana RED dashboards (Rate, Errors, Duration) give an at-a-glance health view.

## Lessons Learned

- **Context propagation is everything** — a broken header upstream silently
  fragments traces. Validate propagation early.
- **Sample deliberately.** 100% sampling is great in dev; in production, tail
  sampling keeps cost sane while still capturing the interesting (slow/errored)
  traces.
- Owning the Collector pipeline decouples you from any one observability vendor.
