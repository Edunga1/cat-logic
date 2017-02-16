{-
    2017-02-16
    역직삼각형 출력하기 - Lambda 버전
    ex)  Input: 3
        Output: ***
                **
                *
-}

import System.Environment

loop 0 _ = do
    return ()
loop n action = do
    action n
    loop (n - 1) action

star n = do
    loop n (\ _ -> putStr "*")
    putStrLn ""

triangle n = do
    loop n star

main = do
    args <- getArgs
    triangle (read $ head args :: Int)

