//  https://devopssec.fr/article/goroutines-golang
// package main

// import (
//     "fmt"
//     "time"
// )

// func run(name string) {
//     for i := 0; i < 2; i++ {
//         time.Sleep(1 * time.Second)
//         fmt.Println(name, " : ", i)
//     }
// }

// func main() {
//     debut := time.Now()
//     go run("Hatim")
//     go run("Robert")
//     run("Alex")
//     fin := time.Now()
//     fmt.Println(fin.Sub(debut))

// }

package main

import (
    "fmt"
    // "sync"
    // "time"
)

// var wg sync.WaitGroupclear

// func run(name string) {
//     defer wg.Done()
//     for i := 0; i < 3; i++ {
//         time.Sleep(1 * time.Second)
//         fmt.Println(name, " : ", i)
//     }
// }

// func main() {
//     debut := time.Now()

//     wg.Add(1)
//     go run("Hatim")
//     wg.Add(1)
//     go run("Robert")
//     wg.Add(1)
//     go run("Alex")

//     wg.Wait()
//     fin := time.Now()
//     fmt.Println(fin.Sub(debut))
// }

// func send(emet chan<-int, value int){
//     fmt.Println("send a value in the canal")
//     emet <- value
// }


// func read(receive <-chan int) int{
//     fmt.Println("read a value in the canal")
//     val := <- receive
//     return val
// }

// func main() {
//     fmt.Println("a")

//     canal := make(chan int)
//     go send(canal,  42)
//     val := read(canal)
//     fmt.Println(val)
    
// }

func send(emet chan<- int, value int) {
    fmt.Println("send a value in the canal")
    emet <- value
}

func read(receive <-chan int, returnChan chan<- int) {
    fmt.Println("read a value in the canal")
    val := <-receive
    returnChan <- val
}

func main() {
    fmt.Println("a")

    canal := make(chan int)
    returnChan := make(chan int)

    go send(canal, 42)
    go read(canal, returnChan)

    val := <-returnChan
    fmt.Println(val)
}

func main() {
    fmt.Println("a")

    canal := make(chan int)
    returnChan := make(chan int)

    go send(canal, 42)
    go read(canal, returnChan)

    val := <-returnChan
    fmt.Println(val)
}

