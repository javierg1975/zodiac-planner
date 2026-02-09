# FFXII Zodiac Planner - Implementation Plan

## Overview

This document tracks the implementation of the next-generation FFXII job planner with three modes:
- **Library Mode** - Enhanced preset browser (replaces current app)
- **Guide Mode** - Progressive discovery with interview and milestone tracking
- **Coach Mode** - Interactive Q&A with contextual help

**Technology**: Idris 2 (experimental) with escape hatch to PureScript/Elm/Alpine.js if needed.

**Product Vision**: See `idris2-src/NEW_APP.md`
**Current Progress**: See `idris2-src/PROGRESS.md`
**Project Context**: See `CLAUDE.md` and `.claude/rules/`

---

## Dual Objectives

### Objective 1: Build the New App (WILL HAPPEN ✅)
**Deliver** three-mode FFXII planner regardless of technology choice.

**Success Criteria**:
- Users can get personalized recommendations (Guide Mode)
- Users can track party alignment and receive milestone guidance
- Users can ask questions and get contextual answers (Coach Mode)
- Users can explore all presets with enhanced filtering (Library Mode)

**Fallback Stack** (if Idris 2 doesn't work):
1. PureScript (similar type system, mature ecosystem)
2. Elm (simpler, proven for web apps)
3. Alpine.js (keep current tech, add new features)

### Objective 2: Test Idris 2 Feasibility (EXPERIMENT 🧪)
**Evaluate** dependent types as testbed for higher-stakes project.

**Questions We're Answering**:
- ✅ Can we encode business rules as compile-time guarantees?
- ⏳ Is compilation time acceptable? (< 5 min for typical changes)
- ⏳ Does type system catch real bugs during development?
- ⏳ Are error messages helpful or cryptic?
- ⏳ Is bundle size reasonable? (< 500KB)
- ⏳ Is FFI for browser APIs manageable?

**Escape Hatch Criteria**:
| Signal | Threshold | Action |
|--------|-----------|--------|
| Compilation speed | > 5 min for small changes | → PureScript |
| FFI pain | Excessive DOM boilerplate | → Elm |
| Bundle size | > 500KB unminified | → TypeScript + io-ts |
| Error messages | Consistently cryptic | → Haskell + GHCJS |
| UI fidelity | Can't reproduce FFXII styling | → Revert to Alpine.js |

**Key Insight**: Hitting escape hatch = successful learning. We document findings and pivot technology, but keep same product features.

---

## Phase Overview

```
Phase 1: Environment & Hello World                [███████████████████░] 95%
Phase 2: Domain Types (Core Data Model)           [░░░░░░░░░░░░░░░░░░░░] 0%
Phase 3: State Management (Elm-style Model)       [░░░░░░░░░░░░░░░░░░░░] 0%
Phase 4: Library Mode (Preset Browser)            [░░░░░░░░░░░░░░░░░░░░] 0%
Phase 5: Guide Mode (Interview + Milestones)      [░░░░░░░░░░░░░░░░░░░░] 0%
Phase 6: Coach Mode (Static Q&A)                  [░░░░░░░░░░░░░░░░░░░░] 0%
Phase 7: Coach Mode (Claude API - Optional)       [░░░░░░░░░░░░░░░░░░░░] 0%
```

**Current Phase**: Phase 1 (Environment & Hello World)
**Status**: DOM packages installing (95% complete)

---

## Phase 1: Environment & Hello World

**Goal**: Validate Idris 2 toolchain and prove we can compile to JavaScript.

**Status**: 95% Complete ✅
**Branch**: `feature/idris2-rewrite`

### Completed ✅
- [x] Install Idris 2 0.8.0 via Homebrew
- [x] Install dependencies (Chez Scheme, GMP)
- [x] Create project structure (`idris2-src/`)
- [x] Write Hello World `Main.idr`
- [x] Successfully compile to JavaScript (7KB output)
- [x] Test with Node.js
- [x] Git branch created (`feature/idris2-rewrite`)
- [x] **Install pack** (Option A - DONE)
  - pack managing Idris 2 0.8.0-b714fcaea
  - idris2 location: `~/.local/bin/idris2`
  - Package collection: nightly-260205
  - JavaScript codegen working: `pack --cg javascript build`

### In Progress ⏳
- [x] DOM package installation (`pack install dom dom-mvc`) ✅
  - Installed 20 packages including: `dom`, `dom-mvc`, `css`, `js`, `refined`, `containers`, `array`, etc.
  - All dependencies resolved successfully

### Next Steps
1. ~~**Install pack**~~ (DONE)
   ```bash
   cd ~/.cache/pack 2>/dev/null || echo "Clean slate"
   echo "chez" | bash -c "$(curl -fsSL https://raw.githubusercontent.com/stefan-hoeck/idris2-pack/main/install.bash)"
   export PATH="$HOME/.pack/bin:$PATH"
   pack switch latest
   pack install idris2-dom
   pack install idris2-dom-mvc
   ```

2. **Work through idris2-dom-mvc counter tutorial**
   - Learn Elm-style Model/View/Update pattern
   - Understand fine-grained DOM updates (no virtual DOM)
   - Test compilation and browser rendering

3. **Create minimal HTML shell**
   - Copy `styles.css` from current app (shared between both apps)
   - Create mode selector UI (Library/Guide/Coach buttons)
   - Verify FFXII tactical dashboard styling applies correctly

### Deliverables
- [x] `pack` installed and DOM packages available ✅
  - 20 packages installed: `dom`, `dom-mvc`, `css`, `js`, `refined`, `containers`, `array`, etc.
- [ ] Counter example working in browser
- [ ] Mode selector buttons render with FFXII styling
- [ ] Compilation time measured (< 1 min for small changes = PASS)

### Escape Hatch Check
- **Compilation speed**: ✅ Hello World compiled quickly (< 5 sec)
- **Bundle size**: ✅ 7KB for Hello World (well under 500KB threshold)
- **Error messages**: ⏳ TBD (haven't hit errors yet)
- **FFI complexity**: ⏳ TBD (DOM libraries will reveal this)

---

## Phase 2: Domain Types (Core Data Model)

**Goal**: Port FFXII domain types from JavaScript to Idris 2, encode business rules as types.

**Status**: Not Started
**Depends On**: Phase 1 complete

### Type Hierarchy

```idris
-- Core enumerations (port from data/*.js)
data Job        = Shikari | Knight | TimeBattlemage | ... (12 total)
data Character  = Vaan | Penelo | Fran | Balthier | Basch | Ashe
data Esper      = Belias | Mateus | Adrammelech | ... (13 total)
data GamePhase  = Prologue | EarlyGame | MidGame | LateGame | Endgame

-- Dependent types with proofs
data Party : Type where
  MkParty : (chars : Vect 3 Character)
         -> {auto unique : AllUnique chars}
         -> Party

data EsperAssignments : Type where
  MkAssignments : (mapping : List (Esper, Character))
               -> {auto unique : AllUniqueEspers mapping}
               -> EsperAssignments

-- Job pairing with efficiency
record JobPair where
  constructor MkJobPair
  primary   : Job
  secondary : Job
  efficiency : Nat  -- computed from license board overlap
```

### Porting Order

**Step 1: Job (from `data/jobs.js`)**
- [x] Reference file exists
- [ ] Create `Types/Job.idr`
- [ ] 12-constructor ADT
- [ ] Job metadata as functions (color, icon, type)
- [ ] Unit tests

**Step 2: Character (from `data/characters.js`)**
- [x] Reference file exists
- [ ] Create `Types/Character.idr`
- [ ] 6-constructor ADT
- [ ] Portrait URLs as function
- [ ] Unit tests

**Step 3: Esper (from `data/espers.js`)**
- [x] Reference file exists
- [ ] Create `Types/Esper.idr`
- [ ] 13-constructor ADT
- [ ] Unlock mapping function: `(Esper, Job) -> List String`
- [ ] Full names mapping: `Esper -> String`
- [ ] Zodiac symbols as function
- [ ] Unit tests

**Step 4: GamePhase (new type)**
- [ ] Create `Types/GamePhase.idr`
- [ ] 5-constructor ADT with ordering
- [ ] Proof that phases are totally ordered
- [ ] Phase unlocks function: `GamePhase -> List String`

**Step 5: Party (with proofs)**
- [ ] Create `Types/Party.idr`
- [ ] `AllUnique` proof (like type-level Set)
- [ ] Smart constructor that enforces uniqueness
- [ ] Team A/B split function
- [ ] Unit tests (prove invariants)

**Step 6: Preset (from `data/presets.js`)**
- [ ] Create `Types/Preset.idr`
- [ ] Start with "Balanced" preset only
- [ ] Record type with all fields:
  - shortName, desc, metrics
  - phase (validated against GamePhase)
  - requirements, parties, builds
- [ ] Port esper assignments with uniqueness proof
- [ ] Unit tests

### Deliverables
- [ ] All domain types compile
- [ ] Esper uniqueness enforced at compile time (flagship proof)
- [ ] Party composition validated (exactly 3 characters, no duplicates)
- [ ] "Balanced" preset successfully represented
- [ ] Type checker prevents invalid states (e.g., assigning esper twice)

### Success Criteria (Experiment)
- **Does type system catch real bugs?**
  - Try to construct party with duplicate espers → compilation fails
  - Try to use late-game preset in prologue → compilation fails
  - Try to assign esper to wrong job combo → compilation fails
- **Are error messages helpful?**
  - Document examples of type errors encountered
  - Compare to equivalent TypeScript errors
- **Is compilation time acceptable?**
  - Measure time to compile all domain types
  - Target: < 1 min for clean build

### Escape Hatch Check
- If proofs are too painful to write → Consider escape hatch
- If compilation slows to > 5 min → Trigger escape hatch
- If error messages are cryptic → Document for escape hatch decision

---

## Phase 3: State Management (Elm-style Model)

**Goal**: Implement Model/View/Update architecture using `idris2-dom-mvc`.

**Status**: Not Started
**Depends On**: Phase 2 complete

### Architecture

```idris
-- Core state (replaces Alpine.js x-data)
record Model where
  constructor MkModel
  mode              : AppMode      -- Library | Guide | Coach
  selectedPreset    : Maybe String
  selectedParty     : Nat          -- 0-2 (which of 3 party compositions)
  teamView          : TeamView     -- TeamA | TeamB
  expandedCards     : List Nat     -- which character cards are expanded
  showBriefing      : Bool
  guideState        : Maybe GuideState
  coachHistory      : List QAPair

-- Events (replaces Alpine.js @click handlers)
data Msg : Type where
  SelectMode         : AppMode -> Msg
  SelectPreset       : String -> Msg
  SelectParty        : Nat -> Msg
  ToggleTeamView     : Msg
  ExpandCard         : Nat -> Msg
  ToggleBriefing     : Msg
  StartInterview     : Msg
  AnswerQuestion     : GuideAnswer -> Msg
  AskCoachQuestion   : String -> Msg

-- Update function (replaces Alpine.js state mutations)
update : Msg -> Model -> Model
update msg model = case msg of
  SelectMode m       => { mode := m } model
  SelectPreset p     => { selectedPreset := Just p, selectedParty := 0 } model
  ToggleTeamView     => { teamView := toggle model.teamView } model
  ...

-- View function (replaces index.html markup)
view : Model -> Node Msg
view model = case model.mode of
  Library => libraryView model
  Guide   => guideView model
  Coach   => coachView model
```

### Implementation Steps

**Step 1: AppMode and Core Model**
- [ ] Create `State/Model.idr`
- [ ] Define `AppMode` (Library, Guide, Coach)
- [ ] Define `Model` record with all state fields
- [ ] Create initial state function: `init : Model`

**Step 2: Message Types**
- [ ] Create `State/Msg.idr`
- [ ] Define all user events as `Msg` constructors
- [ ] Group by mode (Library messages, Guide messages, Coach messages)

**Step 3: Update Function**
- [ ] Create `State/Update.idr`
- [ ] Implement `update : Msg -> Model -> Model`
- [ ] Handle all message types
- [ ] Ensure pure function (no side effects)

**Step 4: localStorage Persistence**
- [ ] Create `API/Storage.idr`
- [ ] FFI bindings for localStorage
- [ ] Save state on update (keys: `ffxii_preset`, `ffxii_party`, etc.)
- [ ] Load state on init

**Step 5: View Scaffolding**
- [ ] Create `View/Common.idr` (shared components)
- [ ] Create `View/Library.idr` (preset browser layout)
- [ ] Create `View/Guide.idr` (interview + dashboard layout)
- [ ] Create `View/Coach.idr` (Q&A interface layout)
- [ ] Mode selector buttons (functional)

### Deliverables
- [ ] Mode selector works (switches between 3 modes)
- [ ] State persists across page reloads (localStorage)
- [ ] Model/View/Update cycle compiles and runs
- [ ] No runtime errors in browser console
- [ ] FFXII styling applies correctly to all modes

### Success Criteria (Experiment)
- **Is FFI manageable?**
  - localStorage bindings straightforward?
  - Can we call DOM APIs without excessive boilerplate?
- **Is bundle size reasonable?**
  - Measure compiled JS size after full Model/View/Update
  - Target: < 100KB at this phase
- **Does type system help?**
  - Catch missing message handlers at compile time?
  - Prevent invalid state transitions?

### Escape Hatch Check
- If FFI for localStorage is too painful → Consider escape hatch
- If bundle size > 100KB with minimal features → Trigger escape hatch
- If fine-grained DOM updates cause performance issues → Document for decision

---

## Phase 4: Library Mode (Preset Browser)

**Goal**: Replicate current Alpine.js app functionality in Library Mode.

**Status**: Not Started
**Depends On**: Phase 3 complete

### Feature Parity with Current App

**Must Have**:
- [x] Current app behavior documented (see README.md)
- [ ] 8 presets organized by game phase (Early, Mid-Late, Endgame)
- [ ] Preset selector with metrics (LP Sync, Power, Flex)
- [ ] Expandable tactical snapshots
- [ ] Mission Briefing panel with detailed specs
- [ ] Party formations selector (3 compositions per preset)
- [ ] Team A/B toggle
- [ ] 6 character cards with portraits
- [ ] Expandable character details (strategy, espers, gambits, gear)
- [ ] Esper watermarks (clickable → grimoire modal)
- [ ] Status annotations ([STATUS: CRITICAL], [STATUS: MANDATORY])
- [ ] Footer with random memoir quote

### Implementation Steps

**Step 1: Port All 8 Presets**
- [ ] Port "Balanced" preset (already done in Phase 2)
- [ ] Port remaining 7 presets from `data/presets.js`
- [ ] Validate all esper assignments (uniqueness proofs)
- [ ] Create `Data/Presets.idr` with all presets

**Step 2: Preset Selector**
- [ ] Phase grouping logic
- [ ] Preset card component (name, desc, metrics gauges)
- [ ] Expandable snapshot (requirements, synergies)
- [ ] Icon rendering (use existing SVG paths from `data/icons.js`)
- [ ] Selection highlighting

**Step 3: Mission Briefing Panel**
- [ ] Overview section (why this build)
- [ ] Expandable specifications
  - Availability timeline
  - Critical gear with status badges
  - Key espers with zodiac glyphs
  - Recommended levels
  - Tactical notes
- [ ] Amber-themed styling (`ff-briefing-panel`)

**Step 4: Party Compositions**
- [ ] 3 party buttons (composition names)
- [ ] Selection state (active composition)
- [ ] Strategic explanations for each composition

**Step 5: Character Cards**
- [ ] Portrait rendering (Final Fantasy Wiki URLs)
- [ ] Team A/B filtering
- [ ] Leader highlighting (bronze text)
- [ ] Cinematic background overlays (`ff-cinematic-bg`)
- [ ] Expandable details toggle

**Step 6: Character Details**
- [ ] Job combinations display
- [ ] Role description
- [ ] Strategy explanation
- [ ] Esper unlocks section
  - Zodiac glyphs
  - Clickable watermarks → modal
  - License board unlock lists
- [ ] Gambits section
  - Color-coded rows (ally/foe/neutral)
  - Priority ordering
- [ ] Gear recommendations
  - Pipe-delimited parsing ("Name | Reason")
  - Bold name + gray reasoning

**Step 7: Esper Modals**
- [ ] Port `esper_modal.js` logic
- [ ] Create `View/EsperModal.idr`
- [ ] Grimoire styling (`ff-modal-grimoire`)
- [ ] Detail modal (specific esper)
  - B&W artwork
  - Location, zodiac sign, element, cost
  - Description
- [ ] Lore modal (all 13 espers)
  - Promo artwork
  - Narrative overview

**Step 8: Footer**
- [ ] Random memoir selection
- [ ] Port quotes from `data/memoirs.js`
- [ ] Credits section

### Deliverables
- [ ] Complete preset browser works in Library Mode
- [ ] Visual fidelity matches current app
- [ ] All interactions functional (clicks, toggles, expansions)
- [ ] Esper modals render correctly
- [ ] No regressions vs. current app

### Success Criteria (Experiment)
- **UI Fidelity**: Can we reproduce FFXII tactical dashboard styling?
- **Performance**: Smooth interactions (no lag on card expansion)?
- **Bundle Size**: Measure after full feature set
  - Target: < 300KB with all 8 presets and UI logic
- **Type Safety**: Did compiler catch any UI bugs?

### Escape Hatch Check
- If styling can't be reproduced → Trigger escape hatch (revert to Alpine.js)
- If bundle size > 500KB → Trigger escape hatch (consider PureScript)
- If performance degrades (laggy interactions) → Document for decision

---

## Phase 5: Guide Mode (Interview + Milestones)

**Goal**: Build progressive discovery system for new players.

**Status**: Not Started
**Depends On**: Phase 4 complete

### Feature Set

**Welcome Interview** (4 questions):
1. Current game phase (Prologue, Early, Mid, Late, Endgame)
2. Playstyle (Story, Balanced, Optimization, Challenge)
3. Has party already? (Yes → track existing / No → start fresh)
4. Unlocked espers so far? (List selection)

**Milestone Dashboard**:
- Current phase card (where you are)
- Next action recommendation (what to do next)
- Party snapshot (if tracking)
- Progress toward preset (alignment percentage)

**Party Tracking** (optional):
- Manually enter current jobs and espers
- Calculate alignment with recommended preset
- Warnings about deviations ("Missing Hastega source")

**Milestone System**:
- Game progression markers ("Dual Jobs Unlocked", "Obtained Belias")
- Context-aware guidance (different advice per phase)
- Next milestone preview

### Implementation Steps

**Step 1: Interview State**
- [ ] Create `State/GuideState.idr`
- [ ] Define interview questions as ADT
- [ ] Answer types (enums for each question)
- [ ] Recommendation algorithm: `InterviewAnswers -> String` (preset name)

**Step 2: Interview UI**
- [ ] Create `View/Interview.idr`
- [ ] Question cards (one at a time)
- [ ] Multiple choice buttons
- [ ] Progress indicator (1/4, 2/4, etc.)
- [ ] Result screen with preset recommendation

**Step 3: Milestone System**
- [ ] Create `Types/Milestone.idr`
- [ ] Define milestone enum (prologue events, esper acquisitions, etc.)
- [ ] Milestone unlock conditions: `GamePhase -> List Milestone`
- [ ] Next action recommendations: `Milestone -> String`

**Step 4: Dashboard UI**
- [ ] Create `View/Dashboard.idr`
- [ ] Current phase card
- [ ] Next action box
- [ ] Milestone timeline
- [ ] Party alignment gauge (if tracking)

**Step 5: Party Tracking (Optional Feature)**
- [ ] Manual entry form (6 characters, jobs, espers)
- [ ] Validation (esper uniqueness)
- [ ] Alignment calculation: `MyParty -> PresetParty -> Nat` (0-100%)
- [ ] Deviation warnings
  - Missing Hastega
  - Wrong esper assignment
  - Inefficient job pairing

**Step 6: State Persistence**
- [ ] Save interview answers to localStorage
- [ ] Save milestone progress to localStorage
- [ ] Save tracked party to localStorage

### Deliverables
- [ ] Interview completes and recommends preset
- [ ] Dashboard shows actionable next steps
- [ ] Milestone system provides context-aware guidance
- [ ] Party tracking calculates alignment correctly
- [ ] State persists across sessions

### Success Criteria (Experiment)
- **Type Safety**: Can we encode milestone prerequisites as types?
  - Example: "Can't unlock Trial Mode before completing main story"
  - Type system prevents showing wrong milestones for phase
- **User Value**: Is progressive discovery less overwhelming?
  - Compare to current app (all 8 presets shown at once)

### Escape Hatch Check
- If state management becomes too complex → Consider simplifying
- If party tracking validation is too painful → Make optional/remove

---

## Phase 6: Coach Mode (Static Q&A)

**Goal**: Interactive Q&A with contextual question starters.

**Status**: Not Started
**Depends On**: Phase 5 complete

### Feature Set

**Question Starters** (context-aware):
- Adapt to player state (game phase, preset, tracked party)
- 3-5 suggested questions per context
- Examples:
  - "Which preset fits my playstyle?"
  - "Why do I need Famfrit for this build?"
  - "How do I recover from wrong esper assignment?"
  - "What should I prioritize in Late Game?"

**Static Responses**:
- Hardcoded answers for common questions
- Use player state for personalization
- Example: "Based on your Mid Game progress, I recommend..."

**Conversation History**:
- Chat-like interface
- Shows previous Q&A
- Maintains context across questions

**Advanced Input** (collapsed by default):
- Free-form text box
- Only for custom questions
- Reduces intimidation for beginners

### Implementation Steps

**Step 1: Question Database**
- [ ] Create `Data/CoachQuestions.idr`
- [ ] Define question categories (presets, espers, jobs, strategy)
- [ ] Context conditions: `Model -> Bool` (when to show question)
- [ ] Static answers: `Question -> Model -> String` (personalized response)

**Step 2: Context Engine**
- [ ] Create `State/CoachContext.idr`
- [ ] Analyze player state
- [ ] Select relevant questions (3-5)
- [ ] Rank by relevance

**Step 3: Q&A UI**
- [ ] Create `View/Coach.idr`
- [ ] Question starter buttons
- [ ] Conversation history display
- [ ] Collapsible custom input box
- [ ] Chat bubble styling

**Step 4: State Management**
- [ ] Add coach state to Model:
  - conversationHistory: `List QAPair`
  - customInput: `String`
- [ ] Messages: `AskQuestion`, `ClearHistory`
- [ ] Persistence to localStorage

**Step 5: Personalization**
- [ ] Inject player state into answers
  - Current preset
  - Game phase
  - Tracked party (if any)
- [ ] Dynamic recommendations
  - "Given your tracked party, you should..."

### Deliverables
- [ ] Question starters adapt to context
- [ ] Static responses are contextually appropriate
- [ ] Conversation history persists
- [ ] Custom questions accepted (if answer exists)
- [ ] UI feels conversational and approachable

### Success Criteria (Experiment)
- **User Value**: Are contextual questions more helpful than static docs?
- **Type Safety**: Can we encode question-answer mappings as types?
  - Prevent unanswered questions at compile time
  - Guarantee all questions have responses

### Escape Hatch Check
- N/A (Phase 6 is not part of the Idris 2 experiment - this is product value)
- If we've already hit escape hatch, implement in fallback technology

---

## Phase 7: Coach Mode (Claude API - Optional)

**Goal**: Real-time AI responses using Claude API.

**Status**: Not Started
**Depends On**: Phase 6 complete
**Optional**: Can ship without this

### Feature Set

**Claude API Integration**:
- Stream responses using Claude 4 Sonnet
- Inject player state as context
- Conversational explanations of complex builds
- Fallback to static responses if API unavailable

**Prompt Engineering**:
- System prompt with FFXII domain knowledge
- Include player state in user message
- Few-shot examples for consistent responses
- Guardrails against nonsensical advice

**Cost Management**:
- Cache domain knowledge (FFXII game rules)
- Rate limiting (max questions per session)
- Token budgets per response
- Graceful degradation to static answers

### Implementation Steps

**Step 1: API Client**
- [ ] Create `API/Claude.idr`
- [ ] HTTP client FFI bindings
- [ ] Streaming response handling
- [ ] Error handling (timeouts, rate limits)

**Step 2: Prompt Construction**
- [ ] System prompt with FFXII rules
- [ ] Player state serialization
- [ ] Question history formatting
- [ ] Few-shot examples

**Step 3: Response Processing**
- [ ] Stream parsing
- [ ] Markdown rendering
- [ ] Syntax highlighting for code (gambit examples)
- [ ] Error messages for API failures

**Step 4: UI Updates**
- [ ] Typing indicator while streaming
- [ ] Streaming text display
- [ ] "Thinking..." state
- [ ] Fallback indicator ("Using static answer because...")

**Step 5: Cost Controls**
- [ ] Rate limiting logic
- [ ] Token counting
- [ ] Cache hit tracking
- [ ] Usage dashboard (for developers)

### Deliverables
- [ ] Claude API integration working
- [ ] Streaming responses render in UI
- [ ] Costs kept under control
- [ ] Graceful fallback to static answers

### Success Criteria (Product)
- **User Value**: Do AI responses provide better guidance than static?
- **Cost**: Can we keep API costs reasonable?
  - Target: < $0.10 per user session
- **Reliability**: Fallback to static answers works?

### Escape Hatch Check
- N/A (Optional feature - can skip entirely)
- If API costs too high → Disable feature, ship without it

---

## Technology Decision Points

### Current Status: Idris 2 (Experimental)

**Checkpoint 1** (After Phase 1):
- ✅ Toolchain works
- ⏳ Compilation speed acceptable
- ⏳ Bundle size reasonable
- **Decision**: Proceed to Phase 2

**Checkpoint 2** (After Phase 2):
- ⏳ Dependent types encode business rules successfully
- ⏳ Error messages helpful
- ⏳ Compilation speed still acceptable
- **Decision**: TBD - proceed to Phase 3 or trigger escape hatch

**Checkpoint 3** (After Phase 3):
- ⏳ FFI for browser APIs manageable
- ⏳ State management works smoothly
- ⏳ Bundle size still reasonable
- **Decision**: TBD - proceed to Phase 4 or trigger escape hatch

**Checkpoint 4** (After Phase 4):
- ⏳ UI fidelity matches current app
- ⏳ Performance acceptable
- ⏳ Development velocity acceptable
- **Decision**: TBD - proceed to Phase 5 or trigger escape hatch

**Final Decision** (After Phase 4):
- **If all checkpoints pass**: Continue with Idris 2 for Phases 5-7
- **If any checkpoint fails**: Document learnings, execute escape hatch

### Escape Hatch: Fallback Technologies

**Option 1: PureScript** (if type system valuable but Idris 2 too slow)
- Similar dependent types (lighter weight)
- Mature ecosystem
- Faster compilation
- Active community

**Option 2: Elm** (if simplicity more important than advanced types)
- Proven for web apps
- Simple type system (no dependent types)
- Excellent error messages
- No runtime errors

**Option 3: Alpine.js** (if we just need new features)
- Keep current tech stack
- Add Guide Mode and Coach Mode on top
- No rewrite of Library Mode needed
- Fastest time to market

### Escape Hatch Execution Plan

If triggered:
1. **Document learnings** in `idris2-src/LEARNINGS.md`
   - What worked
   - What didn't
   - Why escape hatch triggered
   - Implications for higher-stakes project
2. **Archive Idris 2 work** (keep branch for reference)
3. **Choose fallback technology** (PureScript/Elm/Alpine.js)
4. **Rebuild with lessons learned**
5. **Ship same product features** (3 modes, same UI)

**Key Insight**: Escape hatch = successful experiment. We validate that dependent types have too much overhead for this use case, which informs the other project.

---

## Measurement & Metrics

### Compilation Speed
| Phase | Target | Actual | Status |
|-------|--------|--------|--------|
| Phase 1 (Hello World) | < 30 sec | ~5 sec | ✅ PASS |
| Phase 2 (Domain Types) | < 1 min | TBD | ⏳ |
| Phase 3 (State Mgmt) | < 2 min | TBD | ⏳ |
| Phase 4 (Library Mode) | < 3 min | TBD | ⏳ |

**Escape Hatch Trigger**: > 5 min for incremental changes

### Bundle Size
| Phase | Target | Actual | Status |
|-------|--------|--------|--------|
| Phase 1 (Hello World) | < 50KB | 7KB | ✅ PASS |
| Phase 2 (Domain Types) | < 100KB | TBD | ⏳ |
| Phase 3 (State Mgmt) | < 150KB | TBD | ⏳ |
| Phase 4 (Library Mode) | < 300KB | TBD | ⏳ |

**Escape Hatch Trigger**: > 500KB unminified

### Type Safety Wins
- [ ] Prevented duplicate esper assignment at compile time
- [ ] Prevented invalid party composition
- [ ] Prevented wrong phase preset recommendation
- [ ] Caught missing message handler
- [ ] Caught invalid state transition
- [ ] (Add more as discovered)

### Type Safety Costs
- [ ] Compilation slow-downs
- [ ] Cryptic error messages
- [ ] Excessive boilerplate for proofs
- [ ] Fighting the type checker
- [ ] (Add more as encountered)

---

## Resources & References

### Idris 2 Learning
- [Idris 2 Tutorial](https://github.com/stefan-hoeck/idris2-tutorial)
- [idris2-dom Tutorial](https://github.com/stefan-hoeck/idris2-dom)
- [idris2-dom-mvc Tutorial](https://github.com/stefan-hoeck/idris2-dom-mvc)
- [Official Docs: Dependent Types](https://idris2.readthedocs.io/en/latest/tutorial/typesfuns.html)
- [pack Package Manager](https://github.com/stefan-hoeck/idris2-pack)

### Project Documentation
- `idris2-src/NEW_APP.md` - Product vision
- `idris2-src/PROGRESS.md` - Session-by-session progress
- `CLAUDE.md` - Developer guidelines
- `.claude/rules/*.md` - Topical reference (data structures, UI patterns, FFXII domain)
- `IDRIS2-instructions.md` - Generic Idris 2 coding conventions

### Game Reference
- `docs/FFXII TZA_ The Unneccessary Class Guide v2.2.md` - Complete optimization guide
- `docs/*.md` - Job classes, espers, equipment, strategies

---

## Session Log

### Session 1 (2026-01-28)
- **Phase**: 1 (Environment Setup)
- **Progress**: Installed Idris 2, created project structure, Hello World working
- **Blocker**: Need to decide on `pack` installation
- **Next**: Install pack and DOM libraries

### Session 2 (2026-02-06)
- **Phase**: Planning + Phase 1 completion
- **Progress**:
  - Created IMPLEMENTATION_PLAN.md
  - Installed pack successfully
  - Verified JavaScript codegen working (7KB, 288 lines)
  - Installing DOM packages (`dom`, `dom-mvc`)
- **Blocker**: None
- **Next**: Complete Phase 1 (counter tutorial, mode selector UI)

---

## Notes & Decisions

### Why Idris 2 Over Other Languages?

**Compared to TypeScript**:
- TypeScript: Runtime validation (check at runtime if esper assigned)
- Idris 2: Compile-time proof (impossible to construct invalid state)
- **Trade-off**: Idris 2 slower compilation, TypeScript faster development

**Compared to PureScript**:
- Both have strong type systems
- Idris 2: Full dependent types (types depend on values)
- PureScript: Lighter weight, faster compilation
- **Rationale**: Testing full dependent types for higher-stakes project

**Compared to Elm**:
- Elm: Simpler, beginner-friendly, no runtime errors
- Idris 2: More powerful types, can encode complex invariants
- **Trade-off**: Elm faster to learn, Idris 2 more expressive

**Compared to Alpine.js** (current tech):
- Alpine.js: Keep existing code, just add new features
- Idris 2: Complete rewrite, test advanced types
- **Rationale**: Learning exercise for other project

### Key Architectural Decisions

**Decision 1: Shared styles.css**
- Both Alpine.js app and Idris 2 app use same CSS
- Ensures visual continuity
- Makes escape hatch smoother (styles already work)

**Decision 2: Module Load Order**
- DOM libraries before business logic
- Domain types before data
- Data before views
- (Matters for FFI and initialization)

**Decision 3: Progressive Feature Rollout**
- Phase 4 (Library Mode) = feature parity with current app
- Phases 5-6 = new features (Guide, Coach)
- Can ship after Phase 4 if escape hatch triggered

**Decision 4: Proofs vs. Validation**
- Flagship proof: Esper uniqueness (compile-time)
- Don't over-use proofs (escape hatch risk)
- Use runtime validation where types don't add value

---

## Success Criteria Summary

### Product Success (MUST HAPPEN)
- [ ] Users can get personalized recommendations
- [ ] Users can track party alignment
- [ ] Users can ask questions and get answers
- [ ] Users can explore all presets
- [ ] Visual fidelity matches current app
- [ ] Performance is acceptable
- **Technology**: Idris 2 OR PureScript OR Elm OR Alpine.js

### Experiment Success (LEARNING GOAL)
- [ ] Can encode business rules as types
- [ ] Compilation time acceptable
- [ ] Type system catches real bugs
- [ ] Error messages helpful
- [ ] Bundle size reasonable
- [ ] FFI manageable
- **Outcome**: Decide if dependent types worth it for higher-stakes project

**Both objectives can succeed independently.**
