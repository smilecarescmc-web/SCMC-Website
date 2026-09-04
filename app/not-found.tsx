import Link from "next/link";
export default function NotFound() {
  return <main className="not-found"><div><span className="eyebrow">404</span><h1>Page not found.</h1><Link className="pill-button dark" href="/en">Back to Smile Care</Link></div></main>;
}
