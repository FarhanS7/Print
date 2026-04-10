import { Link } from "react-router-dom";
import { XCircle, ShoppingCart, RefreshCcw } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";

const Cancel = () => {
    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col">
            <Navbar />
            <main className="flex-1 flex items-center justify-center p-6">
                <div className="max-w-md w-full glass-morphism rounded-[40px] p-12 text-center space-y-8 border-red-500/20 shadow-[0_0_80px_rgba(239,68,68,0.15)]">
                    <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(239,68,68,0.4)]">
                        <XCircle className="w-12 h-12 text-white" />
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-4xl font-black text-white">Payment <span className="text-red-400">Cancelled</span></h1>
                        <p className="text-zinc-400 font-medium leading-relaxed">
                            Your payment was not completed. If you had trouble during checkout, please try again or contact support.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Link 
                            to="/generate" 
                            className="w-full py-4 bg-white text-black rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all"
                        >
                            <RefreshCcw className="w-5 h-5" />
                            Return to Editor
                        </Link>
                        <Link 
                            to="/" 
                            className="w-full py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Cancel;
