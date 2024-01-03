// Rappels boucles js

for (let i = 0; i < 3; i++) {
    process.stdout.write(i + " ") // console.log() inherently adds a newline character at the end of each log statement, but not process.stdout
}

let iterable = "hello"
for (let item in iterable) {
    process.stdout.write(item + " ")
}
for (let item of iterable) {
    process.stdout.write(item + " ")
}
console.log()


const list = ['a', 'b', 'c']

list.forEach((item, index) => {
    console.log(item) 
    console.log(index) 
})

// .forEach() : the method doesn't use a copy of the array when it's called, it manipulates the array directly. So if the array is modified along the way, the loops may be affected.

list.forEach((item, index) => {
    if (index % 2 == 0){
        list.push(item)
    }
    
})
console.log(list)

// Is it possible to break a forEach ?

const array = [ -3, -2, -1, 0, 1, 2, 3 ]

array.forEach((it) => {
  if (it >= 0) {
    console.log(it)
    return // or break
  }
})

// it will output 0 1 2 3 ! So, can we really stop a foreach ? A foreach execute the provided function once for each element in the array in ascending order
// If you need the ability to break out of the loop based on a condition, you should use a traditional for loop or other looping constructs like for...of.
// But in fact we can break a forEach !


// Just for the knowledge : Let's implement our own foreach, we always use a callback
Array.prototype.forEach2 = function (callback, thisCtx) {
    if (typeof callback !== 'function') {
      throw `${callback} is not a function`
    }
  
    const length = this.length  // Gets the length of the array on which forEach2 is called.
    let i = 0
  
    while (i < length) {
      if (this.hasOwnProperty(i)) { // Checks if the current index i exists on the array (useful for sparse arrays).
        // Note here：Each callback function will be executed once
        // Calls the callback function with thisCtx as its context (this value), and the current element, its index, and the whole array as arguments.
        callback.call(thisCtx, this[ i ], i, this)
      }
      i++
    }
  }

  array.forEach2((it) => {
    if (it >= 0) {
      console.log(it)
      return // or break
    }
  })


// 3 ways to stop forEach

// 1 Throws an error
console.log("Here")
const test = [ -3, -2, -1, 0, 1, 2, 3 ]

try {
    test.forEach((it) => {
      if (it >= 0) {
        console.log(it)
        throw Error(`We've found the target element.`)
      }
    })
  } catch (err) {

}

// 2.# Set the length of the array to 0
test.forEach((it) => {
    if (it >= 0) {
      console.log(it)
      test.length = 0
    }
  })

// 3.# Use splice to remove the elements of an array
const testt = [ -3, -2, -1, 0, 1, 2, 3 ]

testt.forEach((it, i) => {
  if (it >= 0) {
    console.log(it)
    // Notice the sinful line of code
    array.splice(i + 1, array.length - i)
  }
})


