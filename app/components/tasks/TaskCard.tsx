interface TaskCardProps {
  title: string;
  description: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  status: "TODO" | "IN_PROGRESS" | "DONE";
}

export default function TaskCard({
  title,
  description,
  priority,
  status,
}: TaskCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition">

      <div className="flex justify-between items-start">

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            {title}
          </h2>

          <p className="text-slate-500 mt-2">
            {description}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium
          ${
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

      <div className="mt-6 flex justify-between items-center">

        <span className="text-slate-500 text-sm">
          {status}
        </span>

        <div className="space-x-2">

          <button className="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
            Edit
          </button>

          <button className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600">
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}