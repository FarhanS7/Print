import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { TryOnTypeSelector } from "../components/tryon/TryOnTypeSelector";
import { TryOnUploader } from "../components/tryon/TryOnUploader";
import { TryOnProgress } from "../components/tryon/TryOnProgress";
import { TryOnPreview } from "../components/tryon/TryOnPreview";
import { ArrowRight, Info } from "lucide-react";

export default function TryOn() {
  const location = useLocation();
  const navigate = useNavigate();
  const [designId, setDesignId] = useState<string | null>(null);
  
  // TryOn state
  const [tryOnType, setTryOnType] = useState<"upper" | "full">("upper");
  const [files, setFiles] = useState<{ front?: File; side?: File; back?: File }>({});
  const [consentGiven, setConsentGiven] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const id = query.get("designId");
    if (id) {
      setDesignId(id);
    } else {
      // Logic to fetch user's saved designs if no designId is provided
    }
  }, [location]);

  const handleSubmit = async () => {
    if (!designId) {
      alert("Please select a design first.");
      return;
    }
    if (!files.front) {
      alert("A front-facing photo is required.");
      return;
    }
    if (!consentGiven) {
      alert("You must consent to AI processing of your photo.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("designId", designId);
      formData.append("tryOnType", tryOnType);
      formData.append("consentGiven", String(consentGiven));
      // NOTE: idempotency key generation would ideally use uuid, using timestamp for MVP
      const idempotencyKey = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();

      if (files.front) formData.append("front", files.front);
      if (files.side) formData.append("side", files.side);
      if (files.back) formData.append("back", files.back);

      const response = await fetch("http://localhost:5001/api/tryon", {
        method: "POST",
        headers: {
          "Idempotency-Key": idempotencyKey
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || "Ensure you have the backend running");
      }

      if (data.success && data.data.sessionId) {
        setSessionId(data.data.sessionId);
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSessionId(null);
    setPreviewUrl(null);
    setFiles({});
    setConsentGiven(false);
  };

  const handleRegenerate = async () => {
    if (!sessionId) return;
    try {
      const response = await fetch(`http://localhost:5001/api/tryon/${sessionId}/regenerate`, {
        method: "POST"
      });
      const data = await response.json();
      if (data.success && data.data.sessionId) {
         setPreviewUrl(null);
         setSessionId(data.data.sessionId);
      } else {
         throw new Error(data.error?.message || "Regeneration failed.");
      }
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 pb-24">
      <Navbar />

      <main className="pt-32 max-w-5xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
           <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
             Virtual <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Try-On</span>
           </h1>
           <p className="text-zinc-400 max-w-2xl mx-auto md:text-lg">
             Upload your photo to see yourself wearing your custom design. Our AI builds a highly realistic preview of how the physical product will look on you.
           </p>
        </div>

        {/* Dynamic Presentation */}
        {previewUrl ? (
          <TryOnPreview 
            previewUrl={previewUrl} 
            onRegenerate={handleRegenerate}
            onReset={handleReset}
          />
        ) : sessionId ? (
          <TryOnProgress 
            sessionId={sessionId} 
            onComplete={setPreviewUrl}
            onError={(msg) => alert(msg)}  
          />
        ) : (
          <div className="space-y-12 max-w-4xl mx-auto">
            
            {/* Step 1: Type Selection */}
            <div className="space-y-6">
               <div className="flex items-center gap-4">
                 <div className="w-8 h-8 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center font-black">1</div>
                 <h2 className="text-2xl font-bold text-white">Select Try-On Mode</h2>
               </div>
               <TryOnTypeSelector selected={tryOnType} onSelect={setTryOnType} />
            </div>

            {/* Step 2: Upload */}
            <div className="space-y-6">
               <div className="flex items-center gap-4">
                 <div className="w-8 h-8 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center font-black">2</div>
                 <h2 className="text-2xl font-bold text-white">Upload Photos</h2>
               </div>
               <TryOnUploader 
                 onFilesSelected={setFiles}
                 onConsentChange={setConsentGiven}
               />
            </div>

            {/* Step 3: Submit */}
            <div className="pt-8 border-t border-white/5 flex justify-end">
               <button 
                 onClick={handleSubmit} 
                 disabled={isSubmitting || !files.front || !consentGiven}
                 className="px-8 py-4 bg-white text-black font-black text-lg rounded-2xl flex items-center gap-3 hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group active:scale-95"
               >
                 {isSubmitting ? "Initiating..." : "Start Virtual Try-On"}
                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}
