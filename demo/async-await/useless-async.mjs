import {measure, asyncIteration, syncIteration} from "../_helpers/index.mjs";

export function randomNumber() {
    const x = Math.random()
    return x ** x
}

/*
 * In a test suite we reduced the execution time by 40% just removing unnecessary async in functions
 */
const amountOfExecutions = 1_000_000
console.log(`Executing ${amountOfExecutions.toLocaleString('es-ES')} times`)
await measure('sync function', () => syncIteration(amountOfExecutions, randomNumber))
await measure('async function', () => asyncIteration(amountOfExecutions, randomNumber))
