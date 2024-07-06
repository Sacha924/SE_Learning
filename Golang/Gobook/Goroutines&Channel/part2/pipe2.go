package main

import (
	"fmt"
)

func main() {
    numbers := make(chan int)
    squares := make(chan int)

    go genNumb(numbers)

    go genSquare(numbers, squares)

    printer(squares)
}

func genNumb(ch_nb chan<- int) {
	for i := 0; i < 10; i++ {
		ch_nb <- i
	}
	close(ch_nb)
}

func genSquare(ch_nb <-chan int, ch_sq chan<- int) {     // We receive from the nb channel, and we send in the sq channel
	for num := range ch_nb {
		ch_sq <- num * num
	}
	close(ch_sq)
}

func printer(in <-chan int){
	for square := range in {
        fmt.Println(square)
    }
}