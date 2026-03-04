import { useState, useEffect } from 'react';
import { Info, Music, Brain, Zap, Ear, Radio, Waves, Settings, Sliders, Activity } from 'lucide-react';
import { FREQUENCIES, GENRES, GenreId, FrequencyData } from '@/lib/data';
import { LivePromptPanel } from '@/components/LivePromptPanel';

function App() {
  const [activeTab, setActiveTab] = useState('summary');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeGenre, setActiveGenre] = useState<GenreId>('minimal_house');
  const [bpm, setBpm] = useState(115);
  const [activeDrug, setActiveDrug] = useState<'mdma' | 'ketamine'>('mdma');
  const [activeFreq, setActiveFreq] = useState<FrequencyData>(FREQUENCIES[1]);
  const [volumes, setVolumes] = useState({ root: 100, m3: 80, P5: 60, m7: 0, M9: 0 });

  useEffect(() => {
    setBpm(GENRES[activeGenre].defaultBpm);
  }, [activeGenre]);

  const tabs = [
    { id: 'summary', name: 'Executive Summary', icon: <Info size={18} /> },
    { id: 'landscape', name: 'Sonic Landscape', icon: <Music size={18} /> },
    { id: 'neurochemistry', name: 'Neurochemistry', icon: <Brain size={18} /> },
    { id: 'mimicry', name: 'Pharma Mimicry', icon: <Zap size={18} /> },
    { id: 'psychoacoustics', name: 'Psychoacoustics', icon: <Ear size={18} /> },
    { id: 'harmonics', name: 'Harmonics', icon: <Radio size={18} /> },
  ];

  const getPrompt = () => {
    const genreData = GENRES[activeGenre];
    const drugText = activeDrug === 'mdma'
      ? "MDMA Target: Warm analog sat (200-500Hz), unbroken pulse, cut >10kHz."
      : "Ket Target: HRTF spatial, granular time, slow attacks >15ms, infinite reverb.";

    let moodText = "Minor triad, moody introspection.";
    const isJazzy = volumes.m7 > 40 && volumes.M9 > 40;
    const isHollow = volumes.m3 < 20 && volumes.P5 > 50;
    const isGrounding = volumes.root > 80 && volumes.P5 > 80 && volumes.m7 < 20 && volumes.M9 < 20;

    if (isJazzy) moodText = "Min 9th chords (m7/M9), deep emotional duality.";
    else if (isGrounding) moodText = "Root & P5 only, pure dissociative void.";
    else if (isHollow) moodText = "Atonal tension, suppressed 3rd, hollow ambiguity.";

    const prompt = `[${genreData.name}] ${bpm}BPM. ${drugText} Freq: ${activeFreq.hz}Hz drone (${activeFreq.placement}). Harmonics: Dorian mode. ${moodText} Style: Hypnotic phase-locked loop, zero semantic vocals, deep sub-bass <150Hz.`;
    return prompt.substring(0, 500);
  };

  const dynamicPrompt = getPrompt();

  return (
    <div className="min-h-screen h-screen bg-background text-foreground flex overflow-hidden">
      <div className="hidden md:flex flex-col w-64 bg-card border-r border-border h-full sticky top-0 shrink-0">
        <div className="p-6">
          <h1 className="text-xl font-bold text-white tracking-wider flex items-center gap-2">
            <Waves className="text-primary" />
            SONIC<span className="text-primary font-light">HEAL</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-2 font-mono uppercase tracking-widest">Protocol v2026.4</p>
        </div>
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-border text-xs text-muted-foreground font-mono">
          Engine: {GENRES[activeGenre].name}
        </div>
      </div>

      <div className="flex-1 relative flex flex-col h-full overflow-hidden">
        <div className="md:hidden flex items-center justify-between p-4 bg-card border-b border-border sticky top-0 z-50 shrink-0">
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <Waves className="text-primary" size={20} /> SONIC HEAL
          </h1>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-muted-foreground">
            <Settings size={20} />
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-[60px] left-0 right-0 bg-card border-b border-border z-40 p-2 shadow-2xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm mb-1 ${
                  activeTab === tab.id ? 'bg-primary/20 text-primary' : 'text-muted-foreground'
                }`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </div>
        )}

        <div className="bg-card/80 backdrop-blur-md border-b border-border shrink-0 z-30 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground uppercase tracking-widest shrink-0">
            <Sliders size={16} className="text-primary" /> Architecture:
          </div>
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {Object.values(GENRES).map((g) => (
              <button
                key={g.id}
                onClick={() => setActiveGenre(g.id as GenreId)}
                className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeGenre === g.id 
                    ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(79,70,229,0.4)] border border-primary/50' 
                    : 'bg-background text-muted-foreground border border-border hover:border-muted hover:text-foreground'
                }`}
              >
                {g.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scroll-smooth pb-8">
          <div className="max-w-4xl w-full mx-auto p-6 md:p-12">
            {activeTab === 'summary' && <SummarySection genreName={GENRES[activeGenre].name} />}
            {activeTab === 'landscape' && <LandscapeSection />}
            {activeTab === 'neurochemistry' && <NeurochemistrySection bpm={bpm} setBpm={setBpm} />}
            {activeTab === 'mimicry' && <MimicrySection activeDrug={activeDrug} setActiveDrug={setActiveDrug} />}
            {activeTab === 'psychoacoustics' && <PsychoacousticsSection activeFreq={activeFreq} setActiveFreq={setActiveFreq} />}
            {activeTab === 'harmonics' && <HarmonicsSection volumes={volumes} setVolumes={(v) => setVolumes(v as typeof volumes)} />}
          </div>
        </div>

        <LivePromptPanel dynamicPrompt={dynamicPrompt} genreData={GENRES[activeGenre]} />
      </div>
    </div>
  );
}

const SummarySection = ({ genreName }: { genreName: string }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="inline-block px-3 py-1 mb-6 text-xs font-mono text-primary bg-primary/10 rounded-full border border-primary/20">
      EXECUTIVE SUMMARY
    </div>
    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
      The Architecture of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Sonic Healing</span>
    </h2>
    <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-light">
      Neurochemical Mimicry, Psychoacoustics, and Dynamic AI Prompt Engineering applied to <strong className="text-white">{genreName}</strong>.
    </p>

    <div className="grid md:grid-cols-2 gap-6 mb-12">
      <div className="bg-card p-6 rounded-2xl border border-border hover:border-primary/30 transition-colors">
        <Activity className="text-primary mb-4" size={28} />
        <h3 className="text-lg font-semibold text-white mb-2">The Paradigm Shift</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The electronic music industry is migrating away from high-arousal festival anthems. Audiences demand highly immersive, introspective sonic environments.
        </p>
      </div>
      <div className="bg-card p-6 rounded-2xl border border-border hover:border-accent/30 transition-colors">
        <Brain className="text-accent mb-4" size={28} />
        <h3 className="text-lg font-semibold text-white mb-2">Clinical Neurochemistry</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Clinical research elucidates how specific rhythmic structures interface with neurochemistry to simulate pharmaceutical effects.
        </p>
      </div>
    </div>

    <div className="prose prose-invert max-w-none text-muted-foreground">
      <p className="mb-4">
        By manipulating neural entrainment, the Default Mode Network, and the mesolimbic reward pathway, precisely engineered acoustic stimuli can induce profound therapeutic states.
      </p>
      <p>
        <strong className="text-white">Interactive Instructions:</strong> Use the Architecture Profile selector to change the genre. Configure neurochemical and psychoacoustic effects in the following sections. The live prompt updates automatically.
      </p>
    </div>
  </div>
);

const LandscapeSection = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="inline-block px-3 py-1 mb-6 text-xs font-mono text-accent bg-accent/10 rounded-full border border-accent/20">
      PART I: THE METAGAME
    </div>
    <h2 className="text-3xl font-bold text-white mb-8">The 2026 Sonic Landscape</h2>
    <div className="bg-card p-8 rounded-2xl border border-border mb-8">
      <p className="text-muted-foreground leading-relaxed">
        Electronic music is evolving toward minimal, immersive experiences that prioritize continuous physiological entrainment over traditional song structures. This shift demands precise frequency modulation and spatial depth.
      </p>
    </div>
  </div>
);

const NeurochemistrySection = ({ bpm, setBpm }: { bpm: number; setBpm: (v: number) => void }) => {
  const [pulseScale, setPulseScale] = useState(1);

  const serotonin = Math.max(5, 100 - Math.pow(Math.abs(bpm - 112) * 1.5, 1.2));
  const dopamine = Math.max(5, 100 - Math.pow(Math.abs(bpm - 135) * 1.2, 1.2));
  const oxytocin = Math.max(5, 100 - Math.pow(Math.abs(bpm - 60) * 1.5, 1.2));
  const cortisol = Math.min(100, 5 + Math.pow(Math.max(0, bpm - 110), 1.3));

  const cycleTimeMs = bpm > 0 ? (60 / bpm) * 1000 : 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseScale(1.15);
      setTimeout(() => setPulseScale(1), cycleTimeMs * 0.3);
    }, cycleTimeMs);
    return () => clearInterval(interval);
  }, [cycleTimeMs]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="inline-block px-3 py-1 mb-6 text-xs font-mono text-purple-400 bg-purple-500/10 rounded-full border border-purple-500/20">
        PART II: NEUROCHEMISTRY
      </div>
      <h2 className="text-3xl font-bold text-white mb-6">Neurochemistry of the Groove</h2>

      <div className="bg-card border border-border rounded-3xl p-6 md:p-8 mb-10 shadow-2xl">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity size={20} className="text-primary" />
            Neural Entrainment Simulator
          </h3>
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-5 flex flex-col items-center justify-center bg-background/50 p-6 rounded-2xl border border-border/50">
            <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
              <div 
                className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 border border-primary/50 shadow-[0_0_30px_rgba(99,102,241,0.2)] flex items-center justify-center backdrop-blur-sm z-10"
                style={{
                  transform: `scale(${pulseScale})`,
                  transition: `transform ${cycleTimeMs * 0.2}ms cubic-bezier(0.175, 0.885, 0.32, 1.275)`
                }}
              >
                <Brain className="text-primary" size={32} />
              </div>
            </div>

            <div className="text-6xl font-black text-white mb-4 tracking-tighter">
              {bpm}<span className="text-2xl text-muted-foreground font-normal ml-1">BPM</span>
            </div>

            <div className="w-full relative px-2">
              <input 
                type="range" min="40" max="180" 
                value={bpm} onChange={(e) => setBpm(Number(e.target.value))}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-2 font-mono uppercase">
                <span>40</span>
                <span>120</span>
                <span>180</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 flex flex-col gap-4">
            <div className="bg-card/80 rounded-xl p-5 border border-border">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Neurochemical Response</h4>
              <div className="space-y-4">
                {[
                  { name: 'Serotonin', value: serotonin, color: 'pink' },
                  { name: 'Dopamine', value: dopamine, color: 'blue' },
                  { name: 'Oxytocin', value: oxytocin, color: 'emerald' },
                  { name: 'Cortisol', value: cortisol, color: 'rose' },
                ].map((chem) => (
                  <div key={chem.name}>
                    <div className="flex justify-between text-xs mb-1 font-mono">
                      <span className={`text-${chem.color}-400`}>{chem.name}</span>
                      <span className="text-foreground">{Math.round(chem.value)}%</span>
                    </div>
                    <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                      <div className={`h-full bg-${chem.color}-500 transition-all duration-500`} style={{ width: `${chem.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MimicrySection = ({ activeDrug, setActiveDrug }: { activeDrug: 'mdma' | 'ketamine'; setActiveDrug: (v: 'mdma' | 'ketamine') => void }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="inline-block px-3 py-1 mb-6 text-xs font-mono text-pink-400 bg-pink-500/10 rounded-full border border-pink-500/20">
      PART III: PHARMACOLOGICAL MIMICRY
    </div>
    <h2 className="text-3xl font-bold text-white mb-6">Acoustic Psycho-Mimicry</h2>

    <div className="flex bg-card p-1 rounded-xl mb-8 border border-border w-fit">
      <button 
        onClick={() => setActiveDrug('mdma')}
        className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeDrug === 'mdma' ? 'bg-pink-500/20 text-pink-400' : 'text-muted-foreground hover:text-foreground'}`}
      >
        MDMA
      </button>
      <button 
        onClick={() => setActiveDrug('ketamine')}
        className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeDrug === 'ketamine' ? 'bg-cyan-500/20 text-cyan-400' : 'text-muted-foreground hover:text-foreground'}`}
      >
        Ketamine
      </button>
    </div>

    <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
      {activeDrug === 'mdma' ? (
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">Empathogenic Response</h3>
          <p className="text-muted-foreground mb-4">MDMA acts as a serotonin releasing agent, producing emotional openness and tactile sensitivity.</p>
          <ul className="space-y-3">
            <li className="bg-background p-3 rounded-lg border border-border text-sm">
              <strong className="text-pink-400">Warmth:</strong> Analog saturation on 200-500 Hz mimics physical touch
            </li>
            <li className="bg-background p-3 rounded-lg border border-border text-sm">
              <strong className="text-pink-400">Flow:</strong> Predictable pulse prevents cortisol spikes
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">Dissociative Response</h3>
          <p className="text-muted-foreground mb-4">Ketamine disrupts predictive models, inducing mind-body detachment.</p>
          <ul className="space-y-3">
            <li className="bg-background p-3 rounded-lg border border-border text-sm">
              <strong className="text-cyan-400">Spatial:</strong> HRTF binaural panning creates out-of-body sensations
            </li>
            <li className="bg-background p-3 rounded-lg border border-border text-sm">
              <strong className="text-cyan-400">Time:</strong> Granular synthesis dissolves linear time perception
            </li>
          </ul>
        </div>
      )}
    </div>
  </div>
);

const PsychoacousticsSection = ({ activeFreq, setActiveFreq }: { activeFreq: FrequencyData; setActiveFreq: (v: FrequencyData) => void }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="inline-block px-3 py-1 mb-6 text-xs font-mono text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/20">
      PART IV: FREQUENCY MEDICINE
    </div>
    <h2 className="text-3xl font-bold text-white mb-6">Psychoacoustic Frequencies</h2>

    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-8">
      <div className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-5 space-y-3">
          {FREQUENCIES.map((freq) => (
            <button
              key={freq.id}
              onClick={() => setActiveFreq(freq)}
              className={`w-full text-left px-4 py-3 rounded-lg border flex justify-between items-center transition-all ${
                activeFreq.id === freq.id 
                  ? `${freq.bg} ${freq.border}` 
                  : 'bg-card border-border hover:border-muted'
              }`}
            >
              <div>
                <span className={`font-mono font-bold text-lg block ${activeFreq.id === freq.id ? freq.color : 'text-muted-foreground'}`}>
                  {freq.hz} Hz
                </span>
                <span className="text-xs uppercase">{freq.name}</span>
              </div>
              {activeFreq.id === freq.id && <Waves className={freq.color} size={20} />}
            </button>
          ))}
        </div>

        <div className="md:col-span-7 bg-card border border-border rounded-xl p-6">
          <div className="mb-4">
            <span className="text-xs text-muted-foreground uppercase">Placement</span>
            <div className="text-lg font-medium text-white">{activeFreq.placement}</div>
          </div>
          <div>
            <span className="text-xs text-muted-foreground uppercase">Role</span>
            <p className="text-foreground leading-relaxed mt-1">{activeFreq.role}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const HarmonicsSection = ({ volumes, setVolumes }: { volumes: Record<string, number>; setVolumes: (v: Record<string, number>) => void }) => {
  const intervals = [
    { id: 'root', name: 'Root', color: 'text-red-400' },
    { id: 'm3', name: 'Minor 3rd', color: 'text-blue-400' },
    { id: 'P5', name: 'Perfect 5th', color: 'text-emerald-400' },
    { id: 'm7', name: 'Minor 7th', color: 'text-purple-400' },
    { id: 'M9', name: 'Major 9th', color: 'text-pink-400' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="inline-block px-3 py-1 mb-6 text-xs font-mono text-yellow-400 bg-yellow-500/10 rounded-full border border-yellow-500/20">
        PART V: HARMONIC STRUCTURE
      </div>
      <h2 className="text-3xl font-bold text-white mb-6">Healing Chord Architecture</h2>

      <div className="bg-card border border-border rounded-3xl p-6 md:p-8 mb-10">
        <div className="space-y-5 bg-background/50 p-6 rounded-2xl border border-border/50">
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Interval Mixer</h4>
          {intervals.map((interval) => (
            <div key={interval.id} className="flex items-center gap-4">
              <div className="w-24 shrink-0">
                <div className={`text-sm font-bold ${volumes[interval.id] > 0 ? interval.color : 'text-muted'} transition-colors`}>
                  {interval.name}
                </div>
              </div>
              
              <input 
                type="range" min="0" max="100" 
                value={volumes[interval.id]} 
                onChange={(e) => setVolumes({...volumes, [interval.id]: Number(e.target.value)})}
                className="flex-1 h-2 rounded-lg appearance-none cursor-pointer bg-secondary accent-primary"
              />
              
              <div className="w-12 text-right">
                <span className="text-xs font-mono text-muted-foreground bg-background px-2 py-1 rounded border border-border">
                  {volumes[interval.id]}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
