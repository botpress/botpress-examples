# Tutorial

This tutorial will show you how easy it is to build a 'hello world' using Botpress and Messenger. It supposed to be really short to do, it should take you less than 10 minutes and you don't need to write any line of code... If you have any problem, do not hesitate to talk to us on our [Public Chatroom](https://gitter.im/botpress/core), it will be a pleasure for us to answer your requests.

## Requirements

Botpress requires [node](https://nodejs.org) (version >= 4.2) and uses [npm](https://www.npmjs.com) as package manager.

## Step-by-step

### 1. Install

First thing you need to have `botpress` installed as a general dependency using `npm`. If it's done yet, you only need to install it using the following command.

```
npm install -g botpress
```

### 2. Create a new repository

Once `botpress` has been installed, in your command line tool, you need to create a new repository and move into it.

```js
mkdir hello-world-rivescript-bot && cd hello-world-rivescript-bot // Mac and Linux users

md hello-world-rivescript-bot && cd hello-world-rivescript-bot // Windows users
```

### 3. Initialization

Now, let's simply use command line interface of `botpress` to initialize your bot. To do it, you need to run the following command.

```
botpress init
```

### 4. Install modules

In your command line, you need to install [botpress-messenger](https://github.com/botpress/botpress-messenger) module to be able to connect your bot to your Facebook Page. Also, we will need [botpress-rivescript](https://github.com/botpress/botpress-rivescript) to add some basic interaction to our bot.

```
botpress install messenger rivescript
```

### 5. Start

Once you have everything is installed, you can start your bot and see what have been installed on it.

```
botpress start
```

Go to **http://localhost:3000** and from there you can install other modules if you want to, but for this tutorial we only need `botpress-messenger` which is supposed to be already installed.

### 6. Configure Messenger connexion settings

Before starting coding it, we need to configure it then it will be linked directly to your Facebook Page. To do this step, you can follow our [5 steps](https://github.com/botpress/botpress-messenger#get-started) guide in botpress-messenger documentation.

<img src='./assets/connexion-settings.png' height=300px />

Briefly, you only need to create a [Facebook Page](https://www.facebook.com/pages/create) if you don't already have one and create a new [Messenger Application](https://developers.facebook.com/) on Facebook Developers Interface. After that, you need to find your **App ID**, **App Secret** and **Token Access**, and copy them directly in your web messenger [module interface](http://localhost:3000/modules/botpress-messenger). Finally, you only need to activate [**ngrok**](https://ngrok.com/), **validate** and **connect** your bot.

### 7. Answering to hello world

First, you will need to add a basic answer to 'hello world' on [web interface](http://localhost:3000/modules/botpress-rivescript) of rivescript module. To do it, you simply need to modify your `begin` file by adding those lines.

```
! version = 2.0

+ hello world
- Botpress Team is happy to know that you have try our bot!
```

**Note 1**:  If you don't understand `rivescript`, you should probably take some time to look at the [official documentation](https://www.rivescript.com/), it's a simple and powerful scripting language for chatbots.

**Note 2**: By using web interface, you can customize any interaction of your bot. You can also try them directly in web interface by using the simulator panel.

### 8. Answering to any other message

Finally, you will need to add some line in your `star` file to answer any other message.

```
+ *
- I'm not sure how to reply to that. I only understand 'hello world'...
- I don't understand what you have said...
- Sorry, I have been built to only answer to 'hello world'.
```

**Note**: You can customize answers like you want and fell free to change any script.

## Have fun

Building a bot with Botpress is simple as that!

Feel free to fork our bot, send pull requests, clone it, send any comment...

## Community

Pull requests are welcomed! We believe that it takes all of us to create something big and impactful.

We have a [Public Chatroom](https://gitter.im/botpress/core), everybody is invited to come and share ideas, issues or simply get in touch.

## License

hello-world-bot is licensed under [AGPL-3.0](/LICENSE)
