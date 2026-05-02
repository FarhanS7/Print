import { Link } from "react-router-dom";
import { Zap, Send, Camera, Globe } from "lucide-react";

/* ─── Link columns ───────────────────────────────────────────────────────── */
const COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "AI Generator", to: "/generate" },
      { label: "Design Editor", to: "/editor" },
      { label: "Virtual Try-On", to: "/try-on" },
      { label: "My Orders", to: "/orders" },
    ],
  },
  {
    heading: "Platform",
    links: [
      { label: "Features", anchor: "features" },
      { label: "How It Works", anchor: "how-it-works" },
      { label: "Pricing", anchor: "pricing" },
      { label: "Changelog", to: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", to: "#" },
      { label: "Terms of Service", to: "#" },
      { label: "Cookie Policy", to: "#" },
      { label: "Refund Policy", to: "#" },
    ],
  },
];

const SOCIALS = [
  { icon: Send, label: "Twitter / X", href: "https://twitter.com" },
  { icon: Camera, label: "Instagram", href: "https://instagram.com" },
  { icon: Globe, label: "Website", href: "#" },
];

const TECH_BADGES = ["Pollinations AI", "FAL AI", "Stripe", "Cloudinary"];

/* ─── Scroll-to-anchor helper ────────────────────────────────────────────── */
const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
  e.preventDefault();
  document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
};

/* ─── Component ──────────────────────────────────────────────────────────── */
const LandingFooter = () => (
  <footer className="bg-white border-t border-zinc-100">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      {/* ── Main grid ─────────────────────────────────────────────────── */}
      <div className="py-16 lg:py-24 grid grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 lg:gap-8">
        {/* Brand column */}
        <div className="col-span-2 lg:col-span-1 space-y-6">
          {/* Logo */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 group select-none"
          >
            <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-600/20 group-hover:bg-violet-700 transition-all duration-300">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-zinc-950">
              Dripify
            </span>
          </Link>

          {/* Tagline */}
          <p className="text-base text-zinc-500 leading-relaxed max-w-[280px]">
            The AI fashion platform for creators. Describe it, design it, and
            wear it.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-1">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-10 h-10 flex items-center justify-center rounded-xl text-zinc-400 hover:text-zinc-950 hover:bg-zinc-50 transition-all duration-200"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            {TECH_BADGES.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-zinc-400 border border-zinc-100 rounded-lg bg-zinc-50/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {COLUMNS.map(({ heading, links }) => (
          <div key={heading} className="space-y-6">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-900">
              {heading}
            </p>
            <ul className="space-y-4 list-none m-0 p-0">
              {links.map(
                ({
                  label,
                  to,
                  anchor,
                }: {
                  label: string;
                  to?: string;
                  anchor?: string;
                }) => (
                  <li key={label}>
                    {anchor ? (
                      <a
                        href={`#${anchor}`}
                        onClick={(e) => scrollTo(e, anchor)}
                        className="group flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-950 transition-colors duration-200"
                      >
                        <span className="relative">
                          {label}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-600 transition-all duration-300 group-hover:w-full" />
                        </span>
                      </a>
                    ) : (
                      <Link
                        to={to || "#"}
                        className="group flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-950 transition-colors duration-200"
                      >
                        <span className="relative">
                          {label}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-600 transition-all duration-300 group-hover:w-full" />
                        </span>
                      </Link>
                    )}
                  </li>
                ),
              )}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Bottom bar ────────────────────────────────────────────────── */}
      <div className="py-8 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-sm text-zinc-400 text-center sm:text-left">
          © {new Date().getFullYear()}{" "}
          <span className="font-bold text-zinc-900">Dripify</span>. AI Fashion
          Redefined.
        </p>

        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-50/50 border border-emerald-100/50">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
          <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
            All Systems Operational
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default LandingFooter;
