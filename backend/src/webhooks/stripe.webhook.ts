import type { Request, Response } from 'express';
import stripe from '../services/stripe.service.js';
import { Order } from '../models/order.model.js';
import dotenv from 'dotenv';

dotenv.config();

const stripeWebhookHandler = async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'] as string;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret || "");
    } catch (err) {
        if (err instanceof Error) {
            console.error(`Webhook Error: ${err.message}`);
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }
    }

    // Handle the event
    if (event?.type === 'checkout.session.completed') {
        const session = event.data.object as any;

        // Update the order in our database
        await Order.findOneAndUpdate(
            { stripeSessionId: session.id },
            { 
                status: 'paid',
                customerEmail: session.customer_details?.email,
                shippingAddress: {
                    line1: session.shipping_details?.address?.line1,
                    city: session.shipping_details?.address?.city,
                    postalCode: session.shipping_details?.address?.postal_code,
                    country: session.shipping_details?.address?.country,
                }
            }
        );
        
        console.log(`Order updated for session ${session.id}`);
    }

    res.json({ received: true });
};

export default stripeWebhookHandler;
