import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

import NavBar from "./components/NavBar";
import { ReactQueryClientProvider } from "./components/react-query-client-provider";

export const metadata: Metadata = {
  title: "Student Organizer",
  description: "Organizează-ți cursurile, task-urile și examenele",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="ro">
        <body>
          <ReactQueryClientProvider>
            <NavBar />
            <main className="pl-60 min-h-screen bg-slate-50">
              {children}
            </main>
          </ReactQueryClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}