import { useState, useEffect } from "react";
import { Navbar } from "../components/layout/Navbar";
import { ShoppingBag, Package, CheckCircle2, Clock, ExternalLink } from "lucide-react";

const Orders = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/orders");
                const data = await response.json();
                if (data.success) {
                    setOrders(data.data.orders);
                }
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className="min-h-screen bg-zinc-950">
            <Navbar />
            <main className="pt-32 max-w-5xl mx-auto px-6 pb-20">
                <div className="flex items-center justify-between mb-12">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-black text-white flex items-center gap-4">
                            Your <span className="text-gradient">Orders</span>
                            <ShoppingBag className="w-8 h-8 text-violet-500" />
                        </h1>
                        <p className="text-zinc-500 font-medium">Manage your custom creations and shipping status.</p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-4">
                        <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-zinc-500 font-black uppercase tracking-widest text-xs">Fetching history...</p>
                    </div>
                ) : orders.length > 0 ? (
                    <div className="grid gap-6">
                        {orders.map((order) => (
                            <div key={order._id} className="glass-morphism rounded-3xl p-6 flex flex-col md:flex-row items-center gap-8 group hover:bg-white/10 transition-all border-white/5">
                                {/* Product Preview */}
                                <div className="w-full md:w-32 h-32 bg-zinc-900 rounded-2xl overflow-hidden shadow-lg border border-white/10 relative">
                                    <img 
                                        src={order.designId?.artworkUrl || order.productId?.image} 
                                        alt="Design" 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                </div>

                                {/* Order Info */}
                                <div className="flex-1 space-y-2 text-center md:text-left">
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                        <h3 className="text-white font-black text-xl">
                                            {order.designId?.title || "Custom Creation"}
                                        </h3>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 ${
                                            order.status === 'paid' 
                                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                                                : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                        }`}>
                                            {order.status === 'paid' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="text-zinc-500 text-sm font-medium">
                                        Ordered on {new Date(order.createdAt).toLocaleDateString()} &bull; ID: #{order._id.slice(-6)}
                                    </p>
                                    <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                                         <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase tracking-widest leading-none">
                                            <Package className="w-4 h-4 text-violet-400" />
                                            {order.productId?.name || "Premium Apparel"}
                                         </div>
                                    </div>
                                </div>

                                {/* Price & Action */}
                                <div className="flex flex-col items-center md:items-end gap-3 min-w-[120px]">
                                    <span className="text-2xl font-black text-white">${order.totalAmount.toFixed(2)}</span>
                                    <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-violet-400 hover:text-white transition-colors">
                                        View Receipt <ExternalLink className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 glass-morphism rounded-[40px] border-2 border-dashed border-white/5 space-y-6">
                        <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto border border-white/5">
                            <ShoppingBag className="w-10 h-10 text-zinc-700" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black text-white">No orders yet</h3>
                            <p className="text-zinc-500 max-w-xs mx-auto">
                                Your future creations will appear here. Start by generating some AI artwork!
                            </p>
                        </div>
                        <button className="px-8 py-3 bg-white text-black rounded-full font-black hover:bg-zinc-200 transition-all active:scale-95">
                            Start Designing
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Orders;
