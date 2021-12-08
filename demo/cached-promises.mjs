import { Benchmark } from "./helpers/benchmark.mjs";
import { setTimeout } from "timers/promises"

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

const suite = new Benchmark('Caching promises')

await suite.add('by value', CacheByValue().getNumber)
await suite.add('by promise', CacheByPromise().getNumber)


suite.printResults()
