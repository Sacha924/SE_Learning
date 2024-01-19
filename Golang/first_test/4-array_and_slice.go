package main
import (
	"fmt"
	"slices"
	"reflect"
)

func main(){
	var a [5]int
    fmt.Println("emp:", a)

    a[4] = 100
    fmt.Println("set:", a)
    fmt.Println("get:", a[4])

    fmt.Println("len:", len(a))

    b := [5]int{1, 2, 3, 4, 5}
    fmt.Println("dcl:", b)

    var twoD [2][3]int
    for i := 0; i < 2; i++ {
        for j := 0; j < 3; j++ {
            twoD[i][j] = i + j
        }
    }
    fmt.Println("2d: ", twoD)


	fmt.Println("-------------SLICES-------------")

	// SLICES
	var s []string
    fmt.Println("uninit:", s, s == nil, len(s) == 0)

	s = make([]string, 3)
    fmt.Println("emp:", s, "len:", len(s), "cap:", cap(s))
	s[0] = "a"
    s[1] = "b"
    s[2] = "c"
    fmt.Println("set:", s)
    fmt.Println("get:", s[2])

    fmt.Println("len:", len(s))

	s = append(s, "d")
    s = append(s, "e", "f")
    fmt.Println("apd:", s)

	c := make([]string, len(s))
    copy(c, s)
    fmt.Println("cpy:", c)

	l := s[2:5]
    fmt.Println("sl1:", l)
	fmt.Println(reflect.TypeOf(l))

	t := []string{"g", "h", "i"}
    fmt.Println("dcl:", t)

	t2 := []string{"g", "h", "i"}
    if slices.Equal(t, t2) {
        fmt.Println("t == t2")
    }

	twoDDD := make([][]int, 3)
    for i := 0; i < 3; i++ {
        innerLen := i + 1
        twoDDD[i] = make([]int, innerLen)
        for j := 0; j < innerLen; j++ {
            twoDDD[i][j] = i + j
        }
    }
    fmt.Println("2d: ", twoDDD)
}