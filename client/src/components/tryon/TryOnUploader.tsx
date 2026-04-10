import { useState, useRef } from "react";
import { UploadCloud, X, CheckCircle2, ShieldAlert } from "lucide-react";

interface TryOnUploaderProps {
  onFilesSelected: (files: { front?: File; side?: File; back?: File }) => void;
  onConsentChange: (given: boolean) => void;
}

export const TryOnUploader = ({ onFilesSelected, onConsentChange }: TryOnUploaderProps) => {
  const [files, setFiles] = useState<{ front?: File; side?: File; back?: File }>({});
  const [previews, setPreviews] = useState<{ front?: string; side?: string; back?: string }>({});
  const [consent, setConsent] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeSlot, setActiveSlot] = useState<"front" | "side" | "back" | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !activeSlot) return;
    const file = e.target.files[0];

    // Basic validation
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }

    const newFiles = { ...files, [activeSlot]: file };
    setFiles(newFiles);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviews((prev) => ({ ...prev, [activeSlot]: reader.result as string }));
    };
    reader.readAsDataURL(file);

    onFilesSelected(newFiles);
  };

  const removeFile = (slot: "front" | "side" | "back") => {
    const newFiles = { ...files };
    delete newFiles[slot];
    setFiles(newFiles);

    const newPreviews = { ...previews };
    delete newPreviews[slot];
    setPreviews(newPreviews);
    
    onFilesSelected(newFiles);
  };

  const triggerUpload = (slot: "front" | "side" | "back") => {
    setActiveSlot(slot);
    fileInputRef.current?.click();
  };

  const toggleConsent = () => {
    const newVal = !consent;
    setConsent(newVal);
    onConsentChange(newVal);
  };

  const UploadSlot = ({ label, slot, required = false }: { label: string, slot: "front" | "side" | "back", required?: boolean }) => (
    <div className="flex-1 min-w-[200px]">
      <div className="mb-2 flex justify-between">
        <span className="text-white font-bold text-sm">{label}</span>
        {required ? (
          <span className="text-violet-400 text-xs font-bold uppercase tracking-wider">Required</span>
        ) : (
          <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Optional</span>
        )}
      </div>
      
      {previews[slot] ? (
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-violet-500/50 group">
          <img src={previews[slot]} alt={`${slot} preview`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
            <button 
              onClick={() => removeFile(slot)}
              className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1 shadow-md">
             <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
      ) : (
        <button
          onClick={() => triggerUpload(slot)}
          className="w-full aspect-[3/4] rounded-2xl border-2 border-dashed border-zinc-700 bg-white/5 hover:bg-white/10 hover:border-violet-500/50 transition-all flex flex-col items-center justify-center gap-3 group"
        >
          <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform group-hover:bg-violet-500/20 group-hover:text-violet-400 text-zinc-500">
            <UploadCloud className="w-6 h-6" />
          </div>
          <span className="text-xs text-zinc-500 font-medium group-hover:text-zinc-300">Click to upload</span>
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      
      {/* Upload Guidance */}
      <div className="p-4 rounded-2xl bg-violet-900/20 border border-violet-500/20 flex items-start gap-4">
        <ShieldAlert className="w-6 h-6 text-violet-400 shrink-0 mt-1" />
        <div className="space-y-1">
          <h4 className="text-white font-bold">Photo Guidelines for Best Quality</h4>
          <p className="text-zinc-400 text-sm leading-relaxed">
            For the most realistic try-on, use a high-quality photo with clear lighting. 
            Ensure you are facing forward, with your torso visible, and not wearing heavy outerwear or holding objects that block your body.
          </p>
        </div>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/jpeg,image/png,image/webp" 
        onChange={handleFileChange} 
      />

      {/* Slots */}
      <div className="flex flex-wrap gap-4">
        <UploadSlot label="Front View" slot="front" required />
        <UploadSlot label="Side View" slot="side" />
        <UploadSlot label="Back View" slot="back" />
      </div>

      {/* Consent Checkbox */}
      <div 
        className={`p-4 rounded-2xl border transition-colors cursor-pointer flex gap-4 items-center ${consent ? 'bg-violet-900/20 border-violet-500' : 'bg-white/5 border-zinc-800 hover:border-zinc-600'}`}
        onClick={toggleConsent}
      >
        <div className={`w-6 h-6 rounded-md flex items-center justify-center border transition-colors ${consent ? 'bg-violet-500 border-violet-500 text-white' : 'border-zinc-600'}`}>
          {consent && <CheckCircle2 className="w-4 h-4" />}
        </div>
        <div className="flex-1">
          <p className="text-sm text-white font-medium">I consent to AI processing of my uploaded images.</p>
          <p className="text-xs text-zinc-500 mt-1">Photos are temporarily stored for generation and automatically deleted after 24 hours.</p>
        </div>
      </div>
    </div>
  );
};
