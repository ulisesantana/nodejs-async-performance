import * as fs from 'fs'
import * as path from "path";
import {interval, log} from "../_helpers/index.mjs";

let fileLength = ''

log('Before reading file.')

fs.readFile(path.resolve('./demo/data.txt'), (err, data) => {
  if (err) {
    throw err
  }
  fileLength = data
  log('File length updated.')
})

log('After reading file.')

interval({
  timeInterval: 100,
  timeout: 1000,
  task() {
    log(`The file has ${fileLength.length} characters.`)
  }
})
