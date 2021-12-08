import {Benchmark} from "./benchmark.mjs";

const suite = new Benchmark('Simple function', 100_000)
await suite.add('Sync', () => {
  const x = Math.random()
  return x ** x
})
await suite.add('Async', async () => {
  const x = Math.random()
  return x ** x
})
suite.printResults()
