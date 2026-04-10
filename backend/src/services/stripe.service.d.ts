import Stripe from 'stripe';
declare const stripe: Stripe;
/**
 * Creates a Stripe Checkout Session for a design.
 */
export declare const createCheckoutSession: (designId: string, userId: string, price: number, title: string, imageUrl: string) => Promise<Stripe.Response<Stripe.Checkout.Session>>;
export default stripe;
//# sourceMappingURL=stripe.service.d.ts.map