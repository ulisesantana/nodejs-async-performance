import * as fs from 'fs/promises'
import * as path from "path";
import {interval, log} from "../_helpers/index.mjs";

let fileLength = ''

log('Before reading file.')

fileLength = await fs.readFile(path.resolve('./demo/data.txt'))
log('File length updated.')

log('After reading file.')

interval({
  timeInterval: 100,
  timeout: 1000,
  task() {
    log(`The file has ${fileLength.length} characters.`)
  }
})
