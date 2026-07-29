import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

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
        name:
          `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
      },
    });
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">





 {/* Header */}
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-center"> <div>

    <h1 className="text-4xl font-bold text-slate-900">
      Welcome back, {user.name || "Student"} 👋
    </h1>

    <p className="mt-2 text-slate-500">
      Stay focused, manage your semester and achieve your goals.
    </p>

  </div>

  <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
    + New Task
  </button>

</div>

{/* Statistics */}
      <div className="rounded-2xl border border-white/70 bg-white/80 p-6 shadow-md backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
          <p className="text-slate-500 text-sm">
            Total Tasks
          </p>

          <h2 className="text-4xl font-bold text-slate-900 mt-3">
            0
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <p className="text-slate-500 text-sm">
            Completed
          </p>

          <h2 className="text-4xl font-bold text-green-600 mt-3">
            0
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <p className="text-slate-500 text-sm">
            Pending
          </p>

          <h2 className="text-4xl font-bold text-orange-500 mt-3">
            0
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <p className="text-slate-500 text-sm">
            Premium
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-3">
            {user.subscriptionActive ? "Active" : "Free"}
          </h2>
        </div>

      </div>

{/* Eisenhower Matrix */}
     <div className="rounded-3xl border border-white/70 bg-white/80 p-8 shadow-lg backdrop-blur">

        <h2 className="text-2xl font-bold text-slate-900 mb-8">
          Eisenhower Matrix
        </h2>

        <div className="grid grid-cols-2 gap-6">

          <div className="rounded-xl border-2 border-red-300 bg-red-50 p-5 min-h-[220px]">
          <h3 className="mb-4 text-xl font-bold text-slate-900">
               Do Now
            </h3>

            <p className="text-slate-500">
              No tasks.
            </p>
          </div>

          <div className="rounded-xl border-2 border-blue-300 bg-blue-50 p-5 min-h-[220px]">
           <h3 className="mb-4 text-xl font-bold text-slate-900">
               Schedule
            </h3>

            <p className="text-slate-500">
              No tasks.
            </p>
          </div>

          <div className="rounded-xl border-2 border-yellow-300 bg-yellow-50 p-5 min-h-[220px]">
            <h3 className="mb-4 text-xl font-bold text-slate-900">
               Delegate
            </h3>

            <p className="text-slate-500">
              No tasks.
            </p>
          </div>

          <div className="rounded-xl border-2 border-gray-300 bg-gray-50 p-5 min-h-[220px]">
            <h3 className="mb-4 text-xl font-bold text-slate-900">
               Eliminate
            </h3>

            <p className="text-slate-500">
              No tasks.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}