export const FREQUENCIES = [
  { id: '157', hz: "157.43", name: "Tantric Resonance", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30", placement: "Dead Center (Mono)", role: "Primal root frequency, physical grounding, somatic nervous system stimulation mimicking touch." },
  { id: '417', hz: "417", name: "Sacral / Passion", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/30", placement: "Mid-range width (Chorus)", role: "Linked to Svadhisthana chakra. Facilitates release of stalled sexual energy and trauma." },
  { id: '432', hz: "432 / 528", name: "Tranquility", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", placement: "Wide Surround (Reverb)", role: "Aligns with Schumann resonance. Stimulates parasympathetic nervous system, drastically reduces cortisol." },
  { id: '4', hz: "4.0", name: "Theta Binaural", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30", placement: "Extreme L/R (HRTF)", role: "Phantom beat bypassing prefrontal cortex logic, forcing brain into deep subconscious trance." }
];

export const GENRES = {
  minimal_house: {
    id: 'minimal_house',
    name: 'Minimal House',
    defaultBpm: 115,
    landscapeTitle: '"Heads-Down" Rominimal Energy',
    landscapeDesc: 'Audiences migrate toward minimal house and deep tech—characterized by stripped-back percussion, subtle rolling basslines, and elongated blends.',
    promptGenre: '2026 Underground Minimal House, Microhouse, Deep Tech, Rominimal',
    negativePrompt: 'No snare rolls, no white noise risers, no aggressive cymbal crashes, no vocals with semantic meaning.'
  },
  ambient_drone: {
    id: 'ambient_drone',
    name: 'Ambient Drone',
    defaultBpm: 60,
    landscapeTitle: 'Beatless Oceanic Immersion',
    landscapeDesc: 'A complete rejection of the dancefloor grid. Focus on spatial immersion, infinite oceanic reverbs, and sustained harmonic tension.',
    promptGenre: 'Generative Ambient, Healing Drone, Beatless Soundscape, Cinematic Meditation',
    negativePrompt: 'No drums, no kicks, no percussion, no fast arpeggios, no sharp transients.'
  },
  deep_techno: {
    id: 'deep_techno',
    name: 'Deep Techno',
    defaultBpm: 135,
    landscapeTitle: 'Industrial Trance Induction',
    landscapeDesc: 'Underground warehouse environments inducing primitive trance through high-repetition cyclical polyrhythmic sequences.',
    promptGenre: 'Deep Hypnotic Techno, Sci-Fi Industrial, Underground Warehouse Techno',
    negativePrompt: 'No cheesy melodies, no EDM drops, no uplifting chord progressions, no commercial vocals.'
  },
  liquid_dnb: {
    id: 'liquid_dnb',
    name: 'Liquid DnB',
    defaultBpm: 170,
    landscapeTitle: 'High-Velocity Emotional Release',
    landscapeDesc: 'High-BPM neurological stimulation with deep, soulful, jazz-inflected melodies creating rapid forward momentum.',
    promptGenre: 'Deep Liquid Drum & Bass, Atmospheric Jungle, Soulful 170BPM',
    negativePrompt: 'No aggressive dubstep growls, no harsh tearout bass, no distorted neurofunk bass.'
  }
};

export type GenreId = keyof typeof GENRES;
export type FrequencyData = typeof FREQUENCIES[0];
export type GenreData = typeof GENRES[keyof typeof GENRES];
