import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import AIBuddy from "@/components/AIBuddy";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Actually Useful AI — AI in plain English",
  description:
    "AI in plain English. No tech degree required. Simple guides and prompts for regular people.",
};

function Header() {
  return (
    <header className="border-b border-indigo-900 bg-indigo-950">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-extrabold text-white">
          ✨ Actually Useful AI
        </Link>
        <nav className="flex gap-6 text-sm font-medium">
          <Link href="/" className="text-indigo-100 hover:text-white">
            Home
          </Link>
          <Link href="/products" className="text-indigo-100 hover:text-white">
            Downloads
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-slate-600">
        <div className="flex flex-col justify-between gap-6 sm:flex-row">
          <div>
            <p className="font-bold text-indigo-950">Actually Useful AI</p>
            <p className="mt-1 max-w-sm">
              AI in plain English. No tech degree required.
            </p>
          </div>
          <nav className="flex gap-6">
            <Link href="/" className="hover:text-indigo-900">
              Home
            </Link>
            <Link href="/products" className="hover:text-indigo-900">
              Downloads
            </Link>
            <Link href="/checkout" className="hover:text-indigo-900">
              Checkout
            </Link>
          </nav>
        </div>
        <p className="mt-8 text-xs text-slate-400">
          © {new Date().getFullYear()} Actually Useful AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        <Header />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
        {/* AI Buddy chat widget — friendly beginner-focused help */}
        <AIBuddy />
      </body>
    </html>
  );
}
