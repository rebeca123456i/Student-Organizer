import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.task.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        title: body.title,
        description: body.description,
        priority: body.priority,
        quadrant: body.quadrant,
        deadline: body.deadline
          ? new Date(body.deadline)
          : null,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to update task." },
      { status: 500 }
    );
  }
}