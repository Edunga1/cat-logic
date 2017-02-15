{-
    2017-02-15
    역직삼각형 출력하기
    ex)  Input: 3
        Output: ***
                **
                *
-}

import System.Environment

star 0 = do
    putStrLn ""
    return ()
star n = do
    putStr "*"
    star (n-1)

triangle 0 = return ()
triangle n = do
    star n
    triangle (n-1)

main = do
    args <- getArgs
    triangle (read $ head args :: Int)

