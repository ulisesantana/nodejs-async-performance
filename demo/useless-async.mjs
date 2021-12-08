import {Benchmark} from "./benchmark.mjs";

const suite = new Benchmark('Simple function')

await suite.add('Sync', () => {
  const x = Math.random()
  return x ** x
})

await suite.add('Async', async () => {
  const x = Math.random()
  return x ** x
})

suite.printResults()
