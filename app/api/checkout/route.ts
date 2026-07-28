import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { PREMIUM_PRICE_ID } from "@/lib/plans";

export async function POST(request: NextRequest) {
  try {
    const { userId, email } = await request.json();

    if (!userId || !email) {
      return NextResponse.json(
        { error: "User ID and Email are required." },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",

      line_items: [
        {
          price: PREMIUM_PRICE_ID,
          quantity: 1,
        },
      ],

      customer_email: email,

      metadata: {
        clerkUserId: userId,
      },

      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error: any) {
    console.error("Checkout API Error:", error);

    return NextResponse.json(
      {
        error: "Failed to create checkout session.",
      },
      {
        status: 500,
      }
    );
  }
}