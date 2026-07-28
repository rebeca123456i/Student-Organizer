import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: clerkUser.id,
      },
      select: {
        subscriptionActive: true,
        subscriptionTier: true,
        stripeSubscriptionId: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({
        subscription: null,
      });
    }

    return NextResponse.json({
      subscription: user,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch subscription.",
      },
      {
        status: 500,
      }
    );
  }
}