package main

import "fmt"

type person struct {
    name string
    age  int
}


func newPerson(name string) *person{
	p := person{name:name}
	p.age = 42
	return &p
}

func main() {
	fmt.Println(person{name:"Jean"})
	fmt.Println(person{name:"Jean", age : 10})
	fmt.Println(person{"Bob", 20})
	fmt.Println(&person{name: "Ann", age: 40})
    fmt.Println(newPerson("Jon"))

    s := person{name: "Sean", age: 50}
	fmt.Println(s.name)

	sp := &s
    fmt.Println(sp.age)

	sp.age = 8
	fmt.Println(s.age)

	// If a struct type is only used for a single value, we don’t have to give it a name. The value can have an anonymous struct type. This technique is commonly used for table-driven tests.
	dog := struct {
        name   string
        isGood bool
    }{
        "Rex",
        true,
    }
    fmt.Println(dog)
}