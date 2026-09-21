"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <main id="scmc-main" className="scmc-system-page">
      <p className="scmc-eyebrow">SMILE CARE · RAS AL KHAIMAH</p>
      <h1>Something went wrong.</h1>
      <p>Please try loading this page again.</p>
      <button className="scmc-button scmc-button--primary" type="button" onClick={() => reset()}>
        Try again
      </button>
    </main>
  );
}