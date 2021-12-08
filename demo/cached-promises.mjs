import {Benchmark} from "./helpers/benchmark.mjs";
import {setTimeout} from "timers/promises"

async function doSomethingAsync() {
  await setTimeout(10)
  return 42
}

class CacheByValue {
  #value

  async getNumber() {
    if(this.#value === undefined) {
      this.#value = await doSomethingAsync()
    }
    return this.#value
  }
}

class CacheByPromise {
  #value

  getNumber() {
    if(this.#value === undefined) {
      this.#value = doSomethingAsync()
    }
    return this.#value
  }
}

const byPromise = new CacheByPromise()
const byValue = new CacheByValue()

const suite = new Benchmark('Caching promises')

await suite.add('by value', byPromise.getNumber.bind(byPromise))

await suite.add('by promise', byValue.getNumber.bind(byValue))

suite.printResults()
