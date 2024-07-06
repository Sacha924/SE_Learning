package main

import (
	"fmt"
)

// Probleme de ce premier code : on va avoir une erreur fatal error: all goroutines are asleep - deadlock!
// il faut close le channel une fois qu'on sait que plus rien ne sera envoyé
// il faut aussi que le channel squares est connaissance du fait qu'on est close le channel, un moyen indirect de faire ça est d'utiliser la syntaxe avec le boolean : x,ok <- chan

// func main() {
// 	numbers := make(chan int)
// 	squares := make(chan int)
// 	go func() {
// 		for i := 0; i < 4; i++ {
// 			numbers <- i
// 		}
// 	}()
// 	go func() {
// 		for {
// 			val := <-numbers
// 			squares <- val * val
// 		}
// 	}()
// 	for {
// 		fmt.Println(<-squares)
// 	}
// }


// My second version 

// func main() {
// 	numbers := make(chan int)
// 	squares := make(chan int)
// 	go func() {
// 		for i := 0; i < 10; i++ {
// 			numbers <- i
// 		}
// 		close(numbers)
// 	}()
// 	go func() {
// 		for num, ok := <-numbers; ok; {
// 			squares <- num * num
// 		}
// 		close(squares)
// 	}()
// 	for square, ok := <-squares; ok; {
// 		fmt.Println(square)
// 	}
// }

// Here's the problem:

// Channel Range Syntax: When you use num, ok := <-numbers inside the for loop, it reads a single value from the numbers channel and assigns it to num. The ok variable indicates whether the channel is open (true) or closed (false).

// Loop Condition: The condition ok checks whether the channel is open. However, in Go, the for loop with a channel range continues to iterate until the channel is closed and all values have been received from the channel.

// Blocking Behavior: If the numbers channel is not closed before attempting to range over it, the for loop will block indefinitely waiting for more values. This is why the program enters an infinite loop

func main() {
    numbers := make(chan int)
    squares := make(chan int)

    go func() {
        // defer close(numbers)
		for i := 0; i < 10; i++ {
            numbers <- i
        }
		close(numbers) // on pourrait aussi le mettre au début du code de la goroutine et ajouter defer, ca change rien
    }()

    go func() {
		// defer close(squares)
        for num := range numbers {
            squares <- num * num
        }
		close(squares)
    }()

    for square := range squares {
        fmt.Println(square)
    }
}