import { Navbar } from "../components/layout/Navbar";
import { Generator } from "../components/generator/Generator";

const Generate = () => {
    return (
        <div className="min-h-screen bg-zinc-950">
            <Navbar />
            <main className="pt-24 min-h-screen flex flex-col items-center justify-center">
                <Generator />
            </main>
            <footer className="py-12 border-t border-white/5 text-center text-zinc-600 text-sm">
                &copy; {new Date().getFullYear()} PrintifyAI. All rights reserved.
            </footer>
        </div>
    );
};

export default Generate;
