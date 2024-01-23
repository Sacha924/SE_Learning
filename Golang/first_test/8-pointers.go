package main

import "fmt"

// func main() {
//     // Value manipulation
//     originalValue := 10
//     fmt.Println("Original Value:", originalValue)
//     modifiedValue := originalValue
//     modifiedValue = 20
//     fmt.Println("Modified Value:", modifiedValue)
//     fmt.Println("Original Value after modification:", originalValue)

//     // Pointer manipulation
//     originalPointer := 10
//     fmt.Println("\nOriginal Pointer Value:", originalPointer)
//     pointer := &originalPointer // pointer now points to the memory address of originalPointer
//     *pointer = 20               // modify the value at the memory address pointer is pointing to
//     fmt.Println("Pointer Value after modification:", originalPointer)
// }

func doubleWithoutPointer(x int) {
	x += x
}

func doubleWithPointer(x *int) {
	*x += *x
    x = nil // the line is just for explanation purpose
}


func main() {
    var a = 3
	doubleWithoutPointer(a)
	fmt.Println(a) // 3

    doubleWithPointer(&a)
	fmt.Println(a) // 6

    p := &a
	doubleWithPointer(p)
	fmt.Println(a, p == nil) // 12 false

	*&a++
	*&*&a++
	**&p++
	*&*p++
    *&*&*&*&*&*&a++  // ca sert à rien d'en mettre autant ^^ Dans le contexte de Go, l'expression *& est utilisée pour accéder à la valeur pointée par un pointeur, puis prendre l'adresse de cette valeur. Cependant, c'est souvent redondant, car *&a revient simplement à a.
    fmt.Println(a) // 17

}