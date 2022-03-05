import {setTimeout} from "timers/promises"
import {measure} from "../_helpers/index.mjs";
import {asyncIteration} from "../_helpers/async-iteration.mjs";

async function doSomethingAsync() {
  await setTimeout(1)
  return 42
}

function CacheByValue() {
  let value = undefined

  return {
    async getNumber() {
      if (value === undefined) {
        value = await doSomethingAsync()
      }
      return value
    }
  }
}

function CacheByPromise() {
  let value = undefined

  return {
    getNumber() {
      if (value === undefined) {
        value = doSomethingAsync()
      }
      return value
    }
  }
}

const amountOfExecutions = 100_000_000
console.log(`Caching promises for ${amountOfExecutions} executions`)

await measure(`by value ${amountOfExecutions}`, () => {
  const cache = new CacheByValue()
  return asyncIteration(amountOfExecutions, cache.getNumber)
})

await measure(`by promise ${amountOfExecutions}`, () => {
  const cache = new CacheByPromise()
  return asyncIteration(amountOfExecutions, cache.getNumber)
})
