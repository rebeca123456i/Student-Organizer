import TaskCard from "../components/tasks/TaskCard";

export default function TasksPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            My Tasks
          </h1>

          <p className="text-slate-500 mt-2">
            Stay organized and never miss a deadline.
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium">
          + New Task
        </button>

      </div>

      <div className="grid gap-5">

        <TaskCard
          title="Finish Database Project"
          description="Create ER Diagram and normalize tables."
          priority="HIGH"
          status="TODO"
        />

        <TaskCard
          title="Study Algorithms"
          description="Practice Graph Algorithms."
          priority="MEDIUM"
          status="IN_PROGRESS"
        />

        <TaskCard
          title="English Homework"
          description="Prepare presentation."
          priority="LOW"
          status="DONE"
        />

      </div>

    </div>
  );
}