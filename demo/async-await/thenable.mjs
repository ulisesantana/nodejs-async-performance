async function foo() {
  return 42
}

const thenable = {
  then(callback) {
    callback(42)
  }
}

console.log(thenable) // { then: [Function: then] }
console.log(await thenable) // 42


console.log(foo()) // Promise { 42 } -> It's already fulfilled
console.log(await foo()) // 42
