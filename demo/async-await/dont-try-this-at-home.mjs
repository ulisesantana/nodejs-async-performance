import {measure} from "../_helpers/index.mjs";
import path from "path";
import * as fs from "fs";

// Slowest
export async function transformToUpperCase(readableStream, writableStream) {
  const data = [];

  return new Promise(async (resolve) => {
    await fs.unlink(path.resolve("demo/data-upper-case.txt"), (err) => {
      if (err) {
        throw err
      }
    })
    readableStream
      .on("data", (chunk) => {
        data.push(chunk);
        writableStream.write(chunk.toString().toUpperCase())
      })
      .on("end", async function() {
        return resolve(data.length);
      })
  });
}

export function transformToUpperCase2(readableStream, writableStream) {
  const data = [];

  return new Promise((resolve) => {
    fs.unlink(path.resolve("demo/data-upper-case.txt"), (err) => {
      if (err) {
        throw err
      }
      readableStream
        .on("data", (chunk) => {
          data.push(chunk);
          writableStream.write(chunk.toString().toUpperCase())
        })
        .on("end", () => {
          return resolve(data.length);
        })
    })

  });
}

// Fastest
export async function transformToUpperCaseWithAsyncGenerator(
  readableStream,
  writableStream
) {
  const data = [];
  await fs.promises.unlink(path.resolve("demo/data-upper-case.txt"))
  for await (const chunk of readableStream) {
    data.push(chunk);
    writableStream.write(chunk.toString().toUpperCase())
  }
  return data.length;
}

const inputPath = path.resolve("demo/data.txt");
const outputPath = path.resolve("demo/data-upper-case.txt");

console.log('Compare executions transforming a file')
await measure(
  'mixing events with async/await',
  () => transformToUpperCase(fs.createReadStream(inputPath),  fs.createWriteStream(outputPath))
)
await measure(
  'using events',
  () => transformToUpperCase2(fs.createReadStream(inputPath),  fs.createWriteStream(outputPath))
)
await measure(
  'using async generator',
  () => transformToUpperCaseWithAsyncGenerator(fs.createReadStream(inputPath),  fs.createWriteStream(outputPath))
)
