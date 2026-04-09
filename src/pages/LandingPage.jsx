import { useEffect } from "react";
import heroBg from "../assets/images/smoke-blue-background.jpg";

const LandingPage = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const jwt = params.get("jwt");

    if (jwt) {
      localStorage.setItem("jwt", jwt);
      window.location.href = "/";
    }
  }, []);

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-linear-to-b from-slate-900/70 via-blue-900/55 to-slate-900/75" />

      <section className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6 py-24 md:px-10">
        <div className="max-w-2xl text-white">
          <p className="mb-4 inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs tracking-[0.2em] uppercase">
            Secure by Design
          </p>

          <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Password Manager
          </h1>

          <p className="mt-6 text-base text-blue-100 sm:text-lg">
            Store credentials safely, generate strong passwords instantly, and
            keep account access organized in one clean dashboard.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/signup"
              className="btn btn-primary bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600"
            >
              Get Started
            </a>
            <a
              href="/login"
              className="btn btn-outline text-white border-white/70 hover:bg-white hover:text-slate-900"
            >
              Login
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
