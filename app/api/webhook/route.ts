// app/api/webhook/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

console.log("Webhook received");
export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  // Verify Stripe event is legit
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature || "",
      webhookSecret
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed. ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentFailed(invoice);
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }
      // Add more event types as needed
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (e: any) {
    console.error(`stripe error: ${e.message} | EVENT TYPE: ${event.type}`);
    return NextResponse.json({ error: e.message }, { status: 400 });
  }

  return NextResponse.json({});
}




const handleCheckoutSessionCompleted = async (
  session: Stripe.Checkout.Session
) => {
  const clerkUserId = session.metadata?.clerkUserId;
  const subscriptionId = session.subscription as string;

  if (!clerkUserId) {
    console.error("Missing Clerk User ID");
    return;
  }

  await prisma.user.update({
    where: {
      clerkId: clerkUserId,
    },
    data: {
      subscriptionActive: true,
      subscriptionTier: "premium",
      stripeSubscriptionId: subscriptionId,
    },
  });

  console.log("Subscription activated");
};



// Handler for failed invoice payments
const handleInvoicePaymentFailed = async (invoice: Stripe.Invoice) => {
  const subscriptionId =
    invoice.parent?.subscription_details?.subscription as string | undefined;

  if (!subscriptionId) return;

  const user = await prisma.user.findUnique({
    where: {
      stripeSubscriptionId: subscriptionId,
    },
    select: {
      clerkId: true,
    },
  });

  if (!user) return;

  await prisma.user.update({
    where: {
      clerkId: user.clerkId,
    },
    data: {
      subscriptionActive: false,
    },
  });
};



// Handler for subscription deletions (e.g., cancellations)
const handleSubscriptionDeleted = async (
  subscription: Stripe.Subscription
) => {
  const user = await prisma.user.findUnique({
    where: {
      stripeSubscriptionId: subscription.id,
    },
    select: {
      clerkId: true,
    },
  });

  if (!user) return;

  await prisma.user.update({
    where: {
      clerkId: user.clerkId,
    },
    data: {
      subscriptionActive: false,
      subscriptionTier: null,
      stripeSubscriptionId: null,
    },
  });
};