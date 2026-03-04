import { useState, useEffect } from 'react';
import { Info, Music, Brain, Zap, Ear, Radio, Waves, Settings, Sliders, Activity, Disc } from 'lucide-react';
import { FREQUENCIES, GENRES, GenreId, FrequencyData } from '@/lib/data';
import { LivePromptPanel } from '@/components/LivePromptPanel';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Music,
  Activity,
  Waves,
  Brain,
  Radio,
  Disc,
  Ear,
};

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

    if (isJazzy) {
      moodText = "Min 9th chords (m7/M9), deep emotional duality.";
    } else if (isGrounding) {
      moodText = "Root & P5 only, pure dissociative void.";
    } else if (isHollow) {
      moodText = "Atonal tension, suppressed 3rd, hollow ambiguity.";
    }

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
            {activeTab === 'landscape' && <LandscapeSection genreData={GENRES[activeGenre]} />}
            {activeTab === 'neurochemistry' && <NeurochemistrySection bpm={bpm} setBpm={setBpm} genreName={GENRES[activeGenre].name} />}
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

const LandscapeSection = ({ genreData }: { genreData: typeof GENRES[keyof typeof GENRES] }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="inline-block px-3 py-1 mb-6 text-xs font-mono text-accent bg-accent/10 rounded-full border border-accent/20">
      PART I: THE METAGAME
    </div>
    <h2 className="text-3xl font-bold text-white mb-8">The 2026 {genreData.name} Landscape</h2>
    
    <div className="bg-gradient-to-br from-card to-background p-8 rounded-2xl border border-border mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none transition-all duration-1000">
        <Ear size={120} />
      </div>
      <h3 className="text-xl font-semibold text-white mb-4 z-10 relative">{genreData.landscapeTitle}</h3>
      <p className="text-muted-foreground leading-relaxed mb-8 z-10 relative">
        {genreData.landscapeDesc}
      </p>
      
      <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-6 border-b border-border pb-2">Acoustic Parameters of Healing</h4>
      <ul className="space-y-6">
        {genreData.traits.map((trait, idx) => {
          const IconComponent = iconMap[trait.icon];
          return (
            <li key={idx} className="flex gap-4 animate-in fade-in slide-in-from-right-4" style={{ animationDelay: `${idx * 150}ms` }}>
              <div className={`mt-1 ${trait.bg} p-2 rounded-lg ${trait.color} h-fit`}>
                {IconComponent && <IconComponent size={16} />}
              </div>
              <div>
                <strong className="text-foreground block mb-1">{trait.title}</strong>
                <span className="text-sm text-muted-foreground block leading-relaxed">{trait.desc}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  </div>
);

const NeurochemistrySection = ({ bpm, setBpm, genreName }: { bpm: number; setBpm: (v: number) => void; genreName: string }) => {
  const [pulseScale, setPulseScale] = useState(1);

  const serotonin = Math.max(5, 100 - Math.pow(Math.abs(bpm - 112) * 1.5, 1.2));
  const dopamine = Math.max(5, 100 - Math.pow(Math.abs(bpm - 135) * 1.2, 1.2));
  const oxytocin = Math.max(5, 100 - Math.pow(Math.abs(bpm - 60) * 1.5, 1.2));
  const cortisol = Math.min(100, 5 + Math.pow(Math.max(0, bpm - 110), 1.3));

  const hz = (bpm / 60).toFixed(2);
  const harmonicHz = ((bpm / 60) * 2).toFixed(2);
  const cycleTimeMs = bpm > 0 ? (60 / bpm) * 1000 : 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseScale(1.15);
      setTimeout(() => setPulseScale(1), cycleTimeMs * 0.3);
    }, cycleTimeMs);
    return () => clearInterval(interval);
  }, [cycleTimeMs]);

  let clinicalState = { title: "", wave: "", desc: "", color: "" };

  if (bpm <= 90) {
    clinicalState = {
      title: "Parasympathetic Integration", wave: "Delta / Theta (0.5 - 6 Hz)",
      desc: "Deep hypnotic and meditative states. Dominant oxytocin release fosters feelings of extreme safety, oceanic boundlessness, and emotional processing. Heart rate variability (HRV) increases significantly.",
      color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
    };
  } else if (bpm > 90 && bpm <= 118) {
    clinicalState = {
      title: "The Empathogenic 'Flow State'", wave: "Theta / Alpha (6 - 10 Hz)",
      desc: "The absolute optimal zone for empathogenic entrainment. Triggers massive serotonin release, mimicking MDMA. Dissolves the Default Mode Network (ego) and induces a warm, trance-like flow state.",
      color: "text-pink-400 border-pink-500/30 bg-pink-500/10"
    };
  } else if (bpm > 118 && bpm <= 145) {
    clinicalState = {
      title: "Dopaminergic Drive", wave: "Alpha / Beta (10 - 20 Hz)",
      desc: "Shifts the brain into active, focused arousal. Dopamine peaks, creating intense reward-seeking behavior and physical energy. Excellent for repetitive, driving movement, though interpersonal connection begins to lower.",
      color: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10"
    };
  } else {
    clinicalState = {
      title: "Sympathetic Hyper-Arousal", wave: "Beta / Gamma (>20 Hz)",
      desc: "Triggers the HPA axis, releasing cortisol and adrenaline. Excellent for aggressive energy release, fast processing, and chaotic euphoria. Not recommended for tranquil healing, but highly effective for somatic tension release.",
      color: "text-rose-400 border-rose-500/30 bg-rose-500/10"
    };
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="inline-block px-3 py-1 mb-6 text-xs font-mono text-purple-400 bg-purple-500/10 rounded-full border border-purple-500/20">
        PART II: NEUROCHEMISTRY
      </div>
      <h2 className="text-3xl font-bold text-white mb-6">Neurochemistry of the Groove</h2>
      
      <p className="text-muted-foreground leading-relaxed mb-8">
        The human brain synchronizes with rhythmic stimuli via neural entrainment. The simulator is currently snapped to the target tempo for <strong>{genreName}</strong>. Adjust the slider to view the physiological effects of tempo manipulation, which will update your final AI Generation Prompt.
      </p>

      <div className="bg-card border border-border rounded-3xl p-6 md:p-8 mb-10 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border relative z-10">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity size={20} className="text-primary" />
            Neural Entrainment Simulator v2.0
          </h3>
          <div className="px-3 py-1 bg-background border border-border rounded-lg text-xs font-mono text-muted-foreground flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${pulseScale > 1.05 ? 'bg-primary' : 'bg-muted'} transition-colors duration-75`}></div>
            SYNC ACTIVE
          </div>
        </div>
        
        <div className="grid md:grid-cols-12 gap-8 relative z-10">
          <div className="md:col-span-5 flex flex-col items-center justify-center bg-background/50 p-6 rounded-2xl border border-border/50">
            <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
              <div 
                className="absolute inset-0 rounded-full border border-primary/30"
                style={{
                  transform: `scale(${pulseScale * 1.5})`,
                  opacity: pulseScale > 1.05 ? 0.8 : 0,
                  transition: `transform ${cycleTimeMs * 0.8}ms ease-out, opacity ${cycleTimeMs * 0.8}ms ease-out`
                }}
              />
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

            <div className="text-6xl font-black text-white mb-1 tracking-tighter tabular-nums text-center w-full">
              {bpm}<span className="text-2xl text-muted-foreground font-normal tracking-normal ml-1">BPM</span>
            </div>
            
            <div className="flex gap-4 mb-6 w-full justify-center">
              <div className="text-xs font-mono text-muted-foreground bg-background px-3 py-1.5 rounded-md border border-border text-center">
                Fund: <span className="text-primary">{hz} Hz</span>
              </div>
              <div className="text-xs font-mono text-muted-foreground bg-background px-3 py-1.5 rounded-md border border-border text-center">
                Harm: <span className="text-purple-400">{harmonicHz} Hz</span>
              </div>
            </div>

            <div className="w-full relative px-2">
              <input 
                type="range" min="40" max="180" 
                value={bpm} onChange={(e) => setBpm(Number(e.target.value))}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary z-10 relative"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-2 font-mono uppercase">
                <span>Drone (40)</span>
                <span>House (120)</span>
                <span>DnB (180)</span>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-7 flex flex-col gap-4">
            <div className="bg-card/80 rounded-xl p-5 border border-border">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <Zap size={14} className="text-yellow-500" /> Simulated Endocrine Response
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1 font-mono">
                    <span className="text-pink-400">Serotonin (Empathy/Peace)</span>
                    <span className="text-foreground">{Math.round(serotonin)}%</span>
                  </div>
                  <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-pink-500 transition-all duration-500 ease-out" style={{ width: `${serotonin}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1 font-mono">
                    <span className="text-blue-400">Dopamine (Reward/Drive)</span>
                    <span className="text-foreground">{Math.round(dopamine)}%</span>
                  </div>
                  <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 transition-all duration-500 ease-out" style={{ width: `${dopamine}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1 font-mono">
                    <span className="text-emerald-400">Oxytocin (Bonding/Safety)</span>
                    <span className="text-foreground">{Math.round(oxytocin)}%</span>
                  </div>
                  <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 transition-all duration-500 ease-out" style={{ width: `${oxytocin}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1 font-mono">
                    <span className="text-rose-400">Cortisol (Stress/Arousal)</span>
                    <span className="text-foreground">{Math.round(cortisol)}%</span>
                  </div>
                  <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 transition-all duration-500 ease-out" style={{ width: `${cortisol}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`rounded-xl p-5 border transition-colors duration-500 ${clinicalState.color}`}>
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-white">{clinicalState.title}</h4>
                <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-black/20 border border-white/10">
                  {clinicalState.wave}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-white/80">
                {clinicalState.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MimicrySection = ({ activeDrug, setActiveDrug }: { activeDrug: 'mdma' | 'ketamine'; setActiveDrug: (v: 'mdma' | 'ketamine') => void }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="inline-block px-3 py-1 mb-6 text-xs font-mono text-pink-400 bg-pink-500/10 rounded-full border border-pink-500/20">
        PART III: PHARMACOLOGICAL MIMICRY
      </div>
      <h2 className="text-3xl font-bold text-white mb-6">Acoustic Psycho-Mimicry</h2>
      <p className="text-muted-foreground leading-relaxed mb-8">
        Select the target neurochemical profile below. Your selection dictates specific audio engineering techniques (saturation, spatial audio, transient shaping) which will be injected into your final AI Prompt to mimic the effects of these compounds.
      </p>

      <div className="flex bg-card p-1 rounded-xl mb-8 border border-border w-fit mx-auto md:mx-0">
        <button 
          onClick={() => setActiveDrug('mdma')}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeDrug === 'mdma' ? 'bg-pink-500/20 text-pink-400 shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
        >
          MDMA (Empathogenic)
        </button>
        <button 
          onClick={() => setActiveDrug('ketamine')}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeDrug === 'ketamine' ? 'bg-cyan-500/20 text-cyan-400 shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
        >
          Ketamine (Dissociative)
        </button>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 min-h-[400px]">
        {activeDrug === 'mdma' ? (
          <div className="animate-in fade-in duration-500">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
              <div className="p-3 bg-pink-500/20 rounded-xl text-pink-400"><Activity size={32} /></div>
              <div>
                <h3 className="text-2xl font-bold text-white">The Empathogenic Response</h3>
                <p className="text-pink-400/80 text-sm font-mono">Serotonin / Dopamine / Oxytocin Release</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">Clinical Mechanism</h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Acts primarily as a presynaptic releasing agent of serotonin, producing profound inner peace, emotional openness, and physical tactile sensitivity. High affinity for the serotonin transporter (SERT) and 5-HT2A/5-HT1A receptors.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">Acoustic Translation</h4>
                <ul className="space-y-3">
                  <li className="bg-background p-3 rounded-lg border border-border text-sm text-foreground">
                    <strong className="text-pink-400 block mb-1">Warmth & Tactile Sensation:</strong> Analog-modeled saturation on lower-mid frequencies (200-500 Hz). Even-order harmonics create a dense, warm environment mimicking physical touch.
                  </li>
                  <li className="bg-background p-3 rounded-lg border border-border text-sm text-foreground">
                    <strong className="text-pink-400 block mb-1">Serotonin Flow:</strong> Highly predictable pulse. Interruptions trigger cortisol startle-reflexes, immediately breaking the empathogenic state.
                  </li>
                  <li className="bg-background p-3 rounded-lg border border-border text-sm text-foreground">
                    <strong className="text-pink-400 block mb-1">Toxicity Prevention:</strong> Avoid harsh frequencies above 10 kHz to prevent jaw-clenching and sensory overload.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
              <div className="p-3 bg-cyan-500/20 rounded-xl text-cyan-400"><Brain size={32} /></div>
              <div>
                <h3 className="text-2xl font-bold text-white">The Dissociative Response</h3>
                <p className="text-cyan-400/80 text-sm font-mono">NMDA Receptor Antagonism</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">Clinical Mechanism</h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Ketamine is a non-competitive NMDA receptor antagonist. It disrupts the brain's predictive coding models, producing dissociation—a detachment of the mind from the physical body, effective for resetting the DMN and inducing deep tranquility.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">Acoustic Translation</h4>
                <ul className="space-y-3">
                  <li className="bg-background p-3 rounded-lg border border-border text-sm text-foreground">
                    <strong className="text-cyan-400 block mb-1">Spatial Disorientation:</strong> Use Head-Related Transfer Functions (HRTF) and binaural panning to place sounds outside the head, mimicking out-of-body experiences.
                  </li>
                  <li className="bg-background p-3 rounded-lg border border-border text-sm text-foreground">
                    <strong className="text-cyan-400 block mb-1">Non-Linear Time:</strong> Granular synthesis creates shifting atmospheres without definitive starts/ends, mimicking fragmented time perception.
                  </li>
                  <li className="bg-background p-3 rounded-lg border border-border text-sm text-foreground">
                    <strong className="text-cyan-400 block mb-1">Somatic Numbing:</strong> Soften sharp transient attacks using slow attack envelopes (&gt;15ms), removing aggressive percussive clicks. Reverbs &gt;10s create oceanic emptiness.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const PsychoacousticsSection = ({ activeFreq, setActiveFreq }: { activeFreq: FrequencyData; setActiveFreq: (v: FrequencyData) => void }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="inline-block px-3 py-1 mb-6 text-xs font-mono text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/20">
        PART IV: FREQUENCY MEDICINE
      </div>
      <h2 className="text-3xl font-bold text-white mb-6">Psychoacoustics & Frequencies</h2>
      <p className="text-muted-foreground leading-relaxed mb-8">
        Select a resonant frequency from the Oscillator Rack below. This frequency will be injected into your dynamic AI prompt as a continuous drone or binaural tuning target to induce specific physiological healing effects.
      </p>

      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-8 shadow-[inset_0_2px_20px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between mb-8 border-b border-border pb-4">
          <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
            <Radio size={16} className="animate-pulse text-emerald-500" />
            Oscillator Rack Routing
          </h3>
        </div>

        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-5 space-y-3">
            {FREQUENCIES.map((freq) => (
              <button
                key={freq.id}
                onClick={() => setActiveFreq(freq)}
                className={`w-full text-left px-4 py-3 rounded-lg border flex justify-between items-center transition-all ${
                  activeFreq.id === freq.id 
                    ? `${freq.bg} ${freq.border} shadow-sm` 
                    : 'bg-card border-border hover:border-muted text-muted-foreground'
                }`}
              >
                <div>
                  <span className={`font-mono font-bold text-lg block ${activeFreq.id === freq.id ? freq.color : ''}`}>
                    {freq.hz} Hz
                  </span>
                  <span className="text-xs uppercase tracking-wider">{freq.name}</span>
                </div>
                {activeFreq.id === freq.id && <Waves className={freq.color} size={20} />}
              </button>
            ))}
          </div>

          <div className="md:col-span-7 bg-card border border-border rounded-xl p-6 relative overflow-hidden flex flex-col justify-center">
            <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
               <svg viewBox="0 0 100 20" className="w-full h-full" preserveAspectRatio="none">
                 <path d="M0,10 Q25,0 50,10 T100,10" fill="none" stroke="currentColor" strokeWidth="0.5" className={activeFreq.color} vectorEffect="non-scaling-stroke">
                   <animate attributeName="d" dur={`${activeFreq.id === '4' ? '4s' : '1s'}`} repeatCount="indefinite"
                     values="M0,10 Q25,0 50,10 T100,10; M0,10 Q25,20 50,10 T100,10; M0,10 Q25,0 50,10 T100,10" />
                 </path>
               </svg>
            </div>
            
            <div className="relative z-10">
              <div className="mb-4">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Spatial Placement</span>
                <div className={`text-lg font-medium text-white`}>{activeFreq.placement}</div>
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Psychoacoustic Role</span>
                <p className="text-foreground text-lg leading-relaxed mt-1">
                  {activeFreq.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HarmonicsSection = ({ volumes, setVolumes }: { volumes: Record<string, number>; setVolumes: (v: Record<string, number>) => void }) => {
  const [time, setTime] = useState(0);

  const intervals = [
    { id: 'root', name: 'Root (Fund.)', ratio: 1.0, color: 'text-red-400', bg: 'bg-red-500', border: 'border-red-500/50', desc: 'Physical grounding, somatic anchor.' },
    { id: 'm3', name: 'Minor 3rd', ratio: 1.2, color: 'text-blue-400', bg: 'bg-blue-500', border: 'border-blue-500/50', desc: 'Melancholy, introspective depth.' },
    { id: 'P5', name: 'Perfect 5th', ratio: 1.5, color: 'text-emerald-400', bg: 'bg-emerald-500', border: 'border-emerald-500/50', desc: 'Absolute stability, Root chakra alignment.' },
    { id: 'm7', name: 'Minor 7th', ratio: 1.77, color: 'text-purple-400', bg: 'bg-purple-500', border: 'border-purple-500/50', desc: 'Floating tension, unresolved forward momentum.' },
    { id: 'M9', name: 'Major 9th', ratio: 2.25, color: 'text-pink-400', bg: 'bg-pink-500', border: 'border-pink-500/50', desc: 'Jazz sophistication, "MDMA" emotional warmth.' }
  ];

  useEffect(() => {
    let animationFrameId: number;
    let t = 0;
    const renderLoop = () => {
      t += 0.05; 
      setTime(t);
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    renderLoop();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const generateWaveform = () => {
    const points = [];
    const width = 800;
    const height = 150;
    const centerY = height / 2;
    const maxAmplitude = height / 2.5;

    for (let x = 0; x <= width; x += 4) {
      let y = 0;
      let totalVolume = 0;

      intervals.forEach(interval => {
        const vol = volumes[interval.id] / 100;
        totalVolume += vol;
        if (vol > 0) {
          y += Math.sin((x / 50) * interval.ratio - time * interval.ratio) * (maxAmplitude * vol);
        }
      });

      if (totalVolume > 0) y = y / (1 + (totalVolume * 0.2)); 
      points.push(`${x},${centerY + y}`);
    }
    return `M ${points.join(' L ')}`;
  };

  const getAnalysis = () => {
    const isJazzy = volumes.m7 > 40 && volumes.M9 > 40;
    const isHollow = volumes.m3 < 20 && volumes.P5 > 50;
    const isGrounding = volumes.root > 80 && volumes.P5 > 80 && volumes.m7 < 20 && volumes.M9 < 20;

    if (isJazzy) {
      return {
        title: "Sophisticated / Complex Emotion", effect: "Empathogenic Mimicry (MDMA)",
        desc: "The inclusion of the 7th and 9th intervals creates extreme emotional complexity. It sounds simultaneously sad, hopeful, and deeply sophisticated. Forces the brain to process repressed emotional states in a safe, warm environment.",
        color: "text-pink-400 border-pink-500/30"
      };
    } else if (isGrounding) {
      return {
        title: "Primal Trance State", effect: "Dissociative Anchor (Ketamine)",
        desc: "Highly stable, mathematically perfect intervals. Stripping away complex emotion leaves a pure, resonant void. Excellent for inducing transient hypofrontality and out-of-body dissociation while maintaining physical safety.",
        color: "text-emerald-400 border-emerald-500/30"
      };
    } else if (isHollow) {
      return {
        title: "Atonal Disorientation", effect: "DMN Disruption",
        desc: "Lacking the defining minor 3rd, this chord feels hollow and ambiguous. The brain struggles to categorize it as happy or sad, forcing the Default Mode Network to disengage predictive models. Pure, raw tension.",
        color: "text-purple-400 border-purple-500/30"
      };
    } else {
      return {
        title: "Classic Minor Triad", effect: "Dopaminergic Release",
        desc: "The standard minor triad (Root + m3 + P5). Induces a moody, introspective state. Highly effective for continuous, locked-in groove states and steady dopamine drip.",
        color: "text-blue-400 border-blue-500/30"
      };
    }
  };

  const analysis = getAnalysis();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="inline-block px-3 py-1 mb-6 text-xs font-mono text-yellow-400 bg-yellow-500/10 rounded-full border border-yellow-500/20">
        PART V: HARMONIC STRUCTURE
      </div>
      <h2 className="text-3xl font-bold text-white mb-6">Healing Chord Architecture</h2>
      <p className="text-muted-foreground leading-relaxed mb-8">
        Mix the harmonic intervals below. Your specific chord structure will be translated into prompt instructions so the AI accurately models the emotional depth and tension you require.
      </p>

      <div className="bg-card border border-border rounded-3xl p-6 md:p-8 mb-10 shadow-2xl">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Radio size={20} className="text-yellow-500" />
            Additive Harmonic Synthesizer
          </h3>
          <span className="text-xs font-mono text-muted-foreground bg-background px-2 py-1 rounded hidden sm:block">PROMPT_SYNC: ON</span>
        </div>

        <div className="w-full h-[150px] bg-background border border-border rounded-xl mb-8 relative overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]">
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-border/50"></div>
          
          <svg className="absolute inset-0 w-full h-full drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" preserveAspectRatio="none">
            <path d={generateWaveform()} fill="none" stroke="url(#wave-gradient)" strokeWidth="3" strokeLinejoin="round" />
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-7 space-y-5 bg-background/50 p-6 rounded-2xl border border-border/50">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Interval Mixer (Dorian)</h4>
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
                  className="flex-1 h-2 rounded-lg appearance-none cursor-pointer bg-secondary accent-primary outline-none"
                />
                
                <div className="w-12 text-right">
                  <span className="text-xs font-mono text-muted-foreground bg-background px-2 py-1 rounded border border-border">
                    {volumes[interval.id]}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-5 flex flex-col justify-center">
            <div className={`bg-card/80 rounded-2xl p-6 border transition-all duration-500 ${analysis.color}`}>
              <div className="mb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1">Detected Architecture</span>
                <h4 className="text-xl font-bold text-white">{analysis.title}</h4>
              </div>
              
              <div className="mb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1">Neurochemical Target</span>
                <div className="inline-block px-3 py-1 bg-black/40 rounded-lg text-sm font-medium border border-white/10 text-white/90">
                  {analysis.effect}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1">Psychoacoustic Profile</span>
                <p className="text-sm leading-relaxed text-foreground">
                  {analysis.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
