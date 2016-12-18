const axios = require('axios')
const moment = require('moment')

const manageSubscriptions = (bp, userId) => {
  return bp.subscription.isSubscribed(userId, 'daily')
  .then(subscribed => {
    if (subscribed) {
      bp.messenger.sendTemplate(userId, {
        template_type: 'button',
        text: "You are currently subscribed to receive daily motivational videos at 8AM (your time).",
        buttons: [ { type: 'postback', title: 'Unsubscribe', payload: 'UNSUBSCRIBE_DAILY'} ]
      })
    } else {
      bp.messenger.sendTemplate(userId, {
        template_type: 'button',
        text: "Click the button below to subscribe to daily motivational videos. You'll receive one every day at 8AM (your time)!",
        buttons: [ { type: 'postback', title: 'Subscribe', payload: 'SUBSCRIBE_DAILY'} ]
      })
    }
  })
}

const scheduleBroadcast = (bp, api) => () => {
  const tomorrow = moment().add(1, 'day').format('YYYY-MM-DD')

  api.put('botpress-broadcast/broadcasts', {
    date: tomorrow,
    time: '08:00',
    timezone: null, // users timezone
    type: 'javascript',
    content: "bp.sendDailyVideo(userId)",
    filters: ["bp.subscription.isSubscribed(userId, 'daily')"]
  })
  .catch(err => {
    bp.logger.error(err.response.data)
    bp.notifications.send({
      level: 'error',
      message: 'Could not schedule broadcast. See logs.'
    })
  })
}

module.exports = bp => {
  const token = bp.security.login('admin', bp.botfile.login.password, '127.0.0.1').token

  const api = axios.create({
    baseURL: 'http://localhost:' + bp.botfile.port + '/api/',
    headers: {'Authorization': token}
  })

  bp.scheduleBroadcast = scheduleBroadcast(bp, api)
  bp.manageSubscriptions = manageSubscriptions
}
