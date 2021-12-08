import {Benchmark} from "./benchmark.mjs";
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

const suite = new Benchmark('Loops', 1000)
await suite.add('Sync', () => {
  return [...Array(100).keys()].map(doSomething)
})
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

