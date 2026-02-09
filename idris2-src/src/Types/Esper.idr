{-
  Types/Esper.idr

  Models the 13 Espers in FFXII: The Zodiac Age.

  Key constraints:
  - Each Esper can only be assigned to ONE character (uniqueness)
  - Espers unlock different License Board nodes for different Jobs
  - An Esper might be valuable for one Job but useless for another

  For now, we model Espers as providing conditional score bonuses based on
  the (Esper, Job) pairing. This captures the strategic value without getting
  bogged down in exact License Board unlock mechanics.
-}

module Types.Esper

import Derive.Prelude
import Types.Goal
import Types.Job
import Types.Character

%language ElabReflection

-- ============================================================================
-- ESPER DATA TYPE
-- ============================================================================

{-
  The 13 Espers in FFXII, in order of acquisition (roughly):

  Belias, Mateus, Adrammelech, Zalera, Shemhazai, Hashmal, Exodus,
  Cuchulainn, Zeromus, Ultima, Zodiark, Chaos, Famfrit
-}

public export
data Esper
  = Belias
  | Mateus
  | Adrammelech
  | Zalera
  | Shemhazai
  | Hashmal
  | Exodus
  | Cuchulainn
  | Zeromus
  | Ultima
  | Zodiark
  | Chaos
  | Famfrit

%runElab derive "Esper" [Show, Eq, Ord]

-- ============================================================================
-- ESPER VALUE SYSTEM
-- ============================================================================

{-
  For a given (Esper, Job) pairing, how much does this Esper improve
  the character's capabilities in a specific role dimension?

  Returns a bonus score (0-3):
    0 = Useless (no relevant unlocks)
    1 = Minor help (small stat boost or niche unlock)
    2 = Good synergy (unlocks key abilities or equipment)
    3 = Critical (unlocks build-defining features)

  This is ADDITIVE to the base characterJobScore.
-}

export
esperJobBonus : Esper -> Job -> RoleDimension -> Nat

-- ============================================================================
-- BELIAS (First Esper, balanced starter bonuses)
-- ============================================================================

-- Belias + Knight = Potion Lore (minor support boost)
esperJobBonus Belias Knight Support = 1
esperJobBonus Belias Knight _ = 0

-- Belias + Monk = Monk unlocks (small DPS boost)
esperJobBonus Belias Monk PhysicalDPS = 1
esperJobBonus Belias Monk _ = 0

-- Belias + Uhlan = Uhlan synergy
esperJobBonus Belias Uhlan PhysicalDPS = 1
esperJobBonus Belias Uhlan _ = 0

-- Default: no bonus
esperJobBonus Belias _ _ = 0

-- ============================================================================
-- SHEMHAZAI (Heavy Armor unlocks for Archer, Channeling for Black Mage)
-- ============================================================================

-- Shemhazai + Archer = Heavy Armor unlocks (MAJOR tank boost)
esperJobBonus Shemhazai Archer PhysicalTank = 3
esperJobBonus Shemhazai Archer _ = 0

-- Shemhazai + Black Mage = Channeling 3 (infinite MP for magic DPS)
esperJobBonus Shemhazai BlackMage MagicDPS = 3
esperJobBonus Shemhazai BlackMage _ = 0

-- Default: no bonus
esperJobBonus Shemhazai _ _ = 0

-- ============================================================================
-- FAMFRIT (Hastega unlock for Machinist, Battle Lore for Time Battlemage)
-- ============================================================================

{-
  CRITICAL DOMAIN KNOWLEDGE:

  Famfrit unlocks Hastega for MACHINIST ONLY.
  Time Battlemage has NATURAL Hastega already.

  Assigning Famfrit to a Time Battlemage for "Hastega" is a common mistake.
  Famfrit gives Time Battlemage Battle Lore (physical attack boost), which
  is mediocre since TBM is primarily a magic/support job.
-}

-- Famfrit + Machinist = Hastega (critical support unlock)
esperJobBonus Famfrit Machinist Support = 3
esperJobBonus Famfrit Machinist _ = 0

-- Famfrit + Time Battlemage = Battle Lore (minor, TBM rarely attacks)
esperJobBonus Famfrit TimeBattlemage PhysicalDPS = 1
esperJobBonus Famfrit TimeBattlemage _ = 0

-- Default: no bonus
esperJobBonus Famfrit _ _ = 0

-- ============================================================================
-- ULTIMA (Swiftness 3 unlocks for multiple jobs - 70% double action chance)
-- ============================================================================

-- Ultima + Shikari = Swiftness 3 (massive DPS boost)
esperJobBonus Ultima Shikari PhysicalDPS = 3
esperJobBonus Ultima Shikari _ = 0

-- Ultima + Bushi = Swiftness 3 (katana DPS boost)
esperJobBonus Ultima Bushi PhysicalDPS = 3
esperJobBonus Ultima Bushi _ = 0

-- Default: no bonus
esperJobBonus Ultima _ _ = 0

-- ============================================================================
-- ZODIARK (Most powerful Esper, great stats + multiple unlocks)
-- ============================================================================

-- Zodiark + Knight = High HP, good for tanking
esperJobBonus Zodiark Knight PhysicalTank = 2
esperJobBonus Zodiark Knight MagicTank = 2
esperJobBonus Zodiark Knight _ = 0

-- Zodiark + Monk = Monk synergy
esperJobBonus Zodiark Monk PhysicalDPS = 2
esperJobBonus Zodiark Monk _ = 0

-- Default: no bonus
esperJobBonus Zodiark _ _ = 0

-- ============================================================================
-- PLACEHOLDER IMPLEMENTATIONS (to be filled as we validate builds)
-- ============================================================================

{-
  These are stubs. As we test against actual presets, we'll fill in the
  bonuses based on what expert builds reveal about Esper value.

  This is the GROUND TRUTH approach - we model what experts do, not
  what we think should work.
-}

esperJobBonus Mateus _ _ = 0
esperJobBonus Adrammelech _ _ = 0
esperJobBonus Zalera _ _ = 0
esperJobBonus Hashmal _ _ = 0
esperJobBonus Exodus _ _ = 0
esperJobBonus Cuchulainn _ _ = 0
esperJobBonus Zeromus _ _ = 0
esperJobBonus Chaos _ _ = 0

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

{-
  Total score for a character with a job and optional esper assignment.

  This replaces the simple characterJobScore from Types/Character.
-}

export
characterJobEsperScore : Character -> Job -> Maybe Esper -> RoleDimension -> Nat
characterJobEsperScore char job Nothing dim =
  characterJobScore char job dim  -- No esper = base score
characterJobEsperScore char job (Just esp) dim =
  let base = characterJobScore char job dim
      bonus = esperJobBonus esp job dim
  in base + bonus

{-
  For dual-job builds, we need to account for which esper is assigned
  and which job benefits from it. An esper can only help the job that
  has unlocks for it - it doesn't help both jobs equally.

  For now, we assume the esper is paired with the PRIMARY job.
-}

export
dualJobScore : Character -> Job -> Job -> Maybe Esper -> RoleDimension -> Nat
dualJobScore char primaryJob secondaryJob maybeEsper dim =
  let primaryNat = characterJobEsperScore char primaryJob maybeEsper dim
      secondaryNat = characterJobScore char secondaryJob dim
  in max primaryNat secondaryNat

