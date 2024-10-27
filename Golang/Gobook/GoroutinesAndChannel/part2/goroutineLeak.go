package main

import (
	"fmt"
	"time"
)

func main(){
	res := test()
	fmt.Print(res)
}

func test() string{
	responses := make(chan string, 3)
	go func() { responses <- req("fqsdfsd")}()
	go func() { responses <- req("aaa")}()
	return <-responses
}

func req(s string) string{
	if len(s)>5 {
		return "a"
	}
	time.Sleep(1 * time.Second)
	return "b"
}

// Had we used an unbeff channel the slower goroutine would have gotten stuck trying to send his resopnse on a channel from which no goroutine will ever receive, this is called a goroutine leak.
// Unlike garbage variables, leaked goroutines are not automatically collected, so it is important to make sur that goroutines terminate themselves when no longer needed