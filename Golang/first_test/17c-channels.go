// SELECT : Go’s select lets you wait on multiple channel operations. Combining goroutines and channels with select is a powerful feature of Go.
// TIMEOUT : Timeouts are important for programs that connect to external resources or that otherwise need to bound execution time. 
// Implementing timeouts in Go is easy and elegant thanks to channels and select.

package main
import (
    "fmt"
    "time"
)
func main() {
    c1 := make(chan string)
    c2 := make(chan string)

    go func() {
        time.Sleep(1 * time.Second)
        c1 <- "one"
    }()
    go func() {
        time.Sleep(2 * time.Second)
        c2 <- "two"
    }()

	// Le select permet de gérer plusieurs opérations de channel dans un bloc non bloquant. Il écoute simultanément les channels c1 et c2. 
	// Quand l'un des channels reçoit une donnée, select exécute le cas correspondant. 
	for i := 0; i < 2; i++ {
        select {
        case msg1 := <-c1:
            fmt.Println("received", msg1)
        case msg2 := <-c2:
            fmt.Println("received", msg2)
        }
    }
	
	fmt.Println("a")

	c3 := make(chan string, 1)
    go func() {
        time.Sleep(2 * time.Second)
        c3 <- "result 1"
    }()
	// Here’s the select implementing a timeout. res := <-c1 awaits the result and <-time.After awaits a value to be sent after the timeout of 1s. 
	// ince select proceeds with the first receive that’s ready, we’ll take the timeout case if the operation takes more than the allowed 1s.

    select {
    case res := <-c3:
        fmt.Println(res)
    case <-time.After(1 * time.Second):
        fmt.Println("timeout 1")
    }
	// If we allow a longer timeout of 3s, then the receive from c4 will succeed and we’ll print the result.

    c4 := make(chan string, 1)
    go func() {
        time.Sleep(2 * time.Second)
        c4 <- "result 2"
    }()
    select {
    case res := <-c4:
        fmt.Println(res)
    case <-time.After(3 * time.Second):
        fmt.Println("timeout 2")
    }

	// --------------------- Non-Blocking Channel Operations --------------------- //
	messages := make(chan string)
	signals := make(chan string)

	// Here’s a non-blocking receive. If a value is available on messages then select will take the <-messages case with that value. If not it will immediately take the default case.


	select {
    case msg := <-messages:
        fmt.Println("received message", msg)
    default:
        fmt.Println("no message received")
    }

	msg := "hi"
	
	// A non-blocking send works similarly. Here msg cannot be sent to the messages channel, because the channel has no buffer and there is no receiver. Therefore the default case is selected.
	select {
    case messages <- msg:
        fmt.Println("sent message", msg)
    default:
        fmt.Println("no message sent")
    }

	// We can use multiple cases above the default clause to implement a multi-way non-blocking select. Here we attempt non-blocking receives on both messages and signals.

	select {
    case msg := <-messages:
        fmt.Println("received message", msg)
    case sig := <-signals:
        fmt.Println("received signal", sig)
    default:
        fmt.Println("no activity")
    }

	// --------------------- Closing Channels --------------------- //
	// Closing a channel indicates that no more values will be sent on it. This can be useful to communicate completion to the channel’s receivers.

	jobs := make(chan int, 5)
    done := make(chan bool)

	// Here’s the worker goroutine. It repeatedly receives from jobs with j, more := <-jobs. In this special 2-value form of receive, the more value will be false if jobs has been closed and all values in the channel have already been received. We use this to notify on done when we’ve worked all our jobs.

	go func(){
		for {
			j, more := <-jobs
			if more{
				fmt.Println("received job", j)
			} else {
				fmt.Println("received all jobs")
				done <- true
				return
			}
		}
	}()

	// This sends 3 jobs to the worker over the jobs channel, then closes it.

	for j := 1; j <= 3; j++ {
        jobs <- j
        fmt.Println("sent job", j)
    }
    close(jobs)
    fmt.Println("sent all jobs")
	// We await the worker using the synchronization approach we saw earlier.
	<-done

	// Reading from a closed channel succeeds immediately, returning the zero value of the underlying type. The optional second return value is true if the value received was delivered by a successful send operation to the channel, or false if it was a zero value generated because the channel is closed and empty.

	_, ok := <-jobs
    fmt.Println("received more jobs:", ok)

	// --------------------- Range over Channels --------------------- //
	// We can iterate over values received from a channel.
	queue := make(chan string, 2)
	queue <- "one"
	queue <- "two"
	close(queue)
	
	for idelem := range(queue){
		fmt.Println(elem)
	}
}