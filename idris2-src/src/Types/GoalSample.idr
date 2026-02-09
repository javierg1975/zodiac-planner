{-
  Types/Goal.idr

  ⚠️  REFERENCE ONLY - NOT BUILT ⚠️

  This file is kept for pedagogical purposes to show manual interface
  implementations. It is NOT included in the build (see zodiac-planner.ipkg).

  The production version is Types/GoalDerived.idr which uses automatic
  derivation via `%runElab derive`.

  ---

  Defines optimization goals and constraints for FFXII party builds.

  Core insight: A "good" build is relative to goals. The same job pairing
  might be excellent for one goal (e.g., "Balanced") but poor for another
  (e.g., "Max Efficiency"). Goals impose constraints that shape evaluation.
-}

module Types.Goal

{-
  In Idris 2, we explicitly declare what we're exporting from this module.
  If we don't specify, everything is private by default.

  Syntax: export <declaration>
  or: public export <declaration> (also exports the type's constructors)
-}

-- ============================================================================
-- OPTIMIZATION GOALS
-- ============================================================================

{-
  OptimizationGoal represents the high-level strategy for a build.
  Each goal prioritizes different aspects of party composition.

  This is a simple ADT (Algebraic Data Type) - similar to Haskell or
  a sealed trait in Scala. Each constructor is a value with no arguments.

  We use 'public export' so other modules can pattern match on these constructors.
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

{-
  Implementing Eq (equality) for OptimizationGoal.

  In Idris 2, you implement interfaces (like typeclasses in Haskell or
  traits in Scala) using the syntax:

    <Interface> <Type> where
      method1 = ...
      method2 = ...

  The Eq interface requires:
    (==) : a -> a -> Bool
    (/=) : a -> a -> Bool

  We only need to implement (==); (/=) is automatically derived.
-}

public export
Eq OptimizationGoal where
  MaxEfficiency   == MaxEfficiency   = True
  MaxPower        == MaxPower        = True
  Flexibility     == Flexibility     = True
  Survivability   == Survivability   = True
  EarlyGame       == EarlyGame       = True
  SuperbossFocus  == SuperbossFocus  = True
  SpeedRun        == SpeedRun        = True
  -- All other combinations are not equal
  _ == _ = False

{-
  Implementing Show (string representation) for OptimizationGoal.

  The Show interface requires:
    show : a -> String

  This is used for debugging and display purposes.
-}

public export
Show OptimizationGoal where
  show MaxEfficiency  = "Max Efficiency"
  show MaxPower       = "Max Power"
  show Flexibility    = "Flexibility"
  show Survivability  = "Survivability"
  show EarlyGame      = "Early Game"
  show SuperbossFocus = "Superboss Focus"
  show SpeedRun       = "Speed Run"

-- ============================================================================
-- ROLE DIMENSIONS
-- ============================================================================

{-
  RoleDimension represents the different combat roles a character can fulfill.

  Unlike the game's simple categories (DPS/Tank/Healer), we break this down
  into specific dimensions because:
  1. A character can be good at multiple roles simultaneously
  2. We need to quantify HOW GOOD they are at each role (not just binary yes/no)
  3. Different goals care about different combinations of these dimensions
-}

public export
data RoleDimension
  = PhysicalTank    -- Ability to absorb physical damage (heavy armor, shields, HP)
  | MagicTank       -- Ability to absorb magical damage (robes, magic resist)
  | PhysicalDPS     -- Physical damage output (weapons, strength, combo rate)
  | MagicDPS        -- Magical damage output (spells, magic power)
  | Support         -- Buffing and utility (Haste, Bravery, Protect, Shell)
  | Debuffer        -- Debuffing enemies (breaks, status effects)
  | Healer          -- Restoring HP/MP and curing status effects

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
  show PhysicalTank = "Physical Tank"
  show MagicTank    = "Magic Tank"
  show PhysicalDPS  = "Physical DPS"
  show MagicDPS     = "Magic DPS"
  show Support      = "Support"
  show Debuffer     = "Debuffer"
  show Healer       = "Healer"

-- ============================================================================
-- CONSTRAINTS
-- ============================================================================

{-
  Constraints are conditions that a build must satisfy to achieve a goal.

  Unlike simple ADTs above, some constraints carry data (parameters).

  Syntax for parameterized constructors:
    ConstructorName : Type1 -> Type2 -> ... -> DataType

  For example:
    MinimizeLPOverlap : Double -> Constraint
  means "MinimizeLPOverlap takes a Double parameter and produces a Constraint"
-}

public export
data Constraint
  {-
    LP (License Point) efficiency constraints
    Parameter: target efficiency percentage (0.0 = total overlap, 1.0 = no overlap)
  -}
  = MinimizeLPOverlap Double

  {-
    Role coverage constraints
    Parameter: list of role dimensions that must be covered
  -}
  | CoverRoles (List RoleDimension)

  {-
    Every character must have at least one role dimension above this threshold
    Parameters: dimension to check, minimum score required
  -}
  | MinimumRoleScore RoleDimension Nat

  {-
    Esper assignment constraints
    These have no parameters - they're either satisfied or not
  -}
  | UniqueEsperAssignments    -- Each esper assigned to exactly one character
  | AllEspersAssigned         -- All 13 espers must be assigned
  | MinimalEsperUse           -- Use as few espers as possible (early game)

  {-
    Equipment constraints
  -}
  | RequireGear String        -- Specific gear item must be obtainable
  | NoRareGear                -- Don't require rare/missable equipment

  {-
    Party composition constraints
  -}
  | AllCharactersPresent      -- All 6 characters must have job assignments
  | BalancedParty             -- Party should handle diverse combat scenarios

{-
  Note: We don't implement Eq for Constraint because comparing functions
  or parameterized types with Doubles is tricky. We'll add it later if needed.
-}

public export
Show Constraint where
  show (MinimizeLPOverlap target) =
    "Minimize LP Overlap (target: " ++ show (target * 100) ++ "%)"
  show (CoverRoles roles) =
    "Cover Roles: " ++ show roles
  show (MinimumRoleScore dim score) =
    "Minimum " ++ show dim ++ " score: " ++ show score
  show UniqueEsperAssignments =
    "Unique Esper Assignments"
  show AllEspersAssigned =
    "All Espers Assigned"
  show MinimalEsperUse =
    "Minimal Esper Use"
  show (RequireGear item) =
    "Require Gear: " ++ item
  show NoRareGear =
    "No Rare Gear"
  show AllCharactersPresent =
    "All Characters Present"
  show BalancedParty =
    "Balanced Party"

-- ============================================================================
-- GOAL CRITERIA
-- ============================================================================

{-
  GoalCriteria ties together a goal with its constraints and priorities.

  This is a RECORD type - similar to a case class in Scala or a record in Haskell.

  Syntax:
    record RecordName where
      constructor ConstructorName
      field1 : Type1
      field2 : Type2
      ...

  Records give us automatic field accessors. For a value `gc : GoalCriteria`,
  we can access fields like: gc.goal, gc.constraints, gc.priorities
-}

public export
record GoalCriteria where
  constructor MkGoalCriteria
  {-
    The high-level goal this criteria represents
  -}
  goal : OptimizationGoal

  {-
    List of constraints that must be satisfied for this goal.
    A build only achieves this goal if ALL constraints are met.
  -}
  constraints : List Constraint

  {-
    Priority weights for different role dimensions.

    Pair type: (a, b) is a tuple of two values

    For example, MaxPower might prioritize:
      [(PhysicalDPS, 10), (MagicDPS, 10), (Support, 3)]
    meaning "damage is most important, support is nice to have"

    Weight is Nat (natural number: 0, 1, 2, ...) where higher = more important
  -}
  priorities : List (RoleDimension, Nat)

{-
  Implementing Show for GoalCriteria using record field accessors
-}

public export
Show GoalCriteria where
  show gc =
    "Goal: " ++ show gc.goal ++ "\n" ++
    "Constraints: " ++ show gc.constraints ++ "\n" ++
    "Priorities: " ++ show gc.priorities

-- ============================================================================
-- EXAMPLE GOAL DEFINITIONS
-- ============================================================================

{-
  Now we can define concrete goals with their criteria.

  These are VALUES (not types), so we don't use 'data' or 'record'.
  We just provide a type signature and then define the value.

  Syntax:
    export
    valueName : Type
    valueName = expression
-}

export
maxEfficiencyGoal : GoalCriteria
maxEfficiencyGoal = MkGoalCriteria
  { goal = MaxEfficiency
  , constraints =
      [ MinimizeLPOverlap 0.85  -- Target: 85%+ efficiency
      , UniqueEsperAssignments
      , AllCharactersPresent
      ]
  , priorities =
      [ -- Max Efficiency doesn't prioritize specific roles
        -- It cares about LP synergy, not combat effectiveness
      ]
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
      , (Support, 4)      -- Haste/Bravery help damage
      , (PhysicalTank, 2) -- Survivability is secondary
      , (Healer, 2)
      ]
  }

export
earlyGameGoal : GoalCriteria
earlyGameGoal = MkGoalCriteria
  { goal = EarlyGame
  , constraints =
      [ MinimalEsperUse        -- Few espers available
      , NoRareGear             -- Can't farm endgame gear
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
  TODO: Add more goal definitions as we expand the system:
  - survivabilityGoal
  - superbossFocusGoal
  - speedRunGoal
-}
