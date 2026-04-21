import { useState } from "react";
import { Link } from "react-router-dom";
import { Zap, Menu, X, Sparkles } from "lucide-react";

const NAV_LINKS = [
  { label: "Features", anchor: "features" },
  { label: "How It Works", anchor: "how-it-works" },
  { label: "Try-On", to: "/try-on" },
  { label: "Pricing", anchor: "pricing" },
];

const LandingNavbar = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
    e.preventDefault();
    document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-300 pt-4 px-4 sm:pt-6">
      <nav 
        className={`
          flex items-center justify-between gap-6 px-5 sm:px-8 h-14 sm:h-16 
          rounded-full border transition-all duration-500 pointer-events-auto
          max-w-5xl w-full bg-white/70 backdrop-blur-md border-zinc-200/50 shadow-lg
        `}
      >

        {/* ── Logo ─────────────────────────────────────── */}
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0 group select-none"
        >
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center shadow-md group-hover:bg-violet-700 transition-colors">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="text-[1.15rem] font-black tracking-tight text-zinc-950">
            Dripify
          </span>
        </Link>

        {/* ── Desktop links ─────────────────────────────── */}
        <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
          {NAV_LINKS.map(({ label, anchor, to }) =>
            anchor ? (
              <li key={label}>
                <a
                  href={`#${anchor}`}
                  onClick={(e) => scrollTo(e, anchor)}
                  className="px-3.5 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 rounded-lg hover:bg-zinc-50 transition-colors duration-150 cursor-pointer"
                >
                  {label}
                </a>
              </li>
            ) : (
              <li key={label}>
                <Link
                  to={to!}
                  className="px-3.5 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 rounded-lg hover:bg-zinc-50 transition-colors duration-150"
                >
                  {label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* ── Right actions ─────────────────────────────── */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            to="/orders"
            className="hidden md:inline-flex items-center px-4 py-2 text-sm font-semibold text-zinc-600 hover:text-zinc-900 rounded-lg hover:bg-zinc-50 transition-all duration-200"
          >
            Sign In
          </Link>

          <Link
            to="/generate"
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold text-white bg-violet-600 hover:bg-violet-700 transition-all duration-200 active:scale-95 shadow-[0_8px_16px_rgba(139,92,246,0.3)] hover:shadow-[0_12px_24px_rgba(139,92,246,0.4)]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Get Started
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-colors"
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ─────────────────────────────────── */}
      {open && (
        <div className="absolute top-[calc(100%+0.5rem)] left-4 right-4 md:hidden border border-zinc-200/50 bg-white/90 backdrop-blur-xl px-5 py-6 space-y-1 shadow-2xl rounded-[2rem] pointer-events-auto animate-in fade-in zoom-in-95 duration-200">
          {NAV_LINKS.map(({ label, anchor, to }) =>
            anchor ? (
              <a
                key={label}
                href={`#${anchor}`}
                onClick={(e) => scrollTo(e, anchor)}
                className="block px-4 py-3 text-base font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded-2xl transition-colors cursor-pointer"
              >
                {label}
              </a>
            ) : (
              <Link
                key={label}
                to={to!}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-base font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded-2xl transition-colors"
              >
                {label}
              </Link>
            )
          )}

          <div className="pt-4 mt-2 border-t border-zinc-100 flex flex-col gap-3">
            <Link
              to="/orders"
              onClick={() => setOpen(false)}
              className="block px-4 py-3 text-center text-base font-semibold text-zinc-700 border border-zinc-200 rounded-2xl hover:bg-zinc-50 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/generate"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-3.5 text-base font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-2xl transition-colors active:scale-95 shadow-md shadow-violet-200"
            >
              <Sparkles className="w-5 h-5" />
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default LandingNavbar;
