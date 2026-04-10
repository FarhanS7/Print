import { useState } from "react";
import { Wand2, Loader2, Sparkles, Image as ImageIcon } from "lucide-react";
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
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Input Section */}
            <div className="space-y-8">
                <div className="space-y-2">
                    <h2 className="text-4xl font-black text-white">
                        AI Image <span className="text-gradient">Generator</span>
                    </h2>
                    <p className="text-zinc-400">
                        Describe your vision, and our AI will create high-resolution, transparent artwork for your products.
                    </p>
                </div>

                <div className="glass-morphism rounded-3xl p-6 space-y-4">
                    <div className="relative">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="A futuristic cyber-cat wearing neon goggles, vibrant 3D art, transparent background..."
                            className="w-full h-40 bg-black/40 border border-white/10 rounded-2xl p-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all resize-none"
                        />
                        <div className="absolute bottom-4 right-4 text-zinc-600 text-xs font-medium">
                            {prompt.length} / 500
                        </div>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={generating || !prompt}
                        className="w-full py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed group"
                    >
                        {generating ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                Generate Magic
                            </>
                        )}
                    </button>
                    
                    <div className="flex gap-2 p-2 bg-white/5 rounded-xl border border-white/5 text-[10px] text-zinc-500 font-bold uppercase tracking-widest text-center justify-center">
                        <Sparkles className="w-3 h-3 text-violet-400" />
                        Free Generation Provided by Pollinations AI
                    </div>
                </div>

                {/* Tips Card */}
                <div className="p-4 bg-violet-600/10 border border-violet-500/20 rounded-2xl space-y-2">
                    <h4 className="flex items-center gap-2 text-sm font-bold text-violet-300">
                        <Sparkles className="w-4 h-4" />
                        Pro Tip
                    </h4>
                    <p className="text-xs text-violet-300/80 leading-relaxed">
                        Specify "transparent background", "vector style", or "illustration" for cleaner prints. AI generation works best with descriptive, artistic prompts.
                    </p>
                </div>
            </div>

            {/* Right: Preview Section */}
            <div className="relative">
                <div className="sticky top-32">
                    <div className="aspect-square glass-morphism rounded-3xl flex items-center justify-center overflow-hidden border-2 border-dashed border-white/10">
                        {artworkUrl ? (
                            <img
                                src={artworkUrl}
                                alt="Generated Art"
                                className="w-full h-full object-cover animate-fade-in"
                            />
                        ) : (
                            <div className="text-center space-y-4 p-8 opacity-20 group">
                                <ImageIcon className="w-20 h-20 mx-auto group-hover:scale-110 transition-transform" />
                                <p className="text-sm font-medium uppercase tracking-widest">Artwork Preview</p>
                            </div>
                        )}
                        
                        {generating && (
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center space-y-4">
                                <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
                                <p className="text-white font-black animate-pulse">Dreaming...</p>
                            </div>
                        )}
                    </div>

                    {artworkUrl && !generating && (
                        <div className="mt-6 flex flex-col sm:flex-row gap-4 animate-slide-up">
                            <button 
                                onClick={() => navigate(`/editor?artwork=${encodeURIComponent(artworkUrl)}`)}
                                className="flex-1 py-4 bg-white text-black rounded-2xl font-black hover:bg-zinc-200 transition-all transition-transform active:scale-95 shadow-xl"
                            >
                                Select & Design
                            </button>
                            <button 
                                onClick={() => { setArtworkUrl(null); setPrompt(""); }}
                                className="flex-1 py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all"
                            >
                                Try Again
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
