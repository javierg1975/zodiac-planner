# Zodiac Planner - Idris 2 Edition (Product Vision)

## Two Independent Objectives

This project has **two goals**, and they are **NOT** coupled:

### Objective 1: Build the New App (WILL HAPPEN) ✅
**Deliver a next-generation FFXII job planner** with Guide Mode, Coach Mode, and enhanced Library Mode. This app WILL be built regardless of what technology we use.

**Success Criteria**: Users can:
- Get personalized preset recommendations (Guide Mode)
- Track party alignment and receive milestone guidance
- Ask contextual questions and get helpful answers (Coach Mode)
- Explore all presets with enhanced filtering (Library Mode)

**Fallback Technologies** (if Idris 2 doesn't work out):
- PureScript (similar type system, more mature ecosystem)
- Elm (simpler, proven for this use case)
- Alpine.js (keep current tech, just add new features)

### Objective 2: Test Idris 2 Feasibility (EXPERIMENT) 🧪
**Evaluate dependent types for the higher-stakes project.** This is a learning exercise. If Idris 2 proves impractical, that's a **successful outcome** - we learned what NOT to use for the other project.

**Success Criteria** (for the experiment):
- Can we encode business rules as types? (esper uniqueness, phase constraints)
- Is compilation time acceptable? (< 5 min for typical changes)
- Does the type system catch real bugs during development?
- Are error messages helpful or cryptic?
- Is bundle size reasonable? (< 500KB)
- Is FFI for browser APIs manageable?

**Escape Hatch** (signals successful learning):
- If compilation is too slow → Try PureScript (fast GHCJS backend)
- If FFI is too painful → Try Elm (simpler FFI model)
- If ecosystem is too immature → Try TypeScript with io-ts (runtime validation)
- If learning curve is too steep → Try Haskell + GHCJS (similar types, more docs)

**Key Insight**: Hitting the escape hatch means we successfully learned that dependent types have too much overhead for web apps. That's valuable information for the other project.

---

## What We're Building

A **next-generation FFXII job planner** that goes beyond static preset browsing to provide **guided, adaptive party planning** with three distinct modes tailored to different player needs.

### Why Rewrite?

**Current App (Alpine.js version):**
- Static preset browser - pick a build, see the details
- No progression tracking or milestone guidance
- No personalized recommendations
- All presets shown at once (overwhelming for new players)
- No state management beyond localStorage preset selection

**New App (Idris 2 version):**
- Progressive discovery based on game phase and playstyle
- Party tracking and preset alignment feedback
- Interactive guidance system with contextual help
- Type-safe state management (impossible states unrepresentable)
- Three modes for different use cases

---

## Three Modes: Library, Guide, Coach

### Mode 1: Library Mode (Enhanced Preset Browser)

**Purpose**: Advanced users who want to explore all presets freely

**Features**:
- Browse all 8 presets organized by game phase
- Filter and compare preset metrics (LP Sync, Power, Flex)
- View detailed build breakdowns (jobs, espers, gear, gambits)
- Interactive party compositions (3-person team filtering)
- Expandable character cards with role explanations

**User Flow**:
1. Select preset from sidebar
2. Choose party composition (3 of 6 characters)
3. Toggle between Team A (active) and Team B (bench)
4. Expand character cards to see detailed builds
5. Review esper unlocks, gambits, and gear recommendations

**Improvements over current app**:
- Better visual organization (phase grouping)
- Team A/B toggle for comparing active vs. bench characters
- More detailed tactical annotations (status badges for critical items)

---

### Mode 2: Guide Mode (Progressive Discovery)

**Purpose**: New players who want step-by-step guidance

**Features**:
- **Welcome Interview**: 3-4 questions to recommend starting preset
  - Current game phase (Prologue, Early, Mid, Late, Endgame)
  - Playstyle (Story, Balanced, Optimization, Challenge)
  - Has party already? (track existing vs. start fresh)
  - Unlocked espers so far?

- **Milestone Dashboard**:
  - Current phase card (where you are in the game)
  - Next action recommendation (what to do next)
  - Party snapshot (if tracking a party)
  - Progress toward target preset (alignment percentage)

- **Party Tracking** (optional):
  - Manually enter current jobs and esper assignments
  - See how close you are to recommended preset
  - Get warnings about deviations (e.g., "Missing Hastega source")

- **Milestone System**:
  - Game progression markers (e.g., "Dual Jobs Unlocked", "Obtained Belias")
  - Context-aware guidance (different advice for Prologue vs. Endgame)
  - Next milestone preview

**User Flow**:
1. Complete interview → get preset recommendation
2. View dashboard with current phase and next action
3. (Optional) Track party → see alignment progress
4. Check dashboard periodically for milestone updates
5. Adjust party based on recommendations

**Value Proposition**:
- No overwhelming preset list - just ONE recommendation to start
- Actionable next steps instead of static docs
- Validates party choices (are you on track?)
- Reduces decision paralysis for new players

---

### Mode 3: Coach Mode (Interactive Q&A)

**Purpose**: Players who want conversational help with specific questions

**Features**:
- **Question Starters** (context-aware):
  - Adapts to player state (game phase, chosen preset, tracked party)
  - 3-5 suggested questions per context
  - Examples:
    - "Which preset fits my playstyle?"
    - "Why do I need Famfrit for this build?"
    - "How do I recover from assigning the wrong esper?"
    - "What should I prioritize in Late Game?"

- **Conversation History**:
  - Shows previous Q&A in a chat-like interface
  - Maintains context across questions

- **Advanced Input** (collapsed by default):
  - Free-form text box for custom questions
  - Only shown when user expands it (reduces intimidation)

- **Static Responses** (Phase 6):
  - Hardcoded answers for common questions
  - Uses player state for personalization
  - Example: "Based on your Mid Game progress, I recommend..."

- **Claude API Integration** (Phase 7 - Optional):
  - Real-time AI responses using Claude API
  - Inject player state as context
  - Conversational explanations of complex builds

**User Flow**:
1. See 3-5 question starters based on context
2. Click a question → answer appears in conversation
3. Ask follow-up questions (either via new starters or custom input)
4. Conversation builds up a history of Q&A

**Value Proposition**:
- Just-in-time learning (answers when you need them)
- No manual searching through docs
- Conversational interface feels more approachable
- Context-aware suggestions prevent irrelevant questions

---

## Key Differentiators from Current App

### 1. **Adaptive UI**
- Current: Static preset list (all 8 shown always)
- New: Progressive disclosure (Guide Mode shows 1 recommendation, Library Mode groups by phase)

### 2. **State Management**
- Current: Minimal (just preset selection + card expansion in localStorage)
- New: Full player state tracking (game phase, unlocked espers, party composition, interview answers, conversation history)

### 3. **Guidance System**
- Current: Read docs, pick preset, good luck
- New: Interview → recommendation → milestone tracking → contextual help

### 4. **Party Validation**
- Current: No validation (players can assign same esper twice, no warnings)
- New: Type-safe state (impossible to construct invalid parties) + alignment feedback

### 5. **Interactive Help**
- Current: Static text explanations
- New: Q&A interface with contextual question starters

---

## Design Philosophy

### Progressive Complexity
- **Beginners**: Start with Guide Mode (simple, directed)
- **Intermediate**: Graduate to Library Mode (explore all presets)
- **Advanced**: Use Coach Mode for specific optimization questions

### Just-in-Time Information
- Don't show all 8 presets upfront (overwhelming)
- Recommend ONE preset based on interview
- Provide help when asked (Coach Mode), not upfront

### Visual Continuity
- Keep FFXII tactical dashboard aesthetic
- Same color scheme, typography, panel styles
- Same character portraits and layout patterns
- Mode switcher replaces preset selector at top

### State Transparency
- Always show where player is (game phase, current preset)
- Show progress toward goals (alignment percentage)
- Make it clear what's next (milestone system)

---

## Technical Advantages (Type Safety)

### Why Idris 2?

**Runtime Validation (Current App)**:
```javascript
if (esperAlreadyAssigned(party, 'Belias')) {
  showError("Belias already assigned to another character!");
}
```

**Compile-Time Proof (New App)**:
```idris
-- Type system prevents duplicate esper assignment
-- Code won't compile if you try to assign Belias twice
data Party : Type where
  MkParty : UniqueEspers allEsperAssignments => ...
```

**Benefits**:
1. Invalid states literally cannot be constructed
2. Validation rules proven exhaustive at compile time
3. Preset alignment becomes a mathematical proof, not a calculation
4. State transitions guaranteed correct by types

This isn't just "fancier validation" - it's using the compiler as a proof assistant to verify correctness before the code ever runs.

---

## User Journey Examples

### Example 1: New Player (Guide Mode)
1. Opens app → interview starts
2. Answers: "I'm in Early Game, Balanced playstyle, no party yet"
3. Gets recommendation: "Balanced Preset"
4. Dashboard shows: "Next: Unlock dual jobs at Tomb of Raithwall"
5. Periodically checks back for milestone updates
6. Eventually graduates to Library Mode to explore alternatives

### Example 2: Optimizer (Library Mode)
1. Opens app → selects Library Mode
2. Filters presets by Late Game phase
3. Compares "Max Efficiency" vs "DPS Nuclear" metrics
4. Expands character cards to see esper unlock differences
5. Decides on DPS Nuclear for superboss fights
6. Uses Coach Mode to ask: "Why Masamune over Dragon Whisker for Basch?"

### Example 3: Stuck Player (Coach Mode)
1. Opens app → selects Coach Mode
2. Sees question starter: "How do I recover from wrong esper assignment?"
3. Clicks → gets answer with step-by-step recovery plan
4. Asks follow-up: "Is it worth restarting vs. just adapting?"
5. Gets contextual advice based on game phase

---

## Out of Scope (v1)

**Not building yet**:
- Multiplayer / party sharing
- Save import from game files
- Automated builds (no AI auto-generation of presets)
- Mobile app (web only for now)
- Dark mode (use current FFXII theme only)
- Localization (English only)

**Maybe later**:
- Equipment database browser
- Gambit simulator
- License board visualizer
- DPS calculator

---

## Success Metrics

**Phase 1-4 Success** (Library Mode working):
- Can browse all presets
- Character cards render correctly
- FFXII styling preserved
- Type system prevents invalid esper assignments

**Phase 5 Success** (Guide Mode working):
- Interview completes and recommends correct preset
- Dashboard shows actionable next steps
- Party tracking calculates alignment correctly

**Phase 6 Success** (Coach Mode working):
- Question starters adapt to player state
- Static responses are contextually appropriate
- Conversation history persists

**Overall Success** (Is Idris 2 worth it?):
- Compilation doesn't hit escape hatch criteria
- Type safety catches real bugs during development
- Bundle size remains reasonable (< 500KB)
- Development velocity is acceptable

If successful, this validates using dependent types for the higher-stakes project.

---

## Future Vision (v2+)

**Guide Mode Enhancements**:
- Game state import (read save files)
- Automated milestone detection (no manual tracking)
- Build recovery suggestions (fix broken parties)

**Coach Mode Enhancements**:
- Full Claude API integration (streaming responses)
- Multimodal (upload screenshots of license board)
- Build critique ("here's what I'd change about your party")

**Library Mode Enhancements**:
- Custom preset creator (design your own builds)
- Preset diff tool (compare two presets side-by-side)
- Export builds to printable PDF

**Social Features**:
- Share party builds via URL
- Community preset voting
- Build showcase gallery
