import {hugeOperation, interval, log} from "../_helpers/index.mjs";

// After 100 milliseconds the event loop will be blocked
setTimeout(() => {
  hugeOperation()
}, 100)

let intervals = 1

interval({
  timeInterval: 1,
  timeout: 1000,
  task() {
    log(`Interval every millisecond: ${intervals++}`)
  }
})
