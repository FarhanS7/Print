import { Star, ArrowRight, Sparkles, Check } from "lucide-react";
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
  <div className="flex flex-col gap-5 p-6 rounded-2xl border border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-md transition-all duration-300">
    {/* Stars */}
    <div className="flex items-center gap-1">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
      ))}
    </div>

    {/* Quote */}
    <p className="text-sm text-zinc-600 leading-relaxed flex-1">
      &ldquo;{quote}&rdquo;
    </p>

    {/* Author */}
    <div className="flex items-center gap-3 pt-4 border-t border-zinc-100">
      <img
        src={avatar}
        alt={name}
        className="w-9 h-9 rounded-full object-cover ring-1 ring-zinc-200"
        loading="lazy"
      />
      <div className="min-w-0">
        <p className="text-sm font-bold text-zinc-900 leading-none">{name}</p>
        <p className="text-xs text-zinc-400 mt-0.5">{handle}</p>
      </div>
      <span className="ml-auto shrink-0 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-zinc-400 border border-zinc-100 rounded-full bg-zinc-50">
        {tag}
      </span>
    </div>
  </div>
);

/* ─── Metric pill ────────────────────────────────────────────────────────── */
const MetricPill = ({ value, label }: { value: string; label: string }) => (
  <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-zinc-200 bg-white">
    <span className="text-xl font-black text-zinc-950 leading-none tracking-tight">
      {value}
    </span>
    <span className="text-xs text-zinc-400 font-medium leading-snug max-w-[72px]">
      {label}
    </span>
  </div>
);

/* ─── Main component ─────────────────────────────────────────────────────── */
const LandingCTA = () => (
  <>
    {/* ── Testimonials (light) ─────────────────────────────────────────── */}
    <section className="bg-zinc-50 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-3 max-w-xl mx-auto">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-amber-500">
            Community Love
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight leading-tight">
            Real people. Real drip.
          </h2>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Thousands of creators and fashion lovers have turned their ideas
            into wearable art with Dripify.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.handle} {...t} />
          ))}
        </div>

        {/* Metric pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {METRICS.map((m) => (
            <MetricPill key={m.label} {...m} />
          ))}
        </div>
      </div>
    </section>

    {/* ── Final CTA (dark) ─────────────────────────────────────────────── */}
    <section className="bg-zinc-950">
      {/* Top border — matches the light section above */}
      <div className="h-px bg-zinc-900" />

      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-24 sm:py-32 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-zinc-300 text-xs font-semibold tracking-wide mb-8">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          No design skills. No credit card. Just ideas.
        </div>

        {/* Headline */}
        <h2 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black text-white leading-[1.06] tracking-tight mb-5">
          Your next signature look
          <br className="hidden sm:block" />
          <span className="text-violet-400"> starts with one prompt.</span>
        </h2>

        {/* Sub-copy */}
        <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed mb-10">
          Describe it. Design it. Try it on. Order it. Dripify handles
          everything in between — powered by AI, delivered to your door.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/generate"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base text-white bg-violet-600 hover:bg-violet-500 transition-colors duration-200 active:scale-[0.98] shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            Start Creating — It&rsquo;s Free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
          </Link>

          <Link
            to="/try-on"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-zinc-300 border border-white/10 hover:border-white/20 hover:text-white hover:bg-white/5 transition-all duration-150 active:scale-[0.98]"
          >
            Try the virtual try-on
          </Link>
        </div>

        {/* Trust items */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5">
          {TRUST.map((item) => (
            <span
              key={item}
              className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium"
            >
              <Check className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default LandingCTA;
