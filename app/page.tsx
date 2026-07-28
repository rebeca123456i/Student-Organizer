import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="max-w-3xl text-center px-6">
        <h1 className="text-5xl font-bold text-slate-900 mb-6">
          Student Organizer
        </h1>

        <p className="text-xl text-gray-600 mb-10">
          Organizează-ți cursurile, task-urile și examenele într-un singur loc.
        </p>

        <div className="flex justify-center gap-5">
          <Link
            href="/sign-up"
            className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700"
          >
            Get Started
          </Link>

          <Link
            href="/pricing"
            className="border border-blue-600 text-blue-600 px-8 py-3 rounded-xl hover:bg-blue-50"
          >
            Premium
          </Link>
        </div>
      </div>
    </main>
  );
}