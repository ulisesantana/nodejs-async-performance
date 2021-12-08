import {Benchmark} from "./helpers/benchmark.mjs";
import {setTimeout} from 'timers/promises'

function doSomething() {
  const x = Math.random()
  return x ** x
}

async function doSomethingAsync() {
  await setTimeout(1)
  const x = Math.random()
  return x ** x
}

const suite = new Benchmark('Loops')

await suite.add('Async', async () => {
  const values = []
  for (const _index of Array(100).keys()) {
    values.push(await doSomethingAsync())
  }
  return values
})

await suite.add('Async Promise.all', () => {
  return Promise.all([...Array(100).keys()].map(doSomethingAsync))
})

suite.printResults()

