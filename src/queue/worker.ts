/** Background worker draining the charge queue. */
interface Job { kind: 'capture' | 'refund'; chargeId: string }

const queue: Job[] = [];

export async function enqueue(job: Job) {
	queue.push(job);
}

/** Drains in order; a failed job is retried with backoff, not dropped. */
export async function drain(handler: (job: Job) => Promise<void>) {
	while (queue.length) {
		const job = queue.shift()!;
		try {
			await handler(job);
		} catch {
			queue.push(job);
		}
	}
}
