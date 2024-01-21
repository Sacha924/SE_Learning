package main

import (
	"fmt"
	"time"
)

func worker(done chan bool) {
	fmt.Print("Working...")
	time.Sleep(time.Second)
	fmt.Println("done")

	// Envoyer une valeur pour notifier que le travail est terminé
	done <- true
}

func main() {
	done := make(chan bool, 1)
	go worker(done)

	// Attendre la notification depuis le channel
	<-done
}

// Dans cet exemple, le channel done est utilisé pour synchroniser l'exécution de la goroutine worker avec la goroutine principale 
// dans main. Sans le channel, il n'y aurait aucun moyen simple pour la goroutine principale de savoir quand worker a terminé son 
// exécution. En l'absence de ce mécanisme de synchronisation, main pourrait se terminer avant que worker n'ait fini, ce qui pourrait 
// mener à un programme qui se termine prématurément ou à un comportement imprévisible.
// L'opérateur <-done dans le code Go est utilisé pour recevoir une valeur du channel done. Cela bloque la goroutine courante 
// (ici, la fonction main) jusqu'à ce qu'une valeur soit envoyée sur le channel done.