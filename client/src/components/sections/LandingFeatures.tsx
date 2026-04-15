import {
  Wand2,
  Layers,
  ScanFace,
  PackageCheck,
  ArrowRight,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ─── Feature data ───────────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: Wand2,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50 border-violet-100",
    accentColor: "text-violet-600",
    tag: "Pollinations AI",
    title: "Generate Artwork with AI",
    description:
      "Type any prompt — from 'neon samurai at dusk' to 'abstract waves in gold' — and get unique, print-ready artwork in seconds. No Photoshop, no talent required.",
    bullets: [
      "High-resolution, print-optimised output",
      "Unlimited generations on the free tier",
      "Transparent backgrounds ready for any product",
    ],
    cta: { label: "Try the generator", to: "/generate" },
    colSpan: "lg:col-span-2",
    visual: (
      <div className="mt-5 rounded-xl border border-zinc-200 bg-zinc-50 overflow-hidden">
        {/* Prompt bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-100 bg-white">
          <Wand2 className="w-3.5 h-3.5 text-violet-500 shrink-0" />
          <span className="text-[11px] text-zinc-500 font-mono truncate">
            "cosmic tiger, neon jungle, vector illustration"
          </span>
          <span className="ml-auto shrink-0 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-violet-600 bg-violet-50 rounded-full border border-violet-100">
            Generating…
          </span>
        </div>
        {/* Result row */}
        <div className="grid grid-cols-3 gap-2 p-3">
          {[
            "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=200&q=80",
            "https://images.unsplash.com/photo-1558470598-a5dda9640f68?w=200&q=80",
            "https://images.unsplash.com/photo-1549490349-8643362247b5?w=200&q=80",
          ].map((src, i) => (
            <div
              key={i}
              className={`aspect-square rounded-lg overflow-hidden ${
                i === 0
                  ? "ring-2 ring-violet-500 ring-offset-2 ring-offset-zinc-50"
                  : "opacity-40 grayscale"
              }`}
            >
              <img
                src={src}
                alt="AI artwork preview"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <div className="px-4 pb-3 flex items-center justify-between">
          <span className="text-[9px] text-zinc-400 uppercase tracking-widest font-semibold">
            3 variants generated
          </span>
          <span className="text-[9px] text-violet-600 font-bold">Select →</span>
        </div>
      </div>
    ),
  },
  {
    icon: Layers,
    iconColor: "text-fuchsia-600",
    iconBg: "bg-fuchsia-50 border-fuchsia-100",
    accentColor: "text-fuchsia-600",
    tag: "Fabric.js Canvas",
    title: "Design on Any Product",
    description:
      "Drag, drop, scale, and rotate your artwork onto 50+ premium garments and accessories. Real-time positioning with pixel-precise controls.",
    bullets: [
      "Zoom, rotate, and resize freely",
      "Live price preview as you customise",
      "Save and revisit designs any time",
    ],
    cta: { label: "Open the editor", to: "/editor" },
    colSpan: "lg:col-span-1",
    visual: (
      <div className="mt-5 rounded-xl border border-zinc-200 bg-zinc-50 overflow-hidden">
        {/* Chrome */}
        <div className="flex gap-1.5 px-3 py-2.5 border-b border-zinc-100 bg-white">
          {["bg-red-400/60", "bg-yellow-400/60", "bg-green-400/60"].map(
            (c, i) => (
              <span key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />
            ),
          )}
          <span className="ml-2 text-[10px] text-zinc-400 font-mono">
            canvas — Premium Tee
          </span>
        </div>
        {/* Canvas */}
        <div className="relative p-4 flex items-center justify-center bg-white min-h-[120px]">
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(circle, #d4d4d8 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
          {/* Product + artwork */}
          <div className="relative z-10">
            <img
              src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=160&q=80"
              alt="Product"
              className="w-20 h-20 object-contain opacity-50"
              loading="lazy"
            />
            {/* Selection box */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-10 border-2 border-fuchsia-500 rounded-md overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=80&q=80"
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {[
                "-top-1.5 -left-1.5",
                "-top-1.5 -right-1.5",
                "-bottom-1.5 -left-1.5",
                "-bottom-1.5 -right-1.5",
              ].map((pos, i) => (
                <span
                  key={i}
                  className={`absolute ${pos} w-3 h-3 bg-fuchsia-500 rounded-sm border border-white`}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Toolbar */}
        <div className="grid grid-cols-3 divide-x divide-zinc-100 border-t border-zinc-100">
          {[
            { label: "Scale", value: "1.2×" },
            { label: "Rotate", value: "0°" },
            { label: "Price", value: "$24.99" },
          ].map(({ label, value }) => (
            <div key={label} className="px-3 py-2 text-center bg-white">
              <p className="text-[9px] text-zinc-400 uppercase tracking-widest">
                {label}
              </p>
              <p className="text-[11px] font-bold text-zinc-800 mt-0.5">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: ScanFace,
    iconColor: "text-cyan-600",
    iconBg: "bg-cyan-50 border-cyan-100",
    accentColor: "text-cyan-600",
    tag: "FAL AI · FASHN v1.6",
    title: "Virtual Try-On",
    description:
      "Upload a photo and watch your custom design appear on you before you spend a cent. Powered by the FASHN AI model. Result in under 90 seconds.",
    bullets: [
      "Realistic garment draping",
      "Supports upper-body apparel",
      "Result in under 90 seconds",
    ],
    cta: { label: "Try it on yourself", to: "/try-on" },
    colSpan: "lg:col-span-1",
    visual: (
      <div className="mt-5 rounded-xl border border-zinc-200 overflow-hidden">
        <div className="grid grid-cols-2 gap-0">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1488161628813-04466f872be2?w=200&q=70"
              alt="Before"
              className="w-full aspect-[3/4] object-cover grayscale opacity-50"
              loading="lazy"
            />
            <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/40 text-[8px] font-bold uppercase tracking-widest text-white rounded">
              Photo
            </span>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=200&q=70"
              alt="After"
              className="w-full aspect-[3/4] object-cover"
              loading="lazy"
            />
            <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-cyan-500 text-[8px] font-bold uppercase tracking-widest text-white rounded">
              Result ✓
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 border-t border-zinc-100 bg-white">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
          <span className="text-[10px] text-zinc-500">
            Try-on complete · 72s
          </span>
          <span className="ml-auto text-[10px] text-cyan-600 font-semibold">
            Download HD
          </span>
        </div>
      </div>
    ),
  },
  {
    icon: PackageCheck,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50 border-emerald-100",
    accentColor: "text-emerald-600",
    tag: "Stripe · Global Shipping",
    title: "Order with One Click",
    description:
      "Secure Stripe checkout, real-time order tracking, and worldwide fulfilment — all baked in. Your design goes from screen to doorstep in days.",
    bullets: [
      "Stripe-verified secure payment",
      "Order history and status tracking",
      "Webhook-confirmed fulfilment",
    ],
    cta: { label: "View your orders", to: "/orders" },
    colSpan: "lg:col-span-2",
    visual: (
      <div className="mt-5 rounded-xl border border-zinc-200 overflow-hidden">
        {[
          {
            step: "01",
            label: "Payment confirmed",
            sub: "Stripe webhook verified",
            done: true,
          },
          {
            step: "02",
            label: "In production",
            sub: "Your design is being printed",
            done: true,
          },
          {
            step: "03",
            label: "Shipped",
            sub: "Tracking: DHL-4829-XZ",
            done: false,
            active: true,
          },
          {
            step: "04",
            label: "Delivered",
            sub: "Est. 2–3 business days",
            done: false,
          },
        ].map(({ step, label, sub, done, active }) => (
          <div
            key={step}
            className={`flex items-center gap-3 px-4 py-3 border-b border-zinc-100 last:border-0 bg-white ${
              active ? "bg-emerald-50/60" : ""
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black shrink-0 ${
                done
                  ? "bg-emerald-500 text-white"
                  : active
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                    : "bg-zinc-100 text-zinc-400 border border-zinc-200"
              }`}
            >
              {done ? "✓" : step}
            </span>
            <div className="min-w-0">
              <p
                className={`text-[11px] font-semibold leading-none ${
                  done
                    ? "text-zinc-700"
                    : active
                      ? "text-emerald-700"
                      : "text-zinc-400"
                }`}
              >
                {label}
              </p>
              <p className="text-[10px] text-zinc-400 mt-0.5">{sub}</p>
            </div>
            {active && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            )}
          </div>
        ))}
      </div>
    ),
  },
];

/* ─── Feature card ───────────────────────────────────────────────────────── */
const FeatureCard = ({
  icon: Icon,
  iconColor,
  iconBg,
  accentColor,
  tag,
  title,
  description,
  bullets,
  cta,
  colSpan,
  visual,
}: (typeof FEATURES)[0]) => (
  <div
    className={`
      group flex flex-col
      rounded-2xl border border-zinc-200
      bg-white p-6
      hover:border-zinc-300 hover:shadow-md
      transition-all duration-300
      ${colSpan}
    `}
  >
    {/* Icon */}
    <div
      className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${iconBg}`}
    >
      <Icon className={`w-5 h-5 ${iconColor}`} />
    </div>

    {/* Tag */}
    <span className="inline-block mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">
      {tag}
    </span>

    {/* Title */}
    <h3 className="text-lg font-black text-zinc-950 leading-snug mb-2">
      {title}
    </h3>

    {/* Description */}
    <p className="text-sm text-zinc-500 leading-relaxed mb-4">{description}</p>

    {/* Bullets */}
    <ul className="space-y-2 mb-5">
      {bullets.map((b) => (
        <li key={b} className="flex items-start gap-2 text-sm text-zinc-500">
          <Check className={`w-3.5 h-3.5 mt-[3px] shrink-0 ${accentColor}`} />
          <span>{b}</span>
        </li>
      ))}
    </ul>

    {/* CTA */}
    <Link
      to={cta.to}
      className={`
        group/link mt-auto inline-flex items-center gap-1.5
        text-sm font-semibold ${accentColor}
        hover:underline underline-offset-4
        transition-colors duration-150
      `}
    >
      {cta.label}
      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform duration-150" />
    </Link>

    {/* Visual */}
    {visual}
  </div>
);

/* ─── Section ────────────────────────────────────────────────────────────── */
const LandingFeatures = () => (
  <section id="features" className="bg-zinc-50 py-24 sm:py-32">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      {/* Header */}
      <div className="text-center mb-14 space-y-4 max-w-2xl mx-auto">
        <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-violet-600">
          Platform Features
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight leading-tight">
          Everything you need to go from{" "}
          <span className="text-violet-600">idea to outfit</span>
        </h2>
        <p className="text-base text-zinc-500 leading-relaxed">
          Dripify bundles AI generation, a design canvas, virtual try-on, and
          fulfilment into one seamless workflow — no third-party tools needed.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {FEATURES.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </div>
    </div>
  </section>
);

export default LandingFeatures;
