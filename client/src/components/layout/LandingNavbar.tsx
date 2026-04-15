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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-zinc-100">
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-6">

        {/* ── Logo ─────────────────────────────────────── */}
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0 group select-none"
        >
          <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center shadow-sm group-hover:bg-violet-700 transition-colors">
            <Zap className="w-3.5 h-3.5 text-white fill-white" />
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
            className="hidden md:inline-flex items-center px-4 py-2 text-sm font-semibold text-zinc-600 hover:text-zinc-900 rounded-lg hover:bg-zinc-50 transition-colors duration-150"
          >
            Sign In
          </Link>

          <Link
            to="/generate"
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold text-white bg-violet-600 hover:bg-violet-700 transition-colors duration-150 active:scale-95 shadow-sm"
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
        <div className="md:hidden border-t border-zinc-100 bg-white px-5 pt-3 pb-5 space-y-1 shadow-lg">
          {NAV_LINKS.map(({ label, anchor, to }) =>
            anchor ? (
              <a
                key={label}
                href={`#${anchor}`}
                onClick={(e) => scrollTo(e, anchor)}
                className="block px-4 py-3 text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded-xl transition-colors cursor-pointer"
              >
                {label}
              </a>
            ) : (
              <Link
                key={label}
                to={to!}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded-xl transition-colors"
              >
                {label}
              </Link>
            )
          )}

          <div className="pt-3 border-t border-zinc-100 flex flex-col gap-2">
            <Link
              to="/orders"
              onClick={() => setOpen(false)}
              className="block px-4 py-3 text-center text-sm font-semibold text-zinc-700 border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/generate"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-xl transition-colors active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default LandingNavbar;
