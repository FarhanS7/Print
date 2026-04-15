import type { Request, Response } from "express";
import stripe from "../services/stripe.service.js";
import { Order } from "../models/order.model.js";
import dotenv from "dotenv";

dotenv.config();

/**
 * Stripe Webhook Handler
 * Handles Stripe webhook events with signature verification
 * Updates order status from "pending" to "paid" on successful payment
 */
const stripeWebhookHandler = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  // Verify that we have the webhook secret
  if (!endpointSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not configured");
    return res.status(400).send("Webhook secret not configured");
  }

  let event;

  try {
    // Construct and verify the event using Stripe's signature
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error(`Webhook signature verification failed: ${errorMessage}`);
    return res.status(400).send(`Webhook Error: ${errorMessage}`);
  }

  try {
    // Handle checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;

      console.log(
        `Processing checkout.session.completed for session ${session.id}`,
      );

      // Verify that metadata exists
      if (
        !session.metadata ||
        !session.metadata.designId ||
        !session.metadata.userId
      ) {
        console.warn(`Session ${session.id} missing required metadata`);
        return res.status(400).json({
          success: false,
          message: "Session metadata is incomplete",
        });
      }

      // Update the order in our database
      const updatedOrder = await Order.findOneAndUpdate(
        { stripeSessionId: session.id },
        {
          status: "paid",
          customerEmail: session.customer_details?.email,
          shippingAddress: {
            line1: session.shipping_details?.address?.line1,
            city: session.shipping_details?.address?.city,
            postalCode: session.shipping_details?.address?.postal_code,
            country: session.shipping_details?.address?.country,
          },
        },
        { new: true },
      );

      if (!updatedOrder) {
        console.warn(`No order found for session ${session.id}`);
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      console.log(
        `Order ${updatedOrder._id} successfully updated to paid status`,
      );
    }

    // Handle payment_intent.succeeded event (additional redundancy)
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as any;
      console.log(`Payment intent ${paymentIntent.id} succeeded`);

      // Find order by stripeSessionId through the intent
      if (paymentIntent.metadata?.designId) {
        await Order.findOneAndUpdate(
          {
            stripeSessionId: { $in: [paymentIntent.id] },
          },
          { status: "paid" },
        );
      }
    }

    // Handle charge.failed event for error tracking
    if (event.type === "charge.failed") {
      const charge = event.data.object as any;
      console.error(`Charge ${charge.id} failed: ${charge.failure_message}`);

      // Optional: Update order status to failed
      await Order.findOneAndUpdate(
        { stripeSessionId: charge.payment_intent },
        { status: "cancelled" },
      );
    }

    // Acknowledge receipt of event
    res.json({ received: true });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error(`Error processing webhook event: ${errorMessage}`);

    // Return 200 OK to acknowledge receipt, but log the error
    // This prevents Stripe from retrying the webhook
    res.status(200).json({
      success: false,
      message: "Event processed with errors",
      error: errorMessage,
    });
  }
};

export default stripeWebhookHandler;
