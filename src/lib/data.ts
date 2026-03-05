export const FREQUENCIES = [
  { id: '157', hz: "157.43", name: "Tantric Resonance", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30", placement: "Dead Center (Mono)", role: "Primal root frequency, physical grounding, somatic nervous system stimulation mimicking touch." },
  { id: '417', hz: "417", name: "Sacral / Passion", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/30", placement: "Mid-range width (Chorus)", role: "Linked to Svadhisthana chakra. Facilitates release of stalled sexual energy and trauma." },
  { id: '432', hz: "432 / 528", name: "Tranquility", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", placement: "Wide Surround (Reverb)", role: "Aligns with Schumann resonance. Stimulates parasympathetic nervous system, drastically reduces cortisol." },
  { id: '4', hz: "4.0", name: "Theta Binaural", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30", placement: "Extreme L/R (HRTF)", role: "Phantom beat bypassing prefrontal cortex logic, forcing brain into deep subconscious trance." }
] as const;

export const GENRES = {
  minimal_house: {
    id: 'minimal_house',
    name: 'Minimal House',
    defaultBpm: 115,
    landscapeTitle: '"Heads-Down" Rominimal Energy',
    landscapeDesc: 'Audiences migrate toward minimal house and deep tech—characterized by stripped-back percussion, subtle rolling basslines, and elongated blends. The dominant aesthetic is a highly immersive, introspective dancefloor experience.',
    traits: [
      { title: 'Extreme Vocal Minimalism', icon: 'Music', color: 'text-indigo-400', bg: 'bg-indigo-500/20', desc: 'Lyrics are absent or reduced to fragmented chops. Stripping semantics forces a non-verbal, right-hemisphere-dominant flow state.' },
      { title: 'Spatial Swing & Shuffle', icon: 'Activity', color: 'text-cyan-400', bg: 'bg-cyan-500/20', desc: 'Micro-shifting audio transients off the strict grid creates an organic, human feel despite synthesized instrumentation.' },
      { title: 'Strict Low-End Theory', icon: 'Waves', color: 'text-purple-400', bg: 'bg-purple-500/20', desc: 'Basslines utilize pure sine/triangle waves below 150 Hz. This leaves the mid-range open for atmospheric textures, preventing sensory fatigue.' }
    ],
    promptGenre: '2026 Underground Minimal House, Microhouse, Deep Tech, Rominimal',
    promptGroove: '4/4 driving kick drum. Apply a distinct 16th-note MPC-style swing/shuffle to all micro-percussions to create an organic, hypnotic, "heads-down" rolling energy. No massive EDM build-ups.',
    negativePrompt: 'No snare rolls, no white noise risers, no aggressive cymbal crashes, no vocals with semantic meaning, no harsh FM synthesis, no sawtooth waves in the mid-range.'
  },
  ambient_drone: {
    id: 'ambient_drone',
    name: 'Ambient Drone',
    defaultBpm: 60,
    landscapeTitle: 'Beatless Oceanic Immersion',
    landscapeDesc: 'A complete rejection of the dancefloor grid. The focus shifts entirely to spatial immersion, infinite oceanic reverbs, and sustained harmonic tension to induce deep meditative and parasympathetic states.',
    traits: [
      { title: 'Absence of Transients', icon: 'Waves', color: 'text-emerald-400', bg: 'bg-emerald-500/20', desc: 'The total removal of percussive attacks prevents the human startle reflex, rapidly lowering cortisol levels.' },
      { title: 'Granular Time-Stretching', icon: 'Brain', color: 'text-blue-400', bg: 'bg-blue-500/20', desc: 'Audio is stretched to dissolve linear time perception, mimicking dissociative out-of-body states.' },
      { title: 'Evolving Harmonics', icon: 'Radio', color: 'text-pink-400', bg: 'bg-pink-500/20', desc: 'Slow-moving LFOs and filters create microscopic timbral changes over macro timeframes (5+ minutes).' }
    ],
    promptGenre: 'Generative Ambient, Healing Drone, Beatless Soundscape, Cinematic Meditation',
    promptGroove: 'Beatless or exceptionally sparse. Zero driving kick drums. Fluid, non-linear time feel with overlapping, slowly evolving textures. Rhythm should be implied by slow LFOs (0.1 Hz) rather than percussion.',
    negativePrompt: 'No drums, no kicks, no percussion, no fast arpeggios, no sharp transients, no sudden volume spikes, no rhythmic grid.'
  },
  deep_techno: {
    id: 'deep_techno',
    name: 'Deep Techno',
    defaultBpm: 135,
    landscapeTitle: 'Industrial Trance Induction',
    landscapeDesc: 'Designed for underground warehouse environments, this aesthetic induces a primitive, driving trance state through high-repetition, cyclical, and aggressively filtered polyrhythmic sequences.',
    traits: [
      { title: 'Cyclical Polyrhythms', icon: 'Activity', color: 'text-rose-400', bg: 'bg-rose-500/20', desc: 'Overlapping loops of different lengths (e.g., 5/4 over 4/4) force the brain to abandon predictive tracking.' },
      { title: 'Sub-Bass Rumble', icon: 'Disc', color: 'text-yellow-400', bg: 'bg-yellow-500/20', desc: 'Continuous low-frequency oscillations create a physical pressure mimicking deep, heavy grounding.' },
      { title: 'Industrial Reverb', icon: 'Ear', color: 'text-slate-400', bg: 'bg-slate-500/20', desc: 'Dense, metallic acoustic spaces create a sensation of vast, depersonalized scale, reducing ego attachment.' }
    ],
    promptGenre: 'Deep Hypnotic Techno, Sci-Fi Industrial, Underground Warehouse Techno',
    promptGroove: 'Relentless, linear 4/4 driving kick drum with a continuous deep sub-bass rumble. Dense, interlocking polyrhythms with heavily filtered, repeating synth sequences. Highly repetitive, inducing a primitive trance.',
    negativePrompt: 'No cheesy melodies, no EDM drops, no uplifting chord progressions, no commercial vocals, no silence, no bright hi-hats.'
  },
  liquid_dnb: {
    id: 'liquid_dnb',
    name: 'Liquid DnB',
    defaultBpm: 170,
    landscapeTitle: 'High-Velocity Emotional Release',
    landscapeDesc: 'Combines high-BPM neurological stimulation with deep, soulful, and jazz-inflected melodies. It creates a sensation of rapid forward momentum while maintaining profound emotional warmth and safety.',
    traits: [
      { title: 'Half-Time Sub-Bass', icon: 'Waves', color: 'text-cyan-400', bg: 'bg-cyan-500/20', desc: 'While percussion operates at 170 BPM, basslines move at 85 BPM, creating a dual-state of relaxation and arousal.' },
      { title: 'Syncopated Ghost Notes', icon: 'Activity', color: 'text-orange-400', bg: 'bg-orange-500/20', desc: 'Complex, fast breakbeats stimulate rapid neural firing and heightened dopamine release.' },
      { title: 'Soulful Atmospherics', icon: 'Music', color: 'text-pink-400', bg: 'bg-pink-500/20', desc: 'Lush pads and Rhodes pianos offset the aggressive percussion, providing empathogenic warmth.' }
    ],
    promptGenre: 'Deep Liquid Drum & Bass, Atmospheric Jungle, Soulful 170BPM',
    promptGroove: 'Fast, highly syncopated breakbeats (amen break style) at 170 BPM, but anchored by a smooth, half-time rolling sub-bass at 85 BPM. Intricate ghost notes on the snare/hats beneath lush, atmospheric pads.',
    negativePrompt: 'No aggressive dubstep growls, no harsh tearout bass, no four-on-the-floor kicks, no jarring drops, no distorted neurofunk bass.'
  }
} as const;

export type GenreId = keyof typeof GENRES;
export type FrequencyData = typeof FREQUENCIES[number];
export type GenreData = typeof GENRES[keyof typeof GENRES];
