import {
  Wand2,
  Layers,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ─── Step data ──────────────────────────────────────────────────────────── */
const STEPS = [
  {
    number: "01",
    icon: Wand2,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50 border-violet-100",
    numberColor: "text-violet-100",
    accentColor: "text-violet-600",
    borderAccent: "border-t-violet-500",
    tag: "AI Generation",
    title: "Describe your vision",
    description:
      "Type any prompt — as wild or refined as you want. Our AI turns plain words into unique, print-ready artwork in seconds. Free, unlimited, no account needed to try.",
    cta: { label: "Open generator", to: "/generate" },
    visual: (
      <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
        {/* Prompt input */}
        <div className="p-4 space-y-3 border-b border-zinc-100">
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-zinc-50 border border-zinc-200">
            <Wand2 className="w-3.5 h-3.5 text-violet-500 shrink-0" />
            <span className="text-[11px] text-zinc-600 font-mono leading-none truncate">
              neon samurai, glitch art, vibrant
            </span>
            <span className="ml-auto w-0.5 h-3.5 bg-violet-500 rounded-full animate-pulse shrink-0" />
          </div>
          <button className="w-full py-2 rounded-lg bg-violet-600 text-white text-[11px] font-bold tracking-wide flex items-center justify-center gap-1.5">
            <Wand2 className="w-3 h-3" />
            Generate Magic
          </button>
        </div>
        {/* Preview thumbnails */}
        <div className="p-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=200&q=80",
              "https://images.unsplash.com/photo-1558470598-a5dda9640f68?w=200&q=80",
              "https://images.unsplash.com/photo-1549490349-8643362247b5?w=200&q=80",
            ].map((src, i) => (
              <div
                key={i}
                className={`aspect-square rounded-lg overflow-hidden ${
                  i === 0
                    ? "ring-2 ring-violet-500 ring-offset-1 ring-offset-white"
                    : "opacity-40 grayscale"
                }`}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[9px] text-zinc-400 uppercase tracking-widest font-semibold">
              3 variants
            </span>
            <span className="text-[9px] text-violet-600 font-bold">
              Select →
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "02",
    icon: Layers,
    iconColor: "text-fuchsia-600",
    iconBg: "bg-fuchsia-50 border-fuchsia-100",
    numberColor: "text-fuchsia-100",
    accentColor: "text-fuchsia-600",
    borderAccent: "border-t-fuchsia-500",
    tag: "Design Editor",
    title: "Place it on a product",
    description:
      "Pick from 50+ premium products — tees, hoodies, caps, and more. Drag your artwork onto the canvas, resize and rotate until it's pixel-perfect. Save for later or go straight to checkout.",
    cta: { label: "Open editor", to: "/editor" },
    visual: (
      <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-zinc-100 bg-zinc-50">
          {["bg-red-400/60", "bg-yellow-400/60", "bg-green-400/60"].map(
            (c, i) => (
              <span key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />
            ),
          )}
          <span className="ml-2 text-[10px] text-zinc-400 font-mono">
            canvas — Premium Tee
          </span>
        </div>
        {/* Canvas area */}
        <div
          className="relative flex items-center justify-center bg-white border-b border-zinc-100"
          style={{ minHeight: 130 }}
        >
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(circle, #d4d4d8 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
          {/* Product + artwork */}
          <div className="relative z-10 flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=160&q=80"
              alt="Product"
              className="w-16 h-16 object-contain opacity-40"
              loading="lazy"
            />
            <div className="relative">
              <div className="w-10 h-10 rounded-lg border-2 border-fuchsia-500 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=80&q=80"
                  alt="Artwork"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
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
          <span className="absolute bottom-2 right-3 text-[9px] font-mono text-zinc-400">
            x 112 · y 88
          </span>
        </div>
        {/* Stat row */}
        <div className="grid grid-cols-3 divide-x divide-zinc-100">
          {[
            { label: "Scale", value: "1.2×" },
            { label: "Rotate", value: "0°" },
            { label: "Price", value: "$24.99" },
          ].map(({ label, value }) => (
            <div key={label} className="px-3 py-2 text-center">
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
    number: "03",
    icon: ShoppingBag,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50 border-emerald-100",
    numberColor: "text-emerald-100",
    accentColor: "text-emerald-600",
    borderAccent: "border-t-emerald-500",
    tag: "Try-On & Order",
    title: "Try it on. Then drip.",
    description:
      "Upload a photo and watch your design appear on you via our AI try-on engine. Love what you see? Checkout securely with Stripe — your custom piece ships in days.",
    cta: { label: "Try it on yourself", to: "/try-on" },
    visual: (
      <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
        {/* Before / After */}
        <div className="grid grid-cols-2">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1488161628813-04466f872be2?w=200&q=70"
              alt="Before"
              className="w-full aspect-[3/4] object-cover grayscale opacity-50"
              loading="lazy"
            />
            <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/40 text-[8px] font-bold uppercase tracking-widest text-white rounded">
              Your photo
            </span>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=200&q=70"
              alt="After try-on"
              className="w-full aspect-[3/4] object-cover"
              loading="lazy"
            />
            <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-emerald-500 text-[8px] font-bold uppercase tracking-widest text-white rounded">
              Try-On ✓
            </span>
          </div>
        </div>
        {/* Checkout strip */}
        <div className="p-3 border-t border-zinc-100 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] text-zinc-400 leading-none">
              Custom Premium Tee
            </p>
            <p className="text-sm font-black text-zinc-950 mt-0.5">$24.99</p>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-zinc-950 hover:bg-zinc-800 rounded-lg text-white text-[10px] font-bold transition-colors">
            <ShoppingBag className="w-3 h-3" />
            Checkout
          </button>
        </div>
      </div>
    ),
  },
];

/* ─── Step card ──────────────────────────────────────────────────────────── */
interface StepCardProps {
  number: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  numberColor: string;
  accentColor: string;
  borderAccent: string;
  tag: string;
  title: string;
  description: string;
  cta: { label: string; to: string };
  visual: React.ReactNode;
  isLast?: boolean;
}

const StepCard = ({
  number,
  icon: Icon,
  iconColor,
  iconBg,
  numberColor,
  accentColor,
  borderAccent,
  tag,
  title,
  description,
  cta,
  visual,
  isLast,
}: StepCardProps) => (
  <div className="relative flex flex-col h-full group">
    {/* Horizontal connector — desktop only, hidden on last */}
    {!isLast && (
      <div className="hidden lg:flex absolute top-12 left-[calc(100%-1rem)] z-10 w-8 items-center justify-center">
        <ArrowRight className="w-5 h-5 text-zinc-300 animate-pulse" />
      </div>
    )}

    {/* Card */}
    <div
      className={`
        relative flex flex-col flex-1 h-full
        rounded-[2.5rem] border border-zinc-200/50 border-t-4 ${borderAccent}
        bg-white/60 backdrop-blur-xl p-8
        hover:border-zinc-300 hover:shadow-2xl hover:shadow-zinc-200/50
        transition-all duration-500
      `}
    >
      {/* Step counter */}
      <div className="absolute top-6 right-8 select-none">
        <span className={`text-6xl font-black opacity-10 ${numberColor}`}>
          {number}
        </span>
      </div>

      {/* Top row */}
      <div className="flex items-start mb-6">
        <div
          className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${iconBg} shadow-sm`}
        >
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>

      {/* Tag */}
      <span
        className={`inline-block mb-3 text-[11px] font-black uppercase tracking-[0.2em] ${accentColor}`}
      >
        {tag}
      </span>

      {/* Title */}
      <h3 className="text-2xl font-black text-zinc-950 leading-tight mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-base text-zinc-500 leading-relaxed mb-6">
        {description}
      </p>

      {/* CTA */}
      <Link
        to={cta.to}
        className={`
          group/link mt-auto inline-flex items-center gap-2
          text-sm font-bold ${accentColor}
          transition-all duration-300
        `}
      >
        <span className="relative">
          {cta.label}
          <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover/link:w-full`} />
        </span>
        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
      </Link>

      {/* Visual Workspace */}
      <div className="mt-8 transform transition-transform duration-500 group-hover:scale-[1.03]">
        {visual}
      </div>
    </div>
  </div>
);

/* ─── Section ────────────────────────────────────────────────────────────── */
const LandingHowItWorks = () => (
  <section id="how-it-works" className="bg-white py-24 sm:py-32">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      {/* Section header */}
      <div className="text-center mb-16 space-y-4 max-w-2xl mx-auto">
        <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-fuchsia-600">
          How It Works
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight leading-tight">
          From blank canvas to{" "}
          <span className="text-fuchsia-600">delivered drip</span> — in three
          steps
        </h2>
        <p className="text-base text-zinc-500 leading-relaxed">
          No experience needed. Dripify guides you from your first prompt to a
          custom garment at your door — in as little as a few minutes.
        </p>
      </div>

      {/* Steps grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
        {STEPS.map((step, i) => (
          <StepCard
            key={step.number}
            {...step}
            isLast={i === STEPS.length - 1}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
        <p className="text-sm text-zinc-400">
          Ready to start your first design?
        </p>
        <Link
          to="/generate"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-zinc-950 hover:bg-zinc-800 transition-colors duration-200 active:scale-[0.98] shadow-sm"
        >
          Get started free
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </section>
);

export default LandingHowItWorks;
