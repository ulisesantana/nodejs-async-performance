import {measure} from "../_helpers/index.mjs";
import {setTimeout} from 'timers/promises'
import {asyncIteration} from "../_helpers/async-iteration.mjs";

async function doAnotherThingAsync() {
  await setTimeout(3)
}

async function doSomethingAsync() {
  await doAnotherThingAsync()
  await setTimeout(2)
  return 42
}

function doSomethingAsyncThen() {
  return new Promise(resolve => {
    doAnotherThingAsync()
      .then(() => {
        return setTimeout(2)
      })
      .then(() => {
        return resolve(42)
      })
  })
}

// Please, don't do this
function doSomethingAsyncThenAwait() {
  return new Promise(resolve => {
    doAnotherThingAsync()
      .then(async () => {
        await setTimeout(2)
      })
      .then(async () => {
        return resolve(42)
      })
  })
}

const amountOfExecutions = 1_000
console.log(`Mixing Promises with Async  for ${amountOfExecutions} executions`)
await measure('mixing async/await and then', () => asyncIteration(amountOfExecutions, doSomethingAsyncThenAwait))
await measure('using then', () => asyncIteration(amountOfExecutions, doSomethingAsyncThen))
await measure('using async/await', () => asyncIteration(amountOfExecutions, doSomethingAsync))
