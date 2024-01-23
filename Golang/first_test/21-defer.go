package main

import "fmt"

func main() {
	func() {
		for i := 0; i < 3; i++ {
			defer fmt.Println("a:", i)
		}
	}()
	fmt.Println()
	func() {
		for i := 0; i < 3; i++ {
			defer func() {
				fmt.Println("b:", i)
			}()
		}
	}()
}
// Dans la première boucle anonyme, defer fmt.Println("a:", i) est appelé avec la valeur courante de i. Comme defer retarde l'exécution jusqu'à la sortie de la fonction, 
// et que les appels defer s'empilent, les valeurs sont imprimées dans l'ordre inverse de la boucle : 2, 1, 0.

// Dans la seconde boucle, defer func() { fmt.Println("b:", i) }() capture et retarde l'exécution d'une fonction anonyme (closure) qui utilise la variable i. Cependant, 
// elle capture la référence de i, pas sa valeur à ce moment-là. Quand les fonctions différées sont exécutées après la boucle, i a sa valeur finale après la fin de la boucle, 
// qui est 3. Ainsi, toutes les closures affichent "b: 3".

// Meme logique pour des goroutines :

func a() {
	var a = 123
	go func(x int) {
		time.Sleep(time.Second)
		fmt.Println(x, a) // 123 789
	}(a)

	a = 789

	time.Sleep(2 * time.Second)
}

// Passage de a à la Goroutine : La variable a (avec la valeur 123) est passée à la goroutine comme argument (x). Ainsi, x est 123 à l'intérieur de la goroutine.

// Modification de a dans main : Après le lancement de la goroutine, a est modifiée pour avoir la valeur 789 dans la fonction main.

// Delai Avant l'Impression : La goroutine attend une seconde avant d'imprimer. Pendant ce temps, la modification de a en 789 se produit dans main.

// Impression des Variables : Lorsque la goroutine imprime les variables, elle affiche 123 (la valeur de x, qui est une copie de a au moment de la création de la goroutine) et 789 (la valeur actuelle de a dans main).

// Le comportement asynchrone des goroutines et la capture de valeurs par les closures expliquent ce résultat.








// func main() {
// 	defer fmt.Println("9")
// 	fmt.Println("0")
// 	defer fmt.Println("8")
// 	fmt.Println("1")
// 	if false {
// 		defer fmt.Println("not reachable")
// 	}
// 	defer func() {
// 		defer fmt.Println("7")
// 		fmt.Println("3")
// 		defer func() {
// 			fmt.Println("5")
// 			fmt.Println("6")
// 		}()
// 		fmt.Println("4")
// 	}()
// 	fmt.Println("2")
// 	return
// 	defer fmt.Println("not reachable")
// }