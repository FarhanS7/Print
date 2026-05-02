import { useState } from "react";
import { Wand2, Loader2, Sparkles, Image as ImageIcon, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Generator = () => {
    const navigate = useNavigate();
    const [prompt, setPrompt] = useState("");

    const [generating, setGenerating] = useState(false);
    const [artworkUrl, setArtworkUrl] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!prompt) return;
        setGenerating(true);
        try {
            const response = await fetch("http://localhost:5000/api/ai/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });
            const data = await response.json();
            if (data.success) {
                setArtworkUrl(data.data.artworkUrl);
            }
        } catch (error) {
            console.error("Failed to generate artwork:", error);
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div className="relative w-full max-w-7xl mx-auto px-6 py-12 lg:py-20 min-h-[calc(100vh-80px)] flex items-center">
            {/* Atmospheric Background Flares */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 glow-aura-violet opacity-30 pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 glow-aura-fuchsia opacity-20 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 w-full relative z-10">
                {/* Left: Input Section */}
                <div className="space-y-10 animate-slide-up">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-black uppercase tracking-widest">
                            <Sparkles className="w-3 h-3" />
                            AI Powered Creation
                        </div>
                        <h2 className="text-5xl lg:text-6xl font-black text-white leading-tight tracking-tighter">
                            Dream it. <br/>
                            <span className="text-gradient">Wear it.</span>
                        </h2>
                        <p className="text-lg text-zinc-400 max-w-md leading-relaxed">
                            Describe your vision, and our AI will create high-resolution artwork for your unique apparel.
                        </p>
                    </div>

                    <div className="glass-morphism-dark rounded-[2.5rem] p-8 space-y-6 shadow-2xl relative overflow-hidden group">
                        {/* Internal decorative line */}
                        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        
                        <div className="relative">
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="A futuristic cyber-cat wearing neon goggles, vibrant 3D art, transparent background..."
                                className="w-full h-48 bg-white/[0.03] border border-white/5 rounded-2xl p-6 text-white text-lg placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/30 focus:bg-white/[0.05] transition-all resize-none shadow-inner"
                            />
                            <div className="absolute bottom-4 right-4 flex items-center gap-2">
                                <span className={`text-[10px] font-bold ${prompt.length > 400 ? 'text-amber-500' : 'text-zinc-600'}`}>
                                    {prompt.length} / 500
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={generating || !prompt}
                            className="w-full py-5 bg-gradient-to-br from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-[0_10px_40px_-10px_rgba(139,92,246,0.5)] hover:shadow-[0_15px_50px_-10px_rgba(139,92,246,0.6)] active:scale-[0.98] disabled:opacity-30 disabled:grayscale disabled:scale-100 disabled:shadow-none transition-all group"
                        >
                            {generating ? (
                                <div className="flex items-center gap-3">
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                    <span>Generating...</span>
                                </div>
                            ) : (
                                <>
                                    <Wand2 className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                                    <span>Generate Magic</span>
                                </>
                            )}
                        </button>
                        
                        <div className="flex items-center justify-center gap-2 pt-2">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/5" />
                            <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold uppercase tracking-widest px-4">
                                <Sparkles className="w-3 h-3 text-violet-400" />
                                Pollinations AI engine
                            </div>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/5" />
                        </div>
                    </div>

                    {/* Pro Tip Card */}
                    <div className="p-6 bg-violet-600/5 hover:bg-violet-600/10 border border-violet-500/10 rounded-[2rem] flex items-start gap-4 transition-colors group">
                        <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0 border border-violet-500/20 group-hover:scale-110 transition-transform">
                            <Sparkles className="w-5 h-5 text-violet-400" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-sm font-black text-violet-300 uppercase tracking-wider">
                                Pro Tip
                            </h4>
                            <p className="text-sm text-violet-300/60 leading-relaxed">
                                Specify <span className="text-violet-200">"transparent background"</span> or <span className="text-violet-200">"vector style"</span> for cleaner, professional-grade prints.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right: Preview Section */}
                <div className="relative lg:mt-0 mt-12 animate-slide-up-delay">
                    {/* Floating glow behind preview */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-violet-600/5 blur-[120px] pointer-events-none rounded-full" />

                    <div className="sticky top-32">
                        <div className="relative group">
                            <div className="aspect-square glass-morphism-dark rounded-[3rem] flex items-center justify-center overflow-hidden border-2 border-dashed border-white/5 group-hover:border-violet-500/30 transition-colors">
                                {artworkUrl ? (
                                    <div className="relative w-full h-full p-8">
                                        <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl relative group/img">
                                            <img
                                                src={artworkUrl}
                                                alt="Generated Art"
                                                className="w-full h-full object-cover animate-fade-in"
                                            />
                                            {/* Image overlay tools (optional) */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                                <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 text-white text-[10px] font-black uppercase tracking-widest">
                                                    Ready for print
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center space-y-6 p-12 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <ImageIcon className="w-24 h-24 mx-auto group-hover:scale-110 transition-transform duration-500" />
                                        <p className="text-lg font-black uppercase tracking-[0.3em] text-white">Preview Area</p>
                                    </div>
                                )}
                                
                                {generating && (
                                    <div className="absolute inset-0 bg-black/40 backdrop-blur-2xl flex flex-col items-center justify-center space-y-6">
                                        <div className="relative">
                                            <div className="w-20 h-20 border-4 border-white/5 border-t-violet-500 rounded-full animate-spin"></div>
                                            <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-violet-400 animate-pulse" />
                                        </div>
                                        <div className="text-center space-y-2">
                                            <p className="text-xl font-black text-white tracking-widest uppercase">Dreaming</p>
                                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Applying neural magic...</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {artworkUrl && !generating && (
                            <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-slide-up-delay-2">
                                <button 
                                    onClick={() => navigate(`/editor?artwork=${encodeURIComponent(artworkUrl)}`)}
                                    className="flex-[2] py-5 bg-white text-black rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-zinc-100 transition-all active:scale-[0.98] shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
                                >
                                    <span>Select & Design</span>
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                                <button 
                                    onClick={() => { setArtworkUrl(null); setPrompt(""); }}
                                    className="flex-1 py-5 bg-white/5 text-white border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all active:scale-[0.98]"
                                >
                                    Try Again
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
