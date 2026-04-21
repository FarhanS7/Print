import {
  ArrowRight,
  Sparkles,
  Wand2,
  Layers,
  ScanFace,
  ArrowDown,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ─── Stat pill ─────────────────────────────────────────────────────────── */
const Stat = ({ value, label }: { value: string; label: string }) => (
  <div>
    <p className="text-xl font-black text-zinc-950 leading-none tracking-tight">
      {value}
    </p>
    <p className="mt-0.5 text-[11px] font-medium text-zinc-400 uppercase tracking-widest">
      {label}
    </p>
  </div>
);

/* ─── Connector between cards ───────────────────────────────────────────── */
const Connector = () => (
  <div className="flex items-center justify-center py-0">
    <div className="flex flex-col items-center gap-0">
      <div className="w-px h-2 bg-zinc-200" />
      <ArrowDown className="w-2.5 h-2.5 text-zinc-300" />
    </div>
  </div>
);

/* ─── Card 1 · AI Generation ────────────────────────────────────────────── */
const GenerateCard = () => (
  <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm">
    {/* Header */}
    <div className="flex items-center gap-2 mb-3">
      <div className="w-6 h-6 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0">
        <Wand2 className="w-3.5 h-3.5 text-violet-600" />
      </div>
      <span className="text-[13px] font-bold text-zinc-900">Generate Art</span>
      <span className="ml-auto text-[10px] font-semibold text-zinc-300 uppercase tracking-widest">
        01
      </span>
    </div>

    {/* Prompt bar */}
    <div className="flex items-center gap-2 px-3 py-2 bg-zinc-50 border border-zinc-100 rounded-lg mb-3">
      <Wand2 className="w-3 h-3 text-violet-400 shrink-0" />
      <span className="text-[11px] text-zinc-500 font-mono truncate">
        "neon tiger, glitch art style"
      </span>
      <span className="ml-auto w-0.5 h-3.5 bg-violet-400 rounded-full animate-pulse shrink-0" />
    </div>

    {/* Image thumbnails */}
    <div className="grid grid-cols-3 gap-1.5">
      {[
        "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=120&q=80",
        "https://images.unsplash.com/photo-1558470598-a5dda9640f68?w=120&q=80",
        "https://images.unsplash.com/photo-1549490349-8643362247b5?w=120&q=80",
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

    <p className="mt-2 text-[10px] text-zinc-400">
      3 variants · Select to continue
    </p>
  </div>
);

/* ─── Card 2 · Design Editor ─────────────────────────────────────────────── */
const DesignCard = () => (
  <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm ml-5">
    {/* Header */}
    <div className="flex items-center gap-2 mb-3">
      <div className="w-6 h-6 rounded-lg bg-fuchsia-50 border border-fuchsia-100 flex items-center justify-center shrink-0">
        <Layers className="w-3.5 h-3.5 text-fuchsia-600" />
      </div>
      <span className="text-[13px] font-bold text-zinc-900">Design It</span>
      <span className="ml-auto text-[10px] font-semibold text-zinc-300 uppercase tracking-widest">
        02
      </span>
    </div>

    {/* Mini canvas */}
    <div
      className="relative flex items-center justify-center bg-zinc-50 border border-zinc-100 rounded-xl overflow-hidden"
      style={{ minHeight: 88 }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle, #d4d4d8 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />

      {/* Product + selected artwork */}
      <div className="relative flex items-center gap-3">
        <img
          src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=160&q=80"
          alt="Product"
          className="w-12 h-12 object-contain opacity-50"
          loading="lazy"
        />

        {/* Selection box */}
        <div className="relative">
          <div className="w-9 h-9 rounded-lg border-2 border-fuchsia-500 overflow-hidden shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=80&q=80"
              alt="Artwork"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          {/* Handles */}
          {[
            "-top-1.5 -left-1.5",
            "-top-1.5 -right-1.5",
            "-bottom-1.5 -left-1.5",
            "-bottom-1.5 -right-1.5",
          ].map((pos, i) => (
            <span
              key={i}
              className={`absolute ${pos} w-2.5 h-2.5 bg-fuchsia-500 rounded-sm border border-white`}
            />
          ))}
        </div>
      </div>

      {/* Coord readout */}
      <span className="absolute bottom-1.5 right-2.5 text-[9px] font-mono text-zinc-400">
        x 112 · y 88
      </span>
    </div>

    {/* Toolbar row */}
    <div className="mt-2.5 flex items-center justify-between text-[10px]">
      <span className="text-zinc-400">Scale 1.2× · Rotate 0°</span>
      <span className="font-black text-zinc-900">$24.99</span>
    </div>
  </div>
);

/* ─── Card 3 · Try-On ────────────────────────────────────────────────────── */
const TryOnCard = () => (
  <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm">
    {/* Header */}
    <div className="flex items-center gap-2 mb-3">
      <div className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
        <ScanFace className="w-3.5 h-3.5 text-emerald-600" />
      </div>
      <span className="text-[13px] font-bold text-zinc-900">Try It On</span>
      <span className="ml-auto text-[10px] font-semibold text-zinc-300 uppercase tracking-widest">
        03
      </span>
    </div>

    {/* Before / After */}
    <div className="grid grid-cols-2 gap-1.5 rounded-xl overflow-hidden">
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1488161628813-04466f872be2?w=200&q=70"
          alt="Before"
          className="w-full aspect-[3/4] object-cover grayscale opacity-50"
          loading="lazy"
        />
        <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-black/40 text-[8px] font-bold uppercase tracking-widest text-white rounded">
          Photo
        </span>
      </div>
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=200&q=70"
          alt="Result"
          className="w-full aspect-[3/4] object-cover"
          loading="lazy"
        />
        <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-emerald-500 text-[8px] font-bold uppercase tracking-widest text-white rounded">
          Result
        </span>
      </div>
    </div>

    {/* Status */}
    <div className="mt-2.5 flex items-center gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
      <span className="text-[10px] text-zinc-400">
        Try-on complete · 72s · AI powered
      </span>
    </div>
  </div>
);

/* ─── Right column — stacked workflow ───────────────────────────────────── */
const WorkflowStack = () => (
  <div className="relative w-full max-w-[340px] mx-auto lg:mx-0 lg:scale-[0.85] xl:scale-95 transition-transform origin-top lg:-mt-10">
    {/* Very subtle background pill */}
    <div className="absolute -inset-4 bg-zinc-50 rounded-3xl -z-10" />

    <GenerateCard />
    <Connector />
    <DesignCard />
    <Connector />
    <TryOnCard />
  </div>
);

/* ─── Main hero ──────────────────────────────────────────────────────────── */
const LandingHero = () => (
  <section className="relative bg-white overflow-hidden">
    {/* Hairline rule below nav — editorial feel */}
    <div className="border-t border-zinc-100" />

    {/* Main content */}
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-14 lg:gap-10 items-start">
        {/* ── Left: editorial copy ──────────────────────────────────── */}
        <div className="space-y-6 lg:space-y-8">

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-black text-zinc-950 leading-[1.04] tracking-tight max-w-2xl">
            Your next custom fashion piece{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-violet-600">starts with</span>
              {/* Underline accent */}
              <span
                className="absolute bottom-0.5 left-0 right-0 h-[5px] bg-violet-100 rounded-full -z-0"
                aria-hidden="true"
              />
            </span>{" "}
            one prompt.
          </h1>

          {/* Sub-copy */}
          <p className="text-base sm:text-[1.05rem] text-zinc-500 max-w-[520px] leading-relaxed">
            Describe any design, watch AI generate unique artwork, place it on
            premium products, try it on virtually, then order — all inside
            Dripify. No design skills needed.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/generate"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-950 text-white text-sm font-bold hover:bg-zinc-800 transition-colors duration-200 active:scale-[0.98] shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              Start Creating Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
            </Link>

            <a
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("how-it-works")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-200 text-zinc-700 text-sm font-semibold hover:bg-zinc-50 hover:border-zinc-300 transition-colors duration-150 cursor-pointer"
            >
              See how it works
            </a>
          </div>

          {/* Trust footnote */}
          <p className="text-xs text-zinc-400">
            No credit card required · Free tier available · Ships worldwide
          </p>

          {/* Stats */}
          <div className="pt-6 border-t border-zinc-100 flex flex-wrap items-start gap-x-8 gap-y-4">
            <Stat value="50K+" label="Designs created" />
            <div className="hidden sm:block w-px h-8 bg-zinc-100 self-center" />
            <Stat value="50+" label="Premium products" />
            <div className="hidden sm:block w-px h-8 bg-zinc-100 self-center" />
            <Stat value="4.9★" label="Avg. rating" />
            <div className="hidden sm:block w-px h-8 bg-zinc-100 self-center" />
            <Stat value="24h" label="Avg. delivery" />
          </div>
        </div>

        {/* ── Right: workflow cards ─────────────────────────────────── */}
        <div className="flex justify-center lg:justify-start">
          <WorkflowStack />
        </div>
      </div>
    </div>
  </section>
);

export default LandingHero;
