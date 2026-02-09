{-
  Tests/AdvisorDemo.idr

  Demo of the progressive decision support system.

  Shows realistic scenarios where a player asks for help mid-game.
-}

module Tests.AdvisorDemo

import Data.String
import Types.Character
import Types.Job
import Types.Esper
import Types.Goal
import Types.GameState
import Advisor.Recommendation

-- ============================================================================
-- SCENARIO 1: Early Game - First Job Assignments
-- ============================================================================

scenario1 : IO ()
scenario1 = do
  putStrLn "SCENARIO 1: Early Game"
  putStrLn "======================="
  putStrLn ""
  putStrLn "Player has just started. No jobs assigned yet."
  putStrLn "Question: 'What job should Vaan get first?'"
  putStrLn ""

  let state = initialGameState

  -- Get recommendations for Vaan
  let recs = recommendNextJob Vaan state

  putStrLn "TOP RECOMMENDATIONS FOR VAAN:"
  putStrLn "-----------------------------"
  traverse_ printJobRec recs
  putStrLn ""

  -- Strategic advice
  putStrLn "STRATEGIC ADVICE:"
  let advice = strategicAdvice state
  traverse_ (\a => putStrLn ("  " ++ a)) advice
  putStrLn ""

  where
    printJobRec : (Job, Recommendation) -> IO ()
    printJobRec (job, rec) = do
      putStrLn $ show job ++ " (Score: " ++ show rec.score ++ "/100)"
      traverse_ (\r => putStrLn ("  ✓ " ++ r)) rec.reasoning
      traverse_ (\w => putStrLn ("  ⚠️  " ++ w)) rec.warnings
      putStrLn ""

-- ============================================================================
-- SCENARIO 2: Mid Game - Dual Jobs Unlocked
-- ============================================================================

scenario2 : IO ()
scenario2 = do
  putStrLn "SCENARIO 2: Mid Game - Dual Jobs"
  putStrLn "================================="
  putStrLn ""
  putStrLn "Player has reached Belias. Dual jobs now unlocked!"
  putStrLn ""
  putStrLn "Current party:"
  putStrLn "  - Vaan: Shikari"
  putStrLn "  - Penelo: White Mage"
  putStrLn "  - Balthier: (none yet)"
  putStrLn ""
  putStrLn "Question: 'What should Balthier's job be?'"
  putStrLn ""

  -- Build state
  let Just state1 = assignPrimaryJob Vaan Shikari initialGameState
      | Nothing => putStrLn "ERROR: Failed to assign Vaan's job"

  let Just state2 = assignPrimaryJob Penelo WhiteMage state1
      | Nothing => putStrLn "ERROR: Failed to assign Penelo's job"

  let state3 = unlockDualJobs state2

  -- Get recommendations for Balthier
  let recs = recommendNextJob Balthier state3

  putStrLn "TOP RECOMMENDATIONS FOR BALTHIER:"
  putStrLn "---------------------------------"
  traverse_ printJobRec recs
  putStrLn ""

  -- Strategic advice
  putStrLn "STRATEGIC ADVICE:"
  let advice = strategicAdvice state3
  traverse_ (\a => putStrLn ("  " ++ a)) advice
  putStrLn ""

  where
    printJobRec : (Job, Recommendation) -> IO ()
    printJobRec (job, rec) = do
      putStrLn $ show job ++ " (Score: " ++ show rec.score ++ "/100)"
      traverse_ (\r => putStrLn ("  ✓ " ++ r)) rec.reasoning
      traverse_ (\w => putStrLn ("  ⚠️  " ++ w)) rec.warnings
      putStrLn ""

-- ============================================================================
-- SCENARIO 3: Late Game - Esper Decisions
-- ============================================================================

scenario3 : IO ()
scenario3 = do
  putStrLn "SCENARIO 3: Late Game - Esper Assignment"
  putStrLn "========================================="
  putStrLn ""
  putStrLn "Player has most jobs assigned, now deciding espers."
  putStrLn ""
  putStrLn "Current party:"
  putStrLn "  - Vaan: Red Battlemage + Knight"
  putStrLn "  - Balthier: Foebreaker + Bushi"
  putStrLn "  - Fran: Monk + Time Battlemage"
  putStrLn "  - Basch: Archer + Uhlan"
  putStrLn ""
  putStrLn "Question: 'I just got Shemhazai. Who should get it?'"
  putStrLn ""

  -- Build state (tedious but necessary)
  let Just s1 = assignPrimaryJob Vaan RedBattlemage initialGameState
      | Nothing => putStrLn "ERROR: Setup failed"

  let s2 = unlockDualJobs s1

  let Just s3 = assignSecondaryJob Vaan Knight s2
      | Nothing => putStrLn "ERROR: Setup failed"

  let Just s4 = assignPrimaryJob Balthier Foebreaker s3
      | Nothing => putStrLn "ERROR: Setup failed"

  let Just s5 = assignSecondaryJob Balthier Bushi s4
      | Nothing => putStrLn "ERROR: Setup failed"

  let Just s6 = assignPrimaryJob Fran Monk s5
      | Nothing => putStrLn "ERROR: Setup failed"

  let Just s7 = assignSecondaryJob Fran TimeBattlemage s6
      | Nothing => putStrLn "ERROR: Setup failed"

  let Just s8 = assignPrimaryJob Basch Archer s7
      | Nothing => putStrLn "ERROR: Setup failed"

  let Just s9 = assignSecondaryJob Basch Uhlan s8
      | Nothing => putStrLn "ERROR: Setup failed"

  -- Simulate having just obtained Shemhazai
  -- (In real game, player would have other espers already assigned)
  let shemhazaiState = { availableEspers := [Shemhazai] } s9

  -- Get esper recommendations
  let recs = recommendNextEsper shemhazaiState

  putStrLn "TOP RECOMMENDATIONS:"
  putStrLn "-------------------"
  traverse_ printEsperRec recs
  putStrLn ""

  where
    printEsperRec : (Character, Esper, Recommendation) -> IO ()
    printEsperRec (char, esper, rec) = do
      putStrLn $ show char ++ " ← " ++ show esper ++ " (Score: " ++ show rec.score ++ "/100)"
      traverse_ (\r => putStrLn ("  ✓ " ++ r)) rec.reasoning
      traverse_ (\w => putStrLn ("  " ++ w)) rec.warnings
      putStrLn ""

-- ============================================================================
-- RUN ALL SCENARIOS
-- ============================================================================

export
runDemo : IO ()
runDemo = do
  putStrLn "════════════════════════════════════════════════════════════"
  putStrLn "  PROGRESSIVE DECISION SUPPORT DEMO"
  putStrLn "════════════════════════════════════════════════════════════"
  putStrLn ""

  scenario1
  putStrLn "════════════════════════════════════════════════════════════"
  putStrLn ""

  scenario2
  putStrLn "════════════════════════════════════════════════════════════"
  putStrLn ""

  scenario3
  putStrLn "════════════════════════════════════════════════════════════"
