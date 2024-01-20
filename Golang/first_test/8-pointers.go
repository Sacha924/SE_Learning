package main

import "fmt"

func main() {
    // Value manipulation
    originalValue := 10
    fmt.Println("Original Value:", originalValue)
    modifiedValue := originalValue
    modifiedValue = 20
    fmt.Println("Modified Value:", modifiedValue)
    fmt.Println("Original Value after modification:", originalValue)

    // Pointer manipulation
    originalPointer := 10
    fmt.Println("\nOriginal Pointer Value:", originalPointer)
    pointer := &originalPointer // pointer now points to the memory address of originalPointer
    *pointer = 20               // modify the value at the memory address pointer is pointing to
    fmt.Println("Pointer Value after modification:", originalPointer)
}