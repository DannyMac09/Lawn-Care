import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import TrailGuide from "@/components/TrailGuide";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Campfire Secrets — Camp Like You've Done It for 30 Years",
  description:
    "Plain-English camping and fishing guides from 30+ years of real time around the campfire.",
};

function Header() {
  return (
    <header className="border-b border-orange-900 bg-orange-950">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-extrabold text-white">
          🔥 Campfire Secrets
        </Link>
        <nav className="flex gap-6 text-sm font-medium">
          <Link href="/" className="text-orange-100 hover:text-white">
            Home
          </Link>
          <Link href="/products" className="text-orange-100 hover:text-white">
            Guides
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-stone-600">
        <div className="flex flex-col justify-between gap-6 sm:flex-row">
          <div>
            <p className="font-bold text-orange-950">Campfire Secrets</p>
            <p className="mt-1 max-w-sm">
              Plain-English camping and fishing guides from 30+ years of real
              time around the campfire.
            </p>
          </div>
          <nav className="flex gap-6">
            <Link href="/" className="hover:text-orange-900">
              Home
            </Link>
            <Link href="/products" className="hover:text-orange-900">
              Guides
            </Link>
            <Link href="/checkout" className="hover:text-orange-900">
              Checkout
            </Link>
          </nav>
        </div>
        <p className="mt-8 text-xs text-stone-400">
          © {new Date().getFullYear()} Campfire Secrets. All rights reserved.
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
      <body className={`${inter.className} bg-stone-50 text-stone-900`}>
        <Header />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
        {/* Trail Guide chat slot — the friendly AI camp helper */}
        <TrailGuide />
      </body>
    </html>
  );
}
