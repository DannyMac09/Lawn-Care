import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import GadgetGuru from "@/components/GadgetGuru";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Gadget Lab — We test viral gadgets so you don't waste money",
  description:
    "Honest, hands-on gadget tests and practical tech guides. No hype, no paid placements — just what's worth your money.",
};

function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-extrabold text-white">
          ⚡ The Gadget Lab
        </Link>
        <nav className="flex gap-6 text-sm font-medium">
          <Link href="/" className="text-zinc-400 hover:text-cyan-400">
            Home
          </Link>
          <Link href="/products" className="text-zinc-400 hover:text-cyan-400">
            Guides
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-zinc-500">
        <div className="flex flex-col justify-between gap-6 sm:flex-row">
          <div>
            <p className="font-bold text-white">⚡ The Gadget Lab</p>
            <p className="mt-1 max-w-sm">
              We test viral gadgets so you don&apos;t waste money. Hands-on
              tests, honest verdicts, zero hype.
            </p>
          </div>
          <nav className="flex gap-6">
            <Link href="/" className="hover:text-cyan-400">
              Home
            </Link>
            <Link href="/products" className="hover:text-cyan-400">
              Guides
            </Link>
            <Link href="/checkout" className="hover:text-cyan-400">
              Checkout
            </Link>
          </nav>
        </div>
        <p className="mt-8 text-xs text-zinc-600">
          © {new Date().getFullYear()} The Gadget Lab. All rights reserved.
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
      <body className={`${inter.className} bg-zinc-950 text-zinc-100`}>
        <Header />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
        <GadgetGuru />
      </body>
    </html>
  );
}
