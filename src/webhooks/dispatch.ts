/** Outbound webhook dispatch to mermaid-demo-notify. */
const TARGET = process.env.NOTIFY_WEBHOOK_URL ?? 'http://localhost:8080/ingest';

export async function dispatch(type: string, payload: Record<string, unknown>) {
	// Fan-out is fire-and-forget today — see the open issue about dropped events.
	await fetch(TARGET, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ type, payload })
	});
}
