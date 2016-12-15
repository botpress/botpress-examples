const axios = require('axios')
const moment = require('moment')

const scheduleBroadcast = (bp, api) => () => {
  const tomorrow = moment().add(1, 'day').format('YYYY-MM-DD')

  api.put('botpress-broadcast/broadcasts', {
    date: tomorrow,
    time: '08:00',
    timezone: null, // users timezone
    type: 'javascript',
    content: "bp.sendRandomVideo(userId, 'LIFE')", // TODO Add text
    filters: ["bp.subscription.isSubscribed(userId, 'daily')"]  
  })
  .catch(err => {
    bp.logger.error(err)
    bp.notifications.send({
      level: 'error',
      message: 'Could not schedule broadcast. See logs.'
    })
  })
}

module.exports = bp => {
  const token = bp.security.login('admin', bp.botfile.login.password, '127.0.0.1')

  const api = axios.create({
    baseURL: 'http://localhost:' + bp.botfile.port + '/api/',
    headers: {'Authorization': token}
  })

  bp.scheduleBroadcast = scheduleBroadcast(bp, api)
}
