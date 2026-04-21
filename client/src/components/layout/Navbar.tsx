import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Zap, ShoppingBag, Menu, X, Sparkles } from "lucide-react";

const NAV_LINKS = [
  { label: "Features", to: "/#features" },
  { label: "How It Works", to: "/#how-it-works" },
  { label: "Try-On", to: "/try-on" },
  { label: "Orders", to: "/orders" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    if (to.startsWith("/#") && isHome) {
      e.preventDefault();
      const id = to.replace("/#", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    closeMobile();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-300 pt-4 px-4 sm:pt-6">
      <nav 
        className={`
          flex items-center justify-between gap-6 px-5 sm:px-8 h-14 sm:h-16 
          rounded-full border transition-all duration-500 pointer-events-auto
          max-w-5xl w-full
          ${scrolled || mobileOpen
            ? "bg-zinc-950/60 backdrop-blur-xl border-white/10 shadow-2xl"
            : "bg-zinc-950/20 backdrop-blur-md border-white/5 shadow-lg"
          }
        `}
      >
        {/* ── Logo ─────────────────────────────────────────── */}
        <Link
          to="/"
          className="flex items-center gap-2.5 shrink-0 group select-none"
        >
          <div
            className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500
                       flex items-center justify-center shadow-lg
                       group-hover:shadow-violet-500/40 transition-shadow duration-300"
          >
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="text-xl font-black tracking-tight text-white leading-none">
            Dripify
          </span>
        </Link>

        {/* ── Desktop nav ───────────────────────────────────── */}
        <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
          {NAV_LINKS.map(({ label, to }) => {
            const isActive = location.pathname === to || (to.startsWith("/#") && isHome);
            return (
              <li key={label} className="relative">
                <Link
                  to={to}
                  onClick={(e) => handleAnchor(e, to)}
                  className={`
                    px-3.5 py-2 text-sm font-medium rounded-lg
                    transition-all duration-300
                    ${isActive ? "text-white" : "text-zinc-400 hover:text-white hover:bg-white/5"}
                  `}
                >
                  {label}
                </Link>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-violet-500 rounded-full shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                )}
              </li>
            );
          })}
        </ul>

        {/* ── Right actions ──────────────────────────────────── */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Cart icon */}
          <Link
            to="/orders"
            className="relative p-2 text-zinc-400 hover:text-white
                       rounded-lg hover:bg-white/5 transition-colors duration-150"
            aria-label="View orders"
          >
            <ShoppingBag className="w-[1.1rem] h-[1.1rem]" />
            <span
              className="absolute top-1.5 right-1.5 w-1.5 h-1.5
                         bg-violet-500 rounded-full
                         shadow-[0_0_6px_rgba(139,92,246,0.8)]"
            />
          </Link>

          {/* Sign In — desktop only */}
          <Link
            to="/orders"
            className="hidden md:inline-flex items-center px-4 py-1.5
                       text-sm font-semibold text-zinc-300
                       border border-white/10 rounded-lg
                       hover:border-white/20 hover:text-white
                       transition-colors duration-150 leading-none"
          >
            Sign In
          </Link>

          {/* Get Started — desktop only */}
          <Link
            to="/generate"
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5
                       text-sm font-bold text-white rounded-lg leading-none
                       bg-violet-600 hover:bg-violet-500
                       shadow-[0_0_0_1px_rgba(139,92,246,0.5)]
                       hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]
                       transition-all duration-200 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Get Started
          </Link>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 text-zinc-400 hover:text-white
                       rounded-lg hover:bg-white/5 transition-colors duration-150"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ──────────────────────────────────────── */}
      {mobileOpen && (
        <div className="absolute top-[calc(100%+0.5rem)] left-4 right-4 md:hidden border border-white/10 bg-zinc-950/90 backdrop-blur-xl px-5 py-6 space-y-1 shadow-2xl rounded-[2rem] pointer-events-auto animate-in fade-in zoom-in-95 duration-200">
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              onClick={(e) => handleAnchor(e, to)}
              className="block px-4 py-3 text-base font-medium text-zinc-300
                         hover:text-white hover:bg-white/5 rounded-2xl
                         transition-colors duration-150"
            >
              {label}
            </Link>
          ))}

          <div className="pt-4 mt-2 border-t border-white/5 flex flex-col gap-3">
            <Link
              to="/orders"
              onClick={closeMobile}
              className="block px-4 py-3 text-center text-base font-semibold
                         text-zinc-300 border border-white/10 rounded-2xl
                         hover:border-white/20 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/generate"
              onClick={closeMobile}
              className="flex items-center justify-center gap-2 px-4 py-3.5
                         text-base font-bold text-white bg-violet-600
                         hover:bg-violet-500 rounded-2xl transition-colors
                         active:scale-95 shadow-md shadow-violet-500/20"
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
