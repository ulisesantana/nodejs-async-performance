import {measure, formatNumber} from "../_helpers/index.mjs";
import {setTimeout} from 'timers/promises'
import {asyncIteration} from "../_helpers/async-iteration.mjs";

async function doSomethingAsync() {
  await setTimeout(1)
  return Math.random()
}

const amountOfExecutions = 1000
console.log(`Async loops for ${formatNumber(amountOfExecutions)} executions`)

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
