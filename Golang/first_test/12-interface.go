package main
import (
    "fmt"
    "math"
)

type geometry interface {
	area() float64
	perim() float64
}

// I will just implement the area function, on two struct : rectangle and circle

type rect struct {
    width, height float64
}

type circle struct{
	radius float64
}

func (r rect) area() float64{
	return r.width * r.height
}

func (c circle) area() float64 {
    return math.Pi * c.radius * c.radius
}

func main() {
	rect1 := rect{3, 4}
	circle1 := circle{5}
	fmt.Println(rect1.area())
	fmt.Println(circle1.area())

}