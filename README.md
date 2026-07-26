# mermaid-demo-payments

Order intake, charge orchestration, and outbound webhooks.

Downstream consumer: [`mermaid-demo-notify`](https://github.com/dar-io/mermaid-demo-notify) receives
every `charge.succeeded` and `charge.failed` event from this service.

> Synthetic fixture for the Mermaid AI GitHub connector. Not a real payments system.

## Layout

| Path | What lives there |
|---|---|
| `src/api/` | HTTP entry points — order intake and webhook receipt |
| `src/billing/` | Charge orchestration against the payment processor |
| `src/queue/` | Background worker draining the charge queue |
| `src/webhooks/` | Outbound dispatch to mermaid-demo-notify |
| `db/` | Schema and migrations |
| `diagrams/` | Architecture diagrams (written by the AI connector) |
