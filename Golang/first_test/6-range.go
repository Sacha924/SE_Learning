package main
import "fmt"
func main() {
	nums := [5]int{1,2,3,4,5}
	fmt.Println(nums)
	sum := 0
	for _,num := range(nums){  // like python when we are doing an enumerate, the first value is the index
		sum += num
	}
	fmt.Printf("The sum of the array is %d\n", sum)

	kvs := map[int]int{1:1,2:4,3:9}
	fmt.Println(kvs)
	
	for k,v := range kvs{
		fmt.Printf("%d:%d ", k, v)
	}
	fmt.Println()
	for i, c := range "go" {
        fmt.Println(i, c)
    }
}