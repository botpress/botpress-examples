const Promise = require('bluebird')
const axios = require('axios')

// Get yours here: https://openweathermap.org/appid
const OPEN_WEATHER_API_KEY = process.env.WEATHER_API || '<YOUR_API_KEY>'

const getLocationWeatherUrl = (location, units) => {  
  return "http://api.openweathermap.org/data/2.5/weather?" +
    "q=" + location +
    "&units=" + units +
    "&appid=" + OPEN_WEATHER_API_KEY
}

module.exports = function(bp) {
  bp.middlewares.load()

  // Implement your Actions like this
  bp.wit.actions['getWeather'] = request => {
    // Get location from extracted entities
    const location = request.entities.location[0].value

    const url = getLocationWeatherUrl(location, 'metric')

    // Fetch temperature from API
    return axios.get(url)
    .then(res => {
      const temperature = res.data.main.temp

      // setting the temperature in Wit context
      request.context.weather = temperature + '°C'

      // return the new context back to Wit
      return request.context
    })
  }

  // You need to call this method once you are done implementing the Actions
  bp.wit.reinitializeClient()
}
