const Promise = require('bluebird')
const _ = require('lodash')
const videos = require('./videos')
const schedules = require('./schedules')

const TEXT_CATEGORIES = {
  WORK: [
    "Oh, yeah, work isn't always easy man. Let's fix that right away.",
    "Listen to that, I bet you'll get a raise next week 💪"
  ],
  LIFE: [
    "Take charge of your life NOW"
  ],
  GYM: [
    "Want muscles?"
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
  schedules(bp)

  bp.hear({
    type: 'postback',
    text: 'GET_STARTED' 
  }, (event, next) => {
    const { first_name, last_name } = event.user
    bp.logger.info('New user:', first_name, last_name)

    const WELCOME_SENTENCES = [
      "Hey there buddy pal, so I've heard that you need a little kick in the butt from time to time?",
      "Don't worry mate, that's my job and I'll do that for you.",
      "But man, I don't talk much.",
      "I'm a bit dumb, to be honest. Let's just stick to using buttons, that's going to be easier for the both of us."
    ]

    const WELCOME_TEXT_QUICK_REPLY = "THAT BEING SAID, choose a category right away and I'll make sure you get pumped up!"

    Promise.mapSeries(WELCOME_SENTENCES, txt => {
      bp.messenger.sendText(event.user.id, txt, { typing: true })
      return Promise.delay(4000)
    })
    .then(() => {
      bp.messenger.sendText(event.user.id, WELCOME_TEXT_QUICK_REPLY, pickCategory)
    })
  })

  const hearGetVideo = category => {
    bp.hear({ text: 'GET_VIDEO_' + category }, (event, next) => {
      const text = _.sample(TEXT_CATEGORIES[category])
      bp.messenger.sendText(event.user.id, text, { typing: true })

      Promise.delay(1500)
      .then(() => bp.sendRandomVideo(event.user.id, category))
    })
  }

  // Create a listener for each categories
  _.keys(TEXT_CATEGORIES).forEach(hearGetVideo)

  bp.botDefaultResponse = event => {
    const text = event.user.first_name + ", I told you, I'm a bit dumb. I assume you want motivation, cause that's all I'm able to do :)"
    bp.messenger.sendText(event.user.id, text, pickCategory)
  }

  bp.sendRandomVideo = (userId, category) => {
    return videos.getRandomVideo(category)
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
            { type: 'element_share' }
          ]
        }]
      })
    })
  }
}
