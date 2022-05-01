import {measure, asyncIteration, syncIteration, formatNumber} from "../_helpers/index.mjs";

export function randomNumber() {
    return Math.random()
}

export async function asyncRandomNumber() {
    return Math.random()
}

/*
 * In a test suite we reduced the execution time by 40% just removing unnecessary async in functions
 */
const amountOfExecutions = 1_000_000
console.log(`Executing ${formatNumber(amountOfExecutions)} times`)
await measure('sync function', () => syncIteration(amountOfExecutions, randomNumber))
await measure('async function', () => asyncIteration(amountOfExecutions, asyncRandomNumber))