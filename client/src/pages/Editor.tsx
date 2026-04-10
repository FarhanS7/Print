import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { EditorCanvas } from "../components/editor/EditorCanvas";
import { Smartphone, Shirt, ShoppingCart, Sparkles, Wand2 } from "lucide-react";

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
        <div className="min-h-screen bg-zinc-950">
            <Navbar />
            <main className="pt-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 py-12">
                {/* Left: Product Selection Sidebar (3 Cols) */}
                <div className="lg:col-span-3 space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-black text-white">Select <span className="text-violet-400">Product</span></h2>
                        <p className="text-zinc-500 text-sm">Choose the base for your artwork.</p>
                    </div>

                    <div className="space-y-4">
                        {PRODUCTS.map((product) => (
                            <button
                                key={product.id}
                                onClick={() => setSelectedProduct(product)}
                                className={`w-full p-4 rounded-2xl border transition-all text-left flex items-center gap-4 group ${
                                    selectedProduct.id === product.id 
                                        ? "bg-violet-600/10 border-violet-500" 
                                        : "bg-white/5 border-white/10 hover:border-white/20"
                                }`}
                            >
                                <div className="w-16 h-16 bg-zinc-900 rounded-xl overflow-hidden group-hover:scale-110 transition-transform">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">{product.name}</h4>
                                    <p className="text-zinc-500 text-xs font-bold uppercase">{product.category}</p>
                                </div>
                            </button>
                        ))}
                    </div>

                   <div className="p-4 bg-fuchsia-600/10 border border-fuchsia-500/20 rounded-2xl flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-fuchsia-400 shrink-0" />
                        <p className="text-xs text-fuchsia-300/80 leading-snug">
                            Your high-res AI artwork will be precisely scaled for professional results.
                        </p>
                    </div>
                </div>

                {/* Center: Canvas Editor (6 Cols) */}
                <div className="lg:col-span-6">
                    <EditorCanvas 
                        artworkUrl={artworkUrl} 
                        productMockupUrl={selectedProduct.image} 
                        onSave={handleSavePlacement}
                    />
                </div>

                {/* Right: Actions sidebar (3 Cols) */}
                <div className="lg:col-span-3 space-y-8">
                    <div className="glass-morphism rounded-3xl p-6 space-y-6">
                        <div className="space-y-1">
                            <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">Current Design</span>
                            <h3 className="text-white font-black text-xl">Untitled Creation</h3>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-white/5">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-zinc-500 font-bold uppercase tracking-wider">Base Price</span>
                                <span className="text-white font-black">$24.99</span>
                            </div>
                             <div className="flex justify-between items-center text-sm">
                                <span className="text-zinc-500 font-bold uppercase tracking-wider">AI Generation</span>
                                <span className="text-fuchsia-400 font-black">FREE</span>
                            </div>
                            <div className="flex justify-between items-center text-sm pt-4 border-t border-white/5">
                                <span className="text-zinc-500 font-bold uppercase tracking-wider">Final Total</span>
                                <span className="text-white text-3xl font-black">$24.99</span>
                            </div>
                        </div>

                        <button 
                            onClick={async () => {
                                // First, ensure the design is saved, or get the designId
                                // For this flow, we'll assume the user might want to checkout directly
                                // We'll trigger the save then the checkout
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
                            className="w-full py-5 bg-white text-black rounded-2xl font-black text-lg flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] active:scale-95"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            Buy Now
                        </button>
                    </div>

                    <div className="p-4 glass-morphism rounded-3xl flex items-center gap-4 group cursor-pointer hover:bg-white/10 transition-all">
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-all">
                            <Wand2 className="w-6 h-6 text-violet-400" />
                        </div>
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Need Refinement?</p>
                            <p className="text-white font-bold text-sm">Edit AI Prompt</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const Spinner = () => (
    <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
);

export default Editor;
