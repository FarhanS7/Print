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
  <footer className="bg-zinc-50 border-t border-zinc-200">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      {/* ── Main grid ─────────────────────────────────────────────────── */}
      <div className="py-14 grid grid-cols-2 md:grid-cols-[1.8fr_repeat(3,1fr)] gap-10">
        {/* Brand column */}
        <div className="col-span-2 md:col-span-1 space-y-5">
          {/* Logo */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 group select-none"
          >
            <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center shadow-sm group-hover:bg-violet-700 transition-colors">
              <Zap className="w-3.5 h-3.5 text-white fill-white" />
            </div>
            <span className="text-[1.15rem] font-black tracking-tight text-zinc-950">
              Dripify
            </span>
          </Link>

          {/* Tagline */}
          <p className="text-sm text-zinc-500 leading-relaxed max-w-[240px]">
            AI-powered custom fashion. Generate, design, try on, and order — all
            in one place.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-0.5">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 transition-colors duration-150"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {TECH_BADGES.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-zinc-400 border border-zinc-200 rounded-md bg-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {COLUMNS.map(({ heading, links }) => (
          <div key={heading} className="space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">
              {heading}
            </p>
            <ul className="space-y-3 list-none m-0 p-0">
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
                        className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-150 cursor-pointer"
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        to={to}
                        className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-150"
                      >
                        {label}
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
      <div className="py-5 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-zinc-400 text-center sm:text-left">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-zinc-600">Dripify</span>. All
          rights reserved.
        </p>

        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <p className="text-xs text-zinc-400">All systems operational</p>
        </div>
      </div>
    </div>
  </footer>
);

export default LandingFooter;
