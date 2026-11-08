import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <header className="wrap blog-hero">
          <div className="eyebrow">404</div>
          <h1>
            Page not <span>found.</span>
          </h1>
          <p>The link may be old or mistyped.</p>
          <div className="cta">
            <Link className="btn primary" href="/">
              Back to home →
            </Link>
            <Link className="btn" href="/blogs">
              Read the blog
            </Link>
          </div>
        </header>
      </main>
      <SiteFooter />
    </>
  );
}
