import {log} from "./log.mjs";

export function hugeOperation() {
  log('Starting to block the event loop')
  const start = Date.now()
  let result = 0
  for (let i = 1; i <= 10e7; i++) {
    result *= Math.random()
  }
  log(`Event loop blocked for ${Date.now() - start} milliseconds`)
  log('Ending to block the event loop')
  return result
}
