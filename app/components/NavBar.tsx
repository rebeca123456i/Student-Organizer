// app/components/NavBar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useUser, SignOutButton, Show } from "@clerk/nextjs";

const loggedInLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/tasks", label: "Tasks" },
  { href: "/calendar", label: "Calendar" },
  { href: "/schedule", label: "Schedule" },
  { href: "/courses", label: "Courses" },
  { href: "/ai-study", label: "AI Study" },
  { href: "/profile", label: "Profile" },
  { href: "/premium", label: "Premium" },
];

const loggedOutLinks = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export default function NavBar() {
  const { isLoaded, isSignedIn, user } = useUser();
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 flex flex-col bg-[#12213D] text-[#AEB6C9] z-50">
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 py-6">
        <Image src="/logo.png" width={32} height={32} alt="Logo" className="rounded" />
        <span className="text-[#F4F6FA] font-semibold tracking-tight text-lg">
          StudyDesk
        </span>
      </div>

      <div className="h-px mx-5 bg-white/10" />

      {!isLoaded ? (
        <div className="px-5 py-6 text-sm text-[#6B7488]">Loading…</div>
      ) : (
        <nav className="flex-1 flex flex-col justify-between overflow-y-auto py-4">
          <Show when="signed-in">
            <ul className="flex flex-col gap-1 px-3">
              {loggedInLinks.map(({ href, label }) => {
                const active = pathname === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`block rounded-lg px-3 py-2.5 text-sm transition-colors ${
                        active
                          ? "bg-[#F4A825]/15 text-[#F4A825] font-medium"
                          : "hover:bg-white/5 hover:text-[#F4F6FA]"
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Show>

          <Show when="signed-out">
            <ul className="flex flex-col gap-1 px-3">
              {loggedOutLinks.map(({ href, label }) => {
                const active = pathname === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`block rounded-lg px-3 py-2.5 text-sm transition-colors ${
                        active
                          ? "bg-[#F4A825]/15 text-[#F4A825] font-medium"
                          : "hover:bg-white/5 hover:text-[#F4F6FA]"
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="px-3">
              <Link
                href="/sign-in"
                className="block text-center rounded-lg bg-[#F4A825] text-[#12213D] font-medium px-3 py-2.5 text-sm hover:bg-[#F7B84F] transition-colors"
              >
                Sign In
              </Link>
            </div>
          </Show>
        </nav>
      )}

      {/* User footer - only when signed in */}
      <Show when="signed-in">
        <div className="border-t border-white/10 px-3 py-4">
          <div className="flex items-center gap-3 px-2 mb-3">
            <Link href="/profile">
              {user?.imageUrl ? (
                <Image
                  src={user.imageUrl}
                  alt="Profile"
                  width={36}
                  height={36}
                  className="rounded-full ring-2 ring-[#F4A825]/60"
                />
              ) : (
                <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-[#F4F6FA] font-semibold text-sm">
                  {user?.firstName?.[0] ??
                    user?.emailAddresses?.[0]?.emailAddress?.[0] ??
                    "?"}
                </div>
              )}
            </Link>
            <div className="min-w-0">
              <p className="text-sm text-[#F4F6FA] truncate">
                {user?.firstName ?? "Student"}
              </p>
              <p className="text-xs text-[#6B7488] truncate">
                {user?.emailAddresses?.[0]?.emailAddress}
              </p>
            </div>
          </div>

          <SignOutButton>
            <button className="w-full text-left rounded-lg px-3 py-2.5 text-sm text-[#AEB6C9] hover:bg-white/5 hover:text-[#F4F6FA] transition-colors">
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </Show>
    </aside>
  );
}