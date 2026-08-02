import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[1400px] flex-col items-center justify-center px-5 py-24 text-center">
      <p className="eyebrow mb-4">404</p>
      <h1 className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl">
        This page has drifted out of frame.
      </h1>
      <p className="mt-4 max-w-sm text-base leading-relaxed text-muted">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 border-b border-line-strong pb-0.5 text-sm text-foreground transition-colors hover:border-foreground"
      >
        Return home
      </Link>
    </div>
  );
}
