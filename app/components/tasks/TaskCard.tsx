"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import EditTaskDialog from "./EditTaskDialog";

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  status: "TODO" | "IN_PROGRESS" | "DONE";
  quadrant: "DO_NOW" | "SCHEDULE" | "DELEGATE" | "ELIMINATE";
  deadline?: string;
}

export default function TaskCard({
  id,
  title,
  description,
  priority,
  status,
  quadrant,
  deadline,
}: TaskCardProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  async function deleteTask() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    const response = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      alert("Failed to delete task.");
      return;
    }

    router.refresh();
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">

      <div className="flex justify-between items-start">

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            {title}
          </h2>

          <p className="mt-2 text-slate-500">
            {description}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            priority === "HIGH"
              ? "bg-red-100 text-red-600"
              : priority === "MEDIUM"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {priority}
        </span>

      </div>

      <div className="mt-6 flex items-center justify-between">

        <span className="text-sm text-slate-500">
          {status}
        </span>

        <div className="flex gap-2">

         <EditTaskDialog
  id={id}
  title={title}
  description={description}
  priority={priority}
  quadrant={quadrant}
  deadline={deadline}
/>

          <button
            onClick={deleteTask}
            className="rounded-lg bg-red-500 px-3 py-1 text-white hover:bg-red-600"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}