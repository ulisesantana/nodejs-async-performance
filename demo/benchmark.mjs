export class Benchmark {
  static #AsyncFunction = (async () => {}).constructor;
  #suiteName
  #amountOfIterations
  #results = []

  constructor(suiteName, amountOfIterations = 1000) {
    this.#suiteName = suiteName
    this.#amountOfIterations = amountOfIterations
  }

  async add(title, test) {
    const isAsync = test instanceof Benchmark.#AsyncFunction
    const results = []
    const startTotal = Date.now()
    for (const _index of Array(this.#amountOfIterations).keys()) {
      const start = Date.now()
      if (isAsync) {
        await test()
      } else {
        test()
      }
      results.push(Date.now() - start)
    }
    const averageTimeInMs = (results.reduce((total, x) => total + x, 0) / this.#amountOfIterations )
    this.#results.push({
      title,
      averageTimeInMs,
      totalTimeInMs: Date.now() - startTotal
    })
  }

  printResults() {
    console.log(`${this.#suiteName} for ${Benchmark.#addThousandSeparator(this.#amountOfIterations)} iterations.`)
    console.table(this.results)
  }

  get results () {
    return [...this.#results].sort((a, b) => a.averageTimeInMs - b.averageTimeInMs)
  }

  static #addThousandSeparator(number) {
    return Array.from(String(number))
      .reverse()
      .map((n, i, arr) =>
        (i + 1) % 3 === 0 && i < arr.length - 1 ? `.${n}` : n
      )
      .reverse()
      .join('')
  }

}
