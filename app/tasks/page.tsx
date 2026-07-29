import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

import AddTaskDialog from "../components/tasks/AddTaskDialog";
import TaskCard from "../components/tasks/TaskCard";

export default async function TasksPage() {
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
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-[#F8F6F1] p-8">

      {/* Header */}

      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-4xl font-bold text-[#3E3125]">
            My Tasks
          </h1>

          <p className="mt-2 text-[#7C6A58]">
            View, organise and manage all your tasks in one place.
          </p>

        </div>

        <AddTaskDialog />

      </div>

      {/* Tasks */}

      {tasks.length === 0 ? (
        <div className="rounded-3xl border border-[#E8DDC7] bg-white p-16 text-center shadow">

          <h2 className="text-2xl font-semibold text-[#3E3125]">
            No tasks yet
          </h2>

          <p className="mt-3 text-[#7C6A58]">
            Create your first task to get started.
          </p>

        </div>
      ) : (
        <div className="grid gap-5">

          {tasks.map((task) => (
           <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description ?? ""}
                priority={task.priority}
                status={task.status}
                quadrant={task.quadrant}
                deadline={
               task.deadline
                 ? task.deadline.toISOString().split("T")[0]
                 : ""
             }
           />
          ))}

        </div>
      )}

    </div>
  );
}