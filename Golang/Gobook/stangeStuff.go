package main

import (
	"fmt"
)

func main(){
	ch := make(chan int, 1)
	for i := 0; i <10; i++{
		select{
		case x := <- ch:
			fmt.Println(x)
		case ch<-i:
		}
	}
}

func TEST(){ // UNPREDICTABLE RESULTS
	ch := make(chan int, 2)
	for i := 0; i <10; i++{
		select{
		case x := <- ch:
			fmt.Println(x)
		case ch<-i:
		}
	}
}


// Execution Flow:
// On each iteration of the loop, the select statement will either receive a value from the channel or send the current value of i into the channel, depending on which case is ready to proceed.
// Since the channel has a buffer size of 1, it can hold only one value at a time. This means:
// If the channel is empty, the ch <- i case will execute and send the current value of i into the channel.
// If the channel is not empty, the <- ch case will execute and receive the value from the channel, printing it out.


// Q1 Pourquoi ne pas avoir un buffered channel bloque ?

// check Notes Notions

// UNPREDICTABLE GOROUTINE EXEC ORDER
// func main(){
// 	ch := make(chan int, 1)
// 	ch2 := make(chan int, 1)
// 	ch3 := make(chan int, 1)
// 	done := make(chan struct{})

// 	go func(){
// 		for i := 0; i <10; i++{
// 			select{
// 			case x := <- ch:
// 				fmt.Println(x)
// 			case ch<-i:
// 			}
// 		}
// 		done <- struct{}{}
// 	}()
// 	go func(){
// 		for i := 10; i <20; i++{
// 			select{
// 			case x := <- ch2:
// 				fmt.Println(x)
// 			case ch2<-i:
// 			}
// 		}
// 		done <- struct{}{}
// 	}()
// 	go func(){
// 		for i := 20; i <30; i++{
// 			select{
// 			case x := <- ch3:
// 				fmt.Println(x)
// 			case ch3<-i:
// 			}
// 		}
// 		done <- struct{}{}
// 	}()

// 	<- done
// 	<- done
// 	<- done
// }

// PRINTS
// 20
// 22
// 24
// 26
// 28
// 0
// 2
// 4
// 6
// 8
// 10
// 12
// 14
// 16
// // 18

// Why They Don't Print in Parallel
// The actual printing might not appear interleaved due to how the Go scheduler handles goroutines and channel operations.
// The Go scheduler can switch between goroutines at any point, but it doesn't guarantee a fair round-robin execution.
// Buffered channels allow each goroutine to perform a non-blocking send operation first. If the receiving end doesn't match the sending rate, one goroutine might progress further before the other one starts printing its values.


