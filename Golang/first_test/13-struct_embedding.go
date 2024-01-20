package main
import "fmt"
type base struct {
    num int
}
func (b base) describe() string {
    return fmt.Sprintf("base with num=%v", b.num)
}

type container struct {
    base
    str string
}

func main() {
	co := container{
		base: base{10},
		str:  "hello world!",
	}
    fmt.Printf("co={num: %v, str: %v}\n", co.num, co.str)
	fmt.Println("also num:", co.base.num)
	fmt.Println(co.base.describe())

	// Since container embeds base, the methods of base also become methods of a container. Here we invoke a method that was embedded from base directly on co.
	fmt.Println(co.describe())


	// Embedding structs with methods may be used to bestow interface implementations onto other structs. Here we see that a container now implements 
	// the describer interface because it embeds base.

	type describer interface {
        describe() string
    }

    var d describer = co
    fmt.Println("describer:", d.describe())
}
