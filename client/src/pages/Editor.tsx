import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { EditorCanvas } from "../components/editor/EditorCanvas";
import { ShoppingCart, Sparkles, Wand2 } from "lucide-react";

const PRODUCTS = [
    { id: "tee-1", name: "Premium Tee", category: "T-Shirt", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=60" },
    { id: "hoodie-1", name: "Classic Hoodie", category: "Apparel", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=60" },
    { id: "case-1", name: "Phone Case", category: "Accessories", image: "https://images.unsplash.com/photo-1541873676947-06c836934c9c?w=800&auto=format&fit=crop&q=60" },
];

const Editor = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [artworkUrl, setArtworkUrl] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const url = query.get("artwork");
        if (url) {
            setArtworkUrl(url);
        } else {
            // Redirect back to generate if no artwork is provided
            // navigate("/generate");
        }
    }, [location]);

    const handleSavePlacement = async (placement: any) => {
        try {
            const response = await fetch("http://localhost:5000/api/designs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productId: selectedProduct.id,
                    artworkUrl: artworkUrl,
                    artworkPlacement: placement,
                    title: "Custom Creation",
                    price: 24.99
                }),
            });
            const data = await response.json();
            if (data.success) {
                alert("Design Saved! Moving to checkout...");
                navigate("/orders");
            }
        } catch (error) {
            console.error("Failed to save design:", error);
        }
    };

    if (!artworkUrl) {
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-center space-y-4">
                <Spinner />
                <p className="text-zinc-500 font-bold uppercase tracking-widest">Loading Editor...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
            {/* Atmospheric Background Flares */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-violet-600/5 to-transparent pointer-events-none" />
            <div className="absolute top-[20%] -right-48 w-96 h-96 glow-aura-fuchsia opacity-20 pointer-events-none" />

            <Navbar />
            
            <main className="relative z-10 pt-28 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 py-12">
                {/* Left: Product Selection Sidebar (3 Cols) */}
                <div className="lg:col-span-3 space-y-10 animate-slide-up">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-[10px] font-black uppercase tracking-widest">
                            Configuration
                        </div>
                        <h2 className="text-4xl font-black text-white leading-tight">
                            Select <br/>
                            <span className="text-violet-400">Product</span>
                        </h2>
                        <p className="text-sm text-zinc-500 leading-relaxed max-w-[200px]">
                            Choose the perfect canvas for your AI masterpiece.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {PRODUCTS.map((product) => (
                            <button
                                key={product.id}
                                onClick={() => setSelectedProduct(product)}
                                className={`w-full p-5 rounded-[2rem] border transition-all duration-300 text-left flex items-center gap-5 group relative overflow-hidden ${
                                    selectedProduct.id === product.id 
                                        ? "bg-violet-600/10 border-violet-500/50 shadow-[0_0_30px_rgba(139,92,246,0.1)]" 
                                        : "bg-white/[0.03] border-white/5 hover:border-white/20 hover:bg-white/[0.05]"
                                }`}
                            >
                                <div className="w-16 h-16 bg-zinc-900 rounded-2xl overflow-hidden shadow-inner group-hover:scale-105 transition-transform duration-500">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="relative z-10">
                                    <h4 className="text-white font-black text-lg">{product.name}</h4>
                                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mt-0.5">{product.category}</p>
                                </div>
                                {selectedProduct.id === product.id && (
                                    <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 bg-violet-500/20 blur-xl rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="p-6 bg-fuchsia-600/5 border border-fuchsia-500/10 rounded-[2rem] flex items-start gap-4 hover:bg-fuchsia-600/10 transition-colors">
                        <Sparkles className="w-6 h-6 text-fuchsia-400 shrink-0" />
                        <p className="text-xs text-fuchsia-300/60 leading-relaxed font-medium">
                            Your high-res AI artwork will be auto-scaled for professional production quality.
                        </p>
                    </div>
                </div>

                {/* Center: Canvas Editor (6 Cols) */}
                <div className="lg:col-span-6 flex flex-col items-center animate-fade-in" style={{ animationDelay: '0.15s' }}>
                    <div className="w-full relative">
                        {/* Decorative glow behind canvas */}
                        <div className="absolute inset-0 bg-violet-600/5 blur-[100px] rounded-full pointer-events-none" />
                        <EditorCanvas 
                            artworkUrl={artworkUrl} 
                            productMockupUrl={selectedProduct.image} 
                            onSave={handleSavePlacement}
                        />
                    </div>
                </div>

                {/* Right: Actions sidebar (3 Cols) */}
                <div className="lg:col-span-3 space-y-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                    <div className="glass-morphism-dark rounded-[2.5rem] p-8 space-y-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        
                        <div className="space-y-1">
                            <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.25em]">Summary</span>
                            <h3 className="text-white font-black text-2xl">Custom Creation</h3>
                            <p className="text-[10px] text-violet-400 font-bold uppercase tracking-widest mt-1 italic">Exclusive Design</p>
                        </div>

                        <div className="space-y-5 pt-8 border-t border-white/5">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-zinc-500 font-bold uppercase tracking-[0.15em]">Base Price</span>
                                <span className="text-white font-black">$24.99</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-zinc-500 font-bold uppercase tracking-[0.15em]">AI Magic</span>
                                <span className="text-emerald-400 font-black">FREE</span>
                            </div>
                            <div className="flex justify-between items-center pt-8 border-t border-white/5">
                                <span className="text-zinc-400 font-black uppercase tracking-[0.2em] text-xs">Total</span>
                                <div className="text-right">
                                    <span className="text-white text-4xl font-black tabular-nums">$24.99</span>
                                    <p className="text-[9px] text-zinc-600 font-bold mt-1 uppercase tracking-widest">Tax & Shipping inc.</p>
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={async () => {
                                try {
                                    const designResp = await fetch("http://localhost:5000/api/designs", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({
                                            productId: selectedProduct.id,
                                            artworkUrl: artworkUrl,
                                            artworkPlacement: { /* get placement from EditorCanvas */ },
                                            title: "Custom Creation",
                                            price: 24.99
                                        }),
                                    });
                                    const designData = await designResp.json();
                                    
                                    if (designData.success) {
                                        const checkoutResp = await fetch("http://localhost:5000/api/orders/checkout", {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({ designId: designData.data.design._id }),
                                        });
                                        const checkoutData = await checkoutResp.json();
                                        if (checkoutData.success && checkoutData.data.url) {
                                            window.location.href = checkoutData.data.url;
                                        }
                                    }
                                } catch (error) {
                                    console.error("Checkout Error:", error);
                                }
                            }}
                            className="w-full py-6 bg-white hover:bg-zinc-100 text-black rounded-[1.5rem] font-black text-xl flex items-center justify-center gap-3 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.1)] active:scale-[0.98]"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            Buy Now
                        </button>
                    </div>

                    <div className="p-6 glass-morphism-dark rounded-[2rem] flex items-center gap-5 group cursor-pointer hover:bg-white/5 transition-all border border-white/5">
                        <div className="w-12 h-12 bg-violet-500/10 rounded-2xl flex items-center justify-center border border-violet-500/20 group-hover:scale-110 transition-transform">
                            <Wand2 className="w-6 h-6 text-violet-400" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Not feeling it?</p>
                            <p className="text-white font-black text-sm group-hover:text-violet-400 transition-colors">Edit AI Prompt</p>
                        </div>
                    </div>

                    <button 
                        onClick={async () => {
                            try {
                                const designResp = await fetch("http://localhost:5000/api/designs", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({
                                        productId: selectedProduct.id,
                                        artworkUrl: artworkUrl,
                                        artworkPlacement: { /* get placement from EditorCanvas */ },
                                        title: "Custom Creation",
                                        price: 24.99,
                                        tryOnEnabled: true 
                                    }),
                                });
                                const designData = await designResp.json();
                                if (designData.success) {
                                    navigate(`/try-on?designId=${designData.data.design._id}`);
                                }
                            } catch (error) {
                                console.error("Failed to transition to try-on:", error);
                            }
                        }}
                        className="w-full py-6 bg-gradient-to-br from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white rounded-[1.5rem] font-black text-xl flex items-center justify-center gap-3 transition-all shadow-[0_15px_40px_-5px_rgba(139,92,246,0.4)] active:scale-[0.98]"
                    >
                        <Sparkles className="w-6 h-6 fill-white" />
                        Try It On Me!
                    </button>
                </div>
            </main>
        </div>
    );
};

const Spinner = () => (
    <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
);

export default Editor;
