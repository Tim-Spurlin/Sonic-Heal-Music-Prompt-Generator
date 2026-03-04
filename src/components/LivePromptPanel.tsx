import { Copy, CheckCircle, Zap, Terminal, Info } from 'lucide-react';
import { useState } from 'react';
import { GenreData } from '@/lib/data';

interface LivePromptPanelProps {
  dynamicPrompt: string;
  genreData: GenreData;
}

export const LivePromptPanel = ({ dynamicPrompt, genreData }: LivePromptPanelProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const textArea = document.createElement("textarea");
    textArea.value = dynamicPrompt;
    textArea.style.position = "absolute";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    } finally {
      textArea.remove();
    }
  };

  return (
    <div className="bg-[#0D1117] border-t border-slate-700 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-40 shrink-0">
      <div className="flex items-center justify-between px-4 md:px-6 py-2 border-b border-slate-800 bg-[#161B22]">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-slate-400" />
          <span className="text-[10px] md:text-xs font-mono text-slate-300 hidden sm:inline-block">live_therapeutic_prompt.sh</span>
        </div>
        <div className="flex items-center gap-3 md:gap-4">
          <span className={`text-[10px] font-mono tracking-widest hidden md:inline-block ${dynamicPrompt.length > 450 ? 'text-orange-400' : 'text-slate-400'}`}>
            {dynamicPrompt.length}/500
          </span>
          <span className="text-[10px] text-indigo-400 font-mono tracking-widest animate-pulse flex items-center gap-1">
            <Zap size={10} /> LIVE
          </span>
          <button 
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] md:text-xs font-bold font-mono rounded transition-colors"
          >
            {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
            {copied ? 'COPIED' : 'COPY'}
          </button>
        </div>
      </div>
      <div className="p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 items-start h-36 md:h-32 overflow-y-auto">
        <div className="flex-1 font-mono text-sm md:text-base text-emerald-400/90 leading-relaxed whitespace-pre-wrap">
          {dynamicPrompt}
        </div>
        <div className="w-full md:w-64 shrink-0 bg-rose-500/10 border border-rose-500/20 rounded-lg p-3">
          <h4 className="text-[10px] text-rose-400 font-bold mb-1 uppercase tracking-wider flex items-center gap-1">
            <Info size={10} /> Negative Prompt
          </h4>
          <p className="text-[10px] text-slate-300 font-mono line-clamp-2 md:line-clamp-3">
            {genreData.negativePrompt}
          </p>
        </div>
      </div>
    </div>
  );
};
