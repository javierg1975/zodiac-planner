{-
  Types/Goal.idr

  Same domain types as Types/GoalSample.idr, but using AUTOMATIC DERIVATION.

  This demonstrates how to use compile-time metaprogramming to avoid
  writing repetitive boilerplate. The manual version (Types/GoalSample.idr)
  is kept for pedagogical purposes - it shows what the derivation
  machinery generates for us automatically.
-}

module Types.Goal

-- THE KEY IMPORT: Derive.Prelude provides the derive elaborator
import Derive.Prelude

-- Enable compile-time metaprogramming for derivation
%language ElabReflection

-- ============================================================================
-- OPTIMIZATION GOALS
-- ============================================================================

{-
  OptimizationGoal represents high-level build strategies.

  MANUAL VERSION (what we DON'T have to write):

  public export
  Eq OptimizationGoal where
    MaxEfficiency   == MaxEfficiency   = True
    MaxPower        == MaxPower        = True
    Flexibility     == Flexibility     = True
    Survivability   == Survivability   = True
    EarlyGame       == EarlyGame       = True
    SuperbossFocus  == SuperbossFocus  = True
    SpeedRun        == SpeedRun        = True
    _ == _ = False

  public export
  Show OptimizationGoal where
    show MaxEfficiency  = "MaxEfficiency"
    show MaxPower       = "MaxPower"
    show Flexibility    = "Flexibility"
    show Survivability  = "Survivability"
    show EarlyGame      = "EarlyGame"
    show SuperbossFocus = "SuperbossFocus"
    show SpeedRun       = "SpeedRun"

  DERIVED VERSION (one line replaces all of the above):
-}

public export
data OptimizationGoal
  = MaxEfficiency      -- Minimize LP (License Point) waste from job overlap
  | MaxPower          -- Maximize damage output (physical + magical)
  | Flexibility       -- Cover all combat roles across the party
  | Survivability     -- Prioritize tanking and healing capabilities
  | EarlyGame         -- Works with limited resources (few espers, early gear)
  | SuperbossFocus    -- Optimized for endgame superboss fights
  | SpeedRun          -- Fast progression through main story

-- Generate Eq, Show, and Ord implementations automatically!
-- Syntax: %runElab derive "TypeName" [Interface1, Interface2, ...]
%runElab derive "OptimizationGoal" [Show, Eq, Ord]

{-
  What %runElab derive does:

  1. %runElab: "Run this code at compile time"
  2. derive: A metaprogram that inspects the type structure
  3. "OptimizationGoal": The type name (as a string) to derive for
  4. [Show, Eq, Ord]: List of interfaces to implement

  The compiler generates the same code we wrote manually, but automatically.
  This is similar to:
  - Haskell: `deriving (Eq, Show, Ord)`
  - Rust: `#[derive(Eq, PartialEq, Debug)]`
  - Scala 3: `derives Eq, Show`
-}

-- ============================================================================
-- ROLE DIMENSIONS
-- ============================================================================

{-
  RoleDimension represents combat capabilities we can quantify and score.

  MANUAL VERSION (what we're avoiding):

  public export
  Eq RoleDimension where
    PhysicalTank == PhysicalTank = True
    MagicTank    == MagicTank    = True
    PhysicalDPS  == PhysicalDPS  = True
    MagicDPS     == MagicDPS     = True
    Support      == Support      = True
    Debuffer     == Debuffer     = True
    Healer       == Healer       = True
    _ == _ = False

  public export
  Show RoleDimension where
    show PhysicalTank = "PhysicalTank"
    show MagicTank    = "MagicTank"
    show PhysicalDPS  = "PhysicalDPS"
    show MagicDPS     = "MagicDPS"
    show Support      = "Support"
    show Debuffer     = "Debuffer"
    show Healer       = "Healer"

  DERIVED VERSION (one line):
-}

public export
data RoleDimension
  = PhysicalTank    -- Ability to absorb physical damage
  | MagicTank       -- Ability to absorb magical damage
  | PhysicalDPS     -- Physical damage output
  | MagicDPS        -- Magical damage output
  | Support         -- Buffing and utility
  | Debuffer        -- Debuffing enemies
  | Healer          -- Restoring HP/MP and curing status

%runElab derive "RoleDimension" [Show, Eq, Ord]

-- ============================================================================
-- GAME PHASE
-- ============================================================================

{-
  STORY PROGRESSION

  There is ONLY ONE objective story milestone that gates builds:
  Tomb of Raithwall (unlocks dual jobs + Belias as final boss).

  After Raithwall, you can pick any build and use it forever, OR switch builds
  at any time by visiting Montblanc at Clan Centurio to respec.

  This is NOT a "phase" system - it's a simple binary gate.
-}

public export
data DualJobStatus = Locked | Unlocked

public export
Eq DualJobStatus where
  Locked == Locked = True
  Unlocked == Unlocked = True
  _ == _ = False

public export
Show DualJobStatus where
  show Locked = "Prologue (pre-Raithwall)"
  show Unlocked = "Dual Jobs Unlocked"

{-
  PRESET METADATA

  Presets are NOT progression tiers. They differ by:

  1. PLAYSTYLE & PLAYER EXPERIENCE
     - Beginner: Hand-holding, forgiving, easy to play (Balanced, Lore)
     - Intermediate: Assumes game knowledge (Trinity, Efficiency)
     - Advanced: Requires deep understanding (Ultimate, Endurance)

  2. OPTIMIZATION TARGET
     - GeneralPurpose: Works everywhere (Balanced, Trinity, Lore)
     - SuperbossFocus: Optimized for multi-hour Yiazmat fights (Endurance, Ultimate)
     - LPEfficiency: Minimize wasted unlocks (Efficiency)
     - EsperSynergy: Maximize esper unlock value (Hunter)
     - ThematicAccuracy: Lore/fantasy fulfillment (Lore-Driven)

  3. RESOURCE REQUIREMENTS (only hard gate besides dual jobs)
     - NormalProgression: Works with story content at any esper count
     - TrialModeRequired: REQUIRES grinding Trial Mode for gear

  Examples:
  - You CAN beat Yiazmat with Balanced (general-purpose build)
  - You CAN beat the story with Endurance (superboss-optimized build)
  - You CANNOT use Ultimate without Trial Mode farming (hard requirement)

  The old "phase" markers were UX sugar that conflated WHEN you start a build
  with WHAT it's optimized for. Don't make that mistake here.
-}

public export
data PlayerExperience = Beginner | Intermediate | Advanced

public export
Eq PlayerExperience where
  Beginner == Beginner = True
  Intermediate == Intermediate = True
  Advanced == Advanced = True
  _ == _ = False

public export
Show PlayerExperience where
  show Beginner = "Beginner-Friendly"
  show Intermediate = "Intermediate"
  show Advanced = "Advanced"

public export
data ResourceGate
  = NormalProgression           -- Works with normal story progression
  | TrialModeRequired           -- REQUIRES Trial Mode farming (non-negotiable)

public export
Eq ResourceGate where
  NormalProgression == NormalProgression = True
  TrialModeRequired == TrialModeRequired = True
  _ == _ = False

public export
Show ResourceGate where
  show NormalProgression = "Story Progression"
  show TrialModeRequired = "Trial Mode Required"

-- ============================================================================
-- CONSTRAINTS
-- ============================================================================

{-
  Constraints are conditions a build must satisfy to achieve a goal.

  Note: We only derive Show here, not Eq, because:
  1. Comparing Doubles for equality is problematic (floating point precision)
  2. We might want custom equality logic for constraints later

  Sometimes manual implementation is still the right choice!
-}

public export
data Constraint
  = MinimizeLPOverlap Double                    -- Target efficiency percentage
  | CoverRoles (List RoleDimension)             -- Required role coverage
  | MinimumRoleScore RoleDimension Nat          -- Minimum score threshold
  | UniqueEsperAssignments                       -- Each esper to one character
  | AllEspersAssigned                            -- All 13 espers assigned
  | MinimalEsperUse                              -- Use few espers (early game)
  | RequireGear String                           -- Specific gear required
  | NoRareGear                                   -- No rare/missable equipment
  | AllCharactersPresent                         -- All 6 characters configured
  | BalancedParty                                -- Diverse combat capabilities

-- Try deriving Show for Constraint (it should work with Derive.Prelude!)
%runElab derive "Constraint" [Show]

-- ============================================================================
-- GOAL CRITERIA
-- ============================================================================

{-
  GoalCriteria ties a goal with its constraints and priorities.

  Records in Idris 2 automatically get:
  - Field accessors (.goal, .constraints, .priorities)
  - Eq instance (if all fields have Eq)
  - Show instance (if all fields have Show)

  So we don't need ANY manual implementation or derivation for records!
  Just define the type and you're done.
-}

public export
record GoalCriteria where
  constructor MkGoalCriteria
  goal : OptimizationGoal
  constraints : List Constraint
  priorities : List (RoleDimension, Nat)

-- No derivation needed! Records give us this for free.

-- ============================================================================
-- EXAMPLE GOAL DEFINITIONS
-- ============================================================================

export
maxEfficiencyGoal : GoalCriteria
maxEfficiencyGoal = MkGoalCriteria
  { goal = MaxEfficiency
  , constraints =
      [ MinimizeLPOverlap 0.85
      , UniqueEsperAssignments
      , AllCharactersPresent
      ]
  , priorities = []
  }

export
balancedGoal : GoalCriteria
balancedGoal = MkGoalCriteria
  { goal = Flexibility
  , constraints =
      [ CoverRoles [PhysicalTank, PhysicalDPS, MagicDPS, Support, Healer]
      , UniqueEsperAssignments
      , AllCharactersPresent
      , BalancedParty
      ]
  , priorities =
      [ (PhysicalTank, 7)
      , (PhysicalDPS, 8)
      , (MagicDPS, 7)
      , (Support, 8)
      , (Healer, 8)
      , (Debuffer, 5)
      ]
  }

export
maxPowerGoal : GoalCriteria
maxPowerGoal = MkGoalCriteria
  { goal = MaxPower
  , constraints =
      [ MinimumRoleScore PhysicalDPS 7
      , MinimumRoleScore MagicDPS 7
      , UniqueEsperAssignments
      , AllCharactersPresent
      ]
  , priorities =
      [ (PhysicalDPS, 10)
      , (MagicDPS, 10)
      , (Support, 4)
      , (PhysicalTank, 2)
      , (Healer, 2)
      ]
  }

export
earlyGameGoal : GoalCriteria
earlyGameGoal = MkGoalCriteria
  { goal = EarlyGame
  , constraints =
      [ MinimalEsperUse
      , NoRareGear
      , AllCharactersPresent
      ]
  , priorities =
      [ (PhysicalDPS, 8)
      , (PhysicalTank, 7)
      , (Healer, 6)
      , (Support, 5)
      ]
  }

{-
  KEY TAKEAWAY:

  Compare this file to Types/GoalSample.idr:
  - Types/GoalSample.idr: ~300 lines with manual Eq/Show implementations
  - Types/Goal.idr: ~200 lines with automatic derivation

  The derivation approach saves ~100 lines of repetitive boilerplate.
  More importantly, it's less error-prone - you can't forget to handle
  a constructor in pattern matching when the compiler generates it for you.

  Use derivation for:
  ✓ Simple ADTs with standard equality/comparison
  ✓ Types where you want the default Show format
  ✓ Production code where conciseness matters

  Use manual implementation for:
  ✓ Learning (understanding how interfaces work)
  ✓ Custom logic (non-standard equality, pretty printing)
  ✓ Types with problematic fields (like Double)
-}
