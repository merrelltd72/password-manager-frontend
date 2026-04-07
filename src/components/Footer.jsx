const Footer = () => {
  return (
    <footer className="fixed bottom-0 z-40 w-full border-t border-blue-300/30 bg-blue-500/95 text-white shadow-md backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-3 sm:flex-row sm:px-6">
        <p className="text-xs font-medium tracking-wide text-blue-100">
          Copyright @{new Date().getFullYear()} Password Manager
        </p>

        <nav className="flex flex-wrap items-center gap-2">
          <a
            href="/privacy"
            className="rounded-md border border-white/35 bg-white/10 px-3 py-1 text-xs font-semibold transition hover:bg-white hover:text-blue-700"
          >
            Privacy
          </a>
          <a
            href="/terms"
            className="rounded-md border border-white/35 bg-white/10 px-3 py-1 text-xs font-semibold transition hover:bg-white hover:text-blue-700"
          >
            Terms
          </a>
          <a
            href="/support"
            className="rounded-md border border-white/35 bg-white/10 px-3 py-1 text-xs font-semibold transition hover:bg-white hover:text-blue-700"
          >
            Support
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
