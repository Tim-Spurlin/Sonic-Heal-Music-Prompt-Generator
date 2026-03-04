# Planning Guide

A sophisticated real-time AI music prompt generator that translates neurochemistry, psychoacoustic theory, and genre aesthetics into production-ready directives for therapeutic electronic music creation.

**Experience Qualities**:
1. **Clinical Precision** - Interface feels like professional audio engineering software with scientific authority and technical depth
2. **Real-Time Responsiveness** - Every parameter adjustment immediately updates the live prompt, creating a sense of direct control and experimentation
3. **Educational Depth** - Dense with psychoacoustic theory and neurochemical explanations, positioning users as informed practitioners rather than casual consumers

**Complexity Level**: Complex Application (advanced functionality, likely with multiple views)
- This is a multi-section configurator with real-time state synchronization, dynamic prompt generation algorithms, interactive simulators with visual feedback, and persistent bottom panel. It requires sophisticated state management, computed properties, and coordinated updates across 6 distinct content sections.

## Essential Features

### Genre Architecture Selector
- **Functionality**: Global genre selector affecting all downstream parameters (BPM defaults, prompt templates, aesthetic descriptions)
- **Purpose**: Establishes the foundational musical context for therapeutic intent
- **Trigger**: User clicks one of four genre buttons in top bar
- **Progression**: Click genre → BPM snaps to default → Section descriptions update → Prompt regenerates
- **Success criteria**: Genre selection persists across tab navigation and visibly affects all dependent UI elements

### Neural Entrainment BPM Simulator
- **Functionality**: Interactive slider (40-180 BPM) with real-time neurochemical simulation bars and pulsing brain visualization
- **Purpose**: Demonstrates how tempo directly affects serotonin, dopamine, oxytocin, and cortisol levels
- **Trigger**: User drags slider or genre changes
- **Progression**: Adjust BPM → Bars animate smoothly → Brain icon pulses at tempo → Clinical state card updates → Prompt reflects new BPM
- **Success criteria**: Smooth 60fps animations, accurate mathematical modeling of neurochemical curves, visible pulse timing matches BPM

### Pharmacological Mimicry Toggle
- **Functionality**: Two-state toggle between MDMA (empathogenic) and Ketamine (dissociative) with detailed clinical explanations
- **Purpose**: Translates pharmaceutical effects into audio engineering techniques
- **Trigger**: User clicks toggle button
- **Progression**: Select drug → Content panel animates in → Acoustic translation strategies displayed → Prompt injects specific audio directives
- **Success criteria**: Clear visual distinction between states, educational content explains both mechanism and translation

### Psychoacoustic Frequency Selector
- **Functionality**: Rack-style frequency selector (157Hz, 417Hz, 432/528Hz, 4Hz binaural) with animated waveform visualization
- **Purpose**: Applies specific healing frequencies and spatial placement to the generated prompt
- **Trigger**: User clicks frequency button
- **Progression**: Select frequency → Button highlights → Right panel shows placement and role → Waveform animates → Prompt includes frequency drone
- **Success criteria**: Visual feedback clearly indicates active selection, waveform animation conveys frequency characteristics

### Harmonic Synthesizer Mixer
- **Functionality**: Five-slider additive synthesis controller (Root, m3, P5, m7, M9) with live waveform visualization and automatic chord analysis
- **Purpose**: Defines emotional character through interval relationships, affecting mood directives in prompt
- **Trigger**: User adjusts any interval slider
- **Progression**: Move slider → Waveform updates in real-time → Analysis card detects chord type → Neurochemical effect displayed → Prompt updates mood text
- **Success criteria**: Waveform visually represents combined intervals, analysis accurately detects jazzy/hollow/grounding/standard states

### Live Prompt Output Panel
- **Functionality**: Persistent footer displaying dynamically generated prompt with character count, live sync indicator, and one-click copy
- **Purpose**: Provides immediate feedback and export functionality for AI music generators
- **Trigger**: Any parameter change across any section
- **Progression**: Change parameter → Prompt regenerates instantly → Character count updates → User clicks copy → Confirmation shown
- **Success criteria**: Prompt stays under 500 characters, copy works in iframe environments, negative prompt displayed alongside

## Edge Case Handling

- **Extreme BPM Values**: Neurochemical curves gracefully handle 40-180 range without breaking visual bounds or producing negative values
- **Mobile Navigation**: Collapsible hamburger menu prevents navigation overflow, sticky headers maintain context
- **Character Limit Overflow**: Visual warning (orange text) when approaching 500-char limit, automatic truncation prevents breaking
- **Copy Failure Fallback**: Uses textarea fallback method for iframe/embedded environments where clipboard API may be restricted
- **Empty Harmonic State**: Waveform gracefully renders flatline if all sliders at zero, analysis defaults to standard triad
- **Rapid State Changes**: Animations and computations optimized to handle rapid slider adjustments without lag or queue buildup

## Design Direction

The design should evoke the intersection of **clinical research laboratory** and **professional music production studio**—authoritative, precise, technical, yet creatively empowering. Users should feel like they're operating sophisticated scientific equipment, not playing with a toy. Dark, focused, with strategic pops of color to denote different neurochemical/frequency states. Tactile, modular controls reminiscent of hardware synthesizers and laboratory instrumentation.

## Color Selection

The palette balances **scientific authority** (dark slates, near-blacks) with **neurochemical differentiation** (distinct hues for each brain chemical and frequency range).

- **Primary Color**: `oklch(0.55 0.2 260)` Indigo - Represents the "neural" theme, used for active states, primary actions, and sync indicators. Communicates intelligence and precision.
- **Secondary Colors**: 
  - Background: `oklch(0.12 0.01 260)` Deep Slate - Laboratory darkness, focus
  - Panels: `oklch(0.15 0.01 255)` Slate 900 - Modular rack units
  - Borders: `oklch(0.25 0.01 250)` Slate 800 - Subtle separation
- **Accent Color**: `oklch(0.75 0.18 280)` Electric Cyan - Used for secondary highlights and certain frequency states. High energy, forward-thinking.
- **Neurochemical Palette**:
  - Serotonin: `oklch(0.70 0.19 340)` Pink - Warmth, empathy
  - Dopamine: `oklch(0.60 0.19 240)` Blue - Drive, reward
  - Oxytocin: `oklch(0.70 0.16 160)` Emerald - Bonding, safety
  - Cortisol: `oklch(0.65 0.22 20)` Rose - Stress, arousal
  - Frequencies: Red (tantric), Orange (sacral), Emerald (tranquility), Blue (binaural)

**Foreground/Background Pairings**:
- Background (oklch(0.12 0.01 260)): Slate 300 text (oklch(0.71 0.01 250)) - Ratio 5.9:1 ✓
- Slate 900 Panels (oklch(0.15 0.01 255)): White text (oklch(0.98 0 0)) - Ratio 13.2:1 ✓
- Indigo Accent (oklch(0.55 0.2 260)): White text (oklch(0.98 0 0)) - Ratio 4.8:1 ✓
- Pink Neurochemical (oklch(0.70 0.19 340)): Dark slate (oklch(0.15 0.01 255)) - Ratio 7.1:1 ✓

## Font Selection

Typography should bridge **scientific monospace precision** (for data, prompts, technical readouts) with **modern interface clarity** (for explanatory content and headings).

- **Primary Interface**: Space Grotesk - Geometric, technical character with subtle quirks. Perfect for headings and UI labels that need authority without sterility.
- **Monospace/Technical**: JetBrains Mono - Designed for code and data display. Used for BPM readouts, frequency values, character counts, and the live prompt output.
- **Body Text**: Inter (fallback to system) - Maintains readability for longer explanatory sections while staying neutral enough to not compete with the technical aesthetic.

**Typographic Hierarchy**:
- H1 (Section Titles): Space Grotesk Bold/32px/tight tracking (-0.02em)
- H2 (Subsections): Space Grotesk Semibold/24px/normal tracking
- H3 (Panel Headers): Space Grotesk Medium/18px/normal tracking
- Body (Descriptions): Inter Regular/14px/relaxed leading (1.6)
- Data Display: JetBrains Mono Bold/48px (BPM) to 12px (labels)/tabular nums
- Prompt Output: JetBrains Mono Regular/16px/relaxed leading

## Animations

Animations serve **functional feedback** (confirming interactions, showing live sync) and **simulation credibility** (pulsing brain, flowing waveforms). Balance immediate responsiveness with enough motion to feel "alive."

- **State Transitions**: 300ms ease-out for tab switching, genre selection, drug toggle - fast enough to feel instant, smooth enough to track
- **Neurochemical Bars**: 500ms ease-out on value changes - deliberate medical/scientific feel, like instruments stabilizing
- **Brain Pulse**: Tempo-synced scale animation (1.0 → 1.15 → 1.0) with cubic-bezier ease for natural heartbeat quality
- **Waveform Rendering**: RequestAnimationFrame loop at 20 updates/sec (50ms) - smooth enough for visual interest without GPU thrashing
- **Prompt Character Count**: Instant update (0ms) - reinforces real-time generation
- **Copy Confirmation**: 2-second state change with icon swap - clear success feedback
- **Hover States**: 200ms transitions on buttons/cards - tactile without sluggish

## Component Selection

- **Components**: 
  - Button (shadcn) - Extensively used for genre selector, frequency rack, drug toggle. Customized with gradient borders and shadow glows for active states.
  - Card (shadcn) - Section containers, clinical state panels, analysis boxes. Modified with inset shadows and gradient borders.
  - Slider (shadcn) - Critical for BPM and harmonic controls. Heavily customized with gradient tracks and glowing thumbs.
  - Tabs - Avoided in favor of custom sidebar navigation for better vertical screen space usage.
  - Icons (Phosphor & Lucide mixed) - Used extensively for semantic navigation and feature communication.

- **Customizations**: 
  - Rack-style frequency selector (custom button group with active glow states)
  - Terminal-style prompt output panel (custom component with gradient text and copy functionality)
  - Animated SVG waveform generator (custom Canvas-free solution using path animation)
  - Pulsing concentric brain visualization (custom CSS animations with dynamic timing)

- **States**: 
  - Buttons: Default (border-slate-800) → Hover (border-slate-600) → Active (border-indigo-500 + glow + bg tint)
  - Sliders: Track fills with gradient, thumb glows on drag
  - Input focus: Indigo ring with 0.5 opacity
  - Disabled: Reduced opacity (0.4) with cursor-not-allowed

- **Icon Selection**:
  - Waves (brand mark - fluid, sonic)
  - Brain (neurochemistry section - consciousness)
  - Activity (BPM/heartbeat - rhythm)
  - Radio (frequencies - transmission)
  - Zap (live sync - electricity/real-time)
  - Terminal (prompt output - code/execution)
  - Copy/CheckCircle (clipboard actions - confirmation)
  - Sliders (controls - adjustment)
  - Ear (psychoacoustics - perception)
  - Disc (sound source - recording)

- **Spacing**: 
  - Section padding: px-6 py-4 (mobile) / px-12 py-8 (desktop)
  - Card internal: p-6 (mobile) / p-8 (desktop)
  - Gap between elements: gap-4 (16px base) / gap-6 (24px breathing room) / gap-8 (32px section separation)
  - Sidebar: w-64 (256px fixed width on desktop)
  - Live prompt footer: Fixed height h-32 (128px on desktop) / h-36 (144px on mobile) to accommodate negative prompt

- **Mobile**: 
  - Sidebar collapses to hamburger menu (Settings icon) with dropdown overlay
  - Genre selector buttons stack vertically with flex-wrap, become full-width on mobile
  - BPM simulator shifts from 12-column grid to stacked layout
  - Frequency rack stacks selector and detail panel vertically
  - Harmonic mixer grid becomes single column
  - Live prompt footer slightly taller on mobile (h-36) to prevent text truncation
  - Scrollable content area with persistent header/footer using flex-col structure
