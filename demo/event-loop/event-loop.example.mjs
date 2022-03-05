import {fetch} from 'undici';
import {log} from "../_helpers/index.mjs";

// const log = console.log

function print({temperature, wind, description}) {
  log(JSON.stringify({temperature, wind, description}))
}

function toJSON(res) {
  return res.json()
}

function printWeather(city) {
  log(`Fetching ${city}`)
  fetch(`https://goweather.herokuapp.com/weather/${city}`)
    .then(toJSON)
    .then(print)
}

log('Start')

printWeather('Valverde')
printWeather('Barcelona')

log('End')
