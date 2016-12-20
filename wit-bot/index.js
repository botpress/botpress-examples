var syncRequest = require('sync-request');

const getRequestAPI = (location, units) => {
  const OPEN_WEATHER_API_KEY = '<YOUR_API_KEY>'
  return "http://api.openweathermap.org/data/2.5/weather?" +
    "q=" + location +
    "&units=" + units +
    "&appid=" + OPEN_WEATHER_API_KEY
}

module.exports = function(bp) {
  bp.middlewares.load()

  // Implement your Actions like this
  bp.wit.actions['getWeather'] = request => {
    return new Promise((resolve, reject) => {

      // Get location from entities
      const location = request.entities.location[0].value

      //Get temperature from API
      const requestAPI = getRequestAPI(location, 'metric')
      const res = JSON.parse(syncRequest('GET', requestAPI).body);
      const temperature = res.main.temp

      request.context.weather = temperature + ' C'
      resolve(request.context)
    })
  }

  // You need to call this method once you are done implementing the Actions
  bp.wit.reinitializeClient()
}
