module Tests.Properties

import Hedgehog

import Types.Job
import Types.Character
import Types.Goal

%default total

--------------------------------------------------------------------------------
-- Capability Properties
--------------------------------------------------------------------------------

||| Capability ordering is transitive
prop_capabilityTransitive : Property
prop_capabilityTransitive = property $ do
  -- If a < b and b < c, then a < c
  assert $ ((None < Weak) && (Weak < Limited)) `implies` (None < Limited)
  assert $ ((Limited < Adequate) && (Adequate < Strong)) `implies` (Limited < Strong)
  assert $ ((Adequate < Strong) && (Strong < Excellent)) `implies` (Adequate < Excellent)
  where
    implies : Bool -> Bool -> Bool
    implies False _ = True
    implies True b = b

||| Capability scores are monotonically increasing
prop_capabilityScoresMonotonic : Property
prop_capabilityScoresMonotonic = property $ do
  assert $ capabilityScore None < capabilityScore Weak
  assert $ capabilityScore Weak < capabilityScore Limited
  assert $ capabilityScore Limited < capabilityScore Adequate
  assert $ capabilityScore Adequate < capabilityScore Strong
  assert $ capabilityScore Strong < capabilityScore Excellent

||| Capability scores are within valid range [0, 10]
prop_capabilityScoresBounded : Property
prop_capabilityScoresBounded = property $ do
  assert $ capabilityScore None >= 0
  assert $ capabilityScore Excellent <= 10

--------------------------------------------------------------------------------
-- Job Profile Properties
--------------------------------------------------------------------------------

||| Every job has a capability for every role dimension
prop_jobsHaveAllCapabilities : Property
prop_jobsHaveAllCapabilities = property $ do
  let jobs = [Knight, Uhlan, Shikari, Bushi, Foebreaker, Archer,
              WhiteMage, RedBattlemage, BlackMage, TimeBattlemage,
              Monk, Machinist]
  let roles = [PhysicalTank, MagicTank, PhysicalDPS, MagicDPS,
               Support, Debuffer, Healer]

  -- For every job and role, we can get a capability
  for_ jobs $ \job =>
    for_ roles $ \role =>
      let _ = jobCapability job role
      in assert True

||| Specialist jobs excel (Excellent) at their specialty
prop_specialistsExcel : Property
prop_specialistsExcel = property $ do
  -- White Mage excels at healing and support
  assert $ jobCapability WhiteMage Healer == Excellent
  assert $ jobCapability WhiteMage Support == Excellent

  -- Black Mage excels at magic DPS
  assert $ jobCapability BlackMage MagicDPS == Excellent

  -- Foebreaker excels at debuffing
  assert $ jobCapability Foebreaker Debuffer == Excellent

  -- Shikari excels at physical DPS
  assert $ jobCapability Shikari PhysicalDPS == Excellent

||| Physical jobs have low magic capability
prop_physicalJobsLowMagic : Property
prop_physicalJobsLowMagic = property $ do
  let physicalJobs = [Knight, Uhlan, Foebreaker, Archer, Monk, Machinist]

  for_ physicalJobs $ \job => do
    let magicCap = jobCapability job MagicDPS
    -- Physical specialists should have Limited or worse magic
    assert $ magicCap <= Limited

||| Magic jobs have low physical tank capability
prop_magicJobsLowPhysTank : Property
prop_magicJobsLowPhysTank = property $ do
  let puremagicJobs = [WhiteMage, BlackMage]

  for_ puremagicJobs $ \job => do
    let tankCap = jobCapability job PhysicalTank
    -- Pure mages wear robes, can't tank physically
    assert $ tankCap <= Weak

--------------------------------------------------------------------------------
-- Character Affinity Properties
--------------------------------------------------------------------------------

||| Character affinities are bounded [0, 10]
prop_affinitiesBounded : Property
prop_affinitiesBounded = property $ do
  let characters = [Vaan, Penelo, Balthier, Fran, Basch, Ashe]
  let roles = [PhysicalTank, MagicTank, PhysicalDPS, MagicDPS,
               Support, Debuffer, Healer]

  for_ characters $ \char =>
    for_ roles $ \role => do
      let affinity = characterAffinity char role
      assert $ affinity >= 0 && affinity <= 10

||| Ashe has high magic affinity (she's the princess/mage archetype)
prop_asheHighMagic : Property
prop_asheHighMagic = property $ do
  let magicAffinity = characterAffinity Ashe MagicDPS
  assert $ magicAffinity >= 8

||| Basch has high physical tank affinity (he's the knight archetype)
prop_baschHighTank : Property
prop_baschHighTank = property $ do
  let tankAffinity = characterAffinity Basch PhysicalTank
  assert $ tankAffinity >= 8

--------------------------------------------------------------------------------
-- Combined Scoring Properties
--------------------------------------------------------------------------------

||| Character+Job score is a weighted average (30% char, 70% job)
||| So the result should be between min and max of the two components
prop_combinedScoreBounded : Property
prop_combinedScoreBounded = property $ do
  let char = Ashe
  let job = BlackMage
  let role = MagicDPS

  let charScore = characterAffinity char role
  let jobScore' = jobScore job role
  let combined = characterJobScore char job role

  let minScore = min charScore jobScore'
  let maxScore = max charScore jobScore'

  assert $ (combined >= minScore) && (combined <= maxScore)

||| Good character+job pairing scores higher than bad pairing
prop_goodPairingScoresHigher : Property
prop_goodPairingScoresHigher = property $ do
  -- Ashe (high magic) + BlackMage (Excellent magic) should score high
  let goodScore = characterJobScore Ashe BlackMage MagicDPS

  -- Ashe + Knight (Adequate phys, she has low phys affinity) should score lower
  let badScore = characterJobScore Ashe Knight PhysicalDPS

  assert $ goodScore > badScore

||| Job capability dominates (70% weight) over character affinity (30%)
prop_jobCapabilityDominates : Property
prop_jobCapabilityDominates = property $ do
  -- Even with worst character for magic (Basch? Vaan?), BlackMage still scores well
  let worstMagicChar = Basch  -- Assuming Basch has lowest magic affinity
  let score = characterJobScore worstMagicChar BlackMage MagicDPS

  -- Should still score >= 6 because BlackMage has Excellent (9) magic
  -- 70% of 9 = 6.3, even with 0 character affinity
  assert $ score >= 6

--------------------------------------------------------------------------------
-- Job Category Properties
--------------------------------------------------------------------------------

||| Same category jobs have lower pairing efficiency
prop_sameCategoryLowerEfficiency : Property
prop_sameCategoryLowerEfficiency = property $ do
  -- Knight + Uhlan (both HeavyPhysical)
  let sameCategory = jobPairEfficiency Knight Uhlan

  -- Knight + Shikari (different categories)
  let diffCategory = jobPairEfficiency Knight Shikari

  assert $ sameCategory < diffCategory

||| Job pairing efficiency is symmetric
prop_pairingEfficiencySymmetric : Property
prop_pairingEfficiencySymmetric = property $ do
  let eff1 = jobPairEfficiency Knight Shikari
  let eff2 = jobPairEfficiency Shikari Knight

  assert $ eff1 == eff2

--------------------------------------------------------------------------------
-- Test Groups
--------------------------------------------------------------------------------

export
capabilityProps : Group
capabilityProps = "Capability Properties" `MkGroup`
  [ ("transitive ordering", prop_capabilityTransitive)
  , ("monotonic scores", prop_capabilityScoresMonotonic)
  , ("bounded scores [0,10]", prop_capabilityScoresBounded)
  ]

export
jobProps : Group
jobProps = "Job Profile Properties" `MkGroup`
  [ ("all jobs have all capabilities", prop_jobsHaveAllCapabilities)
  , ("specialists excel at specialty", prop_specialistsExcel)
  , ("physical jobs have low magic", prop_physicalJobsLowMagic)
  , ("magic jobs are poor physical tanks", prop_magicJobsLowPhysTank)
  ]

export
characterProps : Group
characterProps = "Character Affinity Properties" `MkGroup`
  [ ("affinities bounded [0,10]", prop_affinitiesBounded)
  , ("Ashe has high magic affinity", prop_asheHighMagic)
  , ("Basch has high tank affinity", prop_baschHighTank)
  ]

export
scoringProps : Group
scoringProps = "Combined Scoring Properties" `MkGroup`
  [ ("combined score is bounded", prop_combinedScoreBounded)
  , ("good pairing scores higher", prop_goodPairingScoresHigher)
  , ("job capability dominates (70%)", prop_jobCapabilityDominates)
  ]

export
categoryProps : Group
categoryProps = "Job Category Properties" `MkGroup`
  [ ("same category = lower efficiency", prop_sameCategoryLowerEfficiency)
  , ("pairing efficiency is symmetric", prop_pairingEfficiencySymmetric)
  ]
