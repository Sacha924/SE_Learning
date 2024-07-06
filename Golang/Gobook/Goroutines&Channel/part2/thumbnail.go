package main

import (
	"fmt"
	"image"
	"image/jpeg"
	"io"
	"log"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"time"
)

func main() {
	filenames := []string{"c.JPG", "d.JPG", "e.JPG"}
	// makeThumbnails(filenames)
	// makeThumbnails2(filenames)
	// makeThumbnails3(filenames)
	// if err := makeThumbnails4(filenames); err != nil{
	// 	fmt.Print(err)
	// }
	err, res :=  makeThumbnails5(filenames)
	fmt.Println(err)
	fmt.Println(res)

}

// V1
func makeThumbnails(filenames []string) {
	defer trace("makeThumb1")()
	for _, f := range filenames {
		if _, err := ImageFile(f); err != nil {
			log.Println(err)
		}
	}
}

// V2
func makeThumbnails2(filenames []string) {
	defer trace("makeThumb2")()
	for _, f := range filenames {
		go ImageFile(f) // NOTE: ignoring errors
	}
}

// V3
func makeThumbnails3(filenames []string) {
	defer trace("makeThumb3")()
	ch := make(chan struct{})
	for _, f := range filenames {
		go func(f string) {
			ImageFile(f) // NOTE: ignoring errors
			ch <- struct{}{}
		}(f)
	}
	for range filenames {
		<-ch
	}
}

// IMPORTANT : wwe are passing f to "go func(f string)" because if we were doing :
// go func() {
// 	ImageFile()
// 	ch <- struct{}{}
// }()
// IT can have bug. Problem of a loop variable capture inside an anonymous function. The single variable f is shared by all the anonymous functions values and updated by successive loop iterations by the time new goroutines start executing the literal function, the for loop may have updated f and start another iteration (or more likely, finished entirely), so when these goroutines read the value of f, they all observe it to have the value of the final element of the slice. By adding an explicit parameter, we ensure that we use the value of f that is current when the go statement is executed


func makeThumbnails4(filenames []string) error {
	errors := make(chan error)

	for _, f := range filenames {
		go func(f string) {
			_, err := ImageFile(f)
			errors <- err
		}(f)
	}

	for range filenames {
		if err := <-errors; err != nil {
			return err // NOTE: incorrect: goroutine leak!
		}
	}

	return nil
}

func makeThumbnails5(filenames []string) (thumbfiles []string, err error) {
	defer trace("makeThumb5")()

	type item struct {
		thumbfile string
		err       error
	}

	ch := make(chan item, len(filenames))
	for _, f := range filenames {
		go func(f string) {
			var it item
			it.thumbfile, it.err = ImageFile(f)
			ch <- it
		}(f)
	}

	for range filenames {
		it := <-ch
		if it.err != nil {
			return nil, it.err
		}
		thumbfiles = append(thumbfiles, it.thumbfile)
	}

	return thumbfiles, nil
}


// IN THE CODE BELOW :
// Add must be called before the worker goroutine starts.
// Add takes a param but Done don't (Done is equivalent to Add(-1))
// We use defer to ensure that the counter is decremented even in the error case. 
/// This structure of code is a common and idiomatic pattern for looping in paraller wwhen wwe don't know the number of iterations

func makeThumbnails6(filenames <-chan string) int64 {
	sizes := make(chan int64)
	var wg sync.WaitGroup // number of working goroutines
	for f := range filenames {
		wg.Add(1)
		// worker
		go func(f string) {
			defer wg.Done()
			thumb, err := ImageFile(f)
			if err != nil {
				log.Println(err)
				return
			}
			info, _ := os.Stat(thumb) // OK to ignore error
			sizes <- info.Size()
		}(f)
	}

	// closer
	go func() {
		wg.Wait()
		close(sizes)
	}()

	var total int64
	for size := range sizes {
		total += size
	}
	return total
}

func trace(msg string) func() {
	start := time.Now()
	log.Printf("enter %s", msg)
	return func() { log.Printf("exit %s (%s)", msg, time.Since(start)) }
}

// Image returns a thumbnail-size version of src.
func Image(src image.Image) image.Image {
	// Compute thumbnail size, preserving aspect ratio.
	xs := src.Bounds().Size().X
	ys := src.Bounds().Size().Y
	width, height := 128, 128
	if aspect := float64(xs) / float64(ys); aspect < 1.0 {
		width = int(128 * aspect) // portrait
	} else {
		height = int(128 / aspect) // landscape
	}
	xscale := float64(xs) / float64(width)
	yscale := float64(ys) / float64(height)

	dst := image.NewRGBA(image.Rect(0, 0, width, height))

	// a very crude scaling algorithm
	for x := 0; x < width; x++ {
		for y := 0; y < height; y++ {
			srcx := int(float64(x) * xscale)
			srcy := int(float64(y) * yscale)
			dst.Set(x, y, src.At(srcx, srcy))
		}
	}
	return dst
}

// ImageStream reads an image from r and
// writes a thumbnail-size version of it to w.
func ImageStream(w io.Writer, r io.Reader) error {
	src, _, err := image.Decode(r)
	if err != nil {
		return err
	}
	dst := Image(src)
	return jpeg.Encode(w, dst, nil)
}

// ImageFile2 reads an image from infile and writes
// a thumbnail-size version of it to outfile.
func ImageFile2(outfile, infile string) (err error) {
	in, err := os.Open(infile)
	if err != nil {
		return err
	}
	defer in.Close()

	out, err := os.Create(outfile)
	if err != nil {
		return err
	}

	if err := ImageStream(out, in); err != nil {
		out.Close()
		return fmt.Errorf("scaling %s to %s: %s", infile, outfile, err)
	}
	return out.Close()
}

// ImageFile reads an image from infile and writes
// a thumbnail-size version of it in the same directory.
// It returns the generated file name, e.g. "foo.thumb.jpeg".
func ImageFile(infile string) (string, error) {
	time.Sleep(time.Second)
	ext := filepath.Ext(infile) // e.g., ".jpg", ".JPEG"
	outfile := strings.TrimSuffix(infile, ext) + ".thumb" + ext
	return outfile, ImageFile2(outfile, infile)
}
