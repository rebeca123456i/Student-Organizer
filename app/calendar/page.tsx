import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

import Calendar from "../components/calendar/Calendar";

export default async function CalendarPage() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: clerkUser.id,
    },
  });

  if (!user) {
    return null;
  }

  const tasks = await prisma.task.findMany({
    where: {
      userId: user.id,
      deadline: {
        not: null,
      },
    },
  });

const events = tasks
  .filter((task) => task.deadline)
  .map((task) => ({
    title: task.title,

    date: task.deadline!.toISOString().split("T")[0],

    backgroundColor:
      task.priority === "HIGH"
        ? "#FECACA" // roșu pastel
        : task.priority === "MEDIUM"
        ? "#FDE68A" // galben pastel
        : "#BBF7D0", // verde pastel

    borderColor: "transparent",

    textColor:
      task.priority === "HIGH"
        ? "#991B1B"
        : task.priority === "MEDIUM"
        ? "#92400E"
        : "#166534",

    extendedProps: {
      quadrant: task.quadrant,
      priority: task.priority,
      description: task.description,
    },
  }));

  return (
    <div className="min-h-screen bg-slate-50 p-8">

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">
          Calendar
        </h1>

        <p className="mt-2 text-slate-500">
          View all your upcoming tasks.
        </p>
      </div>

      <Calendar events={events} />

    </div>
  );
}