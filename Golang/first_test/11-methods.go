// Go supports methods defined on struct types.
// In Go, the syntax where you define the receiver (the parameter before the function name) is specific to methods. This receiver associates 
// the function with a particular type (either a struct type or a pointer to a struct), effectively turning the function into a method of that type. 
// This is different from regular functions, which don't have this kind of receiver. The receiver syntax allows you to call the method on instances of 
// the associated type, enabling object-oriented-like behavior in Go.

package main
import "fmt"
type rect struct {
    width, height int
}

func (r *rect) area() int {
    return r.width * r.height
}

func (r rect) perim() int {
    return 2*r.width + 2*r.height
}
func main() {
    r := rect{width: 10, height: 5}

    fmt.Println("area: ", r.area())
    fmt.Println("perim:", r.perim())


	// Go automatically handles conversion between values and pointers for method calls. You may want to use a 
	// pointer receiver type to avoid copying on method calls or to allow the method to mutate the receiving struct.

    rp := &r
	r.width = 100
    fmt.Println("area: ", rp.area())
    fmt.Println("perim:", rp.perim())
}