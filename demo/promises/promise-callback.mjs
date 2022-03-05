import {log} from "../_helpers/index.mjs";

function doSomethingAsync() {
  return new Promise(resolve => {
    log('I\'m inside a promise callback.')
    setTimeout(() => {
      log('I\'m going to be resolved.')
      resolve()
    }, 2000)
  })
}

log('RIGHT BEFORE INVOKING SOMETHING')
const promise = doSomethingAsync()
log('RIGHT BEFORE RESOLVING SOMETHING')
await promise // also you can use .then here
log('DONE!')
