# Tutorial

This tutorial will show you how easy it is to build a motivation bot using Botpress and Messenger. For this purpose, we will build a bot from scratch and we will end up with a little motivation bot in about 30 minutes. If you have any problems, do not hesitate to talk to us on our [Public Chatroom](https://gitter.im/botpress/core), it will be a pleasure for us to answer your requests.

If you don't want to follow up our step-by-step guide to build this bot, you can clone this repository and just try it by linking it to a Facebook Page and Messenger App. (Step #5-6)

## Requirements

Botpress requires [node](https://nodejs.org) (version >= 4.2) and uses [npm](https://www.npmjs.com) as package manager.

## Step-by-step

### 1. Install botpress

First thing you need to have `botpress` installed as a general dependency using `npm`. If it's done yet, you only need to install it using command line and

```
npm install -g botpress
```

### 2. Create a new repository

Once `botpress` has been installed, in your command line tool, you need to create a new repository and move into it.

```js
mkdir motivation-bot && cd motivation-bot // Mac and Linux users

md motivation-bot && cd motivation-bot // Windows users
```

### 3. Initialization

Let's simply use command line interface to initialize your bot. To do it, you need to enter the following command.

```
botpress init
```

### 4. Install Messenger module

Directly in your command line again, you need to install [botpress-messenger module](https://github.com/botpress/botpress-messenger) to connect your bot to a Facebook Page.

```
botpress install messenger
```

### 5. Start

Once you have everything installed, you can start your bot and see what have been installed on it.

```
botpress start
```

Go to `http://localhost:3000` and from there you can install other modules if you want to, but for this tutorial we only need `botpress-messenger` which is supposed to be already installed.

### 6. Configure Messenger connexion settings

Before starting coding it, we need to configure it so it will be linked directly to your Facebook Page. To do this step, you can follow our [5 steps guide](https://github.com/botpress/botpress-messenger#get-started) in botpress-messenger documentation.

Briefly, you only need to create a [Facebook Page](https://www.facebook.com/pages/create) if you don't already have one and create a new [Messenger Application](https://developers.facebook.com/) on Facebook Developers Interface. After that, you need to find your **App ID**, **App Secret** and **Token Access**, and copy them directly in your web messenger module interface (http://localhost:3000/modules/botpress-messenger). Finally, you only need to activate [**ngrok**](https://ngrok.com/), validate and connect your bot.

If everything works fine from the begin of the tutorial, your bot is supposed to work and answer to `BOT_LICENSE` if you chat with it directly on [Messenger](https://www.messenger.com/) or [Facebook](https://www.facebook.com).

**Note**: `BOT_LICENSE` is a built-in command to print basic information about your bot (name, version, licenses).

### 7. Open in editor

Once all the setup is done, we are now ready to code your bot. First thing you need to do is to open it with your favorite editor (Sublime, Atom, WebStorm, Netbeans...). As you can see, some files and directories have already been created when you initialize it before to acceralerate development.

```
  - botfile.js // your bot's configuration. botpress uses this
  - index.js // your bot's entry point. bot logic goes here
  - package.json // regular node package.json file
  - LICENSE // your bot license, either AGPLv3 or Botpress License
  - .gitignore // ignoring some botpress-created files by default
```

### 8. Start coding

Now, open `index.js` file and write (or copy) those lines of code. In fact, this is a simple TODO list to add directly in your code.

```js
module.exports = function(bp) {
  bp.middlewares.load()

  /* Things to do:
    [ ] Basic welcome message
    [ ] Choose between 3 categories: WORK, PERSONAL DEVELOPMENT, GYM
    [ ] Choose random video in selected category
    [ ] Send video as Card (image, thumbnail, share button)
    [ ] Add small talk capabilities
    [ ] Catch-all sentences with quick_replies
    [ ] Add video shortcuts in bot's menu
    [ ] Prevent people from getting more than 2 videos a day
  */
}
```

**Note:** When you are coding, using TODO is a good practice to adopt because it helps to stay focus and always know exactly what you need to do next...

### 9. Basic welcome message

First, we will setup a basic answer to `GET_STARTED` button on Messenger. You simply need to add those lines of `index.js` under your TODO list.

```js
  bp.hear({
    type: 'postback',
    text: 'GET_STARTED'
  }, (event, next) => {
    const { first_name, last_name } = event.user
    bp.logger.info('New user:', first_name, last_name)
  })
```

**Note**: When you click on **Get started** button on Messenger it emits a `postback` event and it's exactly what we are listening on here.

### 10. Import npm packages

To achieve easily all what we want to do, we will need some useful `npm packages`. Then, in your terminal, you will need to add them by using `npm install <package>` command.

```
npm install bluebird  //[doc](https://bluebirdjs.com/docs/getting-started.html)
npm install lodash    //[doc](https://lodash.com/)
```

Once it's done, at the begin of your `index.js` file, you will need to import all of them.

```js
const Promise = require('bluebird')
const _ = require('lodash')
```

### 11. Choose between 3 categories: WORK, PERSONAL DEVELOPMENT, GYM

As you probably notice our first welcome message was a bit boring, let's customize it and add humour to it.

```js
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
      bp.messenger.sendText(event.user.id, WELCOME_TEXT_QUICK_REPLY, {
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
      })
    })
  })
```

In this code, we use `Promise.mapSeries` to send ordered text messages with some delay between each. Then we finally send a message with some `quick_replies` added to ask to users which type of video they want to listen at.

**Note**: You can try it if you want to, it's supposed to be working. The only thing you have to do is to restart your bot by using again `bp start` in your terminal. Don't forget to save your changes before...

### 12. Basic answer to WORK

Now, we need to listen on `quick_reply` to know which kind of video users want to listen. Here is a simple example of code for listening to one type on video they might click on.

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

**Note**: Actually, we only send a text message to validate that everything is working, but dont't worry, during next steps, we will customize it to send awesome random videos about each topic.

### 13. 


## Community

Pull requests are welcomed! We believe that it takes all of us to create something big and impactful.

We have a [Public Chatroom](https://gitter.im/botpress/core), everybody is invited to come and share ideas, issues or simply get in touch.

## License

motivation-bot is licensed under [AGPL-3.0](/LICENSE)
