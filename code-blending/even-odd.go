/**
 * 2017-02-10
 * 정수의 짝수 홀수 판별 프로그램
 */
package main

import "fmt"

func oddEven(n int) {
    if n % 2 == 0 {
        fmt.Println("Even")
    } else {
        fmt.Println("Odd")
    }
}

func main() {
    num := 3
    num2 := 4

    oddEven(num)
    oddEven(num2)
}

