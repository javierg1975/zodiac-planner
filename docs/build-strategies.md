# Character Build Strategies

A comprehensive guide to building effective characters in Final Fantasy XII: The Zodiac Age.

## Table of Contents

- [Core Principles](#core-principles)
- [Specialization over Generalization](#specialization-over-generalization)
- [Physical DPS Building](#physical-dps-building)
- [Spellcaster Building](#spellcaster-building)
- [Gambit Recommendations](#gambit-recommendations)
- [MP Management](#mp-management)
- [Elemental Boosting](#elemental-boosting)

## Core Principles

### Specialization over Generalization

In Final Fantasy XII, you generally want to focus your characters as either **Physical DPSs** or **Spellcasters**.

This is down to three key reasons:

#### 1. Armor Types Matter

There are 3 armor types in the game:

| **Light Armor** | **Heavy Armor** | **Mystic Armor** |
|-----------------|-----------------|------------------|
| Increases HP | Increases STR | Increases MAG and MP |
| Balanced DEF and MDEF | Higher DEF than MDEF | Higher MDEF than DEF |

**Heavy Armor and Mystic Armor are critically important** because they increase your character's damage (and healing) stats by a significant amount throughout the entire game.

- **Until your stats are maxed, level-appropriate gear adds on average 25% *each* to a character's effectiveness in either physical damage or magical damage/healing.**
- **Combined, the difference between wearing stat-appropriate gear is about 50%!**

For STR weapons with a secondary SPD/MAG/VIT component, the bonus drops to 15% on average per piece for Physical DPS, which while not as huge, is still a large contributor towards DPS.

#### 2. Berserk Status

**Berserk** is a status effect that:
- Multiplies physical attack damage by **1.5x**
- Multiplies character speed by **2x**
- Prevents character control (they auto-attack random enemies)
- Cannot use magic while active

**In practice, this means a Berserked character's Physical DPS will be multiplied by approximately 2x, but they cannot use any magic at all.**

(Although Berserk halves the Charge Time, it does not affect the Animation Time of attacking, so it ends up being around 2x instead of the theoretical 3x.)

**Berserked Physical DPSs will generally do more damage than Magical DPSs against single targets, so it's worth having at least 1 in your party.**

#### 3. Dumb Healing Gambits

This is a specific issue when running multiple healers, especially 3 of them.

- When **1 character** is damaged, the gambit system is smart and uses the appropriate amount of healing to fully heal them.
- When **multiple characters** are damaged, the gambit system becomes dumb and tries to individually heal every character, forgetting that the most useful healing spells are AOE.

**It's for this reason that I dislike running 3 healers. If the 3rd character isn't healing, there's no opportunity cost for that 3rd character to be permanently berserked as a Physical DPS.**

When running 2 healers, put them at different thresholds so if multiple characters are slightly damaged, only 1 of them will try to heal.

### Recommended Team Composition

A well-balanced team consists of:
- **2 Spellcasters** (at least 1 capable of healing, 1 capable of damage spells)
- **1 Berserked Physical DPS**

Of course, for specific scenarios, you might run:
- 3 Spellcasters for magic-heavy content
- 1 Spellcaster (healer) + 2 Berserked Physical DPSs for pure damage

---

## Physical DPS Building

**Physical DPSs hit things. Since the most important aspect of a physical DPS is whether or not you have their weapon, it's more important that you have a good weapon for them to use, and less important overall on how you build them.**

Nevertheless, here are key optimizations:

### Pairing Fast Classes with Slow Classes

**If you pair from opposite columns in this table, you'll almost always make a good Physical DPS, no matter what stage of the game you are in** (as long as you get their weapons).

| **"Slow" Classes** | **"Fast" Classes** |
|--------------------|-------------------|
| Uhlan | Archer |
| Knight | Shikari |
| Monk | Bushi |
| Foebreaker* | Machinist |
|  | Time Battlemage |

**Note on Foebreaker:** If you care about endgame viability (and won't respec), because Foebreaker's endgame weapon falls off, the only "Fast" class that should pair with them is Bushi, since Bushi is the only one in the "Fast" category with good endgame weapons.

#### Why This Works: Swiftness

In Final Fantasy XII, there are passives that increase your character's Speed, called **Swiftness**. Each one increases your speed by roughly 10%.

There are a maximum of 3 levels of Swiftness. Classes divide as follows:

| **Swiftness 1 or 2** | **Swiftness 3** |
|---------------------|-----------------|
| Uhlan | Archer |
| Knight | Shikari |
| Foebreaker* | Bushi |
| Monk* | Time Battlemage |
|  | Machinist |

*Foebreaker and Monk can both get Swiftness 3, but very late in the game, so they're considered Swiftness 1-2 for pairing purposes.

#### Why This Works: Strength

In Final Fantasy XII, almost all physical weapons primarily use the **Strength** stat to compute damage. Classes divide based on their natural Strength:

| **High Strength** | **Low Strength** |
|------------------|------------------|
| Knight | Archer |
| Uhlan | Shikari |
| Foebreaker | Bushi |
| Monk | Time Battlemage* |
|  | Machinist** |

- **High Strength** classes typically wear Heavy Armor, which directly increases the Strength stat. Monk is the exception, with 16 Battle Lores (most of any class, +1 STR each).
- **Low Strength** classes typically do **not** have Heavy Armor.

*Time Battlemage wears Heavy Armor but their weapon is so weak they want a better weapon from the stronger classes.

**Machinist does not use the Strength stat for damage, but still benefits from being paired with a high Strength class.

#### Why This Works: Weapon Progression

The "Fast" and "Slow" classifications also align with weapon availability:

| **Early to Mid Game** | **Mid to Late Game** |
|----------------------|---------------------|
| Foebreaker | Uhlan |
| Archer | Bushi |
| Shikari | Monk |
| Machinist | Knight |

This means "Fast" classes reach their maximum power quickly, while "Slow" classes take longer but are powerful in the endgame.

### Pairing Knight, Shikari, and Machinist with Mystic Armor

- **Knight** has *Excalibur*, which deals **Holy damage**
- **Shikari** has *Yagyu Darkblade*, which deals **Dark damage**
- **Machinist** has *Dark Ammo*, which makes guns deal **Dark damage**

**White Robes** and **Black Robes** boost Holy and Dark damage by **50%** respectively.

Since these are Mystic Armor, pairing Knight, Shikari, or Machinist with a Mystic Armor class (White Mage, Black Mage, Red Battlemage, Bushi) gives a massive damage boost to these elemental weapons.

**Note:** In the endgame, elemental damage is often resisted (especially Dark), so this isn't always applicable. But for specific fights, this can be very powerful.

(Uhlan also has a Holy weapon, *Holy Lance*, but it isn't as powerful as the others, so it's not as important.)

---

## Spellcaster Building

**In general, most Spellcasters (especially Black Mage and White Mage) are very strong, so pairing them with any class will more or less result in a good combination.** (Time Battlemage is not very strong and requires special consideration.)

**Almost any combination of classes, even two Magic classes, will have plenty of HP, so it's not a big deal to specifically optimize for "bulk."** (The only exception is White Mage/Time Battlemage, which is why that combination is not recommended.)

Because magic damage and healing are governed by the same stat (MAG), **it's very good to have your Spellcasters capable of both magic damage and healing**. With ultimate weapons, magic damage will outdamage physical weapons with a high enough stat differential (because you're wearing Mystic Armor).

### Black Mage

**What they have:** Complete as a magical DPS. Primary magical DPS in the game. Excellent at inflicting status effects.

**What they're missing:** Healing and buffs.

**Best pairings:**

| **Early and Mid Game** | **Endgame** |
|----------------------|------------|
| White Mage | White Mage |
| Red Battlemage | Knight* |
| Time Battlemage* | Monk* |

*These require Espers to some degree.

White Mage and Knight have the added benefit of **Faith**, causing Black Mage's spells to hit harder.

### White Mage

**What they have:** Complete as a healer. Primary healer in the game. Excellent support and buffs.

**What they're missing:** Damage.

**Best pairings:**
- **Any physical DPS class** (with Shikari being a standout option)
- **Black Mage** if you want magical DPS instead

**Critical insight:** Dealing damage as White Mage makes White Mage **better at healing**, because **dealing damage restores MP**. White Mage will have much more MP to work with if they also deal damage when not healing.

When filling time as a healer, Black Mage will do more damage than any physical DPS class and regenerate MP better when wearing Mystic Armor with boosted elemental spells, even compared with ultimate weapons (until you're able to have both 99 STR and 99 MAG).

### Red Battlemage

**Strengths:**
- As a healer in early/mid game, they do everything White Mage can do, but better (access to damage spells)
- In late game, White Mage is better (better healing spells and buffs)

**Weaknesses:**
- As magical DPS, Black Mage is better throughout the entire game (non-elemental spells + easier elemental boosting access)
- Awkward to pair (complete in early/mid game, but no class solves their endgame issues)

**Good pairings:**

1. **Shikari** (most common)
   - Doubles down on Red Battlemage's early/mid game effectiveness with more survivability
   - In endgame, Shikari takes over as Physical DPS with boosted Yagyu Darkblade or Heavy Armor (via Red Battlemage esper)

2. **Archer**
   - Gives Red Battlemage access to boosted Fira/Firaga/Ardor, putting them on par with Black Mage
   - Archer will outdamage Red Battlemage by itself as a Berserked Physical DPS
   - Generally better off picking Black Mage/White Mage instead, but valid for 12-job runs

3. **Uhlan**
   - Since Uhlan is basically complete as Physical DPS (only missing Swiftness 3), you can make Red Battlemage into Physical DPS in endgame
   - One of the only combinations where you'll see boosted Holy Lance if not respecing

4. **Knight/Monk**
   - In early/mid game, neither contributes much to Red Battlemage
   - In endgame, these fix White Magic issues, but Red Battlemage only contributes Mystic Armor
   - Both classes would prefer another pairing in endgame

**Alternative:** Just respec Red Battlemage away in the endgame instead of trying to make them work.

### Time Battlemage

**Strengths:**
- Incredible support unit

**Weaknesses:**
- Lack of damage
- Lack of endgame healing
- Overall incredibly awkward

**Best pairings:**

1. **Monk** (preferred)
   - Fixes both damage and endgame healing
   - Monk wants Mystic Armor for boosting Excalibur and healing
   - Monk has much more White Magic than Knight

2. **Knight**
   - Fixes both damage and endgame healing
   - Knight wants Mystic Armor (for boosted Excalibur and healing)
   - Lacks Renew (MAG-ignoring healing spell)

3. **Black Mage**
   - Fixes damage but not endgame healing issues

### Monk

**Strengths:**
- Endgame healing and physical DPS

**Weaknesses:**
- No early game healing
- Weapon type is very STR reliant but they don't have Heavy Armor

**Best pairing: Time Battlemage**
- Provides early game healing
- Provides Time Battlemage's excellent buffs
- Provides Heavy Armor

**Special note:** This is one of the few armor class specialization exceptions. Monk/Time Battlemage likes to heal but doesn't have Mystic Armor. They will heal for less compared to Mystic Armor healers, which can be troublesome if they're your only healer. However, Monk eventually gets **Renew**, a MAG-ignoring healing spell, so it's not a big deal.

### Knight

**Strengths:**
- Endgame healing and physical DPS

**Weaknesses:**
- No early game healing
- Unlike Monk, Knight wants Mystic Armor (boosted Excalibur is good in endgame)
- Lacks Renew (MAG-ignoring healing spell)

**This makes Knight much trickier to build for comprehensive power.**

**Best pairings (all Mystic Armor classes):**

1. **Red Battlemage**
   - Very comprehensively powerful throughout the game
   - Strong healing, buffs, and physical DPS
   - **Downside:** Only has Swiftness 1. Each rank of Swiftness is worth 10% Physical DPS when non-berserked and 5% when berserked. This is gross because they're reliant on Physical DPS in endgame.
   - **Solution:** Respec Red Battlemage away in endgame

2. **Black Mage**
   - Similar to Red Battlemage/Knight but trades early game healing for better magical damage throughout the entire game
   - Provides incredibly strong magical DPS option when using Mystic Armor and Shields (when wearing all Mystic Armor, magic outdamages even endgame weapons if stat difference is at least 24)
   - Has Swiftness 2 (not as gross as Red Battlemage/Knight since not reliant on Physical DPS in endgame while non-berserked)

3. **Bushi**
   - Trade all Black Magic for Swiftness 3 in endgame
   - Significantly less powerful as non-berserked DPS (missing Black Magic entire game)
   - Main advantage: When Berserked, 5% more DPS
   - Not worth it if you only run 1 Knight (due to 12 jobs), but worth running if you run 2 Knights

---

## Gambit Recommendations

### Physical DPS Gambits

Physical DPS gambits are simple:

1. **Self: *Berserk* or *Bacchus's Wine***
2. **Party Leader's Target: Attack**
3. **Lowest HP Enemy: Attack**

They may not even use gambits if wearing **Berserker Bracers**, an accessory that causes the character to always be berserked.

### Spellcaster Gambits

Spellcasters will not have everything in this list. This is a general template to be taken from:

1. **Ally: HP < X%: Strongest Healing Spell**
2. **Ally: Any: Esuna**
3. **Ally: Any: Raise/Arise**
4. **DPS: Appropriate damage buffs** (*Bravery, Faith, Berserk, Haste/ga*, etc)
5. **Ally: Any: Defensive buffs** (*Protect/ga, Shell/ga*)
6. **Any Enemy: HP = 100%: Steal**
7. **Spells that Exploit enemy weaknesses** (optional, boosted spells often one-shot anyway)
8. **Attack or Strongest Magic Spell**
9. **Self: Quality of Life buffs** (*Libra*, *Float*)
10. **Any Ally: Cura** (to top off any party member that took damage after a fight)

### Main Healer vs Secondary Healer

If you have multiple Spellcasters capable of healing in your party, decide which should be the main healer and which should be the secondary healer.

**Recommended thresholds:**
- **Main healer:** Heal at **70%** HP
- **Secondary healer:** Heal at **40%** HP

**For maximizing DPS:** The Spellcaster that's better at dealing damage should be your **secondary healer**.

**For maximizing MP efficiency:** The Spellcaster that's better at dealing damage should be your **main healer** (since dealing damage restores MP).

---

## MP Management

### The Basics

MP is not a huge issue in this game, but running out of MP can be annoying.

**Charge** is an ability you get very early on that has a chance to restore MP, but if you fail, you lose all of your MP. The chance of success increases the less MP you have.

In practice, this means **Charge** allows you to have a minimum of 10% to 20% MP at all times, but having to use Charge constantly can be annoying, as when the gambit AI uses it, they won't move, falling behind the party.

### Damage = MP Regeneration

Somewhat weirdly, because there are passives that give you MP when you damage enemies and kill enemies:

- **Red Battlemage** and especially **Black Mage** will often *gain* more MP than they use casting damage spells once you get into the mid game.
- This makes them incredibly self-sustainable, so they don't need to use Charge very often.

### White Mage MP Issues

As White Mage does not really deal damage by default, **it's fairly common for them to have MP issues**.

Since damage gives MP, **it's incredibly common to add damage to White Mage, solving both their damage and MP issues.**

### Black Magic vs Physical DPS for MP

**Black Magic generally gives better MP regeneration than Physical DPS** throughout the game, mostly because MP regeneration is based on the threshold of damage you've reached per hit, rather than your overall DPS.

(See [Final Fantasy Wiki: Augments](https://finalfantasy.fandom.com/wiki/Augment_(Final_Fantasy_XII)) for the MP regeneration values based on damage.)

---

## Elemental Boosting

In Final Fantasy XII, there is **elemental boosting equipment**. When you equip them and deal damage with the specified element, you will deal **50% more damage, even if the enemy isn't weak to them!**

### Elemental Boosting Equipment Progression

| **Time** | **Class** | **Equipment** | **Element** | **Where** |
|----------|-----------|---------------|-------------|-----------|
| *The Leviathan* (~15%) | Black Mage | Cherry Staff | Wind | Shop |
| After *The Leviathan* (~15%) | Archer | Burning Bow | Fire | Hunt |
| *Jahara* (~35%) | Black Mage | Flame Staff | Fire | Shop |
| Eruyt Village (~40%) | Black Mage | Storm Staff | Lightning | Shop |
| Mt Bur-Omisace (~45%) | Black Mage | Glacial Staff | Ice | Shop |
| After *Raithwall* (~35%, but hard) | White Mage, Black Mage, Red Battlemage, Bushi | Black Robes | Dark | *Necrohol of Nabudis* (Treasure) |
| *Pharos* (~90%) | White Mage, Black Mage, Red Battlemage, Bushi | White Robes | Holy | *Pharos* (Treasure) |

### Why Black Mage Dominates

As you might notice, **Black Mage has access to almost all of these**, which is why they deal so much magic damage throughout the game.

In comparison, **Red Battlemage's general lack of access to them** is why they do less magic damage throughout the game.

### Endgame Considerations

In the endgame, elemental damage is often resisted (and Dark is especially resisted), so this isn't always applicable. Still, for specific fights, elemental boosting can be very powerful.

---

## Summary

**Key Takeaways:**

1. **Specialize** your characters as either Physical DPS or Spellcasters - don't try to make do-everything characters
2. **Physical DPS:** Pair "Fast" classes with "Slow" classes for optimal weapon progression and stat synergy
3. **Spellcasters:** Ensure they can both deal damage and heal when possible (damage restores MP!)
4. **Armor matters:** Wear Heavy Armor for Physical DPS, Mystic Armor for Spellcasters
5. **Berserk is powerful:** At least 1 Berserked Physical DPS is highly recommended
6. **Team composition:** 2 Spellcasters + 1 Berserked Physical DPS is a solid foundation
7. **Elemental boosting:** Black Mage dominates due to access to elemental boosting equipment throughout the game
8. **MP management:** Damage dealers regenerate MP naturally, while pure healers struggle

Use these principles to create powerful, specialized characters that excel in their roles!
