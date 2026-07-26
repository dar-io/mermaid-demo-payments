/** Charge orchestration against the payment processor. */
import type { OrderRequest } from '../api/orders.js';

export interface Charge {
	id: string;
	orderId: string;
	amountCents: number;
	settled: boolean;
}

export async function createCharge(req: OrderRequest): Promise<Charge> {
	return { id: `ch_${req.idempotencyKey}`, orderId: `or_${req.idempotencyKey}`, amountCents: req.amountCents, settled: false };
}

export async function settleCharge(chargeId: string, succeeded: boolean) {
	return { chargeId, settled: succeeded };
}
