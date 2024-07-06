package main

import (
	"fmt"
	"log"
	"time"
)

func squares() func() int {
	var x int
	return func() int { // anonymous function
		x++
		return x*x
	}
}

func slowOp() {
	defer trace("bigOp")()
	time.Sleep(10* time.Second)
}

func trace(msg string) func() {
	start := time.Now()
	log.Printf("enter %s", msg)
	return func() {log.Printf("exit %s (%s)", msg, time.Since(start))}
}

func main() {
	// functions are not just code but can have state; the anonymous inner function can access and update the local variables of the enclosing function squares 
	f := squares()
	fmt.Println(f())
	fmt.Println(f())
	fmt.Println(f())

	slowOp()
}

