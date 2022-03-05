export function interval({task, timeInterval, timeout}) {
  const intervalReference = setInterval(task, timeInterval)
  setTimeout(() => {
    clearInterval(intervalReference)
  }, timeout)
}
