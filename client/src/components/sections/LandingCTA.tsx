import { ArrowRight, Sparkles, Star, Zap } from "lucide-react";
import { Link } from "react-router-dom";

/* ─── Testimonial data ───────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote:
      "I described a phoenix made of galaxies and within 30 seconds I had a design my whole crew wanted on hoodies. The try-on sealed the deal — ordered the same day.",
    name: "Marcus T.",
    handle: "@marcustrends",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80&fit=crop",
    rating: 5,
    tag: "Designer",
  },
  {
    quote:
      "Dripify is the only tool I've found that takes me from idea to an actual product I can hold — without needing to open a single design app. It just works.",
    name: "Priya S.",
    handle: "@priyastyle",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&fit=crop",
    rating: 5,
    tag: "Creator",
  },
  {
    quote:
      "The virtual try-on alone is worth it. I ordered three custom tees last month and every single one fit perfectly — I knew exactly what I was getting.",
    name: "Jordan K.",
    handle: "@jkfashion",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&q=80&fit=crop",
    rating: 5,
    tag: "Fashion enthusiast",
  },
];

/* ─── Metric ─────────────────────────────────────────────────────────────── */
const METRICS = [
  { value: "50K+", label: "Designs created" },
  { value: "4.9★", label: "Average rating" },
  { value: "98%", label: "Would recommend" },
  { value: "120+", label: "Countries shipped" },
];

/* ─── Trust items shown inside CTA banner ───────────────────────────────── */
const TRUST = [
  "Free to start",
  "No credit card required",
  "Cancel any time",
  "Ships worldwide",
];

/* ─── Testimonial card ───────────────────────────────────────────────────── */
const TestimonialCard = ({
  quote,
  name,
  handle,
  avatar,
  rating,
  tag,
}: (typeof TESTIMONIALS)[0]) => (
  <div className="group relative flex flex-col gap-6 p-8 rounded-[2rem] border border-zinc-200/50 bg-white/60 backdrop-blur-xl hover:border-zinc-300 hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500">
    {/* Stars */}
    <div className="flex items-center gap-1">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
      ))}
    </div>

    {/* Quote */}
    <p className="text-[1.05rem] text-zinc-600 leading-relaxed font-medium flex-1 italic">
      &ldquo;{quote}&rdquo;
    </p>

    {/* Author */}
    <div className="flex items-center gap-4 pt-6 border-t border-zinc-100/50">
      <div className="relative">
        <img
          src={avatar}
          alt={name}
          className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-sm"
          loading="lazy"
        />
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-violet-600 rounded-full flex items-center justify-center border-2 border-white">
           <Zap className="w-2.5 h-2.5 text-white fill-white" />
        </div>
      </div>
      <div className="min-w-0">
        <p className="text-sm font-black text-zinc-950 leading-none">{name}</p>
        <p className="text-xs text-zinc-400 font-medium mt-1">{handle}</p>
      </div>
      <span className="ml-auto shrink-0 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-zinc-400 border border-zinc-200 rounded-full bg-zinc-50 shadow-sm">
        {tag}
      </span>
    </div>
  </div>
);

/* ─── Metric pill ────────────────────────────────────────────────────────── */
const MetricPill = ({ value, label }: { value: string; label: string }) => (
  <div className="flex items-center gap-4 px-6 py-4 rounded-2xl border border-zinc-200/50 bg-white/60 backdrop-blur-md shadow-sm">
    <span className="text-2xl font-black text-zinc-950 leading-none tracking-tight">
      {value}
    </span>
    <span className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider leading-snug max-w-[80px]">
      {label}
    </span>
  </div>
);

/* ─── Main component ─────────────────────────────────────────────────────── */
const LandingCTA = () => (
  <>
    {/* ── Testimonials (light) ─────────────────────────────────────────── */}
    <section className="bg-zinc-50 py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        {/* Decorative flares */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-amber-200/20 blur-[100px] rounded-full -z-10" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-violet-200/20 blur-[100px] rounded-full -z-10" />

        {/* Header */}
        <div className="text-center mb-16 space-y-4 max-w-2xl mx-auto">
          <span className="inline-block text-[11px] font-black uppercase tracking-[0.25em] text-amber-500">
            Community Love
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-zinc-950 tracking-tight leading-tight">
            Real people. <span className="text-amber-500">Real drip.</span>
          </h2>
          <p className="text-base text-zinc-500 leading-relaxed">
            Thousands of creators and fashion lovers have turned their ideas
            into wearable art with Dripify.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.handle} {...t} />
          ))}
        </div>

        {/* Metric pills */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
          {METRICS.map((m) => (
            <MetricPill key={m.label} {...m} />
          ))}
        </div>
      </div>
    </section>

    {/* ── Final CTA (dark) ─────────────────────────────────────────────── */}
    <section className="bg-zinc-950 relative overflow-hidden">
      {/* Immersive flares */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 blur-[120px] rounded-full" />
      
      {/* Top border */}
      <div className="h-px bg-white/5" />

      <div className="relative max-w-4xl mx-auto px-5 sm:px-8 py-24 sm:py-36 text-center z-10">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-zinc-300 text-[11px] font-bold uppercase tracking-wider mb-10">
          <Sparkles className="w-4 h-4 text-violet-400" />
          No skills needed. No credit card. Just ideas.
        </div>

        {/* Headline */}
        <h2 className="text-5xl sm:text-6xl lg:text-[4rem] font-black text-white leading-[1.02] tracking-tight mb-8">
          Your next signature look
          <br className="hidden sm:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400"> starts with one prompt.</span>
        </h2>

        {/* Sub-copy */}
        <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-12">
          Describe it. Design it. Try it on. Order it. Dripify handles
          everything in between — powered by AI, delivered to your door.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/generate"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-black text-lg text-white bg-violet-600 hover:bg-violet-500 transition-all duration-300 shadow-xl shadow-violet-600/20 active:scale-[0.98]"
          >
            <Sparkles className="w-5 h-5" />
            Start Creating Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/try-on"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg text-white border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-300 active:scale-[0.98]"
          >
            Try Virtual Try-On
          </Link>
        </div>

        {/* Trust items */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {TRUST.map((item) => (
            <span
              key={item}
              className="flex items-center gap-2 text-[11px] text-zinc-500 font-bold uppercase tracking-widest"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default LandingCTA;
