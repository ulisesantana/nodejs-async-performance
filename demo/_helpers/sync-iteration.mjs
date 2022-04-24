export function syncIteration(amountOfExecutions, task) {
  for (let i = 0; i < amountOfExecutions; i++) {
    task()
  }
}
