const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-3 sm:flex-row sm:px-6">
        <p className="text-xs font-medium tracking-wide text-base-content/70">
          Copyright @{new Date().getFullYear()} Password Manager
        </p>

        <nav className="flex flex-wrap items-center gap-2">
          <a href="/privacy" className="app-footer-link">
            Privacy
          </a>
          <a href="/terms" className="app-footer-link">
            Terms
          </a>
          <a href="/support" className="app-footer-link">
            Support
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
