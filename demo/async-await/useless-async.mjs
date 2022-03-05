import {measure} from "../_helpers/index.mjs";
import {asyncIteration} from "../_helpers/async-iteration.mjs";

function square() {
    const x = Math.random()
    return x ** x
}

/*
 * In a test suite we reduced the execution time by 40% just removing unnecessary async in functions
 */
const amountOfExecutions = 1_000_000
console.log(`Executing ${amountOfExecutions} times`)

await measure('sync function', () => {
  for (let i = 0; i < amountOfExecutions; i++) {
    square()
  }
  const x = Math.random()
  return x ** x
})

await measure('async function', () => asyncIteration(amountOfExecutions, async () => {
  return square()
}))
