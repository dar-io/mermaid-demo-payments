# Architecture

Order intake is synchronous; capture and notification are not.

1. `POST /orders` (`src/api/orders.ts`) validates and creates a charge.
2. Capture is enqueued (`src/queue/worker.ts`) so intake latency stays flat.
3. The processor calls back into `src/api/webhooks.ts`.
4. `src/webhooks/dispatch.ts` fans the result out to mermaid-demo-notify.

The boundary with mermaid-demo-notify is the webhook envelope `{ type, payload }`.
There is no shared schema package — the contract is documented here only.
