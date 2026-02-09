{-
  Types/Job.idr

  Defines the 12 job classes in FFXII: The Zodiac Age and their capabilities
  across different combat role dimensions.
-}

module Types.Job

import Derive.Prelude
import Types.Goal  -- For RoleDimension

%language ElabReflection

-- ============================================================================
-- JOB CLASSES
-- ============================================================================

{-
  The 12 job classes available in FFXII: The Zodiac Age.

  Each job has different capabilities across combat roles (tanking, DPS,
  support, etc.). These capabilities combine with character affinities
  to determine overall effectiveness.
-}

public export
data Job
  = Knight           -- Heavy armor tank with greatswords
  | Uhlan            -- Spear wielder with heavy armor
  | Shikari          -- Agile ninja with daggers/ninja swords
  | Bushi            -- Katana master with mystic armor
  | Foebreaker       -- Breaks enemy stats with axes/hammers
  | Archer           -- Ranged physical with bows
  | WhiteMage        -- Primary healer and support
  | RedBattlemage    -- Hybrid magic/melee versatility
  | BlackMage        -- Pure offensive magic
  | TimeBattlemage   -- Time/green magic specialist
  | Monk             -- Unarmed/pole fighter with high HP
  | Machinist        -- Gun/bomb user with tools

-- Automatic derivation of Eq, Show, Ord
%runElab derive "Job" [Show, Eq, Ord]

-- ============================================================================
-- JOB METADATA
-- ============================================================================

{-
  Job category for license board efficiency calculations.
  Jobs in the same category have more license overlap.
-}

public export
data JobCategory
  = HeavyPhysical   -- Knight, Uhlan, Foebreaker
  | LightPhysical   -- Shikari, Archer, Machinist
  | HybridPhysical  -- Bushi, Monk
  | PureMagic       -- WhiteMage, BlackMage
  | HybridMagic     -- RedBattlemage, TimeBattlemage

%runElab derive "JobCategory" [Show, Eq, Ord]

export
jobCategory : Job -> JobCategory
jobCategory Knight = HeavyPhysical
jobCategory Uhlan = HeavyPhysical
jobCategory Foebreaker = HeavyPhysical
jobCategory Shikari = LightPhysical
jobCategory Archer = LightPhysical
jobCategory Machinist = LightPhysical
jobCategory Bushi = HybridPhysical
jobCategory Monk = HybridPhysical
jobCategory WhiteMage = PureMagic
jobCategory BlackMage = PureMagic
jobCategory RedBattlemage = HybridMagic
jobCategory TimeBattlemage = HybridMagic

-- ============================================================================
-- JOB CAPABILITIES (Role Scores)
-- ============================================================================

{-
  Semantic capability levels instead of arbitrary 0-10 scale.

  This encodes MEANING in the type system rather than relying on numeric ranges.
-}

public export
data Capability
  = None        -- Cannot perform this role at all
  | Weak        -- Barely functional (1-2)
  | Limited     -- Can do it but poorly (3-4)
  | Adequate    -- Gets the job done (5-6)
  | Strong      -- Good at this role (7-8)
  | Excellent   -- Primary strength (9-10)

%runElab derive "Capability" [Show, Eq, Ord]

{-
  Convert capability to numeric score for calculations.
-}

export
capabilityScore : Capability -> Nat
capabilityScore None = 0
capabilityScore Weak = 2
capabilityScore Limited = 4
capabilityScore Adequate = 5
capabilityScore Strong = 7
capabilityScore Excellent = 9

{-
  A job's capability profile across all 7 combat roles.

  Using a record gives us:
  - Self-documenting field names (no positional mystery)
  - Compile-time exhaustiveness checking
  - Easy refactoring (add a new role? compiler finds all TODOs)
-}

public export
record JobProfile where
  constructor MkProfile
  physicalTank : Capability
  magicTank : Capability
  physicalDPS : Capability
  magicDPS : Capability
  support : Capability
  debuffer : Capability
  healer : Capability

{-
  Extract capability for a specific role from a profile.
-}

export
getCapability : JobProfile -> RoleDimension -> Capability
getCapability p PhysicalTank = p.physicalTank
getCapability p MagicTank = p.magicTank
getCapability p PhysicalDPS = p.physicalDPS
getCapability p MagicDPS = p.magicDPS
getCapability p Support = p.support
getCapability p Debuffer = p.debuffer
getCapability p Healer = p.healer

{-
  Job capability profiles defined as cohesive records.

  Each job's strengths/weaknesses are grouped together for easy comparison.
-}

-- KNIGHT: Heavy armor tank, decent physical damage
knightProfile : JobProfile
knightProfile = MkProfile
  { physicalTank = Excellent  -- Heavy armor + shields
  , magicTank = Limited       -- No magic defense
  , physicalDPS = Adequate    -- Greatswords are okay
  , magicDPS = None           -- No magic
  , support = Weak            -- Minimal buffs
  , debuffer = Weak           -- Limited breaks
  , healer = None             -- No healing
  }

-- UHLAN: Spear specialist with heavy armor
uhlanProfile : JobProfile
uhlanProfile = MkProfile
  { physicalTank = Strong     -- Heavy armor
  , magicTank = Limited       -- No magic defense
  , physicalDPS = Strong      -- Spears + combo
  , magicDPS = None           -- No magic
  , support = Limited         -- Some buffs
  , debuffer = Limited        -- Limited breaks
  , healer = None             -- No healing
  }

-- SHIKARI: Agile ninja with daggers/ninja swords
shikariProfile : JobProfile
shikariProfile = MkProfile
  { physicalTank = Strong     -- Evasion tank (shields)
  , magicTank = Limited       -- Light armor
  , physicalDPS = Excellent   -- Ninja swords + combo
  , magicDPS = Weak           -- Minimal magic
  , support = Limited         -- Some utility
  , debuffer = Adequate       -- Status effects
  , healer = Adequate         -- Items (Remedy Lore)
  }

-- BUSHI: Katana master with mystic armor
bushiProfile : JobProfile
bushiProfile = MkProfile
  { physicalTank = Adequate   -- Mystic armor (moderate)
  , magicTank = Strong        -- Mystic armor (magic resist)
  , physicalDPS = Strong      -- Katana (MAG scaling)
  , magicDPS = Adequate       -- Some magic access
  , support = Limited         -- Limited buffs
  , debuffer = Limited        -- Minimal debuffs
  , healer = Limited          -- Some white magic
  }

-- FOEBREAKER: Breaks enemy stats with axes/hammers
foebreakerProfile : JobProfile
foebreakerProfile = MkProfile
  { physicalTank = Strong     -- Heavy armor
  , magicTank = Limited       -- No magic defense
  , physicalDPS = Adequate    -- Axes/hammers
  , magicDPS = None           -- No magic
  , support = Limited         -- Minimal support
  , debuffer = Excellent      -- All breaks!
  , healer = None             -- No healing
  }

-- ARCHER: Ranged physical with bows
archerProfile : JobProfile
archerProfile = MkProfile
  { physicalTank = Weak       -- Light armor
  , magicTank = Weak          -- Light armor
  , physicalDPS = Strong      -- Bows (safe distance)
  , magicDPS = None           -- No magic
  , support = Adequate        -- Some buffs
  , debuffer = Limited        -- Status arrows
  , healer = Limited          -- Potions only
  }

-- WHITE MAGE: Primary healer and support
whiteMageProfile : JobProfile
whiteMageProfile = MkProfile
  { physicalTank = Weak       -- Robes only
  , magicTank = Adequate      -- Magic resist
  , physicalDPS = Weak        -- Weak weapons
  , magicDPS = Adequate       -- Holy magic
  , support = Excellent       -- All buffs/support
  , debuffer = Limited        -- Limited debuffs
  , healer = Excellent        -- All healing magic
  }

-- RED BATTLEMAGE: Hybrid magic/melee
redBattlemageProfile : JobProfile
redBattlemageProfile = MkProfile
  { physicalTank = Limited    -- Mystic armor
  , magicTank = Strong        -- Mystic armor + magic
  , physicalDPS = Adequate    -- Swords/maces
  , magicDPS = Strong         -- Black + white magic
  , support = Strong          -- Good buffs
  , debuffer = Adequate       -- Some debuffs
  , healer = Strong           -- White magic access
  }

-- BLACK MAGE: Pure offensive magic
blackMageProfile : JobProfile
blackMageProfile = MkProfile
  { physicalTank = Weak       -- Robes only
  , magicTank = Adequate      -- Magic resist
  , physicalDPS = Weak        -- Weak weapons
  , magicDPS = Excellent      -- All black magic!
  , support = Limited         -- Limited support
  , debuffer = Limited        -- Status spells
  , healer = None             -- No healing
  }

-- TIME BATTLEMAGE: Time/green magic specialist
timeBattlemageProfile : JobProfile
timeBattlemageProfile = MkProfile
  { physicalTank = Limited    -- Mystic armor
  , magicTank = Strong        -- Magic resist
  , physicalDPS = Limited     -- Crossbows/maces
  , magicDPS = Strong         -- Black magic access
  , support = Excellent       -- Haste, Slow, buffs
  , debuffer = Strong         -- Slow, Immobilize, etc.
  , healer = Adequate         -- Some healing
  }

-- MONK: Unarmed/pole fighter with high HP
monkProfile : JobProfile
monkProfile = MkProfile
  { physicalTank = Adequate   -- High HP, light armor
  , magicTank = Limited       -- Light armor
  , physicalDPS = Excellent   -- Poles + combo
  , magicDPS = None           -- No magic
  , support = Limited         -- Some utility
  , debuffer = Limited        -- Limited
  , healer = Adequate         -- White magic access
  }

-- MACHINIST: Gun/bomb user with tools
machinistProfile : JobProfile
machinistProfile = MkProfile
  { physicalTank = Limited    -- Light armor
  , magicTank = Limited       -- Light armor
  , physicalDPS = Strong      -- Guns (ignore defense)
  , magicDPS = Weak           -- Minimal magic
  , support = Adequate        -- Time magic access
  , debuffer = Adequate       -- Status bombs
  , healer = Limited          -- Items + some magic
  }

{-
  Map each job to its capability profile.

  12 lines instead of 84 lines of pattern matching!
-}

export
jobProfile : Job -> JobProfile
jobProfile Knight = knightProfile
jobProfile Uhlan = uhlanProfile
jobProfile Shikari = shikariProfile
jobProfile Bushi = bushiProfile
jobProfile Foebreaker = foebreakerProfile
jobProfile Archer = archerProfile
jobProfile WhiteMage = whiteMageProfile
jobProfile RedBattlemage = redBattlemageProfile
jobProfile BlackMage = blackMageProfile
jobProfile TimeBattlemage = timeBattlemageProfile
jobProfile Monk = monkProfile
jobProfile Machinist = machinistProfile

{-
  Get a job's capability for a specific role.

  This is the main API - returns semantic Capability, not raw numbers.
-}

export
jobCapability : Job -> RoleDimension -> Capability
jobCapability job role = getCapability (jobProfile job) role

{-
  Get numeric score (for calculations that need it).
-}

export
jobScore : Job -> RoleDimension -> Nat
jobScore job role = capabilityScore (jobCapability job role)

-- ============================================================================
-- JOB PAIRING EFFICIENCY
-- ============================================================================

{-
  License point efficiency when pairing two jobs.
  Jobs in the same category have more overlap (lower efficiency).

  Returns percentage (0-100) of non-overlapping licenses.
-}

export
jobPairEfficiency : Job -> Job -> Nat
jobPairEfficiency j1 j2 =
  let cat1 = jobCategory j1
      cat2 = jobCategory j2
  in case (cat1 == cat2) of
    -- Same category: high overlap (60-70% efficiency)
    True => 65
    -- Different categories: low overlap (85-95% efficiency)
    False => 90

{-
  TODO: This is a rough approximation. Real efficiency depends on specific
  license board layouts. We could:
  1. Hardcode actual values from game data
  2. Calculate from detailed license board representation
  3. Keep this approximation for MVP
-}
