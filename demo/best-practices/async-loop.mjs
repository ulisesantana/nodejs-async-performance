import {setTimeout} from 'timers/promises'
import {createHash} from 'crypto'
import {measure, formatNumber} from "../_helpers/index.mjs";
import {asyncIteration} from "../_helpers/async-iteration.mjs";

async function fetchUserInfo(id) {
  await setTimeout(1)
  return id.toString().substring(0,4)
}

const ids = Array.from({length: 100}).map(() => createHash('sha256'))
const amountOfExecutions = 1000
console.log(`Async loops for ${formatNumber(amountOfExecutions)} executions`)

await measure('using Promise.all', () => asyncIteration(amountOfExecutions, async () => {
  const values = []
  for (const id of ids) {
    values.push(fetchUserInfo(id))
  }
  return Promise.all(values)
}))

await measure('using an await inside a for', () => asyncIteration(amountOfExecutions, async () => {
  const values = []
  for (const id of ids) {
    values.push(await fetchUserInfo(id))
  }
  return values
}))
