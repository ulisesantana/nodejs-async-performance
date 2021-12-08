export class Benchmark {
  static #maxTimeInMs = 1000
  #suiteName
  #results = []

  constructor(suiteName) {
    this.#suiteName = suiteName
  }

  async add(title, test) {
    const limit = Date.now() + Benchmark.#maxTimeInMs
    let totalExecutions = 0
    while (Date.now() <= limit) {
      const result = test()
      if (result instanceof Promise) {
        await test()
      }
      totalExecutions +=1
    }
    this.#results.push({
      title,
      averageTimeInMs: Benchmark.#maxTimeInMs / totalExecutions,
      totalExecutions
    })
    console.log(`Added "${title}" for suite "${this.#suiteName}"`)
  }

  printResults() {
    console.log(`Results for ${this.#suiteName} benchmark.`)
    console.table(this.results)
  }

  get results() {
    return [...this.#results].sort((a, b) => b.totalExecutions - a.totalExecutions)
  }

}
