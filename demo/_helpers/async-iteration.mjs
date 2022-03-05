export async function asyncIteration(amountOfExecutions, task) {
  for (let i = 0; i < amountOfExecutions; i++) {
    await task()
  }
}
