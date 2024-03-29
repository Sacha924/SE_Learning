package main
import (
    "errors"
    "fmt"
)


func f1(arg int) (int, error) {
	if arg == 42 {
		return -1, errors.New("this is an error")
	}
	return arg, nil
}


// It’s possible to use custom types as errors by implementing the Error() method on them. 
// Here’s a variant on the example above that uses a custom type to explicitly represent an argument error.

type argError struct {
    arg  int
    prob string
}
func (e *argError) Error() string {
    return fmt.Sprintf("%d - %s", e.arg, e.prob)
}

// In this case we use &argError syntax to build a new struct, supplying values for the two fields arg and prob.
func f2(arg int) (int, error) {
    if arg == 42 {
        return -1, &argError{arg, "this is an error"}
    }
    return arg + 3, nil
}

	
func main() {
	// The two loops below test out each of our error-returning functions. 
	// Note that the use of an inline error check on the if line is a common idiom in Go code.
	
	for _, i := range []int{7, 42} {
		if r, e := f1(i); e != nil {
			fmt.Println("f1 failed:", e)
		} else {
			fmt.Println("f1 worked:", r)
		}
	}
	for _, i := range []int{7, 42} {
		if r, e := f2(i); e != nil {
			fmt.Println("f2 failed:", e)
		} else {
			fmt.Println("f2 worked:", r)
		}
	}
	// If you want to programmatically use the data in a custom error, 
	// you’ll need to get the error as an instance of the custom error type via type assertion.
	
	_, e := f2(42)
	if ae, ok := e.(*argError); ok {
		fmt.Println(ae.arg)
		fmt.Println(ae.prob)
	}
}