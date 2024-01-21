// Channels are the pipes that connect concurrent goroutines. You can send values into channels from one goroutine and 
// receive those values into another goroutine.

package main
import (
    "fmt"
    "time"
)

func worker(done chan bool){
	fmt.Print("working...")
    time.Sleep(time.Second)
    fmt.Println("done")

	done <- true
}

func ping(pings chan<- string, msg string) {
    pings <- msg
}
func pong(pings <-chan string, pongs chan<- string) {
    msg := <-pings
    pongs <- msg
}

func main() {
	// Create a new channel with make(chan val-type). Channels are typed by the values they convey.

    messages := make(chan string)
	// Send a value into a channel using the channel <- syntax. Here we send "ping" to the messages channel we made above, 
	// from a new goroutine.

    go func() { messages <- "ping" }()
	// The <-channel syntax receives a value from the channel. Here we’ll receive the "ping" message we sent above and print it out.

	msg := <-messages
    fmt.Println(msg)

	// ------------------------------- Buffering ------------------------------- //
	// By default channels are unbuffered, meaning that they will only accept sends (chan <-) if there is a corresponding receive (<- chan) 
	// ready to receive the sent value. Buffered channels accept a limited number of values without a corresponding receiver for those values.

	
	// Here we make a channel of strings buffering up to 2 values.

	test := make(chan string, 2)
	// Because this channel is buffered, we can send these values into the channel without a corresponding concurrent receive.

	test <- "buffered"
	test <- "channel"
	// Later we can receive these two values as usual.

	fmt.Println(<-test)
	fmt.Println(<-test)
	test <- "one"
	test <- "two"
	// test <- "three"   // Will give : fatal error: all goroutines are asleep - deadlock!
	// se produit lorsqu'il y a une situation de blocage où toutes les goroutines sont en attente et aucune n'est en mesure de progresser. 
	fmt.Println(<-test)
	fmt.Println(<-test)

	// ------------------------------- Synchronization ------------------------------- //
	// We can use channels to synchronize execution across goroutines. Here’s an example of using a blocking receive to wait for a goroutine 
	// to finish. When waiting for multiple goroutines to finish, you may prefer to use a WaitGroup.

	done := make(chan bool,1)
	go worker(done)

    <-done

	// ------------------------------- Channel Directions ------------------------------- //
	// When using channels as function parameters, you can specify if a channel is meant to only send or receive values. 
	// This specificity increases the type-safety of the program.
	pings := make(chan string, 1)
	pongs := make(chan string, 1)
	ping(pings, "salut")
	pong(pings, pongs)
	fmt.Println(<-pongs)
}
