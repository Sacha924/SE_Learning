/* We will see :
* Classic function
* Function with as much params as we want
* Function with multiple return
* Recursive function
* Closure
*/

package main
import "fmt"

func addition(a int, b int) int{
	return a + b
}

// When you have multiple consecutive parameters of the same type, you may omit the type name for the like-typed parameters up to the final parameter that declares the type.
func mult(a, b, c int) int{
	return a * b * c
}

// Multiple return values
func vals() (int, int) {
    return 3, 7
}

func variadictFunction(nums ...int) (int) {
    total := 0
	for _, num := range(nums){
		total += num
	}
	return total
}

func recursiveFact(num int) int{
	if num == 1{
		return 1
	}
	return num * recursiveFact(num-1)
}

// Closure 
func intSeq() func() int {
    i := 0
    return func() int {
        i++
        return i
    }
}


func main(){
	fmt.Println(addition(4,8))
	fmt.Println(mult(4,8,6))

	a,b := vals()
	fmt.Println(a,b)

	fmt.Println(variadictFunction(1,2,3))
	fmt.Println(variadictFunction(1,2,3,4,5))

	fmt.Println(recursiveFact(6))

	// Closure

	nextInt := intSeq()

    fmt.Println(nextInt())
    fmt.Println(nextInt())
    fmt.Println(nextInt())

    newInts := intSeq()
    fmt.Println(newInts())


	// Recursive closure
	var fib func(n int) int
    fib = func(n int) int {
        if n < 2 {
            return n
        }

        return fib(n-1) + fib(n-2)
    }
    fmt.Println(fib(7))
}