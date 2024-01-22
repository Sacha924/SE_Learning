package main
import (
    "fmt"
    "time"
)

func main() {
	// --------------------- Timers --------------------- //
	// We often want to execute Go code at some point in the future, or repeatedly at some interval. Go’s built-in timer and ticker features make both of these tasks easy. We’ll look first at timers and then at tickers.


	timer1 := time.NewTimer(2 * time.Second)
	<-timer1.C
    fmt.Println("Timer 1 fired")

	// If you just wanted to wait, you could have used time.Sleep. One reason a timer may be useful is that you can cancel the timer before it fires. Here’s an example of that.
	timer2 := time.NewTimer(time.Second)
    go func() {
        <-timer2.C
        fmt.Println("Timer 2 fired")
    }()
    stop2 := timer2.Stop()
    if stop2 {
        fmt.Println("Timer 2 stopped")
    }

	// Give the timer2 enough time to fire, if it ever was going to, to show it is in fact stopped.
    time.Sleep(2 * time.Second)

	// --------------------- Tickers --------------------- //
	// Timers are for when you want to do something once in the future - tickers are for when you want to do something repeatedly at regular intervals. Here’s an example of a ticker that ticks periodically until we stop it.
	ticker := time.NewTicker(500 * time.Millisecond)
    done := make(chan bool)
	go func() {
        for {
            select {
            case <-done:
                return
            case t := <-ticker.C:
				// ticker.C fait référence au channel C d'un "ticker" créé par time.NewTicker
                fmt.Println("Tick at", t)
            }
        }
    }()

    time.Sleep(1600 * time.Millisecond)
    ticker.Stop()
    done <- true
    fmt.Println("Ticker stopped")
}