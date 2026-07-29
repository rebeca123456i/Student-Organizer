import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

import AddTaskDialog from "../components/tasks/AddTaskDialog";
import TaskCard from "../components/tasks/TaskCard";

export default async function DashboardPage() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return null;
  }

  let user = await prisma.user.findUnique({
    where: {
      clerkId: clerkUser.id,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress ?? "",
        name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
      },
    });
  }

  const tasks = await prisma.task.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "DONE"
  ).length;
  const pendingTasks = tasks.filter(
    (task) => task.status !== "DONE"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 p-8">

      {/* Header */}
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">

        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Welcome back, {user.name || "Student"} 👋
          </h1>

          <p className="mt-2 text-slate-500">
            Stay focused, manage your semester and achieve your goals.
          </p>
        </div>

        <AddTaskDialog />

      </div>

      {/* Statistics */}

      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-4">

        <div className="rounded-2xl border bg-white p-6 shadow">
          <p className="text-slate-500">Total Tasks</p>

          <h2 className="mt-3 text-4xl font-bold">
            {totalTasks}
          </h2>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow">
          <p className="text-slate-500">Completed</p>

          <h2 className="mt-3 text-4xl font-bold text-green-600">
            {completedTasks}
          </h2>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow">
          <p className="text-slate-500">Pending</p>

          <h2 className="mt-3 text-4xl font-bold text-orange-500">
            {pendingTasks}
          </h2>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow">
          <p className="text-slate-500">
            Subscription
          </p>

          <h2 className="mt-3 text-3xl font-bold text-blue-600">
            {user.subscriptionActive ? "Active" : "Free"}
          </h2>
        </div>

      </div>

      {/* Matrix */}

      <div className="rounded-3xl bg-white p-8 shadow">

        <h2 className="mb-8 text-2xl font-bold text-black">
          Eisenhower Matrix
        </h2>

        <div className="grid grid-cols-2 gap-6">

          {/* DO NOW */}

          <div className="rounded-xl border-2 border-red-300 bg-red-50 p-5">

            <h3 className="mb-8 text-2xl font-bold text-black">
              Urgent & Important
            </h3>

            {tasks
              .filter((task) => task.quadrant === "DO_NOW")
              .map((task) => (
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

          {/* SCHEDULE */}

          <div className="rounded-xl border-2 border-blue-300 bg-blue-50 p-5">

            <h3 className="mb-8 text-2xl font-bold text-black">
              Important, Not Urgent
            </h3>

            {tasks
              .filter((task) => task.quadrant === "SCHEDULE")
              .map((task) => (
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

          {/* DELEGATE */}

          <div className="rounded-xl border-2 border-yellow-300 bg-yellow-50 p-5">

            <h3 className="mb-8 text-2xl font-bold text-black">
              Urgent, Not Important
            </h3>

            {tasks
              .filter((task) => task.quadrant === "DELEGATE")
              .map((task) => (
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

          {/* ELIMINATE */}

          <div className="rounded-xl border-2 border-gray-300 bg-gray-50 p-5">

            <h3 className="mb-8 text-2xl font-bold text-black">
              Neither Urgent nor Important
            </h3>

            {tasks
              .filter((task) => task.quadrant === "ELIMINATE")
              .map((task) => (
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

        </div>

      </div>

    </div>
  );
}