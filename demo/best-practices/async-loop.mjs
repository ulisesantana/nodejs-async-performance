import {measure} from "../_helpers/index.mjs";
import {setTimeout} from 'timers/promises'
import {asyncIteration} from "../_helpers/async-iteration.mjs";

async function doSomethingAsync() {
  await setTimeout(1)
  const x = Math.random()
  return x ** x
}


const amountOfExecutions = 50
console.log(`Async loops for ${amountOfExecutions} executions`)

await measure('using Promise.all', () => asyncIteration(amountOfExecutions, () => {
  return Promise.all([...Array(100).keys()].map(doSomethingAsync))
}))

await measure('using an await inside a for', () => asyncIteration(amountOfExecutions, async () => {
  const values = []
  for (const _index of Array(100).keys()) {
    values.push(await doSomethingAsync())
  }
  return values
}))
