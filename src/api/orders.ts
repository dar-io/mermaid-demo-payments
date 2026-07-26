/** Order intake. The entry point for everything this service does. */
import { createCharge } from '../billing/charge.js';
import { enqueue } from '../queue/worker.js';

export interface OrderRequest {
	customerId: string;
	amountCents: number;
	currency: 'usd' | 'eur' | 'gbp';
	idempotencyKey: string;
}

export async function postOrder(req: OrderRequest) {
	if (req.amountCents <= 0) throw new Error('amount must be positive');
	const charge = await createCharge(req);
	// Capture happens off the request path so intake stays fast.
	await enqueue({ kind: 'capture', chargeId: charge.id });
	return { orderId: charge.orderId, status: 'pending' as const };
}

export async function getOrder(orderId: string) {
	return { orderId, status: 'pending' as const };
}
