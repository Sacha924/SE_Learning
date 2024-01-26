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
    "sync"
    "time"
)

var wg sync.WaitGroupclear

func run(name string) {
    defer wg.Done()
    for i := 0; i < 3; i++ {
        time.Sleep(1 * time.Second)
        fmt.Println(name, " : ", i)
    }
}

func main() {
    debut := time.Now()

    wg.Add(1)
    go run("Hatim")
    wg.Add(1)
    go run("Robert")
    wg.Add(1)
    go run("Alex")

    wg.Wait()
    fin := time.Now()
    fmt.Println(fin.Sub(debut))
}