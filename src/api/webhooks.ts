/** Inbound webhooks from the payment processor. */
import { settleCharge } from '../billing/charge.js';
import { dispatch } from '../webhooks/dispatch.js';

export async function postProcessorWebhook(event: { type: string; chargeId: string }) {
	if (event.type === 'charge.succeeded' || event.type === 'charge.failed') {
		await settleCharge(event.chargeId, event.type === 'charge.succeeded');
		// Fan out to the notification service.
		await dispatch(event.type, { chargeId: event.chargeId });
	}
}
