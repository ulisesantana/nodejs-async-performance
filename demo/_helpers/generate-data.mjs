import * as fs from 'fs'
import * as path from "path"
import {EOL} from 'os'

function write(amountOfLines){
  const file = fs.createWriteStream(path.resolve('demo/data.txt'));
  for(let i=0; i<= amountOfLines; i++) {
    file.write(`Hodor! Hodor hodor. Hodor hodor! Hodor, hodor. Hodor. Hodor, hodor, hodor hodor. HODOR? Hodor hodor! Hodor hodor HODOR! Hodor.${EOL}`);
  }
  file.end('')
}

const start = Date.now()
write(1_000_000)
console.log(`Generated file in ${Date.now() - start}ms`)
