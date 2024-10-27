package main

import (
	"fmt"
	"time"
)

func main() {
	ch := make(chan int) // si on utilisait un buffered channel, on n'aurait pas à attendre 1 seconde pour voir yo3 apparaitre
	go f(ch)
	fmt.Print("yo") // peut apparaitre en premier ou en 2ème c'est indéterminé
	time.Sleep(time.Second)
	val := <-ch
	time.Sleep(time.Second)
	fmt.Print("yo ", val)

	go sendValToChan(ch)
	fmt.Print(<-ch)  // main goroutine bloquée tant qu'une autre goroutine n'envoie pas de valeur dans le channel
}

func f(ch chan int) {
	fmt.Print("yo") // peut apparaitre en premier ou en 2ème c'est indéterminé
	ch<-4
	// unbuffered channel donc bloqué tant qu'on ne lit pas dans le channel
	fmt.Print("yo 3 ") // apparaitra en 3ème après que le channel est lu la valeur
}

func sendValToChan(ch chan int) {
	time.Sleep(3*time.Second)
	ch<-100
}
