import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Manrope } from "next/font/google";

import "./globals.css";

import NavBar from "./components/NavBar";
import { ReactQueryClientProvider } from "./components/react-query-client-provider";
import { cn } from "@/lib/utils";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Student Organizer",
  description:
    "An all-in-one platform for managing courses, tasks, exams, and AI-powered study tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={cn("font-sans", manrope.variable)}>
        <body>
          <ReactQueryClientProvider>
            <NavBar />
            <main className="min-h-screen bg-[#FAF7F2] pl-64">
              {children}
            </main>
          </ReactQueryClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}