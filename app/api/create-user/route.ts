// app/api/create-user/route.ts

import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    // Utilizatorul autentificat în Clerk
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const email = clerkUser.emailAddresses[0]?.emailAddress;

    if (!email) {
      return NextResponse.json(
        { error: "Email not found." },
        { status: 400 }
      );
    }

    // Verificăm dacă utilizatorul există deja
    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: clerkUser.id,
      },
    });

    if (existingUser) {
      return NextResponse.json({
        message: "User already exists.",
        user: existingUser,
      });
    }

    // Creăm utilizatorul
    const user = await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        email,
        name:
          `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() ||
          null,

        subscriptionActive: false,
        subscriptionTier: null,
        stripeSubscriptionId: null,
      },
    });

    return NextResponse.json(
      {
        message: "User created successfully.",
        user,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    console.error(error);

    if (error.code === "P2002") {
      return NextResponse.json(
        {
          error: "User already exists.",
        },
        {
          status: 409,
        }
      );
    }

    return NextResponse.json(
      {
        error: "Internal Server Error.",
      },
      {
        status: 500,
      }
    );
  }
}