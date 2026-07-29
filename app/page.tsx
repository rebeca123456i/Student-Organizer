import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FAF8F4] text-[#2F2F2F]">

      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-[#F5E7B2]/40 blur-3xl" />
        <div className="absolute top-1/2 right-0 h-[320px] w-[320px] rounded-full bg-[#F8F2E6] blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-[#F3E4B0]/20 blur-[180px]" />
      </div>

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-6 py-24 md:px-10">

        <div className="grid items-center gap-20 lg:grid-cols-2">

          {/* Left */}

          <div>

            <span className="inline-flex items-center gap-2 rounded-full border border-[#E8DDC0] bg-[#FFF8E8] px-5 py-2 text-sm font-medium text-[#8A6D3B]">
              <span className="text-[#C8A66A]">✦</span>
              All-in-One Student Workspace
            </span>

            <h1 className="mt-8 text-6xl font-semibold leading-tight tracking-tight">

              Organize.
              <br />

              Study.
              <br />

              <span className="text-[#C5A35D]">
                Succeed.
              </span>

            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-[#6B665C]">

              Student Organizer brings together your tasks,
              courses, calendar and AI-powered study tools
              in one beautiful workspace designed for students.

            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                href="/sign-up"
                className="rounded-xl bg-[#E7C98C] px-8 py-4 font-semibold text-[#332B22] transition hover:bg-[#DDBB76]"
              >
                Get Started
              </Link>

              <Link
                href="/pricing"
                className="rounded-xl border border-[#E8E1D3] bg-white px-8 py-4 font-semibold text-[#3A3128] transition hover:bg-[#F8F2E6]"
              >
                View Pricing
              </Link>

            </div>

            <div className="mt-16 grid grid-cols-3 gap-8">

              <div>

                <h3 className="text-3xl font-semibold text-[#C5A35D]">
                  AI
                </h3>

                <p className="mt-2 text-sm text-[#8A8173]">
                  Smart Study Tools
                </p>

              </div>

              <div>

                <h3 className="text-3xl font-semibold text-[#C5A35D]">
                  20+
                </h3>

                <p className="mt-2 text-sm text-[#8A8173]">
                  Free Tasks
                </p>

              </div>

              <div>

                <h3 className="text-3xl font-semibold text-[#C5A35D]">
                  24/7
                </h3>

                <p className="mt-2 text-sm text-[#8A8173]">
                  Cloud Access
                </p>

              </div>

            </div>

          </div>

          {/* Right */}

          <div className="rounded-[32px] border border-[#ECE6DA] bg-white p-8 shadow-xl">

            <div className="flex items-center justify-between">

              <h2 className="text-2xl font-semibold">
                Dashboard Preview
              </h2>

              <span className="rounded-full bg-[#F6E8BF] px-4 py-1 text-xs font-semibold text-[#7A6032]">
                Preview
              </span>

            </div>

            <div className="mt-8 space-y-5">

              <div className="rounded-2xl border border-[#ECE6DA] bg-[#FFFDF8] p-5">

                <h3 className="font-semibold text-[#3A3128]">
                  Task Manager
                </h3>

                <p className="mt-2 text-[#6B665C]">
                  Organize every assignment using the Eisenhower Matrix.
                </p>

              </div>

              <div className="rounded-2xl border border-[#ECE6DA] bg-[#FFFDF8] p-5">

                <h3 className="font-semibold text-[#3A3128]">
                  Calendar
                </h3>

                <p className="mt-2 text-[#6B665C]">
                  Keep track of exams, lectures and important deadlines.
                </p>

              </div>

              <div className="rounded-2xl border border-[#ECE6DA] bg-[#FFFDF8] p-5">

                <h3 className="font-semibold text-[#3A3128]">
                  AI Study Assistant
                </h3>

                <p className="mt-2 text-[#6B665C]">
                  Generate summaries, quizzes and personalised study plans.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

            {/* Features */}

      <section className="relative mx-auto max-w-7xl px-6 pb-24 md:px-10">

        <div className="text-center">

          <span className="inline-flex items-center gap-2 rounded-full border border-[#E8DDC0] bg-[#FFF8E8] px-5 py-2 text-sm font-medium text-[#8A6D3B]">
            <span className="text-[#C5A35D]">✦</span>
            Everything in One Place
          </span>

          <h2 className="mt-6 text-5xl font-semibold tracking-tight text-[#352C24]">
            Everything You Need
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#6B665C]">
            Keep your academic life organised with a clean workspace
            designed to help you stay focused every day.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">

          {/* Card */}

          <div className="rounded-[28px] border border-[#ECE2D3] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF5DF]">
              <div className="h-3 w-3 rounded-full bg-[#C5A35D]" />
            </div>

            <h3 className="text-2xl font-semibold text-[#352C24]">
              Courses
            </h3>

            <p className="mt-4 leading-8 text-[#6B665C]">
              Store lecture notes, documents and learning resources in
              one organised place.
            </p>

          </div>

          {/* Card */}

          <div className="rounded-[28px] border border-[#ECE2D3] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF5DF]">
              <div className="h-3 w-3 rounded-full bg-[#C5A35D]" />
            </div>

            <h3 className="text-2xl font-semibold text-[#352C24]">
              Task Management
            </h3>

            <p className="mt-4 leading-8 text-[#6B665C]">
              Prioritise your assignments using the Eisenhower Matrix and
              stay productive throughout the semester.
            </p>

          </div>

          {/* Card */}

          <div className="rounded-[28px] border border-[#ECE2D3] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF5DF]">
              <div className="h-3 w-3 rounded-full bg-[#C5A35D]" />
            </div>

            <h3 className="text-2xl font-semibold text-[#352C24]">
              AI Study Tools
            </h3>

            <p className="mt-4 leading-8 text-[#6B665C]">
              Generate summaries, quizzes and personalised study plans
              to learn more efficiently.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}