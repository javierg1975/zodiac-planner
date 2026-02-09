{-
  Types/EquipmentStrategy.idr

  Strategic capabilities represent HOW jobs perform roles through equipment synergies.

  PROBLEM: Job scores alone don't capture gear-dependent strategies:
  - Vaan's "Evasion Tank" shows PhysTank 4 (looks weak)
  - Penelo's "Attacker" shows DPS 2 (looks like healer)
  - Fran's pole combos invisible to raw scores

  SOLUTION: Model strategic capabilities separately from base job scores.

  These are SEMANTIC PATTERNS, not equipment stats:
  - EvasionTank: Job CAN use Main Gauche + Shield effectively
  - ComboOptimized: Job benefits from Genji Gloves weapon types
  - ElementalBoost: Job benefits from Black/White Robes damage amplification

  This preserves the "blind spot fixing" goal without full equipment modeling.
-}

module Types.Capability

import public Derive.Prelude
import public Types.Job

%language ElabReflection

-- ============================================================================
-- CAPABILITY DEFINITION
-- ============================================================================

{-
  Strategic capability: HOW you perform a role, not just IF you can.

  These represent equipment synergy patterns that jobs enable.

  Example: Shikari has EvasionTank capability because it can equip shields
  and benefits from Main Gauche (50% evasion dagger). The JOB enables the
  strategy, but GEAR provides the actual evasion.
-}

public export
data EquipmentStrategy
  = HPTank              -- Traditional tank: high HP, heavy armor, STR scaling
  | EvasionTank         -- Dodge tank: Main Gauche + shields (shields + daggers)
  | PhysicalDPS         -- Weapon-based physical damage (swords, katanas, etc.)
  | MagicDPS            -- Spell-based magic damage (Black Magic, Arcane)
  | ComboOptimized      -- Benefits from Genji Gloves (katana, pole, ninja sword)
  | ElementalBoost      -- Benefits from Black/White Robes (Holy/Dark damage)
  | RangedSafety        -- Bow/gun distance safety (backline positioning)
  | BreakSpecialist     -- Full Break suite (Expose, Shear, Wither, Addle)
  | MPRegeneration      -- Channeling 3 + Sage's Ring (infinite MP)
  | HealingAmplified    -- White Robes boost (healing power increase)
  | StatusImmunity      -- Ribbon dependency (status-heavy encounters)
  | BerserkViable       -- Can be permanently Berserked (auto-attack builds)

%runElab derive "EquipmentStrategy" [Show, Eq, Ord]

-- ============================================================================
-- JOB CAPABILITIES
-- ============================================================================

{-
  What strategic capabilities does each job enable?

  These are NOT job scores — they're YES/NO: "Can this job use this strategy?"

  Example:
  - Shikari enables EvasionTank (shields + Main Gauche)
  - Bushi enables ComboOptimized (katanas benefit from Genji Gloves)
  - Black Mage enables ElementalBoost (Black Robes amplify spell damage)
-}

export
jobCapabilities : Job -> List EquipmentStrategy
jobCapabilities Knight =
  [HPTank, PhysicalDPS, ElementalBoost, HealingAmplified, BerserkViable]
  -- Knight: Heavy armor + Excalibur (Holy boost from White Robes)
  -- Natural Haste (NOT Hastega), healing spells with espers

jobCapabilities Monk =
  [HPTank, PhysicalDPS, ComboOptimized, BerserkViable, MPRegeneration]
  -- Monk: Poles benefit from Genji Gloves (1.25x combo)
  -- High HP, STR scaling, Channeling unlocks

jobCapabilities Uhlan =
  [HPTank, PhysicalDPS, ElementalBoost, BerserkViable]
  -- Uhlan: Heavy armor + Holy Lance (Holy boost from White Robes)

jobCapabilities Archer =
  [RangedSafety, PhysicalDPS, BerserkViable]
  -- Archer: Bows for backline, requires Germinas Boots for damage

jobCapabilities Foebreaker =
  [HPTank, PhysicalDPS, BreakSpecialist, BerserkViable]
  -- Foebreaker: Full Break suite + axes/hammers

jobCapabilities Bushi =
  [HPTank, PhysicalDPS, ComboOptimized, BerserkViable, ElementalBoost]
  -- Bushi: Katanas benefit from Genji Gloves (1.8x combo)
  -- Katanas scale with MAG (synergy with Black Robes)

jobCapabilities Shikari =
  [EvasionTank, PhysicalDPS, ComboOptimized]
  -- Shikari: Main Gauche + shields (90%+ evasion)
  -- Ninja swords benefit from Genji Gloves (1.8x combo)

jobCapabilities WhiteMage =
  [HealingAmplified, MagicDPS, MPRegeneration, StatusImmunity]
  -- White Mage: White Robes boost healing
  -- Natural Haste (NOT Hastega)

jobCapabilities BlackMage =
  [MagicDPS, ElementalBoost, MPRegeneration]
  -- Black Mage: Black Robes boost elemental spell damage

jobCapabilities RedBattlemage =
  [PhysicalDPS, MagicDPS, ElementalBoost, HealingAmplified]
  -- Red Battlemage: Hybrid - Green Magic + swords + elemental magic

jobCapabilities TimeBattlemage =
  [MagicDPS, MPRegeneration, HealingAmplified]
  -- Time Battlemage: Natural Hastega (PARTY-WIDE)
  -- Swiftness unlocks, Channeling unlocks

jobCapabilities Machinist =
  [RangedSafety, PhysicalDPS, StatusImmunity]
  -- Machinist: Guns (ignore evasion, fixed damage)
  -- Measures, hand-bombs

-- ============================================================================
-- CAPABILITY SYNERGY
-- ============================================================================

{-
  Does a job pairing enhance or conflict with a capability?

  Example:
  - Shikari + White Mage: Both support EvasionTank (synergy)
  - Shikari + Knight: Conflict? Knight wants Heavy Armor, Shikari wants shields

  Returns:
  - Synergistic: Both jobs support the capability
  - Enabled: At least one job supports it
  - Conflicting: Jobs have incompatible equipment needs
-}

public export
data EquipmentStrategySynergy
  = Synergistic    -- Both jobs enhance this capability
  | Enabled        -- One job provides it
  | Conflicting    -- Jobs want incompatible gear

%runElab derive "EquipmentStrategySynergy" [Show, Eq]

export
capabilitySynergy : Job -> Job -> EquipmentStrategy -> EquipmentStrategySynergy
capabilitySynergy j1 j2 cap =
  let j1Has = elem cap (jobCapabilities j1)
      j2Has = elem cap (jobCapabilities j2)
  in case (j1Has, j2Has) of
       (True, True) => Synergistic
       (True, False) => Enabled
       (False, True) => Enabled
       (False, False) => case (cap, j1, j2) of
         -- Special case: Conflicts
         -- EvasionTank (shields) conflicts with Heavy jobs that want armor slots
         (EvasionTank, Knight, _) => Conflicting
         (EvasionTank, _, Knight) => Conflicting
         (EvasionTank, Uhlan, _) => Conflicting
         (EvasionTank, _, Uhlan) => Conflicting
         _ => Enabled  -- Default: no conflict

-- ============================================================================
-- CAPABILITY SCORING
-- ============================================================================

{-
  How strongly does a capability apply to a job pairing?

  Returns a score 0-10:
  - 0: Not applicable
  - 5: Enabled by one job
  - 8: Synergistic (both jobs support it)
  - 10: Perfect synergy (both jobs strongly support it)

  This complements the existing role scores (PhysicalTank, Support, etc.)
  by showing HOW the role is performed.
-}

export
capabilityScore : Job -> Job -> EquipmentStrategy -> Nat
capabilityScore j1 j2 cap =
  case capabilitySynergy j1 j2 cap of
    Synergistic => 8   -- Both jobs support it
    Enabled => 5       -- One job provides it
    Conflicting => 0   -- Incompatible

-- ============================================================================
-- EXAMPLES (for validation)
-- ============================================================================

namespace Examples

  -- Vaan (Red Battlemage + Shikari) - Trinity build
  export
  vaanTrinityCapabilities : List (EquipmentStrategy, Nat)
  vaanTrinityCapabilities =
    [ (EvasionTank, capabilityScore RedBattlemage Shikari EvasionTank)      -- 5 (Shikari enables)
    , (PhysicalDPS, capabilityScore RedBattlemage Shikari PhysicalDPS)      -- 8 (both support)
    , (MagicDPS, capabilityScore RedBattlemage Shikari MagicDPS)            -- 5 (RBM enables)
    , (ComboOptimized, capabilityScore RedBattlemage Shikari ComboOptimized) -- 5 (Shikari ninja swords)
    ]

  -- Penelo (White Mage + Shikari) - Endurance build
  export
  peneloEnduranceCapabilities : List (EquipmentStrategy, Nat)
  peneloEnduranceCapabilities =
    [ (EvasionTank, capabilityScore WhiteMage Shikari EvasionTank)          -- 5 (Shikari enables)
    , (ComboOptimized, capabilityScore WhiteMage Shikari ComboOptimized)    -- 5 (ninja sword DPS)
    , (HealingAmplified, capabilityScore WhiteMage Shikari HealingAmplified) -- 5 (WHM enables)
    ]

  -- Fran (Monk + Time Battlemage) - ALL builds
  export
  franCapabilities : List (EquipmentStrategy, Nat)
  franCapabilities =
    [ (ComboOptimized, capabilityScore Monk TimeBattlemage ComboOptimized)    -- 5 (Monk poles)
    , (PhysicalDPS, capabilityScore Monk TimeBattlemage PhysicalDPS)          -- 5 (Monk enables)
    , (MPRegeneration, capabilityScore Monk TimeBattlemage MPRegeneration)    -- 8 (both support)
    , (MagicDPS, capabilityScore Monk TimeBattlemage MagicDPS)                -- 5 (TBM enables)
    ]

-- ============================================================================
-- INTERPRETATION HELPERS
-- ============================================================================

{-
  Human-readable explanations of what a capability means for a build.
-}

export
capabilityExplanation : EquipmentStrategy -> String
capabilityExplanation HPTank =
  "Traditional tank: High HP, heavy armor, STR scaling. Absorbs damage through defense."

capabilityExplanation EvasionTank =
  "Dodge tank: Main Gauche (50% evasion) + Crystal Shield (40% evasion) = 90% total. Avoids damage through evasion."

capabilityExplanation PhysicalDPS =
  "Weapon-based physical damage. Scales with STR and weapon attack power."

capabilityExplanation MagicDPS =
  "Spell-based magic damage. Scales with MAG and spell power."

capabilityExplanation ComboOptimized =
  "Benefits from Genji Gloves combo boost: Katanas (1.8x), Poles (1.25x), Ninja Swords (1.8x). CRITICAL for DPS."

capabilityExplanation ElementalBoost =
  "Benefits from Black/White Robes elemental damage boost (50% increase). Black Robes boost Dark damage, White Robes boost Holy damage."

capabilityExplanation RangedSafety =
  "Bow/gun distance safety. Stays in backline, reduced aggro. Bows require Germinas Boots (+50 Speed) for damage."

capabilityExplanation BreakSpecialist =
  "Full Break suite: Expose (DEF -), Shear (STR -), Wither (MAG -), Addle (MAG Power -). Amplifies all party damage."

capabilityExplanation MPRegeneration =
  "Channeling 3 (10% chance 0 MP cost) + Sage's Ring = infinite MP for marathon fights."

capabilityExplanation HealingAmplified =
  "White Robes boost healing power. Critical for primary healers in long fights."

capabilityExplanation StatusImmunity =
  "Ribbon dependency. Essential for status-heavy encounters (Confuse, Berserk, Silence, etc.)."

capabilityExplanation BerserkViable =
  "Can be permanently Berserked (auto-attack only). Set-and-forget DPS. Requires strong weapon and Berserk Bracers."
