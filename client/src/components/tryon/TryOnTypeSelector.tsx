import { Shirt, UserRound } from "lucide-react";

interface TryOnTypeSelectorProps {
  selected: "upper" | "full";
  onSelect: (type: "upper" | "full") => void;
}

export const TryOnTypeSelector = ({ selected, onSelect }: TryOnTypeSelectorProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in slide-in-from-bottom-4 duration-500 delay-100 fill-mode-both">
      
      {/* Upper Body (MVP Default) */}
      <button 
        onClick={() => onSelect("upper")}
        className={`p-6 rounded-3xl text-left border-2 transition-all flex flex-col gap-4 group ${
          selected === "upper" 
            ? "border-violet-500 bg-violet-600/10 shadow-[0_0_30px_rgba(139,92,246,0.15)]" 
            : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
        }`}
      >
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
          selected === "upper" ? "bg-violet-500 text-white" : "bg-zinc-800 text-zinc-400 group-hover:text-zinc-300"
        }`}>
          <Shirt className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg">Upper Body</h3>
          <p className="text-zinc-500 text-sm mt-1">Perfect for tees, hoodies, and jackets. Most reliable results.</p>
        </div>
      </button>

      {/* Full Body (Coming Soon / Disabled) */}
      <button 
        disabled
        className="p-6 rounded-3xl text-left border-2 border-zinc-800/50 bg-zinc-900/30 opacity-70 cursor-not-allowed flex flex-col gap-4 relative overflow-hidden"
      >
        {/* Coming soon badge */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-zinc-800 rounded-full text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
          Coming Soon
        </div>

        <div className="w-12 h-12 rounded-2xl bg-zinc-800/50 flex items-center justify-center text-zinc-500">
          <UserRound className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-zinc-300 font-bold text-lg line-through decoration-zinc-600">Full Outfit</h3>
          <p className="text-zinc-600 text-sm mt-1">Try on full outfits including pants and shoes. Available in V2.2.</p>
        </div>
      </button>

    </div>
  );
};
