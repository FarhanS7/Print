import LandingNavbar from "../components/layout/LandingNavbar";
import LandingHero from "../components/sections/LandingHero";
import LandingFeatures from "../components/sections/LandingFeatures";
import LandingHowItWorks from "../components/sections/LandingHowItWorks";
import LandingCTA from "../components/sections/LandingCTA";
import LandingFooter from "../components/sections/LandingFooter";

const Home = () => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* ── White-theme sticky navigation ──────────────────────────── */}
      <LandingNavbar />

      {/* ── Page sections ─────────────────────────────────────────── */}
      <main>
        {/* Hero — headline, 3-step workflow cards, stats */}
        <LandingHero />

        {/* Features — 4 platform capability cards */}
        <LandingFeatures />

        {/* How It Works — 3 numbered step cards */}
        <LandingHowItWorks />

        {/* Testimonials (light) + final CTA banner (dark) */}
        <LandingCTA />
      </main>

      {/* ── Site footer ───────────────────────────────────────────── */}
      <LandingFooter />
    </div>
  );
};

export default Home;
