import { Link } from "react-router-dom";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";

const Success = () => {
    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col">
            <Navbar />
            <main className="flex-1 flex items-center justify-center p-6">
                <div className="max-w-md w-full glass-morphism rounded-[40px] p-12 text-center space-y-8 border-violet-500/20 shadow-[0_0_80px_rgba(139,92,246,0.15)]">
                    <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(16,185,129,0.4)] animate-bounce">
                        <CheckCircle2 className="w-12 h-12 text-white" />
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-4xl font-black text-white">Payment <span className="text-emerald-400">Successful!</span></h1>
                        <p className="text-zinc-400 font-medium leading-relaxed">
                            Thank you for your order! Your custom creation is being processed and will be shipped shortly.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Link 
                            to="/orders" 
                            className="w-full py-4 bg-white text-black rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            View Your Orders
                        </Link>
                        <Link 
                            to="/" 
                            className="w-full py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                        >
                            Back to Home <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Success;
