import { Sparkles, ArrowRight, Palette, Wand2, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center">
            {/* Background Orbs */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[120px] -z-10 animate-pulse delay-700"></div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-violet-400 text-sm font-semibold tracking-wide animate-fade-in">
                        <Sparkles className="w-4 h-4" />
                        AI-POWERED CREATIVITY
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black leading-tight text-white animate-slide-up">
                        Transform Your <span className="text-gradient">Imagination</span> Into Wearable Art
                    </h1>

                    <p className="text-lg md:text-xl text-zinc-400 max-w-xl mx-auto lg:mx-0 animate-slide-up-delay">
                        Generate unique artwork with AI, customize designs on premium apparel, 
                        and experience the future of print-on-demand. No design skills required.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start animate-slide-up-delay-2">
                        <Link
                            to="/generate"
                            className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-black text-lg flex items-center justify-center gap-2 hover:bg-zinc-200 hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-95"
                        >
                            Start Creating <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            to="/explore"
                            className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full font-bold text-lg hover:bg-white/10 transition-all"
                        >
                            Explore Gallery
                        </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-6 pt-12 border-t border-white/5">
                        <div className="space-y-2">
                            <h3 className="text-3xl font-black text-white">100%</h3>
                            <p className="text-zinc-500 text-sm font-medium uppercase tracking-wider">AI Generated</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-3xl font-black text-white">4k</h3>
                            <p className="text-zinc-500 text-sm font-medium uppercase tracking-wider">Resolution</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-3xl font-black text-white">24h</h3>
                            <p className="text-zinc-500 text-sm font-medium uppercase tracking-wider">Fast Shipping</p>
                        </div>
                    </div>
                </div>

                {/* Hero Visual Mockup */}
                <div className="relative group lg:block hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 to-fuchsia-600/30 rounded-3xl blur-3xl -z-10 group-hover:scale-110 transition-transform duration-700"></div>
                    <div className="relative glass-morphism rounded-3xl p-4 rotate-3 group-hover:rotate-0 transition-all duration-500 overflow-hidden shadow-2xl border-white/20">
                        {/* Dummy AI Generation Preview */}
                        <div className="aspect-square bg-zinc-900 rounded-2xl flex items-center justify-center relative overflow-hidden">
                             <img 
                                src="https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&auto=format&fit=crop&q=60" 
                                alt="Sample Mockup" 
                                className="w-full h-full object-cover opacity-80"
                             />
                             <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
                             
                             {/* AI Overlay Mockup */}
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 animate-float">
                                 <Wand2 className="w-20 h-20 text-white/50" />
                             </div>
                        </div>
                        
                        {/* Status Tags */}
                        <div className="absolute bottom-10 left-10 right-10 flex gap-2 justify-between">
                            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                                <Palette className="w-4 h-4 text-violet-400" />
                                <span className="text-xs font-bold text-white">Vector Ready</span>
                            </div>
                            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                                <Zap className="w-4 h-4 text-yellow-500" />
                                <span className="text-xs font-bold text-white">Instant Gen</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
