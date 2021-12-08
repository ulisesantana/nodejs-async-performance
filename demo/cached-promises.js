import {Benchmark} from "./helpers/benchmark.mjs";

const suite = new Benchmark('Caching promises')

await suite.add('by value', () => {
  const x = Math.random()
  return x ** x
})

await suite.add('by promise', async () => {
  const x = Math.random()
  return x ** x
})

suite.printResults()
