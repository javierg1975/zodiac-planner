module TestMain

import Hedgehog
import Tests.Properties

main : IO ()
main = test
  [ capabilityProps
  , jobProps
  , characterProps
  , scoringProps
  , categoryProps
  ]
