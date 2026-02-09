{-
  Types/Character.idr

  Defines the 6 playable characters and their base affinities for different
  combat roles. These affinities reflect innate stats (strength, magic, HP, etc.)
  that make some characters naturally better at certain jobs than others.
-}

module Types.Character

import Derive.Prelude
import Types.Goal  -- For RoleDimension
import Types.Job   -- For jobScore, jobCapability

%language ElabReflection

-- ============================================================================
-- CHARACTERS
-- ============================================================================

{-
  The 6 playable characters in FFXII.

  Each character has different base stats, making them more or less suited
  to different combat roles. While you CAN assign any job to any character,
  some pairings are more optimal than others.
-}

public export
data Character
  = Vaan       -- Balanced all-arounder, good at everything
  | Penelo     -- High magic, second-best mage
  | Balthier   -- High speed, physical specialist
  | Fran       -- High magic, frail (low vitality)
  | Basch      -- High HP/strength, natural tank
  | Ashe       -- Highest magic, best mage

%runElab derive "Character" [Show, Eq, Ord]

-- ============================================================================
-- CHARACTER AFFINITIES
-- ============================================================================

{-
  How naturally suited is this character to a specific combat role?

  These scores represent BASE STATS (before job assignment):
  - Strength, magic, vitality, HP, speed, etc.
  - Natural inclinations based on character archetype

  Scores (0-10):
  - 0-3: Poor natural fit (low base stats for this role)
  - 4-6: Average (balanced stats)
  - 7-8: Good fit (high base stats)
  - 9-10: Excellent fit (top-tier base stats)

  NOTE: Final effectiveness = character affinity + job capability.
  Ashe (magic 9) + Black Mage (magic 10) = excellent pairing.
  Vaan (magic 6) + Black Mage (magic 10) = good but not optimal.
-}

export
characterAffinity : Character -> RoleDimension -> Nat

-- VAAN: Balanced all-arounder (jac k-of-all-trades, master of none)
characterAffinity Vaan PhysicalTank = 6   -- Balanced HP/defense
characterAffinity Vaan MagicTank = 5      -- Balanced magic defense
characterAffinity Vaan PhysicalDPS = 7    -- Good strength/speed
characterAffinity Vaan MagicDPS = 6       -- Decent magic
characterAffinity Vaan Support = 6        -- Balanced
characterAffinity Vaan Debuffer = 6       -- Balanced
characterAffinity Vaan Healer = 6         -- Balanced
{-
  Vaan's strength: Versatility. He can do anything competently.
  Vaan's weakness: Never the BEST at any one thing.
-}

-- PENELO: High magic, second-best mage (slightly frail)
characterAffinity Penelo PhysicalTank = 4  -- Lower HP/defense
characterAffinity Penelo MagicTank = 7     -- Good magic defense
characterAffinity Penelo PhysicalDPS = 4   -- Low strength
characterAffinity Penelo MagicDPS = 9      -- Excellent magic power
characterAffinity Penelo Support = 9       -- Natural support role
characterAffinity Penelo Debuffer = 6      -- Decent
characterAffinity Penelo Healer = 9        -- Excellent healer stats
{-
  Penelo's strength: Second-best mage, excellent support/healing.
  Penelo's weakness: Low physical stats, somewhat frail.
-}

-- BALTHIER: High speed, physical specialist (leading man!)
characterAffinity Balthier PhysicalTank = 5   -- Moderate HP
characterAffinity Balthier MagicTank = 4      -- Low magic defense
characterAffinity Balthier PhysicalDPS = 9    -- Excellent speed/strength
characterAffinity Balthier MagicDPS = 4       -- Low magic
characterAffinity Balthier Support = 5        -- Average
characterAffinity Balthier Debuffer = 7       -- Good for status effects
characterAffinity Balthier Healer = 4         -- Low healing aptitude
{-
  Balthier's strength: Top-tier physical damage dealer (speed + strength).
  Balthier's weakness: Poor at magic, mediocre defense.
-}

-- FRAN: High magic, lowest vitality (glass cannon mage)
characterAffinity Fran PhysicalTank = 3       -- Lowest HP in game!
characterAffinity Fran MagicTank = 8          -- High magic defense
characterAffinity Fran PhysicalDPS = 5        -- Average strength
characterAffinity Fran MagicDPS = 8           -- High magic power
characterAffinity Fran Support = 8            -- Good support stats
characterAffinity Fran Debuffer = 7           -- Good for debuffs
characterAffinity Fran Healer = 7             -- Good healing stats
{-
  Fran's strength: Strong mage, especially for time/debuff magic.
  Fran's weakness: VERY low HP - keep her in back row!
-}

-- BASCH: High HP/strength, natural tank
characterAffinity Basch PhysicalTank = 9      -- Highest HP/defense
characterAffinity Basch MagicTank = 5         -- Average magic defense
characterAffinity Basch PhysicalDPS = 8       -- High strength
characterAffinity Basch MagicDPS = 4          -- Low magic
characterAffinity Basch Support = 5           -- Average
characterAffinity Basch Debuffer = 7          -- Good for breaks
characterAffinity Basch Healer = 4            -- Low healing aptitude
{-
  Basch's strength: Best tank in the game (HP + defense).
  Basch's weakness: Poor at magic, better in frontline roles.
-}

-- ASHE: Highest magic, best mage (princess of magic!)
characterAffinity Ashe PhysicalTank = 5       -- Moderate HP
characterAffinity Ashe MagicTank = 8          -- High magic defense
characterAffinity Ashe PhysicalDPS = 5        -- Average strength
characterAffinity Ashe MagicDPS = 10          -- BEST magic in game!
characterAffinity Ashe Support = 8            -- Great support
characterAffinity Ashe Debuffer = 7           -- Good debuffs
characterAffinity Ashe Healer = 8             -- Great healing stats
{-
  Ashe's strength: Absolute best mage. Give her Black Mage or Red Battlemage.
  Ashe's weakness: Wasted on pure physical jobs.
-}

-- ============================================================================
-- CHARACTER + JOB SYNERGY
-- ============================================================================

{-
  Combined score for a character + job pairing in a specific role.

  Formula: Weighted average favoring job capability (jobs define the build).
  - Character affinity: 30% weight (base stats matter, but not everything)
  - Job capability: 70% weight (job determines available tools)

  Example:
  - Ashe (magic affinity 10) + Black Mage (magic capability 10) = 10.0
  - Vaan (magic affinity 6) + Black Mage (magic capability 10) = 8.8
    Still good, but noticeably worse than Ashe.
-}

export
characterJobScore : Character -> Job -> RoleDimension -> Nat
characterJobScore char job dim =
  let charAff = characterAffinity char dim
      jobCap = jobScore job dim  -- Now returns Nat (converted from Capability)
      -- Weighted average: 30% character, 70% job
      weighted = (charAff * 3 + jobCap * 7)
      -- Divide by 10 to normalize (may lose precision with integer division)
  in weighted `div` 10

{-
  NOTE: Using integer division here loses some precision.
  For MVP, this is acceptable. Later we could:
  1. Use Double for more precision
  2. Use a Rational type
  3. Keep scores at 10x scale (0-100 instead of 0-10)
-}

-- ============================================================================
-- CHARACTER PORTRAITS (URLs)
-- ============================================================================

{-
  Character portrait URLs from Final Fantasy Wiki.
  Using Avatar images (more reliable than full renders).

  Format: https://static.wikia.nocookie.net/finalfantasy/images/[hash]/FFXII_[Name]_Avatar.png
-}

export
characterPortrait : Character -> String
characterPortrait Vaan =
  "https://static.wikia.nocookie.net/finalfantasy/images/8/8e/FFXII_Vaan_Avatar.png"
characterPortrait Penelo =
  "https://static.wikia.nocookie.net/finalfantasy/images/7/79/FFXII_Penelo_Avatar.png"
characterPortrait Balthier =
  "https://static.wikia.nocookie.net/finalfantasy/images/2/29/FFXII_Balthier_Avatar.png"
characterPortrait Fran =
  "https://static.wikia.nocookie.net/finalfantasy/images/4/41/FFXII_Fran_Avatar.png"
characterPortrait Basch =
  "https://static.wikia.nocookie.net/finalfantasy/images/f/f2/FFXII_Basch_Avatar.png"
characterPortrait Ashe =
  "https://static.wikia.nocookie.net/finalfantasy/images/a/ab/FFXII_Ashe_Avatar.png"

-- ============================================================================
-- OPTIMAL JOB RECOMMENDATIONS
-- ============================================================================

{-
  What job makes best use of this character's natural strengths?

  This is a heuristic based on affinity scores. Not necessarily the ONLY
  good choice, but a strong default recommendation.
-}

export
optimalJobForCharacter : Character -> Job
optimalJobForCharacter Vaan = Shikari        -- Good all-around, high DPS
optimalJobForCharacter Penelo = WhiteMage    -- Leverage high magic for healing
optimalJobForCharacter Balthier = Machinist  -- High speed for guns
optimalJobForCharacter Fran = TimeBattlemage -- Magic + utility, stay safe
optimalJobForCharacter Basch = Knight        -- Tank with high HP
optimalJobForCharacter Ashe = BlackMage      -- Best magic in game

{-
  NOTE: These are safe defaults for beginners. Advanced players might
  choose different pairings based on party composition needs.
-}
