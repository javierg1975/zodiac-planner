{-
  Types/Equipment.idr

  Equipment access constraints encoded as indexed types.

  PATTERN: Indexed types + Dec predicates (the "Vect pattern")
  - Indexed types make invalid states unrepresentable (compile-time)
  - Dec predicates enable runtime checking with proofs
  - Counter-proofs explain WHY constraints are violated (better error messages)

  This bridges compile-time type safety with runtime user queries.
-}

module Types.Equipment

import Types.Job
import Decidable.Equality

-- ============================================================================
-- INDEXED TYPES: Equipment Access
-- ============================================================================

||| Indexed type: only inhabited for jobs that can equip shields
||| Used for evasion tank builds (Main Gauche + Crystal Shield)
public export
data CanEquipShields : Job -> Type where
  KnightShields : CanEquipShields Knight
  WhiteMageShields : CanEquipShields WhiteMage
  RedBattlemageShields : CanEquipShields RedBattlemage
  UhlanShields : CanEquipShields Uhlan
  FoebreakerShields : CanEquipShields Foebreaker
  -- Note: Monk, Shikari, Black Mage, Time Battlemage have NO constructor
  -- CanEquipShields Monk is UNINHABITABLE - type system knows it's impossible!

||| Indexed type: only inhabited for jobs that can equip mystic armor
||| Used for Black Robes (MAG boost, Dark damage boost)
public export
data CanEquipMysticArmor : Job -> Type where
  BlackMageMystic : CanEquipMysticArmor BlackMage
  WhiteMageMystic : CanEquipMysticArmor WhiteMage
  RedBattlemageMystic : CanEquipMysticArmor RedBattlemage
  TimeBattlemageMystic : CanEquipMysticArmor TimeBattlemage
  -- Note: Knight, Monk, Uhlan, Foebreaker have NO constructor

||| Indexed type: only inhabited for jobs that can equip heavy armor
||| Used for HP tank builds (Grand Armor, high DEF)
public export
data CanEquipHeavyArmor : Job -> Type where
  KnightHeavy : CanEquipHeavyArmor Knight
  MonkHeavy : CanEquipHeavyArmor Monk
  UhlanHeavy : CanEquipHeavyArmor Uhlan
  FoebreakerHeavy : CanEquipHeavyArmor Foebreaker
  BushiHeavy : CanEquipHeavyArmor Bushi
  -- Note: Mages cannot equip heavy armor

-- ============================================================================
-- DEC PREDICATES: Runtime Checking with Proofs
-- ============================================================================

||| Decidable: can this job equip shields?
||| Returns Yes proof OR No counter-proof
export
canEquipShields : (j : Job) -> Dec (CanEquipShields j)
canEquipShields Knight = Yes KnightShields
canEquipShields WhiteMage = Yes WhiteMageShields
canEquipShields RedBattlemage = Yes RedBattlemageShields
canEquipShields Uhlan = Yes UhlanShields
canEquipShields Foebreaker = Yes FoebreakerShields
canEquipShields Monk = No (\case _ impossible)
canEquipShields Shikari = No (\case _ impossible)
canEquipShields BlackMage = No (\case _ impossible)
canEquipShields TimeBattlemage = No (\case _ impossible)
canEquipShields Bushi = No (\case _ impossible)
canEquipShields Archer = No (\case _ impossible)
canEquipShields Machinist = No (\case _ impossible)

||| Decidable: can this job equip mystic armor?
export
canEquipMysticArmor : (j : Job) -> Dec (CanEquipMysticArmor j)
canEquipMysticArmor BlackMage = Yes BlackMageMystic
canEquipMysticArmor WhiteMage = Yes WhiteMageMystic
canEquipMysticArmor RedBattlemage = Yes RedBattlemageMystic
canEquipMysticArmor TimeBattlemage = Yes TimeBattlemageMystic
canEquipMysticArmor Knight = No (\case _ impossible)
canEquipMysticArmor Monk = No (\case _ impossible)
canEquipMysticArmor Uhlan = No (\case _ impossible)
canEquipMysticArmor Foebreaker = No (\case _ impossible)
canEquipMysticArmor Bushi = No (\case _ impossible)
canEquipMysticArmor Shikari = No (\case _ impossible)
canEquipMysticArmor Archer = No (\case _ impossible)
canEquipMysticArmor Machinist = No (\case _ impossible)

||| Decidable: can this job equip heavy armor?
export
canEquipHeavyArmor : (j : Job) -> Dec (CanEquipHeavyArmor j)
canEquipHeavyArmor Knight = Yes KnightHeavy
canEquipHeavyArmor Monk = Yes MonkHeavy
canEquipHeavyArmor Uhlan = Yes UhlanHeavy
canEquipHeavyArmor Foebreaker = Yes FoebreakerHeavy
canEquipHeavyArmor Bushi = Yes BushiHeavy
canEquipHeavyArmor WhiteMage = No (\case _ impossible)
canEquipHeavyArmor BlackMage = No (\case _ impossible)
canEquipHeavyArmor RedBattlemage = No (\case _ impossible)
canEquipHeavyArmor TimeBattlemage = No (\case _ impossible)
canEquipHeavyArmor Shikari = No (\case _ impossible)
canEquipHeavyArmor Archer = No (\case _ impossible)
canEquipHeavyArmor Machinist = No (\case _ impossible)

-- ============================================================================
-- PAIRING CONSTRAINTS: At Least One Job Must Have Capability
-- ============================================================================

||| Pairing constraint: at least one job can equip shields
||| Used for evasion tank strategies
public export
data PairingHasShields : Job -> Job -> Type where
  PrimaryShields : CanEquipShields j1 -> PairingHasShields j1 j2
  SecondaryShields : CanEquipShields j2 -> PairingHasShields j1 j2
  BothShields : CanEquipShields j1 -> CanEquipShields j2 -> PairingHasShields j1 j2

||| Pairing constraint: at least one job can equip mystic armor
||| Used for Black Robes strategies (Dark DPS, mage tank)
public export
data PairingHasMysticArmor : Job -> Job -> Type where
  PrimaryMystic : CanEquipMysticArmor j1 -> PairingHasMysticArmor j1 j2
  SecondaryMystic : CanEquipMysticArmor j2 -> PairingHasMysticArmor j1 j2
  BothMystic : CanEquipMysticArmor j1 -> CanEquipMysticArmor j2 -> PairingHasMysticArmor j1 j2

||| Pairing constraint: at least one job can equip heavy armor
||| Used for HP tank strategies
public export
data PairingHasHeavyArmor : Job -> Job -> Type where
  PrimaryHeavy : CanEquipHeavyArmor j1 -> PairingHasHeavyArmor j1 j2
  SecondaryHeavy : CanEquipHeavyArmor j2 -> PairingHasHeavyArmor j1 j2
  BothHeavy : CanEquipHeavyArmor j1 -> CanEquipHeavyArmor j2 -> PairingHasHeavyArmor j1 j2

-- ============================================================================
-- DEC PREDICATES: Pairing-Level Runtime Checking
-- ============================================================================

||| Decidable: does this pairing have shield access?
export
pairingHasShields : (j1 : Job) -> (j2 : Job) -> Dec (PairingHasShields j1 j2)
pairingHasShields j1 j2 = case (canEquipShields j1, canEquipShields j2) of
  (Yes prf1, Yes prf2) => Yes (BothShields prf1 prf2)
  (Yes prf1, No _) => Yes (PrimaryShields prf1)
  (No _, Yes prf2) => Yes (SecondaryShields prf2)
  (No contra1, No contra2) => No (\case
    PrimaryShields prf => contra1 prf
    SecondaryShields prf => contra2 prf
    BothShields prf1 _ => contra1 prf1)

||| Decidable: does this pairing have mystic armor access?
export
pairingHasMysticArmor : (j1 : Job) -> (j2 : Job) -> Dec (PairingHasMysticArmor j1 j2)
pairingHasMysticArmor j1 j2 = case (canEquipMysticArmor j1, canEquipMysticArmor j2) of
  (Yes prf1, Yes prf2) => Yes (BothMystic prf1 prf2)
  (Yes prf1, No _) => Yes (PrimaryMystic prf1)
  (No _, Yes prf2) => Yes (SecondaryMystic prf2)
  (No contra1, No contra2) => No (\case
    PrimaryMystic prf => contra1 prf
    SecondaryMystic prf => contra2 prf
    BothMystic prf1 _ => contra1 prf1)

||| Decidable: does this pairing have heavy armor access?
export
pairingHasHeavyArmor : (j1 : Job) -> (j2 : Job) -> Dec (PairingHasHeavyArmor j1 j2)
pairingHasHeavyArmor j1 j2 = case (canEquipHeavyArmor j1, canEquipHeavyArmor j2) of
  (Yes prf1, Yes prf2) => Yes (BothHeavy prf1 prf2)
  (Yes prf1, No _) => Yes (PrimaryHeavy prf1)
  (No _, Yes prf2) => Yes (SecondaryHeavy prf2)
  (No contra1, No contra2) => No (\case
    PrimaryHeavy prf => contra1 prf
    SecondaryHeavy prf => contra2 prf
    BothHeavy prf1 _ => contra1 prf1)

-- ============================================================================
-- STRATEGY REQUIREMENTS: What equipment does each strategy need?
-- ============================================================================

||| Strategy requirement: maps equipment strategies to required equipment
public export
data StrategyRequirement : Type where
  RequiresShields : StrategyRequirement       -- Evasion tank
  RequiresMysticArmor : StrategyRequirement   -- Black Robes for Dark DPS
  RequiresHeavyArmor : StrategyRequirement    -- HP tank
  NoRequirement : StrategyRequirement         -- Flexible strategies

||| Helper: list jobs that satisfy a requirement (for error messages)
export
jobsWithShields : List Job
jobsWithShields = [Knight, WhiteMage, RedBattlemage, Uhlan, Foebreaker]

export
jobsWithMysticArmor : List Job
jobsWithMysticArmor = [BlackMage, WhiteMage, RedBattlemage, TimeBattlemage]

export
jobsWithHeavyArmor : List Job
jobsWithHeavyArmor = [Knight, Monk, Uhlan, Foebreaker, Bushi]

-- ============================================================================
-- ERROR MESSAGES: Explain constraint violations using counter-proofs
-- ============================================================================

||| Explain why a pairing cannot equip shields
export
explainNoShields : (j1 : Job) -> (j2 : Job) -> String
explainNoShields j1 j2 =
  "❌ Constraint violation: Evasion tank requires shield access\n" ++
  "   " ++ show j1 ++ " cannot equip shields\n" ++
  "   " ++ show j2 ++ " cannot equip shields\n" ++
  "\n💡 Jobs with shield access: Knight, White Mage, Red Battlemage, Uhlan, Foebreaker"

||| Explain why a pairing cannot equip mystic armor
export
explainNoMysticArmor : (j1 : Job) -> (j2 : Job) -> String
explainNoMysticArmor j1 j2 =
  "❌ Constraint violation: Black Robes require mystic armor access\n" ++
  "   " ++ show j1 ++ " cannot equip mystic armor\n" ++
  "   " ++ show j2 ++ " cannot equip mystic armor\n" ++
  "\n💡 Jobs with mystic armor: Black Mage, White Mage, Red Battlemage, Time Battlemage"

||| Explain why a pairing cannot equip heavy armor
export
explainNoHeavyArmor : (j1 : Job) -> (j2 : Job) -> String
explainNoHeavyArmor j1 j2 =
  "❌ Constraint violation: HP tank requires heavy armor access\n" ++
  "   " ++ show j1 ++ " cannot equip heavy armor\n" ++
  "   " ++ show j2 ++ " cannot equip heavy armor\n" ++
  "\n💡 Jobs with heavy armor: Knight, Monk, Uhlan, Foebreaker, Bushi"
