# Tutorial

This tutorial will show you how easy it is to build a motivation bot using the RiveScript and Messenger modules. For this purpose, we will build a little motivation bot from scratch in about 30 minutes. If you have any problems, do not hesitate to talk to us on our [Slack Community](https://slack.botpress.io). It will be a pleasure for us to answer your requests.

If you don't want to follow our step-by-step guide below, you can clone this repository and just try it by linking it to a Facebook page [step #6](#messenger). If you clone the repository, don't forget to run `npm install` in the repository.

## Table of contents
* [Requirements](#requirements)
* [Step-by-step](#step-by-step)
	* [Install Botpress](#install-botpress)
	* [Create a new repository](#create-new-repo)
	* [Initialize Botpress](#initialize-botpress)
	* [Install Botpress modules](#install-botpress-modules)
	* [Start Botpress](#start-botpress)
	* [Configure Messenger connection settings](#configure-messenger)
		* [Verifying your configuration](#verifying-connection)
	* [Open your repo in an editor](#open-your-repo)
	* [Start coding](#start-coding)
	* [Create a basic welcome message in the terminal](#basic-welcome-message)
	* [Import npm packages](#import-npm-packages)
	* [Choose between three work-life categories](#choose-between-categories)
	* [Listen for a particular user message and react](#listen-user-message)
	* [Prepare to send the user a video](#prepare-send-video)
	* [Listen for chosen work-life category](#listen-categories)
	* [Add a default response to user messages](#add-response)
	* [Put all the code together](#put-code-together)
	* [Set up RiveScript](#set-up-rivescript)
		* [RiveScript reference](#rivescript-reference)
* [Have fun](#have-fun)
* [Community](#community)
* [License](#license)

## Requirements<a name="requirements"></a>

Botpress requires [node](https://nodejs.org) (version >= 4.2) and uses [npm](https://www.npmjs.com) as package manager.

## Step-by-step<a name="step-by-step"></a>

### 1. Install Botpress<a name="install-botpress"></a>

You first need to have `botpress` installed as a general dependency using `npm`. If `npm` is already installed, you can install Botpress with the following command (make sure to install it globally):

```
npm install -g botpress
```

### 2. Create a new repository<a name="create-new-repo"></a>

Once `botpress` has been installed, you create a new repository and cd into it.

```js
mkdir motivation-bot && cd motivation-bot // Mac and Linux users

md motivation-bot && cd motivation-bot // Windows users
```

### 3. Initialize Botpress<a name="initialize-botpress"></a>

Now, let's use the command line interface of `botpress` to initialize your bot:

```
botpress init
```

### 4. Install Botpress modules<a name="install-botpress-modules"></a>

In your command line again, you need to install the [botpress-messenger](https://github.com/botpress/botpress-messenger) module to be able to connect your bot to your Facebook page. Also, you will install the [botpress-rivescript](https://github.com/botpress/botpress-rivescript) module to add some basic interaction.

```
botpress install messenger rivescript
```

### 5. Start Botpress<a name="start-botpress"></a>

Once everything is installed, you can start your bot and see what it includes.

```
botpress start
```

A local instance of your bot should be running at [http://localhost:3000](http://localhost:3000). From there you can install other modules as desired, but for this tutorial we only need the Messenger and RiveScript modules, which we have just installed.

### 6. Configure Messenger connection settings<a name="configure-messenger"></a>

Before getting started with coding, you will need to configure Messenger so it's connected directly to your Facebook page. If this is your first time to configure Messenger, we recommend following our [getting started](https://docs.botpress.io/getting-started.html) guide in the official Botpress documentation.

<img src='./assets/connexion-settings.png' height=300px />

Briefly, you need to create a [Facebook page](https://www.facebook.com/pages/create) if you don't already have one. You also need to create a new [Messenger app](https://developers.facebook.com/) on Facebook. After that, you can find your **App ID**, **App Secret**, and **Token Access**, and paste them directly into the `botpress-messenger` module settings of the [Botpress user interface](http://localhost:3000/modules/botpress-messenger) running locally. Finally, you only need to activate [ngrok](https://ngrok.com/), and then validate and connect your bot.

For further information on configuring `botpress-messenger` see the [Getting Started documentation](https://docs.botpress.io/getting-started.html).

#### Verifying your configuration<a name="verifying-connection"></a>

After connecting the Botpress Messenger module with your Facebook Messenger app in the step above, you can verify that everything's working by opening a chat tab on your Facebook page and typing `BOT_LICENSE`.

The bot should answer your user message, for example with:

```
Bot: motivation-bot
Created by: GB
License: AGPL-3.0
Botpress: 0.0.50
```

**Note**: `BOT_LICENSE` is a Botpress command to display basic information about your bot (name, version, licenses).

### 7. Open your repo in an editor<a name="open-your-repo"></a>

Once all the setup is done, you are ready to code your bot. You open your repository in your favorite editor (Sublime, Atom, WebStorm, Netbeans, ...). As you can see, some files and directories have already been created when you had previously initialized your repo with `botpress-init`.

```js
- botfile.js // your bot's configuration. Botpress uses this
- index.js // your bot's entry point. bot logic goes here
- package.json // regular node package.json file
- LICENSE // your bot license, either AGPLv3 or Botpress License
- .gitignore // ignoring some botpress-created files by default
```

### 8. Start coding<a name="start-coding"></a>

Now, open the `index.js` file and write (or paste) these lines of code. This is a simple to do list.

```js
module.exports = function(bp) {
  bp.middlewares.load()

  /* Things to do:
    [ ] Basic welcome message
    [ ] Choose among 3 categories: WORK, PERSONAL DEVELOPMENT, GYM
    [ ] Choose a random video in selected category
    [ ] Send video as a card (image, thumbnail, share button)
    [ ] Add small talk capabilities
    [ ] Catch-all sentences with quick_replies
  */
}
```

**Tip:** When you are coding, using a to do list is good practice because it helps you to stay focused and to know exactly what needs to be done.

### 9. Create a basic welcome message in the terminal<a name="basic-welcome-message"></a>

First, we will setup a basic answer to `GET_STARTED` button on Messenger. You simply need to add those lines in `index.js`.

```js
bp.hear({
  type: 'postback',
  text: 'GET_STARTED'
}, (event, next) => {
  const { first_name, last_name } = event.user
  bp.logger.info('New user:', first_name, last_name)
})
```
Your first and last name should be displayed in the terminal where you're running Botpress.

To display the **Get Started** button on Messenger, make sure to delete any existing conversation with your bot in Facebook Messenger.

**Note**: When you click on **Get Started** button on Messenger it emits a `postback` event and that's what we're listening on here.

### 10. Import npm packages<a name="import-npm-packages"></a>

Now we'll install some useful `npm` packages. In your terminal, you add these wtih the `npm install <package>` command.

```js
npm install bluebird  // https://bluebirdjs.com
npm install lodash    // https://lodash.com
npm install axios     // https://www.npmjs.com/package/axios
```

After installation, import them at the beginning of your `index.js` file.

```js
const Promise = require('bluebird')
const _ = require('lodash')
```

### 11. Choose between three work-life categories<a name="choose-between-categories"></a>

As you probably noticed, our first welcome message was a bit boring. Let's customize it and add some humor.

```js
// ... (imports)

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

    const WELCOME_TEXT_QUICK_REPLY = "THAT BEING SAID, choose a category below and I'll make sure you get pumped up!"

    Promise.mapSeries(WELCOME_SENTENCES, txt => {
      bp.messenger.sendText(event.user.id, txt, { typing: true })
      return Promise.delay(4000)
    })
    .then(() => {
      bp.messenger.sendText(event.user.id, WELCOME_TEXT_QUICK_REPLY, pickCategory)
    })
  })
}
```

In this code, we use `Promise.mapSeries` to send a sequence of text messages with some delay between each. We then send a final message along with some `quick_replies` to ask users to choose which type of video they want to watch (i.e., **Work**, **Life Goals**, or **Gym**).

After typing or pasting in the code above, make sure to save your changes and restart Botpress (`bp start`) in your terminal.

### 12. Listen for a particular user message and react<a name="listen-user-message"></a>

Now we'll listen on `quick_reply` to discern which kind of video a user wants. Here is some sample code for listening for one type of video that a user may choose from the `pickCategory` array defined above.

```js
bp.hear({
  type: 'quick_reply',
  text: 'GET_VIDEO_WORK'
}, (event, next) => {
  const PICK_TEXT = "Oh, yeah, work isn't always easy man. Let's fix that right away."
  bp.messenger.sendText(event.user.id, PICK_TEXT, { typing: true })
  Promise.delay(3000)
  .then(() => {
    bp.messenger.sendText(event.user.id, '<WORK_VIDEO>')
  })
})
```

Here, we only provide a text answer when the user chooses **Work**. Below, we complete this exercise by providing a random video in place of text.

### 13. Prepare to send the user a video<a name="prepare-send-video"></a>

To access videos from YouTube, you need to create a new file `videos.js` and type (or paste) the code below. 

You also need to import the `axios` and `lodash` packages and create your own `videos` object. The object is a simple map containing multiple links for different categories and implementing the `getYoutubeVideoMetadata` function for grabbing metadata from the YouTube API.

**Important**: You need to obtain your own `<YOUTUBE_API_KEY>` if you want to grab videos from YouTube (don't forget to enclose your API key in quotes). To do this, you can follow this detailed [guide](https://developers.google.com/youtube/v3/getting-started).

```js
const axios = require('axios')
const _ = require('lodash')

const videos = {
  WORK: [
    "DNFtCIzJQ7A",
    "g-fGYtagSDY",
    "00rPgc0tISM",
    "qa9G5EdKiRw",
    "3AyH1fBN7ac",
    "HQtZ4kud2qA",
    "puDQoBPpWyQ",
    "A0Scr2TW2ZA",
    "oonaeUiKV8Y",
    "2zzj4CO9xSw",
    "twZgNP8iZBQ",
    "8QlvQC4MXxs"
  ],
  LIFE: [
    "jE-Ajfd51aM",
    "6vuetQSwFW8",
    "7_R4AsV2fPI",
    "njQcOKOpFwk",
    "5g0QHTcwP8k",
    "t-H7_aAuiC8",
    "5e338_RFOr8",
    "U3V701IUZ2E",
    "ZkabeHig_r4",
    "FK16iXPRAjI",
    "4pxiU89O1wE",
    "2otRxX6y7mQ"
  ],
  GYM: [
    "Fh-rCrREEgA",
    "xoXYe9e01_Y",
    "hV63DbQ_qSc",
    "YxzQ6umhH4Q",
    "lsSC2vx7zFQ",
    "63Cv6Jiiink",
    "aMGoxlXmA0o",
    "at7QvbFy9fM",
    "qapsrR8zIJM",
    "vnMtpNhcDOE",
    "OV6-n5wtCWA",
    "lpVRxa9jsrE",
    "WDJaJbc9O-4"
  ]
}

const getYoutubeVideoMetadata = (videoId) => {
  const YOUTUBE_API_KEY = <YOUR_YOUTUBE_API_KEY>
  const apiUrl = `https://content.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${YOUTUBE_API_KEY}`

  return axios.get(apiUrl)
  .then(res => {
    const video = res.data.items[0].snippet
    return {
      description: video.description,
      thumbnail: (video.thumbnails.high || video.thumbnails.standard).url,
      title: video.title,
      url: 'https://www.youtube.com/watch?v=' + videoId
    }
  })
}

module.exports = {
  getRandomVideo: (category) => {
    const videoId = _.sample(videos[category])
    return getYoutubeVideoMetadata(videoId)
  }
}

```

As you can see, `videos.js` only exports the function `getRandomVideo` which returns video metadata (description, thumbnail, title, URL) grabbed from YouTube.

### 14. Listen for chosen work-life category<a name="listen-categories"></a>

We now import our `videos.js` file into `index.js` and add possible responses from `TEXT_CATEGORIES` (placing this above our exports statement). We'll also add code for a video response inside the exports statement.

```js
// ... (other imports)
const videos = require('./videos')

// ... (other variables)

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

module.exports = function(bp) {

  // ... (other functions)

  const hearGetVideo = category => {
    bp.hear({ text: 'GET_VIDEO_' + category }, (event, next) => {
      console.log('!! I CAUGHT THAT')
      const text = _.sample(TEXT_CATEGORIES[category])
      bp.messenger.sendText(event.user.id, text, { typing: true })

      Promise.delay(1500)
      .then(() => videos.getRandomVideo(category))
      .then(meta => {
        bp.messenger.sendTemplate(event.user.id, {
          template_type: 'generic',
          elements: [{
            title: meta.title,
            item_url: meta.url,
            image_url: meta.thumbnail,
            subtitle: meta.description,
            buttons: [
              { type: 'web_url', title: '🔥 Watch 🔥', url: meta.url },
              { type: 'element_share' }
            ]
          }]
        })
      })
    })
  }
}

// Create a listener for each category
_.keys(TEXT_CATEGORIES).forEach(hearGetVideo)
```

### 15. Add a default response to user messages<a name="add-response"></a>

To answer text messages from users, you need to grab them and in our case, we decide to temporarily always answer the same message. By adding these lines to the bottom of `index.js`, a `botDefaultResponse` is created that can be called from anywhere.

```js
bp.botDefaultResponse = event => {
  const text = event.user.first_name + ", I told you, I'm a bit dumb. I assume you want motivation, cause that's all I'm able to do :)"
  bp.messenger.sendText(event.user.id, text, pickCategory)
}
```

### 16. Put all the code together<a name="put-code-together"></a>

Finally, let's sum up all the code snippets we recently added to `index.js`. After adding this code, restart your bot by running `botpress start`.

```js
const Promise = require('bluebird')
const _ = require('lodash')
const videos = require('./videos')

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
      console.log('!! I CAUGHT THAT')
      const text = _.sample(TEXT_CATEGORIES[category])
      bp.messenger.sendText(event.user.id, text, { typing: true })

      Promise.delay(1500)
      .then(() => videos.getRandomVideo(category))
      .then(meta => {
        bp.messenger.sendTemplate(event.user.id, {
          template_type: 'generic',
          elements: [{
            title: meta.title,
            item_url: meta.url,
            image_url: meta.thumbnail,
            subtitle: meta.description,
            buttons: [
              { type: 'web_url', title: '🔥 Watch 🔥', url: meta.url },
              { type: 'element_share' }
            ]
          }]
        })
      })
    })
  }

  _.keys(TEXT_CATEGORIES).forEach(hearGetVideo)

  bp.botDefaultResponse = event => {
    const text = event.user.first_name + ", I told you, I'm a bit dumb. I assume you want motivation, cause that's all I'm able to do :)"
    bp.messenger.sendText(event.user.id, text, pickCategory)
  }
}
```

### 16. Set up RiveScript<a name="set-up-rivescript"></a>

In a previous step, we had installed the Botpress RiveScript module. When you open this [module](http://localhost:3000/modules/botpress-rivescript) in the Botpress instance running locally, you see the `begin` file prepopulated with sample RiveScript code. Feel free to modify this code to customize the interaction of your chatbot.

```
// begin
! version = 2.0

! sub i'm     = i am
! sub i'd     = i would
! sub i've    = i have
! sub i'll    = i will
! sub don't   = do not
! sub isn't   = is not
! sub you'd   = you would
! sub you're  = you are
! sub you've  = you have
! sub you'll  = you will
! sub what's  = what is
! sub whats   = what is
! sub what're = what are
! sub what've = what have
! sub what'll = what will
! sub who's   = who is
```
When you click on the `star` file, you also find sample code. This file allows you to specify wildcard responses or open-ended triggers for user messages containing variable data.

You can add the following code to `star` to link our `botDefaultResponse` to any unanswered message. The result will be that user messages sent to `botpress-messenger` will be swallowed while `botpress-rivescript` will process them according to its rules.

```
// star
+ *
- JS: bp.botDefaultResponse(event)
```

#### RiveScript reference<a name="rivescript-reference"></a>

For more information you can refer to the official [RiveScript documentation](https://www.rivescript.com/). Botpress also has a [tutorial](https://github.com/botpress/botpress-examples/tree/master/hello-world-rivescript-bot) dedicated to using RiveScript.


## Have fun<a name="have-fun"></a>

Building a bot with the RiveScript module is as simple as that!

Feel free to fork our bot, send pull requests, clone it, send comments, ...

## Community<a name="community"></a>

Pull requests are welcome! We believe that it takes all of us to create something big and impactful.

There's a [Slack community](https://slack.botpress.io) where you are welcome to join us, ask any question and even help others.

Get an invite and join us now! 👉[https://slack.botpress.io](https://slack.botpress.io).

## License<a name="license"></a>

`motivation-bot` is licensed under [AGPL-3.0](/LICENSE).
