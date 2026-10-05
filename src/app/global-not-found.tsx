import Link from "next/link";
import type { Metadata } from "next";
import "./globals.css";
import { fontVars } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Page not found · Rohit Pandey",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en-IN" className={fontVars}>
      <body>
        <main className="shell flex min-h-svh flex-col justify-center py-24">
          <p className="eyebrow">404</p>
          <h1 className="title-lg mt-6 max-w-3xl">This page could not be found.</h1>
          <p lang="hi" className="lede mt-4">
            यह पृष्ठ नहीं मिला।
          </p>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            <Link className="link-draw" href="/en">
              Rohit Pandey: Home
            </Link>
            <Link className="link-draw" href="/hi" lang="hi">
              मुखपृष्ठ (हिंदी)
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
