// A goroutine is a lightweight thread of execution.

package main
import (
    "fmt"
    "time"
)
func f(from string) {
    for i := 0; i < 3; i++ {
        fmt.Println(from, ":", i)
    }
}
func main() {
	// Suppose we have a function call f(s). Here’s how we’d call that in the usual way, running it synchronously.

    f("direct")
	// To invoke this function in a goroutine, use go f(s). This new goroutine will execute concurrently with the calling one. en gros c'est du parallélisme
    // Cependant, il est important de noter que la concurrence n'est pas du parallélisme absolu ; Go gère l'exécution des goroutines, qui peuvent ou non s'exécuter 
    // en parallèle, en fonction du nombre de cœurs du processeur et de la façon dont le scheduler de Go les gère.

    go f("goroutine")
	// You can also start a goroutine for an anonymous function call.

    go func(msg string) {
        fmt.Println(msg)
    }("going")
	// Our two function calls are running asynchronously in separate goroutines now. Wait for them to finish 
	// (for a more robust approach, use a WaitGroup).

    time.Sleep(time.Second)
    fmt.Println("done")
}
// Next we’ll look at a complement to goroutines in concurrent Go programs: channels.