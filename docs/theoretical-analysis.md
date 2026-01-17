# FFXII: The Zodiac Age - Theoretical Analysis

This document contains the theoretical and mathematical analysis behind job optimization in Final Fantasy XII: The Zodiac Age. It covers DPS calculations, damage formulas, armor mechanics, weapon comparisons, and the mathematical reasoning that supports optimal party builds.

**Note**: Final Fantasy XII does not need optimization to beat the game. This information is for those interested in understanding the underlying mechanics and what is actually *the best* from a mathematical perspective.

---

# Table of Contents

1. [General Methodology](#general-methodology)
2. [Armor Bonuses](#armor-bonuses)
3. [Physical DPS Analysis](#physical-dps-analysis)
4. [Genji Gloves Prioritization](#genji-gloves-prioritization)
5. [Magic + Techniques Analysis](#magic--techniques-analysis)
6. [4x Speed](#4x-speed)

---

# General Methodology

Numbers were plugged into the following spreadsheets:

- [Early + Mid Game Physical DPS](https://docs.google.com/spreadsheets/d/1kj3yYLykQ8GLCeGlhLT7FN3rX_Vjjd9ImsYf1CVvVjA/edit?usp=sharing)
- [Endgame Physical DPS](https://docs.google.com/spreadsheets/d/1fPwCt1msDP1h8TKXPz1ywheAiExHs6A1dmPrIqd1J-U/edit?usp=sharing)
- [Magic + Techniques DPS](https://docs.google.com/spreadsheets/d/1n5Q9K7nynNe9G7Lp2tuegf7YQLdqVQH7G6mc8nV5pmM/edit?usp=sharing)

**Note**: One of the bugs fixed in this spreadsheet was computing the action time for combo weapons. The previous version had counted the first hit twice in terms of time.

For the Magic + Techniques spreadsheet, animation times were recorded by capturing footage to determine their actual animation times. The formulas were then adjusted to calculate their DPS. You can view the fairly raw footage [here](https://youtu.be/43VEsODv44Q). This was done on a PS4 Pro at 30 FPS.

---

# Armor Bonuses

## The Damage Formula

First, let's examine the general damage and healing formula:

```
DMG = (ATK * rand(1, 1.25) - DEF) * (1 + MAIN * (LVL + SUB) / CONST)
```

### Formula Components

| **Term** | **Description** |
|----------|----------------|
| *ATK* | The strength of the weapon or spell. |
| *DEF* | The defense of the enemy. |
| *rand(1, 1.25)* | A random number in the range of (1, 1.125). |
| *MAIN* | The main stat of the weapon or spell. For most weapons, this is STR. For magic, this is MAG. |
| *LVL* | The level of your character. |
| *SUB* | The secondary stat of the weapon or spell. For most weapons, this is also STR. Some weapons instead use MAG, VIT, or SPD. For magic, this is also MAG. |
| *CONST* | A constant to normalize the damage. For STR and MAG weapons and all magic, this is 256. For SPD weapons, this is 218. For VIT weapons, this is 128 (with random range (0, 1) instead). |

If we examine this damage formula, notice that there are two parts being multiplied together:
1. **Contextual parts**: Based on the weapon and enemy (ATK, DEF)
2. **Character part**: Based on stats (MAIN, LVL, SUB)

For any particular weapon and enemy combination, we can view differences in strength by looking only at the character stat part.

Different characters have somewhat different base stats even between males and females, but it's not super significant. The real stat differential occurs when you factor in armor.

## Raw Stat Methodology

- **Base stats** were computed by taking the average of every character's STR and MAG.
- **Stat per Piece** was obtained by looking at appropriate equipment for a character's level. From level 1 to 40, this is just store-bought equipment.
- **Lores** (Battle Lores and Magic Lores) add +1 to either STR or MAG. For simplicity, this was taken to be 10, which is about the average for a class that uses that stat. At Level 1 and Level 20, it's unlikely that you actually have all of them (they cost LP), so their amount was reduced.

## Normalized Stat Coefficients

With the stats at each level, we can compute their stat coefficient (the part of the damage formula based upon their stats) in the general case where the main stat and the sub stat are the same and the constant is 256.

Then, we can normalize each coefficient by dividing each by the amount in the "0 Armor Pieces" column for their row.

| **Level** | **0 Armor Pieces** | **1 Armor Piece** | **2 Armor Pieces** |
|-----------|-------------------|-------------------|-------------------|
| 1         | 1.00              | 1.19              | 1.40              |
| 20        | 1.00              | 1.21              | 1.45              |
| 40        | 1.00              | 1.24              | 1.51              |
| 60        | 1.00              | 1.30              | 1.64              |
| 80        | 1.00              | 1.25              | 1.53              |
| 99        | 1.00              | 1.22              | 1.32              |

**Key Insight**: Armor increases a character's effectiveness *greatly* throughout the entire game, with it only topping off at level 99, when characters reach the stat cap of 99.

## Normalized Speed Formula Coefficients

| **Level** | **SPD** | **0 Armor Pieces** | **1 Armor Piece** | **2 Armor Pieces** |
|-----------|---------|-------------------|-------------------|-------------------|
| 1         | 24      | 1.00              | 1.10              | 1.20              |
| 20        | 26      | 1.00              | 1.12              | 1.25              |
| 40        | 29      | 1.00              | 1.15              | 1.29              |
| 60        | 31      | 1.00              | 1.19              | 1.37              |
| 80        | 34      | 1.00              | 1.16              | 1.32              |
| 99        | 36      | 1.00              | 1.14              | 1.20              |

This is the same analysis but for Speed. The difference isn't as big, but it's still fairly significant. This table is basically identical for weapons that use both STR and another stat, like MAG for Katanas or VIT for Axes/Hammers.

---

# Physical DPS Analysis

## Buff/Item DPS Increases

| **Buff/Item** | **Value** | **Condition/Notes** |
|---------------|-----------|-------------------|
| Adrenaline | 2.0x | <25% HP |
| 5% HP Combo Rate | ~1.5x | ~5% HP |
| Berserk | ~2.0x | Uncontrollable |
| Heavy Armor | ~1.5x | Pure STR weapon and <99 STR |
| Germinas Boots | ~1.5x | SPD weapon |
| Bravery | 1.3x | |
| Cameo Belt | 1.25-1.40x | Enemy Evasion |
| Genji Gloves | 1.25x on Kanya/Katanas | 1.05-1.10x Otherwise |
| Haste | 1.1x (With Berserk) | 1.2x without Berserk |
| Swiftness | 1.05x per rank (With Berserk) | 1.1x per rank without Berserk |

## Physical Weapon Analysis

### Early Level 30 Setups (Pre-Phon Coast)

**Assumptions:**
- **Heavy Armor Setups:**
  - 63 Strength (39 from Vaan, 14 from equipment, 10 from Battle Lores)
  - 49 Magic (37 from Vaan, 12 from Magic Lores)
  - 43 Vitality (35 from Vaan, 8 from equipment)
  - 32 Speed (32 from Vaan, 4 from equipment)
- **Light Armor/Mystic Armor Setups:**
  - 46 Strength (36 from Ashe, 10 from Battle Lores)
  - 71 Magic (40 from Ashe, 14 from equipment, 12 from Magic Lores, 5 from Opal Ring)
  - 33 Vitality (33 from Ashe)
  - 26 Speed (26 from Ashe)
- Berserk, Haste, Focus (No Bravery), 3 Swiftness
- No Genji Gloves or Germinas Boots
- 25 DEF

| **Weapon** | **Heavy Armor** | **Light/Mystic Armor** | **Relative Percent** |
|------------|----------------|------------------------|---------------------|
| Machinist (Stone Shot) | **6408** | 6317 | 140.31% |
| Foebreaker | **3553** | 2339 | 100.00% |
| Knight (Karkata) | **2846** | 1803 | 80.10% |
| Archer (Burning Bow) | **2407** | 1651 | 67.75% |
| Shikari (Kagenui) | **2397** | 1650 | 67.46% |

### Late Level 30 Setups (Lhusu Mines Part 2)

**Assumptions:**
- Same stats as above
- Berserk, Bravery, Haste, Focus
- Lhusu Mines Weapons, Dhanusha, Germinas Boots (+20 VIT, +50 SPD), Hermes Sandals (+5 STR)

| **Weapon** | **Heavy Armor** | **Light/Mystic Armor** | **Relative Percent** |
|------------|----------------|------------------------|---------------------|
| Machinist (Stone Shot) | **8212** | **8212** | 122.28% |
| Archer (Dhanusha) | **6716** | 4745 | 100.00% |
| Shikari (Orochi) | **6434** | 4544 | 95.80% |
| Monk (Whale Whisker) | **5822** | 3333 | 86.69% |
| Bushi (Masamune) | **5475** | 4483 | 81.52% |
| Foebreaker | **5003** | 3040 | 74.49% |
| Red Battlemage | 2903 | **4959** | 73.84% |
| Archer (Burning Bow) | **4912** | 3471 | 73.14% |
| Shikari (Kagenui) | **4848** | 3425 | 72.19% |
| Uhlan (Dragon Whisker) | **4818** | 2760 | 71.74% |
| Knight (Karkata) | **4096** | 2345 | 60.99% |

**Key Observation**: Without Heavy Armor, Archer, Shikari, and Bushi all deal similar damage (generally within ~10%) with Uhlan and Red Battlemage. Monk looks more behind than the others, but they would have +6 Strength from Battle Lores, moving them closer to 4000 damage without Heavy Armor (about ~20% from best).

### Level 60 Setups (Early Endgame)

**Stat Assumptions:**
- 90 STR/MAG: 56 (Vaan's STR at Level 60) + 24 (Heavy Armor) + 10 (Battle Lores from Knight)
- 53 VIT comes from Ashe + Grand Helm
- Optimal animations (even if the stats wouldn't match, notably on Bushi)
- Uhlan has 13 Battle Lores, so they get +3 Strength
- Monk has 16 Battle Lores, but Fran has better animations with Poles than Vaan with 4 less Strength, so they get +2 Strength
- Red Battlemage gets +2 MAG
- -12 STR on elemental weapons because they wear elemental boosting Mystic Robes instead
- Bushi was calculated with 82 STR and 90 MAG (roughly corresponds to using Magepower Shishak and Lordly Robes on Vaan)
- Focus/Bravery/Haste/Focus are all assumed to be on
- 3 Swiftness
- 35 DEF

| **Class** | **Genji Gloves DPS** | **Stat Accessory DPS** | **Relative Percent** |
|-----------|---------------------|----------------------|---------------------|
| Seitengrat | 18573 | **30253** | 223.78% |
| Great Trango | **19407** | 17226 | 143.55% |
| Wyrmhero Blade | **16324** | 14541 | 120.75% |
| Shikari (Darkblade) | 8275 | **13705** | 101.38% |
| Monk (Kanya) | **13519** | 11996 | 100.00% |
| Uhlan (Zodiac Spear) | 12890 | **13376** | 98.94% |
| Knight (Excalibur) | 13159 | **13198** | 97.63% |
| **Machinist (Dark Shot)** | **12861** | **12861** | **95.13%** |
| Knight (Tournesol) | **12648** | 12337 | 93.56% |
| Bushi (Kumbha) | **12561** | 10979 | 92.91% |
| Shikari (Mesa) | 6882 | **11322** | 83.75% |
| Bushi (Masamune) | **11186** | 9912 | 82.74% |
| Monk (Whale Whisker) | **10657** | 10152 | 78.83% |
| Shikari (Mina) | 6434 | **10591** | 78.34% |
| Archer (Dhanusha) | 6051 | **10048** | 74.33% |
| Shikari (Orochi) | 5847 | **9622** | 71.17% |
| Uhlan (Holy Spear) | 8373 | **8770** | 64.87% |
| Uhlan (Dragon Whisker) | 8548 | **8552** | 63.26% |
| Foebreaker | **8544** | 7583 | 63.20% |
| Machinist (Stone Shot) | 8331 | **8331** | 61.62% |
| Red Battlemage | 7945 | **8125** | 60.10% |
| Archer (Burning Bow) | 4423 | **7348** | 54.35% |
| Time Battlemage | 6367 | **6933** | 51.28% |

**Key Insights:**
- Machinist + Dark Robes + Dark Shot + Focus is pretty much on par with the best weapon setups
- Elemental boosted setups are on par with non-elemental setups due to lower ATK and decreased STR (less significant at level 99)
- Although Monk is the highest regular weapon, this assumes +12 STR Heavy Armor (Genji only gives +9) and Swiftness 3. On Monk/Bushi setups, their damage goes down
- Bushi would realistically lose ~5-10% due to worse animations or lower MAG
- The difference in performance between endgame Physical DPS classes is still mostly less than 10%

### Level 99 Setups

**Assumptions:**
- Level 99, 99 Strength, 99 Magic, 3 Swiftness
- 67 Vitality (Basch is best at Hammers, Mirage Vest and Grand Helm each give +10)
- 35 Speed if weapon doesn't use Speed
- 40 Speed if weapon uses Speed (Maximillian gives +9 STR/+6 SPD)
- Berserk, Haste, Bravery, either Focus or Adrenaline
- "Optimal Setup" (see next section)
- 35 Defense

## Optimal Setups

This is used to calculate all future DPS comparisons. (For min-maxing the DPS number. Cameo Belt is better when the enemy has evasion.)

| **Class** | **Best Character(s)** | **Equipment** | **Notes** |
|-----------|---------------------|---------------|-----------|
| Time Battlemage | Vaan/Fran/Basch/Ashe | | Balthier and Penelo have slow animations |
| Red Battlemage | Vaan | Genji Gloves** | |
| Machinist | Vaan/Fran/Basch/Ashe | Dark Shot + Dark Robes* | Balthier and Penelo have slow animations |
| Archer | Vaan/Basch | Germinas Boots | Fran and Balthier have slow animations |
| Foebreaker | Basch/Ashe | Genji Gloves | Everyone else is at least 10% worse |
| Uhlan | Basch | White Robes*, Genji Gloves** | Vaan/Balthier/Ashe all have basically equal DPS (<5%) |
| Monk | Fran | Genji Gloves | Basch comes in a close second (<5%) |
| Bushi | Basch | Genji Gloves | Balthier and Vaan come in a close second (<5%) |
| Knight | Vaan/Basch | White Robes*, Genji Gloves | Balthier comes in a very close second (<5%) |
| Shikari | Balthier | Dark Robes*, Germinas Boots | Basch/Penelo |

\*Elemental boosted setups will be considered separately from non-elemental setups.

\*\*I put Genji Gloves on Red Battlemage and Uhlan for damage comparison purposes, but practically speaking the classes that you would add for Genji Gloves (Bushi/Knight/Foebreaker) benefit more from Genji Gloves in the first place.

Seitengrat, Wyrmhero Blade, and Great Trango are all included more as reference than an actual comparison.

### Cameo Belt, 100% HP, 35 DEF

| **Class** | **DPS** | **Relative Percent** |
|-----------|---------|---------------------|
| Seitengrat | 30611 | 181.40% |
| Wyrmhero Blade | 23815 | 141.13% |
| Great Trango | 22834 | 135.31% |
| Knight (Excalibur) | 21615 | 128.09% |
| Uhlan (Zodiac Spear) | 16875 | 100.00% |
| Knight (Tournesol) | 16355 | 96.92% |
| Bushi | 15868 | 94.03% |
| Shikari (Darkblade) | 15709 | 93.09% |
| Monk | 15386 | 91.18% |
| Uhlan (Holy Spear) | 13597 | 80.57% |
| Machinist (Dark Shot) | 12861 | 76.21% |
| Foebreaker | 11562 | 68.52% |
| Shikari (Mesa) | 11322 | 67.09% |
| Shikari (Mina) | 10587 | 62.74% |
| Red Battlemage | 10419 | 61.74% |
| Archer | 10012 | 59.33% |
| Time Battlemage | 9190 | 54.46% |
| Machinist (Stone Shot) | 8331 | 49.37% |

**Why Cameo Belt?** More endgame enemies and bosses have some sort of evasion than those that do not.

#### Endgame Bosses/Enemies With vs Without Evasion

**With Evasion:**
- Trial Mode Stage 100 (30-40 Evasion)
- Lv. 99 Red Chocobos (~40 Evasion)
- Abysteels (30-40 Evasion)
- Omega Mark XII
- Zodiark (<50% HP)
- Gilgamesh/Enkidu
- 3/4 of Shadow Seer's summons
- Zeromus
- Final boss (in the later phases)

**Without Evasion:**
- Hell Wyrm
- Yiazmat
- Ultima
- Behemoth King

This is what I would consider closer to "regular" or "normal" play, as most of the time, you don't bother with stat reducing techniques, your HP is above 25%, and more notable bosses and enemies have evasion than those that do not.

This table is also relevant when you don't want to wear a damage accessory on your damage dealer, like Bubble Belt or status effect immunity accessories.

When the enemy has the most common type of evasion (25%), it's about the same if you use Cameo Belt or Genji Gloves.

**Note**: When an enemy evades an Attack, you do not go into the "bounce" animation, so animation time remains unchanged. Trial Mode Stage 100 can do this though, and it's very annoying.

For Germinas Boots users, it's generally worth taking the 25% damage loss, as Germinas Boots adds somewhere between 40-50% damage.

However, all the notable non-elemental weapons are still within 10% of each other, so it doesn't matter *that* much.

**Against normal enemies in endgame**: You don't really feel the difference between different weapons because you will oneshot them anyway with optimized Physical DPSs. Even Machinist (Stone Shot) will oneshot the vast majority of normal enemies.

### Damage Accessory, 100% HP, 35 DEF

| **Class** | **DPS** | **Relative Percent** |
|-----------|---------|---------------------|
| Seitengrat | 41777 | 210.29% |
| Wyrmhero Blade | 29419 | 148.09% |
| Great Trango | 28019 | 141.04% |
| Knight (Excalibur) | 23716 | 119.38% |
| Shikari (Darkblade) | 21610 | 108.78% |
| Bushi | 19866 | 100.00% |
| Monk | 18852 | 94.90% |
| Knight (Tournesol) | 18261 | 91.92% |
| Uhlan (Zodiac Spear) | 17673 | 88.96% |
| Shikari (Mesa) | 15333 | 77.18% |
| Shikari (Mina) | 14336 | 72.16% |
| Uhlan (Holy Spear) | 14241 | 71.69% |
| Archer | 13877 | 69.85% |
| Foebreaker | 13744 | 69.18% |
| Machinist (Dark Shot) | 12861 | 64.74% |
| Red Battlemage | 11081 | 55.78% |
| Time Battlemage | 9190 | 46.26% |
| Machinist (Stone Shot) | 8331 | 41.94% |

**Key Insights:**
- Germinas Boots users shoot way up in damage and combo weapons take over
- Shikari (Yagyu Darkblade) looks really good here, but in practice, their actual damage will be lower because you can't reach 99 Strength while wearing Dark Robes and Germinas Boots on Shikari
- 78+6 (from Battle Lores) leaves 15 Strength missing. Bushi can give +11, while Black Mage and Red Battlemage can give +8 or +9, so neither reaches 99 Strength
- Speed weapons assume Maximillian (+6 Speed), but Dark Robes occupy that slot, so Speed is lower
- Expect a 5-10% DPS decrease on Yagyu Darkblade, putting them closer to Bushi
- This table assumes optimal animations and most players will have only 1 pair of Genji Gloves
- All notable non-elemental weapons are almost within 10% of each other
- 3 out of 5 notable endgame enemies without evasion are weak to either Holy or Dark, so Bushi's and Monk's high non-elemental combo damage is less relevant

### 5% HP, 0 DEF, Damage Accessory

| **Class** | **DPS** | **Relative Percent** |
|-----------|---------|---------------------|
| Wyrmhero Blade | 87186 | 159.30% |
| Great Trango | 70027 | 127.95% |
| Seitengrat | 65307 | 119.33% |
| Shikari (Darkblade) | 59994 | 109.62% |
| Knight (Excalibur) | 58311 | 106.54% |
| Bushi | 54729 | 100.00% |
| Monk | 50287 | 91.88% |
| Foebreaker | 46911 | 85.72% |
| Knight (Tournesol) | 45031 | 82.28% |
| Shikari (Mesa) | 42531 | 77.71% |
| Uhlan (Zodiac Spear) | 37036 | 67.67% |
| Uhlan (Holy Spear) | 35851 | 65.51% |
| Shikari (Mina) | 35849 | 65.50% |
| Red Battlemage | 27940 | 51.05% |
| Archer | 26213 | 47.90% |
| Time Battlemage | 18760 | 34.28% |
| Machinist (Dark Shot) | 17148 | 31.33% |
| Machinist (Stone Shot) | 11108 | 20.30% |

**Note**: I don't consider this normal play (see the section: [4x Speed](#4x-speed)), but this table can be incredibly relevant for Hell Wyrm and Yiazmat, two fights where you'd want to maximize DPS to their limits.

**Key Insights:**
- Combo weapons move up, with special award to Foebreaker for increasing their DPS by 70%, making Foebreaker competitive with Monk and out-damaging Knight (Tournesol)
- Foebreaker's weapon is incredibly DEF reliant due to their damage formula:
  - `(ATK * random(0, 1.111) - DEF) * (STATS * 2)`
  - Substituting random(0, 1.111) with ~0.5 and distributing:
  - `(ATK - 2*DEF) * (STATS)`
  - This shows why Foebreaker gains so much damage when defense is 0
- This makes Vrsicika a Tier 1 Weapon at 0 DEF
- Elemental weapons aren't far off from invisible weapons, and Bushi isn't far from elemental weapons
- Monk compares against MDEF instead of DEF, making them more annoying since you'll likely break DEF first for other weapons
- Because this assumes Genji Gloves, you'd have to pair Monk with Bushi, Knight, or Foebreaker. Might be more practical to use their weapons instead
- Hell Wyrm and Yiazmat are weak to Holy and Dark respectively, making those weapons better in those scenarios
- Uhlan has Holy Lance: (23900) DPS when not Holy boosted, (35851) DPS when Holy boosted
- Since Hell Wyrm is weak to Holy, Holy Lance is very similar damage to Foebreaker (46911) when not boosted and significantly better than Bushi (71702) if Holy boosted

### 100% HP, 0 DEF, Damage Accessory

| **Class** | **DPS** | **Relative Percent** |
|-----------|---------|---------------------|
| Seitengrat | 48980 | 177.12% |
| Wyrmhero Blade | 39304 | 142.13% |
| Great Trango | 35773 | 129.36% |
| Shikari (Darkblade) | 32559 | 117.74% |
| Knight (Excalibur) | 32023 | 115.80% |
| Bushi | 27653 | 100.00% |
| Monk | 26709 | 96.59% |
| Knight (Tournesol) | 23987 | 86.74% |
| Foebreaker | 23600 | 85.34% |
| Uhlan (Zodiac Spear) | 23062 | 83.40% |
| Shikari (Mesa) | 22648 | 81.90% |
| Uhlan (Holy Spear) | 22324 | 80.73% |
| Shikari (Mina) | 20983 | 75.88% |
| Archer | 19660 | 71.10% |
| Red Battlemage | 16526 | 59.76% |
| Time Battlemage | 14070 | 50.88% |
| Machinist (Dark Shot) | 12861 | 46.51% |
| Machinist (Stone Shot) | 8331 | 30.13% |

**Note**: I don't consider this very common at all, mostly because there are few fights where you would want to take the time to reduce defense and remain at Full HP, but it's possible if you want to do Hell Wyrm and Yiazmat more safely, albeit much slower.

Few leaders and DPSs have access to stat breaking ability, but if your leader is a Monk or a Foebreaker, instead of having them Attack, it's probably more worthwhile for them in the endgame to reduce defense because overall, your DPSs will eventually gain a ~35-50% damage increase compared to 100% HP, 35 DEF.

Bushi excels in this category, while Monk not so much because they compare against MDEF. Depending on your playstyle though, this could be relevant.

Even within this fairly artificial category, the notable non-elemental weapons (and Foebreaker) are still within 20% of each other.

### 5% HP, 35 DEF, Damage Accessory

| **Class** | **DPS** | **Relative Percent** |
|-----------|---------|---------------------|
| Wyrmhero Blade | 65260 | 165.98% |
| Seitengrat | 55703 | 141.67% |
| Great Trango | 54850 | 139.50% |
| Knight (Excalibur) | 43183 | 109.83% |
| Shikari (Darkblade) | 39820 | 101.28% |
| Bushi | 39318 | 100.00% |
| Monk | 35495 | 90.28% |
| Knight (Tournesol) | 34281 | 87.19% |
| Shikari (Mesa) | 28794 | 73.23% |
| Uhlan (Zodiac Spear) | 28382 | 72.19% |
| Foebreaker | 27320 | 69.48% |
| Shikari (Mina) | 24493 | 62.29% |
| Uhlan (Holy Spear) | 22870 | 58.17% |
| Red Battlemage | 18735 | 47.65% |
| Archer | 18503 | 47.06% |
| Machinist (Dark Shot) | 17148 | 43.61% |
| Time Battlemage | 12254 | 31.17% |
| Machinist (Stone Shot) | 11108 | 28.25% |

This category feels incredibly artificial, since if you're taking the effort to remain at 5% HP, you would probably also take the effort to reduce defense.

Bushi is at the top, with Monk and Knight closely behind.

### 100% HP, 48 DEF (Trial Mode Stage 100), Cameo Belt

| **Class** | **DPS** | **Relative Percent** |
|-----------|---------|---------------------|
| Seitengrat | 28652 | 198.27% |
| Wyrmhero Blade | 20844 | 139.29% |
| Great Trango | 20489 | 136.92% |
| Knight (Excalibur) | 18805 | 125.67% |
| Uhlan (Zodiac Spear) | 14964 | 100.00% |
| Knight (Tournesol) | 14451 | 96.57% |
| Bushi | 13559 | 90.61% |
| Monk | 13005 | 86.91% |
| Machinist (Dark Shot) | 12861 | 85.95% |
| Shikari (Darkblade) | 12753 | 85.22% |
| Uhlan (Holy Spear) | 10732 | 71.72% |
| Shikari (Mesa) | 9318 | 62.27% |
| Foebreaker | 9049 | 60.47% |
| Shikari (Mina) | 8763 | 58.56% |
| Red Battlemage | 8518 | 56.92% |
| Archer | 8462 | 56.55% |
| Machinist (Stone Shot) | 8331 | 55.67% |
| Time Battlemage | 7377 | 49.30% |

Cameo Belt is especially useful on Trial Mode Stage 100 because of their incredibly high evasion, so Germinas Boots users will suffer an even larger damage penalty than normal if they don't use this.

Unlike the last 2 categories, this corresponds to a real situation, if incredibly limited in Final Fantasy XII.

However, many "Hard Mode" mods of Final Fantasy XII increase all stats, including defense, by 30%, so endgame enemies end up with a defense value around this, so you can get an idea of the weapon performance for similar weapons.

Surprisingly, Machinist (Dark Shot) is very competitive in terms of damage.

I would say that the big winners are Wyrmhero Blade (you should actually have it by now) and Excalibur.

## Overall Conclusions

Here's a table that summarizes the results. They're listed from best to worst in the particular category, with a break separating significant gaps in performance.

| **Neutral to Elemental** | **Weak to Elemental** | **High DPS Floor** | **High DPS Ceiling** |
|-------------------------|---------------------|-------------------|---------------------|
| | | Performs best when these conditions are met: Self: 25%+ HP, 35+ DEF, 25+ Evasion, <99 STR/MAG, Any Accessory, Any Character, Elemental Resistant | Performs best when these conditions are met: Self: 5% HP, 0 DEF, 0 Evasion, 99 STR/MAG, Genji Gloves, Optimal Characters, Elemental Resistant |
| Knight (Excalibur) | Machinist (Dark Shot)* | Uhlan | Bushi |
| Shikari (Darkblade) | Uhlan (Holy Lance) | Knight (Tournesol) | Monk |
| | Archer | Bushi | - |
| | - | Monk | Foebreaker |
| | Machinist | Machinist* | Knight (Tournesol) |

\*Machinist's ranking here is more towards lower levels.

From this table, you can pick your optimal DPSs, depending on your position in the game and the relevant enemies.

If about half of the DPS Ceiling conditions are met, the Uhlan, Knight, Bushi, and Monk all perform fairly similarly.

Again, this is predicated on actually having the optimal weapons, and the differences between the various weapons are not *that* big, which is why the most important factors for a Physical DPS are the buffs and if you actually have the endgame weapons.

Kumbha and Tournesol are significantly more complicated and time consuming to acquire compared to everyone else's ultimate weapons, with Uhlan being notable for being a rare spawn treasure chest (that you can easily RNG manipulate) or relatively early on in Trial Mode as compared to the other weapons.

---

# Genji Gloves Prioritization

The following table is the rough priority (from highest to lowest) for Genji Gloves. Non-regular endgame weapons are included because by the time you have 2 pairs of Genji Gloves, you probably have either Wyrmhero Blade or Great Trango.

These are sorted by damage, as you should probably use the more damaging weapons, even if the increase from Genji Gloves isn't as large.

## 100% HP, 35 DEF, Level 99

| **Class** | **Without Gloves** | **With Gloves** | **Raw Increase** | **% Diff** |
|-----------|------------------|----------------|-----------------|-----------|
| Wyrmhero Blade | 23815 | 29419 | 5604 | 23.53% |
| Great Trango | 22834 | 28019 | 5185 | 22.71% |
| Knight (Excalibur) | 21615 | 23716 | 2101 | 9.72% |
| Bushi | 15868 | 19866 | 3998 | 25.20% |
| Monk | 15386 | 18852 | 3466 | 22.53% |
| Knight (Tournesol) | 16355 | 18261 | 1906 | 11.65% |
| Uhlan | 16875 | 17673 | 798 | 4.73% |
| Foebreaker | 12944* | 13744 | 800 | 6.18% |
| Red Battlemage | 10419 | 11081 | 662 | 6.35% |

\*Germinas Boots was used here.

## 5% HP, 0 DEF, Level 99

| **Class** | **Without Gloves** | **With Gloves** | **Raw Increase** | **% Diff** |
|-----------|------------------|----------------|-----------------|-----------|
| Wyrmhero Blade | 72709 | 87186 | 14477 | 19.91% |
| Great Trango | 54732 | 70027 | 15295 | 27.95% |
| Knight (Excalibur) | 46452 | 58311 | 11859 | 25.53% |
| Bushi | 42635 | 54729 | 12094 | 28.37% |
| Monk | 40510 | 50287 | 9777 | 24.13% |
| Foebreaker | 40141* | 46911 | 6770 | 16.87% |
| Knight (Tournesol) | 35225 | 45031 | 9806 | 27.84% |
| Uhlan | 32177 | 37036 | 4859 | 15.10% |
| Red Battlemage | 23383 | 27940 | 4557 | 19.49% |

\*Germinas Boots was used here.

---

# Magic + Techniques Analysis

## Level 99

Because only stats change at lower levels, the relative rankings of damage between spells does not change either, making this a useful table to see how much DPS magic does, especially between spells.

**Assumptions:**
- Level 99, 99 MAG, 35 SPD
- 35 MDEF
- 3 Swiftness
- Haste, Faith
- 100% HP
- Elemental Boosting
- Max Battle Speed

All spells have 23 CT, so the Charge Time of all spells is about 0.66 seconds.

### Level 99, 1 Target

| **Spell** | **DPS** | **Action Time + Charge Time (s)** |
|-----------|---------|----------------------------------|
| Cure | 824 | 4.56 |
| Cura | 1816 | 4.76 |
| Curaga | 2855 | 5.66 |
| Curaja | 4840 | 4.66 |
| Renew | ? | 4.96 |
| Holy | 3624 | 8.36 |
| Fire | 67 | 3.32 |
| Fira | 2500 | 3.32 |
| Firaga | 6331 | 3.36 |
| Thunder | 67 | 3.32 |
| Thundara | 2361 | 3.62 |
| Thundaga | 5449 | 3.99 |
| Blizzard | 52 | 4.26 |
| Blizzara | 2158 | 4.19 |
| Blizzaga | 5197 | 4.32 |
| Aero | 1152 | 3.82 |
| Aeroga | 3808 | 4.49 |
| Aqua | 166 | 5.92 |
| Bio | 2034 | 4.32 |
| Shock | 3330 | 4.89 |
| Scourge | 3732 | 4.76 |
| Flare | 1926 | 10.99 |
| Scathe | 3160 | 8.09 |
| Dark | 798 | 3.99 |
| Darkra | 3436 | 4.12 |
| Darkga | 5277 | 4.49 |
| Ardor | 6190 | 5.52 |
| Drain | 1137 | 4.16 |

**Key Insights:**
- Firaga actually does slightly more damage than Ardor
- This is much lower than a Berserked Physical DPS
- Every spell is dominated by animation time, suggesting that at lower Battle Speeds, magic can do better than Physical

### Level 99, 3 Targets

| **Spell** | **DPS** | **Action Time + Charge Time (s)** |
|-----------|---------|----------------------------------|
| Cura | 3836 | 6.76 |
| Curaja | 10157 | 6.66 |
| Renew | ? | 6.96 |
| Fira | 4720 | 5.28 |
| Firaga | 11904 | 5.36 |
| Thundara | 4564 | 5.62 |
| Thundaga | 10890 | 5.99 |
| Blizzara | 4384 | 6.19 |
| Blizzaga | 9654 | 6.98 |
| Aero | 2410 | 5.48 |
| Aeroga | 7513 | 6.83 |
| Bio | 4109 | 6.42 |
| Scourge | 7882 | 6.76 |
| Scathe | 9481 | 8.09 |
| Dark | 1596 | 5.99 |
| Darkra | 6943 | 6.12 |
| Darkga | 10954 | 6.49 |
| Ardor | 14946 | 6.86 |

**Key Insights:**
- Being stuck in a healing animation is more likely against a boss fight than being stuck in a single target Black Magic spell
- Although Scathe looks bad from a sustained DPS standpoint, the actual damage comes out very quick
- For Firaga, the first enemy is hit at about 1.5s, second at 2.5s, third at 3.5s, and so on
- Scathe hits all enemies at around 2.5s, so it's the best when facing 3+ enemies you want to oneshot. It just has a really long recovery time
- Ardor is best for Reflect strategies. Unfortunately, every boss where you'd use it (immune to physical damage or disable attack) are either immune to Fire or use Shift in the endgame, making it less useful than Scathe

### Level 99, Slowest Battle Speed

| **Spell** | **DPS (1 Target)** | **DPS (3 Targets)** |
|-----------|-------------------|-------------------|
| Cure | 720 | - |
| Cura | 1596 | 3496 |
| Curaga | 2558 | 2558 |
| Curaja | 4241 | 9245 |
| Holy | 3360 | 3360 |
| Fire | 57 | - |
| Fira | 2088 | 4198 |
| Firaga | 5295 | 10603 |
| Thunder | 57 | - |
| Thundara | 1998 | 4087 |
| Thundaga | 4680 | 9814 |
| Blizzard | 45 | - |
| Blizzara | 1866 | 3963 |
| Blizzaga | 4512 | 8824 |
| Aero | 982 | 2152 |
| Aeroga | 3322 | 6853 |
| Aqua | 150 | 150 |
| Bio | 1766 | 3728 |
| Shock | 2936 | - |
| Scourge | 3279 | 7184 |
| Flare | 1817 | - |
| Scathe | 2923 | 8769 |
| Dark | 685 | 1438 |
| Darkra | 2964 | 6271 |
| Darkga | 4603 | 9948 |
| Ardor | 5532 | 13641 |
| Drain | 982 | - |

**Key Insights:**
- On the slowest Battle Speed, enemies act half as fast, but your AOE spells go down ~10% in DPS (including healing), while single target spells go down by ~20% in DPS
- This highly suggests that playing at a lower Battle Speed will increase your survivability without affecting your Magical effectiveness very much, due to being animation time dominated
- Of course, this affects the enemy equally: if they deal Magical damage, a lower Battle Speed will hardly affect their damage output
- This will have no effect if the enemy uses CT 0 skills
- This still doesn't allow magic to out-DPS endgame Physical DPS's at 99 STR/MAG, even while non-berserked

### Level 99, Techniques

| **Technique** | **DPS** | **Action Time + Charge Time (s)** |
|---------------|---------|----------------------------------|
| Telekinesis | 3366 | 2.07 |
| Gil Toss | 2962 | 3.38 |
| Souleater | 2871 | 5.27 |
| 1000 Needles | 212 | 4.71 |

**Notes:**
- Telekinesis and Souleater use the Zodiac Spear's ATK (141)
- Telekinesis uses the *enemy's level*, not your level. This was assumed to be 99, but very few have a level that high
- You're pretty much always better off using Guns or Gil Toss

## Mystic Armor, Non-Berserked DPS Comparisons

The point of this is to compare a Healer's individual DPS, if they were to completely wear Mystic Armor. Since a Healer cannot heal while Berserked, Berserk is not allowed. Finally, we assumed no damage accessory, mostly because Healers often want to wear something else (like Bubble Belt or Ribbon) instead of completely maximizing DPS, since their contribution would be low compared to a Berserked DPS anyways.

### Level 30, Magic vs. Non-Berserked Physical DPS

**Assumptions:**
- **Mystic Armor Setups:**
  - 46 Strength (36 from Ashe, 10 from Battle Lores)
  - 70 Magic (40 from Ashe, 14 from equipment, 16 from Magic Lores)
  - 33 Vitality (33 from Ashe)
  - 26 Speed (26 from Ashe)
- Haste, Focus/Serenity, Bravery/Faith, 3 Swiftness (no Berserk)
- No Damage Accessory (Presumably on Physical DPS)
- Max Battle Speed
- 25 DEF

| **Class** | **DPS** | **Relative Percent** |
|-----------|---------|---------------------|
| Machinist (Stone Shot) | 4182 | 181.27% |
| Red Battlemage (Bone of Byblos) | 2307 | 100.00% |
| Bushi (Masamune) | 2115 | 91.68% |
| **Single Target Boosted Firaga** | **2014** | **87.30%** |
| Monk (Whale Whisker) | 1664 | 72.13% |
| **Single Target Boosted Darkga** | **1662** | **82.52%** |
| Foebreaker (Vrscika) | 1333 | 57.78% |
| Uhlan (Dragon Whisker) | 1250 | 54.18% |
| Shikari (Orochi) | 1245 | 53.97% |
| **Single Target Boosted Darkra** | **1146** | **49.67%** |
| Archer (Dhanusha) | 1141 | 49.46% |
| Knight (Karkata) | 1060 | 45.95% |
| Shikari (Kagenui) | 924 | 40.05% |
| **Single Target Boosted Fira** | **916** | **39.71%** |
| Archer (Burning Bow) | 913 | 39.58% |

**Key Insights:**
- Boosted Fira and Darkra are similar to Tier 3 weapons
- Boosted Firaga and Darkga are similar to Tier 2 weapons when wearing Full Mystic Armor
- Bone of Byblos is actually higher DPS than ST Boosted Firaga (assuming Focus/Adrenaline, neither of which Red Battlemage has naturally)

### Level 60, Magic vs. Non-Berserked Physical DPS

**Assumptions:**
- **Mystic Armor Setups:**
  - 62 Strength (52 from Ashe, 10 from Battle Lores)
  - 96 Magic (56 from Ashe, 24 from equipment, 16 from Magic Lores)
  - 43 Vitality (43 from Ashe)
  - 30 Speed (30 from Ashe)
- Haste, Focus/Serenity, Bravery/Faith, 3 Swiftness (no Berserk)
- No Damage Accessory (Presumably on Physical DPS)
- Max Battle Speed
- 35 DEF

| **Class** | **DPS** | **Relative Percent** |
|-----------|---------|---------------------|
| Seitengrat | 7643 | 156.78% |
| Machinist (Dark Shot) | 6387 | 131.02% |
| Great Trango | 4948 | 101.50% |
| **Single Target Boosted Firaga** | **4875** | **100.00%** |
| Knight (Excalibur) | 4392 | 90.09% |
| Wyrmhero Blade | 4299 | 88.18% |
| Bushi (Kumbha) | 4255 | 87.28% |
| Red Battlemage (Bone of Byblos) | 4211 | 86.38% |
| Machinist (Stone Shot) | 4137 | 84.86% |
| **Single Target Boosted Darkga** | **4063** | **83.34%** |
| Shikari (Darkblade) | 3624 | 74.34% |
| Uhlan (Zodiac Spear) | 3535 | 72.51% |
| Monk (Kanya) | 3352 | 68.76% |
| Knight (Tournesol) | 3329 | 68.29% |
| Shikari (Mesa) | 2629 | 53.93% |
| Foebreaker (Vricika) | 2401 | 49.25% |
| Archer (Dhanusha) | 2159 | 44.29% |
| Time Battlemage | 2002 | 41.07% |

**Key Insight:** Boosted Firaga here is similar to a Tier 1 Weapon. The main reason is because the STR/MAG differential is so large.

### Level 99, Magic vs. Non-Berserked Physical DPS

**Assumptions:**
- **Heavy Armor/Mystic Armor Setup:**
  - 99 Strength
  - 99 Magic
  - 99 Vitality
  - 30 Speed
- Haste, Focus/Serenity, Bravery/Faith, 3 Swiftness (no Berserk)
- No Damage Accessory (Presumably on Physical DPS)
- Max Battle Speed
- 35 DEF

| **Class** | **DPS** | **Relative Percent** |
|-----------|---------|---------------------|
| Seitengrat | 18561 | 206.72% |
| Great Trango | 12570 | 139.99% |
| Knight (Excalibur) | 11157 | 124.26% |
| Wyrmhero Blade | 10917 | 121.58% |
| Uhlan (Zodiac Spear) | 8979 | 100.00% |
| Shikari (Darkblade) | 8857 | 98.64% |
| Monk (Kanya) | 8515 | 94.83% |
| Bushi (Kumbha) | 8513 | 94.81% |
| Knight (Tournesol) | 8456 | 94.18% |
| Shikari (Mesa) | 6424 | 71.54% |
| Machinist (Dark Shot) | 6387 | 71.13% |
| **Single Target Boosted Firaga** | **6331** | **70.51%** |
| Foebreaker | 6108 | 68.03% |
| Red Battlemage | 5490 | 61.14% |
| Archer (Dhanusha) | 5304 | 59.07% |
| **Single Target Boosted Darkga** | **5277** | **58.77%** |
| Time Battlemage | 5087 | 56.65% |
| Machinist (Stone Shot) | 4137 | 46.07% |

**Key Insight:** With equal STR and MAG, we see that Magical DPS gets out-damaged, even without Berserk.

### Level 99, Slowest Battle Speed

**Assumptions:** Same as above, but now the slowest Battle Speed.

| **Class** | **DPS** | **Relative Percent** |
|-----------|---------|---------------------|
| Seitengrat | 15717 | 244.24% |
| Great Trango | 9370 | 145.61% |
| Knight (Excalibur) | 7735 | 120.20% |
| Wyrmhero Blade | 6775 | 105.28% |
| Shikari (Darkblade) | 6769 | 105.19% |
| Uhlan (Zodiac Spear) | 6435 | 100.00% |
| Monk (Kanya) | 6389 | 99.29% |
| Bushi (Kumbha) | 6158 | 95.70% |
| Knight (Tournesol) | 5874 | 91.28% |
| **Single Target Boosted Firaga** | **5295** | **82.28%** |
| Shikari (Mesa) | 4925 | 76.53% |
| **Single Target Boosted Darkga** | **4603** | **71.53%** |
| Foebreaker | 4342 | 67.47% |
| Machinist (Dark Shot) | 4260 | 66.20% |
| Red Battlemage | 3892 | 60.48% |
| Time Battlemage | 3818 | 59.33% |
| Archer (Dhanusha) | 3759 | 58.41% |

**Key Insight:** At the slowest Battle Speed, the gap narrows, but Physical still has greater DPS than Magic.

---

# 4x Speed

The ability to use 4x speed most of the time is literally the **SINGLE** largest DPS increase in the game.

Yes, in *aggregate*, you can increase your DPS past 4x. **SINGLE** is the word here for a reason.

This may sound sort of silly, but there are circumstances in which you can't use 4x Speed, the primary one being: **menuing.**

## What This Means

If you have to menu to do things, you've lost a lot of DPS. Here's reasons why you may have to menu and lose DPS:

### Reasons You Can't Use 4x Speed

1. **On 4x Speed, you also take 4x damage**
   - If your team dies you'll obviously need to menu to swap something in or redo content
   - If your team isn't survivable enough to play without 4x because you need to carefully watch what's going on, you've also lost a lot of DPS

2. **Getting your party members to extremely low HP to do extremely high damage is generally pretty awkward to do with gambits alone until you reach end-game, and is not worth it for the vast majority of fights in this game, especially if your characters die!**

3. **Syphoning off MP** from a character that has excess MP. This is very relevant if you have a healer that doesn't regenerate MP on their own. This is why I always pair main healers with the ability to deal damage, because damage translates into MP once you get a passive.

4. **Changing up your gambits or equipment** to use a specific strategy or hit a specific weakness (although this takes less time with the introduction of gambit sets)
   - Reflect strategies would be the quintessential version of this
   - Changing your elemental boosting weapon to match the enemy's weakness
   - Changing your DPS's accessories to achieve higher in-game DPS, like swapping between Genji Gloves and Cameo Belt often

5. **If you want to take advantage of the ability to use items and cast spells on non-active party members**, you need to do that by menuing

## Key Points

**There are several important points to this:**

- **There are *specific* strategies that might have *higher in-game DPS*, but ultimately have *lower real-time DPS* because of the unavailability of 4x speed for that strategy (like heavy menuing).**

- **The primary way this can occur is by manually reducing your HP for high DPS strategies. Even ignoring that you're at low HP and might die, I don't usually think it's worth the *real world time* to do this, since the vast majority of fights are so short anyways!**

- **Thus, I think it's silly to entirely evaluate a weapon's performance based on what they can do in 5% HP circumstances, since that encompasses so little of the weapon's use and doing such a strategy isn't usually faster than "lol 4x Speed" with weapons in normal use!**

## Caveats

**Yes, there are caveats to this:**

- **There are fights in which 4x Speed doesn't help** (like the Demon Wall fights). When this is the case, yes, it is more important to maximize *in-game* DPS than *real-world* DPS!

- **There are fights in which you'd want to maximize your theoretical DPS** (like Hell Wyrm and Yiazmat)! I'm not saying they don't exist, but that they're incredibly limited scenarios.

---

## Document Information

**Source**: FFXII TZA: The Unneccessary Class Guide v2.2

This theoretical analysis document extracts and focuses on the mathematical foundations, DPS calculations, damage formulas, and optimization theory that underpin the job planning recommendations in the main guide.
