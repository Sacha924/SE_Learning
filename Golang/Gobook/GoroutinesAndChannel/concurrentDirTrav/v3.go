// LA ON VA AJOUTER DU PARALLELISME

// package main

// import (
// 	"flag"
// 	"fmt"
// 	"io/ioutil"
// 	"os"
// 	"path/filepath"
// 	"sync"
// 	// "time"
// )

// func main() {
// 	flag.Parse()
// 	roots := flag.Args()
// 	var wg sync.WaitGroup // number of working goroutines

// 	if len(roots) == 0 {
// 		roots = []string{"."}
// 	}

	
// 	// Traverse the file tree.
// 	fileSizes := make(chan int64)
// 	for _, root := range roots {
// 		wg.Add(1)
// 		go func(root string){
// 			defer wg.Done()
// 			walkDir(root, fileSizes)
// 		}(root)
// 	}

// 	go func(){
// 		wg.Wait()
// 		close(fileSizes)
// 	}()
// 	var nfiles, nbytes int64
// 	for filesize := range(fileSizes){
// 		nfiles += 1
// 		nbytes += filesize
// 	}
// 	printDiskUsage(nfiles, nbytes)
// }

// func printDiskUsage(nfiles, nbytes int64) {
// 	fmt.Printf("%d files  %.1f GB\n", nfiles, float64(nbytes)/1e9)
// }

// func walkDir(dir string, fileSizes chan<- int64) {
// 	for _, entry := range dirents(dir) {
// 		if entry.IsDir() {
// 			subdir := filepath.Join(dir, entry.Name())
// 			walkDir(subdir, fileSizes)
// 		} else {
// 			fileSizes <- entry.Size()
// 		}
// 	}
// }

// func dirents(dir string) []os.FileInfo {
// 	entries, err := ioutil.ReadDir(dir)
// 	if err != nil {
// 		fmt.Fprintf(os.Stderr, "du1: %v\n", err)
// 		return nil
// 	}
// 	return entries
// }


// ON PEUT FAIRE ENCORE MIEUX, DANS CE PREMIER CODE ON A OUBLIE DE PARALLELISER LES CALL RECURSIFS

package main

// The du3 variant traverses all directories in parallel.
// It uses a concurrency-limiting counting semaphore
// to avoid opening too many files at once.

import (
	"flag"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"sync"
	"time"
)


func main() {

	flag.Parse()

	roots := flag.Args()
	if len(roots) == 0 {
		roots = []string{"."}
	}

	fileSizes := make(chan int64)
	var n sync.WaitGroup
	for _, root := range roots {
		n.Add(1)
		go walkDir(root, &n, fileSizes)
	}
	go func() {
		n.Wait()
		close(fileSizes)
	}()

	tick := time.Tick(1 * time.Second)
	
	var nfiles, nbytes int64
loop:
	for {
		select {
		case size, ok := <-fileSizes:
			if !ok {
				break loop 
			}
			nfiles++
			nbytes += size
		case <-tick:
			printDiskUsage(nfiles, nbytes)
		}
	}

	printDiskUsage(nfiles, nbytes)

}


func printDiskUsage(nfiles, nbytes int64) {
	fmt.Printf("%d files  %.1f GB\n", nfiles, float64(nbytes)/1e9)
}


func walkDir(dir string, n *sync.WaitGroup, fileSizes chan<- int64) {
	defer n.Done()
	for _, entry := range dirents(dir) {
		if entry.IsDir() {
			n.Add(1)
			subdir := filepath.Join(dir, entry.Name())
			go walkDir(subdir, n, fileSizes)
		} else {
			fileSizes <- entry.Size()
		}
	}
}

// sema is a counting semaphore for limiting concurrency in dirents.

var sema = make(chan struct{}, 20)

func dirents(dir string) []os.FileInfo {
	sema <- struct{}{} 
	defer func() { <-sema }() 

	entries, err := ioutil.ReadDir(dir)
	if err != nil {
		fmt.Fprintf(os.Stderr, "du: %v\n", err)
		return nil
	}
	return entries
}