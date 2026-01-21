// Validation script for preset esper assignments
// Run with: node validate-presets.js

// Load the data files
const fs = require('fs');
const path = require('path');

// Load presets by evaluating the JS file
const presetsContent = fs.readFileSync(path.join(__dirname, 'presets.js'), 'utf8');
const espersContent = fs.readFileSync(path.join(__dirname, 'espers.js'), 'utf8');

// Use Function constructor to evaluate and return the data
const getEsperData = new Function(espersContent + '; return { ESPER_UNLOCKS, ESPER_ZODIAC };');
const getPresetData = new Function(presetsContent + '; return { PRESETS, PRESET_ICONS };');

const { ESPER_UNLOCKS } = getEsperData();
const { PRESETS } = getPresetData();

// All possible espers
const ALL_ESPERS = [
    'Belias', 'Adrammelech', 'Zalera', 'Cuchulainn', 'Mateus', 'Hashmal',
    'Famfrit', 'Exodus', 'Zeromus', 'Chaos', 'Shemhazai', 'Ultima', 'Zodiark'
];

console.log('===== ESPER ASSIGNMENT VALIDATION =====\n');

let totalErrors = 0;
const globalEsperUsage = {};

// Track all esper assignments globally
ALL_ESPERS.forEach(esper => globalEsperUsage[esper] = []);

for (const [presetName, preset] of Object.entries(PRESETS)) {
    console.log(`\n${presetName}:`);

    const esperAssignments = {};
    const errors = [];

    // Check each character's esper assignments
    preset.builds.forEach(build => {
        build.espers.forEach(esper => {
            // Track duplicate within this preset
            if (!esperAssignments[esper]) {
                esperAssignments[esper] = [];
            }
            esperAssignments[esper].push(build.char);

            // Track global usage
            globalEsperUsage[esper].push(`${presetName}:${build.char}`);
        });
    });

    // Check for duplicates within this preset
    for (const [esper, characters] of Object.entries(esperAssignments)) {
        if (characters.length > 1) {
            errors.push(`  ❌ DUPLICATE: ${esper} assigned to ${characters.join(' AND ')}`);
            totalErrors++;
        }
    }

    // Check for useless esper assignments
    preset.builds.forEach(build => {
        build.espers.forEach(esper => {
            const job1 = build.jobs[0];
            const job2 = build.jobs[1];

            const unlocks1 = ESPER_UNLOCKS[esper]?.[job1];
            const unlocks2 = ESPER_UNLOCKS[esper]?.[job2];

            if (!unlocks1 && !unlocks2) {
                errors.push(`  ⚠️  USELESS: ${build.char} has ${esper} but it unlocks NOTHING for ${job1} or ${job2}`);
                totalErrors++;
            }
        });
    });

    if (errors.length === 0) {
        console.log('  ✅ No esper assignment errors detected');
    } else {
        errors.forEach(err => console.log(err));
    }
}

// Check for unassigned espers globally
console.log('\n\n===== GLOBAL ESPER USAGE =====\n');

const neverAssigned = [];
const assignedOnce = [];
const assignedMultiple = [];

for (const [esper, assignments] of Object.entries(globalEsperUsage)) {
    if (assignments.length === 0) {
        neverAssigned.push(esper);
        console.log(`  ⚠️  ${esper}: NEVER ASSIGNED in any preset`);
    } else if (assignments.length === 1) {
        assignedOnce.push(esper);
        console.log(`  ℹ️  ${esper}: Only assigned once (${assignments[0]})`);
    } else {
        assignedMultiple.push(esper);
        console.log(`  ✅ ${esper}: Assigned ${assignments.length} times across presets`);
    }
}

// Summary
console.log('\n\n===== SUMMARY =====');
console.log(`Total Errors Found: ${totalErrors}`);
console.log(`Espers Never Assigned: ${neverAssigned.length} (${neverAssigned.join(', ') || 'none'})`);
console.log(`Espers Assigned Once: ${assignedOnce.length} (${assignedOnce.join(', ') || 'none'})`);
console.log(`Espers Used Multiple Times: ${assignedMultiple.length}`);

if (totalErrors > 0) {
    console.log('\n⚠️  VALIDATION FAILED - Please fix the errors above');
    process.exit(1);
} else {
    console.log('\n✅ VALIDATION PASSED - All esper assignments are valid');
    process.exit(0);
}
