{-
  Types/Unlock.idr

  Models License Board unlocks - both natural (what jobs have by default)
  and esper-gated (what espers unlock for specific jobs).

  This lets us detect WASTED UNLOCKS: when an esper unlocks something
  that the secondary job already has naturally.

  Example:
    Archer + Knight with Shemhazai (unlocks Heavy Armor for Archer)
    → WASTED because Knight already has Heavy Armor naturally
-}

module Types.Unlock

import Derive.Prelude
import Types.Job
import Types.Esper

%language ElabReflection

-- ============================================================================
-- UNLOCK CATEGORIES
-- ============================================================================

{-
  Strategic categories of License Board unlocks.

  We group similar unlocks together (e.g., all Swiftness levels as one,
  all HP boosts as one) to focus on STRATEGIC impact, not exact numbers.
-}

public export
data UnlockCategory
  -- Armor & Equipment Access
  = HeavyArmor        -- Heavy helms/armor (critical for squishy jobs)
  | Shields           -- Shield access
  | SpecificWeapons   -- Specific weapon unlocks (swords, guns, etc.)

  -- White Magic
  | BasicHealing      -- Cure, Cura, Curaga
  | AdvancedHealing   -- Curaja, Arise, Esuna
  | WhiteMagic        -- Protect, Shell, Regen, Cleanse
  | HolySpell         -- Holy spell

  -- Time/Green Magic
  | Hastega           -- Party-wide Haste (CRITICAL)
  | TimeGreenMagic    -- Slow, Vanish, Reflect, etc.
  | StatusMagic       -- Confuse, Silence, Blind, etc.

  -- Black Magic
  | ElementalMagic    -- -ga tier elemental spells
  | DarkMagic         -- Bio, special dark spells

  -- Augments (stat/ability boosts)
  | BattleLore        -- Physical attack boost
  | MagickLore        -- Magical attack boost
  | Swiftness         -- Action speed boost (huge DPS multiplier)
  | Channeling        -- MP cost reduction (infinite MP at tier 3)
  | PotionLore        -- Item potency boost
  | PhoenixLore       -- Phoenix Down boost

  -- Technicks
  | StealPoach        -- Steal, Poach for loot
  | Expose            -- Break abilities (Expose, Wither, Shear, Addle)
  | Telekinesis       -- Telekinesis technick
  | Support           -- Libra, Traveler, etc.

  -- Stats
  | HPBoost           -- HP increase unlocks

  -- Special
  | Renew             -- Auto-regen (huge sustain)
  | OtherUnlock       -- Catch-all for misc unlocks

%runElab derive "UnlockCategory" [Show, Eq, Ord]

-- ============================================================================
-- JOB NATURAL UNLOCKS
-- ============================================================================

{-
  What does each job have naturally on their license board?

  Source: FFXII job boards + community knowledge
  Focus: Major strategic unlocks only (not every single license)
-}

export
jobNaturalUnlocks : Job -> List UnlockCategory
jobNaturalUnlocks Knight =
  [HeavyArmor, Shields, BasicHealing, WhiteMagic, BattleLore, PotionLore]

jobNaturalUnlocks Monk =
  [BasicHealing, WhiteMagic, BattleLore, HPBoost, Support]

jobNaturalUnlocks Uhlan =
  [HeavyArmor, Shields, BattleLore, HPBoost]

jobNaturalUnlocks Archer =
  [BasicHealing, WhiteMagic, Support, PotionLore]

jobNaturalUnlocks Foebreaker =
  [HeavyArmor, Shields, Expose, BattleLore]

jobNaturalUnlocks Bushi =
  [BattleLore, MagickLore]

jobNaturalUnlocks Shikari =
  [Shields, StealPoach, Support, PhoenixLore]

jobNaturalUnlocks WhiteMage =
  [BasicHealing, AdvancedHealing, WhiteMagic, HolySpell, MagickLore]

jobNaturalUnlocks BlackMage =
  [ElementalMagic, DarkMagic, MagickLore, Channeling]

jobNaturalUnlocks RedBattlemage =
  [BasicHealing, WhiteMagic, ElementalMagic, TimeGreenMagic, MagickLore]

jobNaturalUnlocks TimeBattlemage =
  [Hastega, TimeGreenMagic, StatusMagic, MagickLore, Channeling]

jobNaturalUnlocks Machinist =
  [TimeGreenMagic, StatusMagic, Support]

-- ============================================================================
-- ESPER UNLOCKS FOR JOBS
-- ============================================================================

{-
  What does each esper unlock for each job?

  Source: data/espers.js ESPER_UNLOCKS (canonical)

  We map the text descriptions to UnlockCategory values.
-}

export
esperUnlocksForJob : Esper -> Job -> List UnlockCategory

-- Belias
esperUnlocksForJob Belias Knight = [PotionLore]
esperUnlocksForJob Belias Foebreaker = [Support]  -- Horology
esperUnlocksForJob Belias Bushi = [Support]  -- Libra
esperUnlocksForJob Belias _ = []

-- Mateus
esperUnlocksForJob Mateus Knight = [BasicHealing, AdvancedHealing, WhiteMagic]  -- Curaga, Esuna, Cleanse, Regen
esperUnlocksForJob Mateus Uhlan = [MagickLore]
esperUnlocksForJob Mateus TimeBattlemage = [HPBoost]
esperUnlocksForJob Mateus BlackMage = [ElementalMagic]  -- Caldera, Volcano
esperUnlocksForJob Mateus Shikari = [Support]  -- Gil Toss
esperUnlocksForJob Mateus _ = []

-- Adrammelech
esperUnlocksForJob Adrammelech WhiteMage = [BattleLore]
esperUnlocksForJob Adrammelech Uhlan = [BattleLore]
esperUnlocksForJob Adrammelech TimeBattlemage = [BasicHealing, AdvancedHealing]  -- Cura, Raise
esperUnlocksForJob Adrammelech Foebreaker = [BattleLore]
esperUnlocksForJob Adrammelech BlackMage = [ElementalMagic]  -- Fumarole, Tumulus
esperUnlocksForJob Adrammelech Bushi = [OtherUnlock]  -- Souleater
esperUnlocksForJob Adrammelech Shikari = [DarkMagic]  -- Shades of Black
esperUnlocksForJob Adrammelech _ = []

-- Zalera
esperUnlocksForJob Zalera Monk = [Support]  -- Traveler
esperUnlocksForJob Zalera TimeBattlemage = [PotionLore]  -- Ether Lore 3
esperUnlocksForJob Zalera BlackMage = [StealPoach]
esperUnlocksForJob Zalera Bushi = [SpecificWeapons]  -- Blood Sword, Karkata
esperUnlocksForJob Zalera Shikari = [HPBoost]
esperUnlocksForJob Zalera _ = []

-- Cuchulainn
esperUnlocksForJob Cuchulainn WhiteMage = [Support]  -- Libra
esperUnlocksForJob Cuchulainn Uhlan = [Expose]  -- Wither
esperUnlocksForJob Cuchulainn RedBattlemage = [ElementalMagic, StatusMagic]  -- Firaga, Thundaga, Blizzaga, Sleepga
esperUnlocksForJob Cuchulainn Knight = [BattleLore]
esperUnlocksForJob Cuchulainn Foebreaker = [DarkMagic]  -- Shades of Black
esperUnlocksForJob Cuchulainn Bushi = [Support]  -- Stamp
esperUnlocksForJob Cuchulainn Shikari = [WhiteMagic]  -- Protectga, Shellga
esperUnlocksForJob Cuchulainn _ = []

-- Hashmal
esperUnlocksForJob Hashmal Knight = [AdvancedHealing, WhiteMagic, StatusMagic]  -- Curaja, Bravery, Faith, Confuse
esperUnlocksForJob Hashmal Uhlan = [Support]  -- Bonecrusher
esperUnlocksForJob Hashmal RedBattlemage = [StealPoach]
esperUnlocksForJob Hashmal Monk = [BasicHealing, AdvancedHealing]  -- Cura, Raise
esperUnlocksForJob Hashmal TimeBattlemage = [Channeling]
esperUnlocksForJob Hashmal Foebreaker = [Swiftness]
esperUnlocksForJob Hashmal BlackMage = [Support]  -- Makara
esperUnlocksForJob Hashmal Shikari = [Support]  -- Bonecrusher
esperUnlocksForJob Hashmal _ = []

-- Famfrit
esperUnlocksForJob Famfrit WhiteMage = [SpecificWeapons, Support]  -- Orichalcum Dirk, Platinum Dagger, Numerology
esperUnlocksForJob Famfrit Uhlan = [PotionLore]
esperUnlocksForJob Famfrit Machinist = [Hastega, TimeGreenMagic, StatusMagic]  -- Hastega, Slowga, Vanishga, Reflectga, Warp, Graviga
esperUnlocksForJob Famfrit RedBattlemage = [BattleLore]
esperUnlocksForJob Famfrit Monk = [AdvancedHealing, TimeGreenMagic]  -- Arise, Dispelga
esperUnlocksForJob Famfrit TimeBattlemage = [BattleLore]
esperUnlocksForJob Famfrit Foebreaker = [MagickLore]
esperUnlocksForJob Famfrit Archer = [HPBoost]
esperUnlocksForJob Famfrit BlackMage = [HPBoost]
esperUnlocksForJob Famfrit _ = []

-- Exodus
esperUnlocksForJob Exodus WhiteMage = [BattleLore]
esperUnlocksForJob Exodus Machinist = [StatusMagic]  -- Oil, Decoy
esperUnlocksForJob Exodus RedBattlemage = [HeavyArmor]
esperUnlocksForJob Exodus Knight = [HPBoost]
esperUnlocksForJob Exodus Monk = [OtherUnlock]  -- Souleater
esperUnlocksForJob Exodus TimeBattlemage = [BattleLore]
esperUnlocksForJob Exodus Foebreaker = [MagickLore]
esperUnlocksForJob Exodus BlackMage = [HeavyArmor]
esperUnlocksForJob Exodus Shikari = [Support]  -- Stamp
esperUnlocksForJob Exodus Bushi = [HPBoost]
esperUnlocksForJob Exodus _ = []

-- Zeromus
esperUnlocksForJob Zeromus WhiteMage = [HPBoost]
esperUnlocksForJob Zeromus Machinist = [Support]  -- Makara
esperUnlocksForJob Zeromus RedBattlemage = [Channeling]
esperUnlocksForJob Zeromus Monk = [Support]  -- Sight Unseeing
esperUnlocksForJob Zeromus TimeBattlemage = [Expose]  -- Addle, Shear
esperUnlocksForJob Zeromus Foebreaker = [MagickLore]
esperUnlocksForJob Zeromus BlackMage = [HeavyArmor]
esperUnlocksForJob Zeromus Bushi = [MagickLore]
esperUnlocksForJob Zeromus _ = []

-- Chaos
esperUnlocksForJob Chaos WhiteMage = [SpecificWeapons, HPBoost]  -- Defender, Save the Queen
esperUnlocksForJob Chaos Uhlan = [ElementalMagic, DarkMagic, StatusMagic]  -- Aeroga, Bio, Blindga, Silencega
esperUnlocksForJob Chaos Machinist = [HPBoost]
esperUnlocksForJob Chaos RedBattlemage = [SpecificWeapons]  -- Ultima Blade
esperUnlocksForJob Chaos Knight = [SpecificWeapons, AdvancedHealing, HPBoost]  -- Excalipur, Revive
esperUnlocksForJob Chaos Monk = [WhiteMagic, HolySpell]  -- Esunaga, Protectga, Shellga, Holy
esperUnlocksForJob Chaos TimeBattlemage = [HPBoost]
esperUnlocksForJob Chaos Archer = [MagickLore]
esperUnlocksForJob Chaos Bushi = [BattleLore]  -- Brawler
esperUnlocksForJob Chaos _ = []

-- Shemhazai
esperUnlocksForJob Shemhazai WhiteMage = [HPBoost]
esperUnlocksForJob Shemhazai Machinist = [ElementalMagic]  -- Caldera, Volcano
esperUnlocksForJob Shemhazai RedBattlemage = [WhiteMagic]  -- Cleanse, Esuna
esperUnlocksForJob Shemhazai Knight = [PotionLore]
esperUnlocksForJob Shemhazai Monk = [PotionLore]
esperUnlocksForJob Shemhazai Archer = [HeavyArmor]  -- CRITICAL: Heavy Armor for Archer
esperUnlocksForJob Shemhazai BlackMage = [HeavyArmor]  -- Steel Mask, Mirror Mail
esperUnlocksForJob Shemhazai Bushi = [Shields]  -- Shield Block
esperUnlocksForJob Shemhazai Shikari = [SpecificWeapons]  -- Guns
esperUnlocksForJob Shemhazai _ = []

-- Ultima
esperUnlocksForJob Ultima Uhlan = [Expose]
esperUnlocksForJob Ultima Machinist = [MagickLore]
esperUnlocksForJob Ultima RedBattlemage = [SpecificWeapons]  -- Claymore, Defender, Save the Queen
esperUnlocksForJob Ultima Knight = [Telekinesis, BattleLore]
esperUnlocksForJob Ultima Monk = [Swiftness]  -- Swiftness x2
esperUnlocksForJob Ultima TimeBattlemage = [SpecificWeapons]  -- Swords
esperUnlocksForJob Ultima Foebreaker = [Swiftness]
esperUnlocksForJob Ultima Archer = [Support]  -- Infuse, 1000 Needles
esperUnlocksForJob Ultima BlackMage = [Telekinesis]
esperUnlocksForJob Ultima Bushi = [Support]  -- Stamp
esperUnlocksForJob Ultima Shikari = [PhoenixLore]
esperUnlocksForJob Ultima _ = []

-- Zodiark
esperUnlocksForJob Zodiark WhiteMage = [SpecificWeapons]  -- Claymore
esperUnlocksForJob Zodiark Machinist = [HPBoost]
esperUnlocksForJob Zodiark RedBattlemage = [SpecificWeapons]  -- Ragnarok
esperUnlocksForJob Zodiark Knight = [SpecificWeapons, AdvancedHealing, HPBoost]  -- Excalipur, Revive
esperUnlocksForJob Zodiark Monk = [Renew]  -- CRITICAL: Auto-regen
esperUnlocksForJob Zodiark TimeBattlemage = [SpecificWeapons]  -- Swords
esperUnlocksForJob Zodiark Archer = [Support]  -- Infuse, 1000 Needles
esperUnlocksForJob Zodiark Bushi = [HeavyArmor]
esperUnlocksForJob Zodiark _ = []

-- ============================================================================
-- VALIDATION: WASTED UNLOCKS
-- ============================================================================

{-
  Detect when an esper unlocks something the secondary job already has.

  Returns list of wasted unlock categories.
-}

export
wastedUnlocks : Job -> Job -> Esper -> List UnlockCategory
wastedUnlocks primaryJob secondaryJob esper =
  let primaryUnlocks = esperUnlocksForJob esper primaryJob
      secondaryNatural = jobNaturalUnlocks secondaryJob
      -- What did esper give to primary that secondary already has?
      wasted = filter (\unlock => elem unlock secondaryNatural) primaryUnlocks
  in wasted

{-
  Check if ALL unlocks from an esper are wasted.

  Returns True if esper is completely useless for this job pairing.
-}

export
isCompletelyWasted : Job -> Job -> Esper -> Bool
isCompletelyWasted primaryJob secondaryJob esper =
  let primaryUnlocks = esperUnlocksForJob esper primaryJob
      wasted = wastedUnlocks primaryJob secondaryJob esper
  in (length primaryUnlocks > 0) && (length wasted == length primaryUnlocks)

{-
  Calculate efficiency: what percentage of unlocks are NOT wasted?

  Returns 100 if no unlocks, otherwise percentage of useful unlocks.
-}

export
esperEfficiency : Job -> Job -> Esper -> Nat
esperEfficiency primaryJob secondaryJob esper =
  let totalUnlocks = length (esperUnlocksForJob esper primaryJob)
      wastedCount = length (wastedUnlocks primaryJob secondaryJob esper)
  in if totalUnlocks == 0
     then 100  -- No unlocks = no waste
     else ((totalUnlocks `minus` wastedCount) * 100) `div` totalUnlocks
