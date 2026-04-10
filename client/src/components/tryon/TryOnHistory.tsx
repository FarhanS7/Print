import { Clock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface TryOnHistoryItem {
  _id: string;
  status: string;
  createdAt: string;
  previewUrl?: string; // from assets
  tryOnType: string;
}

interface TryOnHistoryProps {
  history: TryOnHistoryItem[];
  onSelect: (item: TryOnHistoryItem) => void;
}

export const TryOnHistory = ({ history, onSelect }: TryOnHistoryProps) => {
  if (!history || history.length === 0) return null;

  return (
    <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500 fill-mode-both">
      <h3 className="text-xl font-black text-white flex items-center gap-2">
        <Clock className="w-5 h-5 text-violet-400" />
        Recent Try-Ons
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {history.map((item) => (
          <button 
            key={item._id}
            onClick={() => onSelect(item)}
            className="text-left bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-violet-500/50 hover:bg-white/10 transition-all group relative aspect-[3/4]"
          >
            {item.status === 'completed' && item.previewUrl ? (
              <img 
                src={item.previewUrl} 
                alt="Try-On History" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                {item.status === 'failed' ? (
                  <AlertCircle className="w-8 h-8 text-red-500/50" />
                ) : (
                  <Loader2 className="w-8 h-8 text-violet-500/50 animate-spin" />
                )}
              </div>
            )}
            
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <div className="flex items-center gap-1.5">
                {item.status === 'completed' && <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />}
                {item.status === 'failed' && <AlertCircle className="w-3.5 h-3.5 text-red-400" />}
                {(item.status !== 'completed' && item.status !== 'failed') && <Loader2 className="w-3.5 h-3.5 text-blue-400 animate-spin" />}
                <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                  {item.status}
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 mt-0.5">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
