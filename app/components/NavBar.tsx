"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useUser, SignOutButton } from "@clerk/nextjs";

const loggedInLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/tasks", label: "Tasks" },
  { href: "/calendar", label: "Calendar" },
  { href: "/courses", label: "Courses" },
  { href: "/ai-study", label: "AI Study" },
  { href: "/profile", label: "Profile" },
  { href: "/pricing", label: "Premium" },
];

const loggedOutLinks = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
];

export default function NavBar() {
  const { isLoaded, isSignedIn, user } = useUser();
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-[#E8E1D3] bg-[#FFFDF8]">

      {/* Logo */}
      <div className="px-6 py-8">

        <Link href="/" className="flex items-center gap-3">

          <Image
            src="/logo.png"
            width={42}
            height={42}
            alt="Logo"
            className="rounded-xl"
          />

          <div>

            <h1 className="text-lg font-bold text-[#2F2F2F]">
              Student Organizer
            </h1>

            <p className="text-xs text-[#8A8173]">
              Study Smarter
            </p>

          </div>

        </Link>

      </div>

      <div className="mx-5 border-b border-[#ECE6DA]" />

      {!isLoaded ? (

        <div className="px-6 py-6 text-sm text-[#8A8173]">
          Loading...
        </div>

      ) : isSignedIn ? (

        <>
          <nav className="flex-1 px-4 py-6 overflow-y-auto">

            <ul className="space-y-2">

              {loggedInLinks.map(({ href, label }) => {

                const active = pathname === href;

                return (
                  <li key={href}>

                    <Link
                      href={href}
                      className={`block rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        active
                          ? "bg-[#F5E7B2] text-[#2F2F2F] shadow-sm"
                          : "text-[#5C554A] hover:bg-[#F8F2E6]"
                      }`}
                    >
                      {label}
                    </Link>

                  </li>
                );

              })}

            </ul>

          </nav>

          <div className="border-t border-[#ECE6DA] p-4">

            <Link
              href="/profile"
              className="mb-4 flex items-center gap-3 rounded-xl p-3 transition hover:bg-[#F8F2E6]"
            >

              {user?.imageUrl ? (

                <Image
                  src={user.imageUrl}
                  alt="Profile"
                  width={42}
                  height={42}
                  className="rounded-full"
                />

              ) : (

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5E7B2] font-semibold text-[#2F2F2F]">
                  {user?.firstName?.[0] ?? "S"}
                </div>

              )}

              <div className="min-w-0">

                <p className="truncate font-semibold text-[#2F2F2F]">
                  {user?.firstName ?? "Student"}
                </p>

                <p className="truncate text-xs text-[#8A8173]">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>

              </div>

            </Link>

            <SignOutButton>

              <button className="w-full rounded-xl border border-[#E5DCCB] bg-white py-3 text-sm font-medium text-[#5C554A] transition hover:bg-[#F8F2E6]">
                Sign Out
              </button>

            </SignOutButton>

          </div>

        </>

      ) : (

        <>
          <nav className="flex-1 px-4 py-6">

            <ul className="space-y-2">

              {loggedOutLinks.map(({ href, label }) => {

                const active = pathname === href;

                return (

                  <li key={href}>

                    <Link
                      href={href}
                      className={`block rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        active
                          ? "bg-[#F5E7B2] text-[#2F2F2F]"
                          : "text-[#5C554A] hover:bg-[#F8F2E6]"
                      }`}
                    >
                      {label}
                    </Link>

                  </li>

                );

              })}

            </ul>

          </nav>

          <div className="border-t border-[#ECE6DA] p-4 space-y-3">

            <Link
              href="/sign-in"
              className="block rounded-xl border border-[#E5DCCB] bg-white py-3 text-center text-sm font-medium text-[#2F2F2F] transition hover:bg-[#F8F2E6]"
            >
              Sign In
            </Link>

            <Link
              href="/sign-up"
              className="block rounded-xl bg-[#F5E7B2] py-3 text-center text-sm font-semibold text-[#2F2F2F] transition hover:bg-[#EFD98C]"
            >
              Get Started
            </Link>

          </div>

        </>

      )}

    </aside>
  );
}