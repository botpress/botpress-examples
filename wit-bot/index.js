module.exports = function(bp) {
  bp.middlewares.load()

  // Implement your Actions like this
  bp.wit.actions['getWeather'] = request => {
    return new Promise((resolve, reject) => {
      bp.logger.info('Get Weather called', request)
      // Do something here
      resolve(request.context)
    })
  }

  // You need to call this method once you are done implementing the Actions
  bp.wit.reinitializeClient()
}
