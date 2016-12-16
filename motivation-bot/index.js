const Promise = require('bluebird')
const _ = require('lodash')
const videos = require('./videos')
const subscription = require('./subscription')

const TEXT_CATEGORIES = {
  WORK: [
    "Hard work beats talent every time",
    "The marketplace punishes those that don't work hard",
    "You don't get paid for the time, you get paid for the value you bring"
  ],
  LIFE: [
    "This one is really worth a watch",
    "You live only once.. don't mess it up",
    "What are your goals?"
  ],
  GYM: [
    "Listening to that while on the threadmill will result in 20% more results",
    "Happy to be your workout mate... Watch this!",
    "If you are not pumped up after this video, I really don't know what to do"
  ]
}

const pickCategory = {
  quick_replies: [
    {
      content_type: 'text',
      title: '🔥 Work 🔥',
      payload: 'GET_VIDEO_WORK'
    },
    {
      content_type: 'text',
      title: '😌 Life Goals 🔥',
      payload: 'GET_VIDEO_LIFE'
    },
    {
      content_type: 'text',
      title: '💪 Gym 🔥',
      payload: 'GET_VIDEO_GYM'
    }
  ],
  typing: true
}

module.exports = function(bp) {
  bp.middlewares.load()
  subscription(bp)

  bp.hear({
    type: 'postback',
    text: 'GET_STARTED' 
  }, (event, next) => {
    const { first_name, last_name } = event.user
    bp.logger.info('New user:', first_name, last_name)

    bp.subscription.subscribe(event.user.id, 'daily')

    const WELCOME_SENTENCES = [
      "Hey, so I've heard that you need a little kick in the butt from time to time? Don't worry mate, that's my job and I'll do that for you 👏",
      "In exchange I only ask from you that you don't talk to me like I was human.. I'm clearly not! 🤖",
      "👉 Let's just stick to using buttons, that's going to be easier for the both of us"
    ]

    const WELCOME_TEXT_QUICK_REPLY = "That being said, choose a category right away and I'll make sure you get pumped up!"

    Promise.mapSeries(WELCOME_SENTENCES, txt => {
      bp.messenger.sendText(event.user.id, txt, { typing: true })
      return Promise.delay(2000)
    })
    .then(() => {
      bp.messenger.sendText(event.user.id, WELCOME_TEXT_QUICK_REPLY, pickCategory)
    })
  })

  bp.hear(/TRIGGER_DAILY/i, (event, next) => {
    bp.sendDailyVideo(event.user.id)
  })

  const hearGetVideo = category => {
    bp.hear({ text: 'GET_VIDEO_' + category }, (event, next) => {
      const text = _.sample(TEXT_CATEGORIES[category])
      bp.messenger.sendText(event.user.id, text)

      Promise.delay(1000)
      .then(() => bp.sendRandomVideo(event.user.id, category))
    })
  }

  // Create a listener for each categories
  _.keys(TEXT_CATEGORIES).forEach(hearGetVideo)

  bp.botDefaultResponse = event => {
    const ANSWERS = [
      event.user.first_name + ", I told you, I'm a bit dumb. I assume you want motivation, 'cause that's all I'm able to do :)",
      "I don't understand much of what you say " + event.user.first_name,
      "I'm only here to give you motivation",
      "My creators made me dumb on purpose, they say I shouldn't try to be human-like :s",
      "I'm not here to talk " + event.user.first_name + ", I'm here to give you motivation!"
    ]
    
    const text = _.sample(ANSWERS)
    bp.messenger.sendText(event.user.id, text, pickCategory)
  }

  bp.sendRandomVideo = (userId, category) => {
    videos.getRandomVideo(category)
    .then(meta => {
      bp.messenger.sendTemplate(userId, {
        template_type: 'generic',
        elements: [{
          title: meta.title,
          item_url: meta.url,
          image_url: meta.thumbnail,
          subtitle: meta.description,
          buttons: [
            {
              type: 'web_url',
              title: '🔥 Watch 🔥',
              url: meta.url,
              webview_height_ratio: 'full'
            },
            {
              type: 'postback',
              title: '👉 Next video',
              payload: 'GET_VIDEO_' + category
            },
            { type: 'element_share' }
          ]
        }]
      })
    })

    const n = _.random(0, 10)
    if (n === 5) { // 10% chance of saying this
      setTimeout(() => {
        bp.messenger.sendText(userId, "PLEASE! If you enjoy the service I am giving you, consider sharing the card below with some of your friends 👇!")

        setTimeout(() => {
          bp.messenger.sendTemplate(userId, {
            template_type: 'generic',
            elements: [{
              title: 'Clicking this button could literally change your life',
              item_url: 'https://m.me/boostfuel',
              image_url: 'https://s27.postimg.org/dl8i0udqb/motivation_on_demand.png',
              buttons: [{
                type: 'web_url',
                title: '👏 Make it happen',
                url: 'https://m.me/boostfuel'
              }, { type: 'element_share' }]
            }]
          })
        }, 2000)
      }, 15 * 1000)
    }
  }

  bp.sendDailyVideo = (userId) => {
    const category = _.sample(_.keys(TEXT_CATEGORIES))
    const text = "Here's your daily motivational video, have an excellent day 😁!"

    bp.messenger.sendText(userId, text)
    setTimeout(() => bp.sendRandomVideo(userId, category), 1000)
  }
}
