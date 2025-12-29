// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { ThemeToggle } from "@/components/common/theme-toggle";
import Providers from "./providers";
import { Toaster } from "sonner";
import { UserMenu } from "@/components/layout/user-menu";
import { WelcomeUser } from "@/components/layout/welcome-client";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Beast Mode",
  description: "Track your habits and goals",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen overflow-y-auto">
        <Providers>
          <div className="h-full flex flex-col">
            {/* Header */}
            <header className="border-b">
              <div className="relative flex items-center px-4 py-3">
                {/* Left */}
                <div className="hidden sm:block">
                  <WelcomeUser />
                </div>

                {/* Center (TRUE CENTER) */}
                <h1 className="absolute left-1/2 -translate-x-1/2 text-xl font-bold flex items-center gap-2">
                  <Link href="/" className="text-xl font-bold flex items-center gap-2 no-underline hover:no-underline">
                    <i className="bi bi-radioactive"></i>
                    BeastMode Hub
                  </Link>
                </h1>

                {/* Right */}
                <div className="ml-auto flex items-center gap-3">
                  <ThemeToggle />
                  <UserMenu />
                </div>
              </div>
            </header>


            {/* Main Content */}
            <div className="flex-1 overflow-auto">
              {children}
            </div>
          </div>
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}