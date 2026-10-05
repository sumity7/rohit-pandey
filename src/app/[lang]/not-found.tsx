import Link from "next/link";

// Rendered inside the [lang] layout when a page calls notFound().
export default function NotFound() {
  return (
    <section className="on-dark surface-deep">
      <div className="shell flex min-h-[60svh] flex-col justify-center pb-20 pt-[calc(var(--nav-h)+4rem)]">
        <p className="eyebrow">404</p>
        <h1 className="title-lg mt-6 max-w-3xl">This page could not be found.</h1>
        <p lang="hi" className="lede mt-4">
          यह पृष्ठ नहीं मिला।
        </p>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          <Link className="link-draw" href="/en">
            Home
          </Link>
          <Link className="link-draw" href="/hi" lang="hi">
            मुखपृष्ठ
          </Link>
        </div>
      </div>
    </section>
  );
}
