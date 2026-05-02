import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";

interface TryOnProgressProps {
  sessionId: string;
  onComplete: (previewUrl: string) => void;
  onError: (message: string) => void;
}

const STAGES = [
  { id: 'queued', label: 'Preparing your fitting room' },
  { id: 'validating', label: 'Checking photo quality' },
  { id: 'composing', label: 'Building your garment' },
  { id: 'generating', label: 'AI is fitting your outfit' },
  { id: 'uploading_result', label: 'Saving your preview' },
  { id: 'completed', label: 'Ready!' }
];

export const TryOnProgress = ({ sessionId, onComplete, onError }: TryOnProgressProps) => {
  const [currentStatus, setCurrentStatus] = useState<string>('queued');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId || errorMsg) return;

    const pollStatus = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/tryon/${sessionId}/status`);
        const data = await response.json();

        if (data.success) {
          const { status, userVisibleError } = data.data;
          
          setCurrentStatus(status);

          if (status === 'completed') {
             const resFetch = await fetch(`http://localhost:5001/api/tryon/${sessionId}/result`);
             const resData = await resFetch.json();
             if (resData.success && resData.data.previewUrl) {
                onComplete(resData.data.previewUrl);
             }
          } else if (status === 'failed' || status === 'cancelled') {
             setErrorMsg(userVisibleError || 'Generation failed. Please try again.');
             onError(userVisibleError || 'Generation failed. Please try again.');
          }
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    };

    const interval = setInterval(pollStatus, 2000);
    return () => clearInterval(interval);
  }, [sessionId, onComplete, onError, errorMsg]);

  // Determine current active index
  const activeIndex = STAGES.findIndex(s => s.id === currentStatus);
  const displayIndex = activeIndex === -1 ? 0 : activeIndex;

  if (errorMsg) {
    return (
       <div className="p-6 rounded-3xl bg-red-500/10 border border-red-500/20 flex flex-col items-center text-center gap-4">
         <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
           <AlertCircle className="w-8 h-8" />
         </div>
         <div>
           <h3 className="text-white font-bold text-lg">Try-On Failed</h3>
           <p className="text-zinc-400 text-sm mt-1">{errorMsg}</p>
         </div>
       </div>
    );
  }

  return (
    <div className="glass-morphism rounded-3xl p-8 max-w-lg mx-auto w-full">
      <div className="flex flex-col items-center text-center space-y-8">
        
        <div className="relative">
           <div className="w-24 h-24 rounded-full border-4 border-zinc-800 flex items-center justify-center">
             {currentStatus === 'completed' ? (
                <CheckCircle2 className="w-12 h-12 text-green-400" />
             ) : (
                <Loader2 className="w-12 h-12 text-violet-400 animate-spin" />
             )}
           </div>
        </div>

        <div className="space-y-6 w-full">
          {STAGES.map((stage, idx) => {
            const isCompleted = idx < displayIndex || currentStatus === 'completed';
            const isActive = idx === displayIndex && currentStatus !== 'completed';

            return (
              <div key={stage.id} className="flex items-center gap-4">
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isCompleted ? 'bg-green-500 text-white' : 
                  isActive ? 'bg-violet-500 text-white' : 
                  'bg-zinc-800 text-zinc-600'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-2 h-2 rounded-full bg-current" />}
                </div>
                <div className={`flex-1 text-left ${isActive ? 'text-white font-bold' : isCompleted ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {stage.label}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
