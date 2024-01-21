// Les generics en Go, introduits dans Go 1.18, permettent de créer des fonctions et des types qui sont agnostiques par rapport au type de leurs arguments ou éléments.
package main
import "fmt"

// As an example of a generic function, MapKeys takes a map of any type and returns a slice of its keys. This function has two type parameters - K and V; 
// K has the comparable constraint, meaning that we can compare values of this type with the == and != operators. This is required for map keys in Go. 
// V has the any constraint, meaning that it’s not restricted in any way (any is an alias for interface{}).

// K comparable : K est un type générique que vous définissez pour cette fonction. comparable signifie que K doit être un type qui peut être comparé en utilisant les opérateurs de comparaison standards de Go (comme == et !=).
// V any : V est un autre type générique, et any est un alias pour interface{}, ce qui signifie que V peut être n'importe quel type.
// map[K]V : Cela indique que la fonction prend une map en paramètre, où les clés sont du type K et les valeurs du type V.
// []K : C'est le type de retour de la fonction, indiquant qu'elle renvoie un slice de type K.
func MapKeys[K comparable, V any](m map[K]V) []K {
    r := make([]K, 0, len(m))
    for k := range m {
        r = append(r, k)
    }
    return r
}


// As an example of a generic type, List is a singly-linked list with values of any type.

type List[T any] struct {
    head, tail *element[T]
}
type element[T any] struct {
    next *element[T]
    val  T
}
// We can define methods on generic types just like we do on regular types, but we have to keep the type parameters in place. The type is List[T], not List.

func (lst *List[T]) Push(v T) {
    if lst.tail == nil {
        lst.head = &element[T]{val: v}
        lst.tail = lst.head
    } else {
        lst.tail.next = &element[T]{val: v}
        lst.tail = lst.tail.next
    }
}
func (lst *List[T]) GetAll() []T {
    var elems []T
    for e := lst.head; e != nil; e = e.next {
        elems = append(elems, e.val)
    }
    return elems
}

func main() {
    var m = map[int]string{1: "2", 2: "4", 4: "8"}
// When invoking generic functions, we can often rely on type inference. Note that we don’t have to specify the types for K and V when calling MapKeys - the compiler infers them automatically.

    fmt.Println("keys:", MapKeys(m))
	// … though we could also specify them explicitly.
    _ = MapKeys[int, string](m)

	
    lst := List[int]{}
    lst.Push(10)
    lst.Push(13)
    lst.Push(23)
    fmt.Println("list:", lst.GetAll())
}