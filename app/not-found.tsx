import Link from "next/link";

export default function NotFound() {
  return (
    <main id="scmc-main" className="scmc-system-page">
      <p className="scmc-eyebrow">404 · SMILE CARE</p>
      <h1>Page not found.</h1>
      <p>The page may have moved or the address may be incorrect.</p>
      <Link className="scmc-button scmc-button--primary" href="/en">Return home</Link>
    </main>
  );
}