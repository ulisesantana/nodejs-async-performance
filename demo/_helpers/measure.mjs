export async function measure(message, task) {
  console.time(message)
  const result = task()
  if (result instanceof Promise) {
    await result
  }
  console.timeEnd(message)
}
