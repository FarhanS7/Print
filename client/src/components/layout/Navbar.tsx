import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ShoppingBag, Menu, User } from "lucide-react";

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-zinc-950/80 backdrop-blur-lg border-b border-white/10 py-4"
                    : "bg-transparent py-6"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Sparkles className="text-white w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black tracking-tight text-white">
                        Printify<span className="text-violet-500">AI</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link to="/generate" className="text-zinc-400 hover:text-white transition-colors font-medium">Create</Link>
                    <Link to="/explore" className="text-zinc-400 hover:text-white transition-colors font-medium">Explore</Link>
                    <Link to="/orders" className="text-zinc-400 hover:text-white transition-colors font-medium">Orders</Link>
                    <Link to="/try-on" className="text-violet-400 hover:text-violet-300 transition-colors font-bold px-3 py-1 bg-violet-500/10 rounded-full border border-violet-500/20">Try-On</Link>
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2 text-zinc-400 hover:text-white transition-colors relative">
                        <ShoppingBag className="w-6 h-6" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-violet-500 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]"></span>
                    </button>
                    <button className="hidden md:flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full font-bold hover:bg-zinc-200 transition-all active:scale-95">
                        <User className="w-4 h-4" />
                        Sign In
                    </button>
                    <button className="md:hidden text-white">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </nav>
    );
};
