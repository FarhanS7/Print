import { Navbar } from "../components/layout/Navbar";
import { Hero } from "../components/hero/Hero";

const Home = () => {
    return (
        <div className="min-h-screen bg-zinc-950">
            <Navbar />
            <main>
                <Hero />
                {/* Future sections could be added here: Features, Trending Products, etc. */}
            </main>
            <footer className="py-12 border-t border-white/5 text-center text-zinc-600 text-sm">
                &copy; {new Date().getFullYear()} PrintifyAI. All rights reserved.
            </footer>
        </div>
    );
};

export default Home;
