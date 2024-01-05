/* THEME :
*
* Can (a==1 && a==2 && a==3) Ever Evaluate to ‘true’ in JavaScript?
*
*/
// https://medium.com/@fatfish/interviewer-can-a-1-a-2-a-3-ever-evaluate-to-true-in-javascript-565fc064d676


// SOLUTION 1
let a = {
    name: 'fatfish',
    toString() {
        return 'medium'
    }
}

// will "hello medium" be printed out?
if (a == 'medium') {
    console.log('hello medium')
}
// the answer is yes !!! wtf, check README.md to understand ;)

const obj = {
    value: 1,
    valueOf() {
        return 2
    },
    toString() {
        return '3'
    },
    [Symbol.toPrimitive]() {
        return 4
    }
}
console.log(obj == 4) // true because Symbol.toPrimitive is called and it returns 4


// So for our question of a equal 1, 2 and 3 :
a = {
    i: 1,
    valueOf() {
      return this.i++
    }
  }
  if (a == 1 && a == 2 && a == 3) {
    console.log('hello medium') // hello medium
  }

// SOLUTION 2

// The implicit conversion of array objects also complies with rule 3, but the 'join' method will be called before "toString"
a = [1, 2, 3]

a.join = a.shift

if (a == 1 && a == 2 && a == 3) {
  console.log('hello medium') // hello medium
}


// SOLUTION 3 (only in front)

// let _a = 1
// Object.defineProperty(window, 'a', {
//   get() {
//     return _a++
//   }
// })
// if (a == 1 && a == 2 && a == 3) {
//   console.log('hello medium') // hello medium
// }


// Solution 4

let z = new Proxy({ i: 1 }, {
    get(target) {
      return () => target.i++
    }
  })
  if (z == 1 && z == 2 && z == 3) {
    console.log('hello medium') // hello medium
  }