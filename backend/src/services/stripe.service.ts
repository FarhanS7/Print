import Stripe from 'stripe';
import dotenv from 'dotenv';
import { InternalServerException } from '../utils/app-error.js';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

/**
 * Creates a Stripe Checkout Session for a design.
 */
export const createCheckoutSession = async (
    designId: string, 
    userId: string, 
    price: number,
    title: string,
    imageUrl: string
) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: title,
                            images: [imageUrl],
                        },
                        unit_amount: Math.round(price * 100), // Stripe uses cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            metadata: {
                designId,
                userId,
            },
            success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
        });

        return session;
    } catch (error) {
        console.error("Stripe Session Error:", error);
        throw new InternalServerException("Failed to create Stripe checkout session");
    }
};

export default stripe;
